import { Node, VueNodeViewRenderer } from '@tiptap/vue-3';
import CanvasVue from './Canvas.vue';
import { Node as PMNode } from '@tiptap/pm/model';
import { Point } from '@/models/point';
import { ValueObject } from '@/models/common';
import { EditorState, Transaction } from '@tiptap/pm/state';

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
    readonly node: PMNode;
    readonly fillColor: ValueObject<string>;
    readonly paperScope?: paper.PaperScope;

    getPos(): number | undefined;
    onMouseMove(event: paper.ToolEvent, hitResult: paper.HitResult | null, cursorStyle: CSSStyleDeclaration): void;
    /** returns true if the shape captured mouse down */
    onMouseDown(event: paper.ToolEvent, hitResult: paper.HitResult | null): boolean;
    /** returns true if the shape captured mouse drag */
    onMouseDrag(event: paper.ToolEvent, snapPoints: paper.Point[]): boolean;
    onMouseUp(): void;
    onDelete(): void;
    handleResize(width: number, height: number): void;
    move(shift: paper.Point): void;
    scale(factor: number, center: Point): void;
    setSelected(value: boolean): void;
    save(): void;
    getPosition(): paper.Point;
    getSnapPoints(): paper.Point[];
    containedInBounds(bounds: paper.Rectangle): boolean;
}

export default Node.create({
    name: 'geometry',
    content: '(textArea | rectangle | line | circle | polygon | arc)*',
    group: 'block',
    draggable: true,

    parseHTML: () => [{ tag: 'geometry' }],

    renderHTML: () => ['geometry', 0],

    addAttributes() {
        return {
            canvas: {
                default: {
                    width: 500,
                    height: 300,
                },
                parseHTML: (element) => JSON.parse(element.getAttribute('canvas')!),
                renderHTML: (attributes) => ({ canvas: JSON.stringify(attributes.canvas) }),
            },
        };
    },

    addStorage() {
        return { controllers: new Map<string, ShapeController>() };
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
                ({ state, commands }) => {
                    const $from = state.selection.$from;
                    for (let d = $from.depth; d >= 0; d--) {
                        if ($from.node(d).type === this.type) {
                            return false;
                        }
                    }

                    const position = state.selection.head;
                    const node = this.type.create(attrs);
                    return commands.insertContentAt(position, node);
                },
            moveShapesToBottom:
                (canvasPosition: number, childIndexes: number[]) =>
                ({ state, tr, dispatch }) => {
                    tr.setMeta('allowDelete', true);
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
                    tr.setMeta('allowDelete', true);

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
                    tr.setMeta('allowDelete', true);

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

                    tr.setMeta('allowDelete', true);
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
