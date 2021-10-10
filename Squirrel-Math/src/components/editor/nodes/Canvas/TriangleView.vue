<template>
    <canvas ref="canvas"></canvas>
</template>

<script>
import paper from "paper";
import { Shape } from './Shape';

export function createEquilateral(center, size = 100) {
    const radius = size*Math.sqrt(3) / 3;
    if (!center) 
        center = { x: size / 2, y: radius };
    return new paper.Path.RegularPolygon(new paper.Point(center.x, center.y), 3, radius).segments.map(s => ({ x: s.point.x, y: s.point.y }));
}

export default {
    props: ["node", "updateAttrs", "view", "getPos"],

    data() {
        return {
            paperScope: null,
            canHaveBorder: true,
            triangle: null,
            movedShape: null,
            all: null,
            grips: null,
            isSelected: false
        }
    },

    mounted() {
        this.render();
    },

    computed: {
        fillColor: {
            get() {
                return this.node.attrs.color;
            },

            set(color) {
                if (color !== this.fillColor)
                    this.updateAttrs({ color });
                if (color == '#00000000')
                    color = '#00000001';
                this.triangle.fillColor = new paper.Color(color);
                this.grips.fillColor = new paper.Color(color).multiply(0.7);
                this.grips.fillColor.alpha = 1;
            },
        },

        borderColor: {
            get() {
                return this.node.attrs.borderColor;
            },

            set(borderColor) {
                this.triangle.strokeColor = new paper.Color(borderColor);
                this.triangle.style.strokeWidth = this.triangle.strokeColor.alpha > 0 ? 4 : 0;
                if (borderColor !== this.borderColor)
                    this.updateAttrs({ borderColor });
            },
        },

        selected: {
            get() {
                return null;
            },

            set(value) {
                this.isSelected = value;
                this.grips.visible = value;
            },
        },
    },

    watch: {
        node: function() { this.render() }
    },

    methods: {
        render() {
            this.paperScope = new paper.PaperScope();
            this.paperScope.setup(this.$refs.canvas);
            this.paperScope.activate();
            const attrs = this.node.attrs;

            if (attrs.vertices) {
                this.triangle = new paper.Path(attrs.vertices.map(v => [v.x, v.y]));
                this.triangle.closed = true;
            }
            else
                this.triangle = new paper.Path.RegularPolygon(new paper.Point(50, 57.74), 3, 57.74);

            let grip = new paper.Path.Circle(new paper.Point(0, 0), 6);
            grip.style.strokeWidth = 0;
            let gripDots = [];
            this.triangle.segments.forEach((segment, i) => {
                gripDots[i] = grip.clone();
                gripDots[i].position = segment.point;
            });
            grip.remove();

            this.grips = new paper.Group(gripDots);
            this.all = new paper.Group([this.triangle, this.grips]);
            this.grips.visible = this.isSelected;

            this.fillColor = attrs.color;
            this.borderColor = attrs.borderColor;
        },

        handleResize(width, height) {
            this.paperScope.view.setViewSize(new paper.Size(width, height));
        },

        getPosition() {
            return this.triangle.position;
        },

        move(shift) {
            this.all.translate(shift);
        },

        containedInBounds(bounds) {
            return this.triangle.intersects(new paper.Path.Rectangle(bounds)) || bounds.contains(this.triangle.bounds);
        },

        getSnapPoints() {
            return this.grips.children.map(g => g.position);
        },

        onDelete() {
            this.all.remove();
        },

        onMouseMove(event, hitResult, cursorStyle) {
            if (!hitResult)
                return;
            else if (this.triangle == hitResult.item)
                cursorStyle.cursor = "move";
            else if (this.grips.children.some(grip => grip == hitResult.item))
                cursorStyle.cursor = "crosshair";
        },

        onMouseDown(event, hitResult) {
            if (!hitResult)
                return false;
            if (this.triangle == hitResult.item)
                this.movedShape = this.all;
                let result = this.grips.children.find(grip => grip == hitResult.item);
            if (result)
                this.movedShape = result;
            return !!this.movedShape;
        },

        onMouseDrag(event, snapPoints) {
            if (!this.movedShape)
                return false;

            let result = this.grips.children.findIndex(grip => grip == this.movedShape);
            if (result != -1) {
                let snapShift = event.modifiers.shift ? Shape.snapShift([event.point], snapPoints) : new paper.Point(0, 0);
                this.movedShape.position = event.point.add(snapShift);
                this.triangle.segments[result].point = this.movedShape.position;
                return true;
            }
            else 
                return false;
        },

        onMouseUp() {
            this.movedShape = null;
        },

        save() {
            this.updateAttrs({ vertices: this.triangle.segments.map(s => ({ x: s.point.x, y: s.point.y })) });
        }
    }
};
</script>

<style scoped lang="scss">
@import "@/style/global";
canvas {
    position: absolute;
    pointer-events: none;
}
</style>
