import { Node, VueNodeViewRenderer } from '@tiptap/vue-3';
import CanvasVue from './Canvas.vue';
import { Fragment, Node as PMNode, Slice } from '@tiptap/pm/model';
import { Point } from '@/models/point';
import { ValueObject } from '@/models/common';
import { EditorState, Plugin, TextSelection, Transaction } from '@tiptap/pm/state';
import { idGenerator, Snapper } from './utils';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        geometry: {
            createGeometry: (attrs?: { canvas?: { width: number; height: number } }) => ReturnType;
            moveShapesToBottom: (canvasPosition: number, childIndexes: number[]) => ReturnType;
            moveShapesDown: (canvasPosition: number, childIndexes: number[]) => ReturnType;
            moveShapesUp: (canvasPosition: number, childIndexes: number[]) => ReturnType;
            moveShapesToTop: (canvasPosition: number, childIndexes: number[]) => ReturnType;
        };
    }

    interface Storage {
        geometry: {
            controllers: Map<string, ShapeController>;
        };
    }
}

export interface ShapeController {
    readonly fillColor: ValueObject<string>;
    readonly paperScope?: paper.PaperScope;

    onMouseMove(event: paper.ToolEvent, hitResult: paper.HitResult | null, cursorStyle: CSSStyleDeclaration): void;
    /** @returns true if the shape captured mouse down */
    onMouseDown(event: paper.ToolEvent, hitResult: paper.HitResult | null): boolean;
    /** @returns true if the shape captured mouse drag */
    onMouseDrag(event: paper.ToolEvent, snapper: Snapper): boolean;
    onMouseUp(): void;
    /**
     * @returns **captured**: whether the delete action was processed internally by this shape, i.e. some part of it was deleted;
     * if false, the whole shape may be deleted freely;
     *
     * **shouldPreventDefault**: if false, it means that delete action needs to be processed by the browser (e.g. to modify a text) and cannot be captured
     */
    onDelete(): { captured: boolean; shouldPreventDefault: boolean };
    handleResize(width: number, height: number): void;
    move(shift: paper.Point): void;
    scale(factor: number, center: Point): void;
    setSelected(value: boolean): void;
    save(): void;
    getPos(): number | undefined;
    getPosition(): paper.Point;
    getSnapPoints(): paper.Point[];
    getBounds(): paper.Rectangle;
    containedInBounds(bounds: paper.Rectangle): boolean;
    getNode(): PMNode;
}

const shapeNodeNames = new Set(['textArea', 'rectangle', 'line', 'circle', 'polygon', 'arc']);

function withFreshShapeIds(node: PMNode): PMNode {
    if (node.isText) {
        return node;
    }

    const children: PMNode[] = [];
    node.content.forEach((child) => children.push(withFreshShapeIds(child)));

    const attrs = shapeNodeNames.has(node.type.name) ? { ...node.attrs, id: idGenerator.next().value } : node.attrs;
    return node.type.create(attrs, children.length > 0 ? Fragment.fromArray(children) : node.content, node.marks);
}

export default Node.create({
    name: 'geometry',
    content: '(textArea | rectangle | line | circle | polygon | arc)*',
    group: 'block',
    isolating: true,
    atom: true,
    draggable: true,

    parseHTML: () => [{ tag: 'geometry' }],

    renderHTML: ({ HTMLAttributes }) => ['geometry', HTMLAttributes, 0],

    addAttributes() {
        return {
            canvas: {
                default: {
                    width: 500,
                    height: 300,
                },
                parseHTML: (element) => JSON.parse(element.getAttribute('canvasSize')!),
                renderHTML: (attributes) => ({ canvasSize: JSON.stringify(attributes.canvas) }),
            },
        };
    },

    addStorage() {
        return { controllers: new Map<string, ShapeController>() };
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                props: {
                    transformPasted: (slice) => {
                        const nodes: PMNode[] = [];
                        slice.content.forEach((node) => nodes.push(withFreshShapeIds(node)));
                        return new Slice(Fragment.fromArray(nodes), slice.openStart, slice.openEnd);
                    },
                },
            }),
        ];
    },

    addCommands() {
        const getChild = (state: EditorState, parentPosition: number, childIndex: number) => {
            const parentNode = state.doc.resolve(parentPosition).nodeAfter!;
            const node = parentNode.child(childIndex);
            const start = parentNode.children
                .slice(0, childIndex)
                .reduce((acc, n) => acc + n.nodeSize, parentPosition + 1);
            const end = start + node.nodeSize;
            return { node, start, end };
        };

        const deleteChild = (tr: Transaction, child: { node: PMNode; start: number }) => {
            const deleteStart = tr.mapping.map(child.start);
            const deleteEnd = deleteStart + child.node.nodeSize;
            tr.delete(deleteStart, deleteEnd);
        };

        return {
            createGeometry:
                (attrs = {}) =>
                ({ state, tr, dispatch }) => {
                    const $from = state.selection.$from;

                    // don’t allow nesting inside existing geometry
                    for (let d = $from.depth; d >= 0; d--) {
                        if ($from.node(d).type === this.type) {
                            return false;
                        }
                    }
                    const { from, to } = state.selection;
                    const node = this.type.create(attrs);
                    tr.replaceRangeWith(from, to, node);
                    tr.setSelection(TextSelection.near(tr.doc.resolve(from + node.nodeSize), 1));
                    if (dispatch) {
                        dispatch(tr.scrollIntoView());
                    }
                    return true;
                },
            moveShapesToBottom:
                (canvasPosition: number, childIndexes: number[]) =>
                ({ state, tr, dispatch }) => {
                    childIndexes
                        .toSorted((a, b) => a - b)
                        .forEach((childIndex) => {
                            const child = getChild(state, canvasPosition, childIndex);
                            deleteChild(tr, child);
                            tr.insert(tr.mapping.map(canvasPosition + 1), child.node);
                        });

                    dispatch!(tr);
                    return true;
                },
            moveShapesDown:
                (canvasPosition: number, childIndexes: number[]) =>
                ({ state, tr, dispatch }) => {
                    const sortedChildIndexes = childIndexes.toSorted((a, b) => a - b);
                    const firstUnselected = sortedChildIndexes.findIndex((c, i) => c > i);
                    if (firstUnselected === -1) {
                        return false;
                    }

                    sortedChildIndexes.slice(firstUnselected).forEach((childIndex) => {
                        const previousChild = getChild(state, canvasPosition, childIndex - 1);
                        const child = getChild(state, canvasPosition, childIndex);
                        deleteChild(tr, child);
                        tr.insert(tr.mapping.map(previousChild.start), child.node);
                    });

                    dispatch!(tr);
                    return true;
                },
            moveShapesUp:
                (canvasPosition: number, childIndexes: number[]) =>
                ({ state, tr, dispatch }) => {
                    const canvasNode = state.doc.resolve(canvasPosition).nodeAfter!;
                    const childCount = canvasNode.children.length;
                    const sortedChildIndexes = childIndexes.toSorted((a, b) => b - a);
                    const lastUnselected = sortedChildIndexes.findIndex((c, i) => c < childCount - 1 - i);
                    if (lastUnselected === -1) {
                        return false;
                    }

                    sortedChildIndexes.slice(lastUnselected).forEach((childIndex) => {
                        const child = getChild(state, canvasPosition, childIndex);
                        const nextChild = getChild(state, canvasPosition, childIndex + 1);
                        deleteChild(tr, child);
                        tr.insert(tr.mapping.map(nextChild.end), child.node);
                    });

                    dispatch!(tr);
                    return true;
                },
            moveShapesToTop:
                (canvasPosition: number, childIndexes: number[]) =>
                ({ state, tr, dispatch }) => {
                    const canvasNode = state.doc.resolve(canvasPosition).nodeAfter!;
                    const canvasStartPosition = canvasPosition + 1;
                    const target = canvasStartPosition + canvasNode.content.size;

                    childIndexes
                        .toSorted((a, b) => a - b)
                        .forEach((childIndex) => {
                            const child = getChild(state, canvasPosition, childIndex);
                            deleteChild(tr, child);
                            tr.insert(tr.mapping.map(target), child.node);
                        });

                    dispatch!(tr);
                    return true;
                },
        };
    },

    addNodeView: () => VueNodeViewRenderer(CanvasVue),
});
