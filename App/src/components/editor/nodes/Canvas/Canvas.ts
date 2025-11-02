import { Node, VueNodeViewRenderer } from '@tiptap/vue-2';
import CanvasVue from './Canvas.vue';
import { Node as PMNode } from '@tiptap/pm/model';
import { Point } from '@/components/utils/point';
import { VueConstructor } from 'vue';
import { ValueObject } from '@/models/common';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        geometry: {
            createGeometry: (attrs?: { canvas?: { width: number; height: number } }) => ReturnType;
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
    onMouseDown(event: paper.ToolEvent, hitResult: paper.HitResult | null): boolean;
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
        return {
            createGeometry:
                (attrs = {}) =>
                ({ state, commands }) => {
                    const position = state.selection.head;
                    const node = this.type.create(attrs);
                    return commands.insertContentAt(position, node);
                },
        };
    },

    addNodeView: () => VueNodeViewRenderer(CanvasVue as unknown as VueConstructor<Vue>),
});
