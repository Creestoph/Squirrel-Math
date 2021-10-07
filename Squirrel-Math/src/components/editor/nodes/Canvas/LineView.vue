<template>
    <canvas ref="canvas"></canvas>
</template>

<script>
import paper from "paper";
import { Shape } from './Shape';

export default {
    props: ["node", "updateAttrs", "view", "getPos"],

    data() {
        return {
            paperScope: null,

            line: null,
            movedShape: null,

            all: null,
            grips: null,

            editing: false
        }
    },

    mounted() {
        this.paperScope = new paper.PaperScope();
        this.paperScope.setup(this.$refs.canvas);
        this.paperScope.activate();
        
        const attrs = this.node.attrs;
        this.line = new paper.Path();
        this.line.style.strokeWidth = 3;

        this.grips = new paper.Group();
        this.all = new paper.Group([this.line, this.grips]);
        this.grips.visible = false;

        this.fillColor = attrs.color;

        if (attrs.points)
            attrs.points.forEach(p => this.addPoint(new paper.Point(p)));
    },

    computed: {
        fillColor: {
            get() {
                return this.node.attrs.color;
            },

            set(color) {
                this.line.strokeColor = new paper.Color(color);
                this.grips.fillColor = new paper.Color(color).multiply(0.7);
                if (this.fillColor != color)
                    this.updateAttrs({ color });
            },
        },

        borderColor: {
            get() {
                return '';
            },
        },

        selected: {
            get() {
                return null;
            },

            set(value) {
                this.grips.visible = value;
                if (!value) {
                this.editing = false;
                }
            },
        },
    },

    methods: {
        handleResize(width, height) {
            this.paperScope.view.setViewSize(new paper.Size(width, height));
        },

        getPosition() {
            return this.line.position;
        },

        move(shift) {
            this.all.position = this.all.position.add(shift);
            this.saveVertices();
        },

        containedInBounds(bounds) {
            return this.line.intersects(new paper.Path.Rectangle(bounds)) || bounds.contains(this.line.bounds);
        },

        getSnapPoints() {
            return this.grips.children.map(g => g.position);
        },

        onDelete() {
            this.all.remove();
        },

        onMouseMove(event, hitResult, cursorStyle) {
            if (!hitResult && this.editing)
                cursorStyle.cursor = "cell";
            else if (hitResult && this.grips.children.some(item => item == hitResult.item))
                cursorStyle.cursor = "crosshair";
            else if (hitResult && this.line == hitResult.item)
                cursorStyle.cursor = "move";
        },

        onMouseDown(event, hitResult) {
            if (!hitResult) {
                if (this.editing) {
                    this.addPoint(event.point);
                    return true;
                }
                return false;
            }
            if (this.line == hitResult.item)
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
                this.line.segments[result].point = this.movedShape.position;
                this.savePoints();
                return true;
            }
            else
                return false;
        },

        onMouseUp() {
            this.movedShape = null;
        },

        /* private */ addPoint(position) {
            this.line.add(position);
            let grip = new paper.Path.Circle(position, 6);
            grip.style.strokeWidth = 0;
            grip.fillColor = new paper.Color(this.fillColor).multiply(0.7);
            this.grips.addChild(grip);
            this.savePoints();
        },

        savePoints() {
            this.updateAttrs({ points: this.line.segments.map(s => ({ x: s.point.x, y: s.point.y })) });
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
