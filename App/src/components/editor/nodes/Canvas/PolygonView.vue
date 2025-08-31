<template>
    <canvas ref="canvas"></canvas>
</template>

<script>
import paper from 'paper';
import { Shape } from './Shape';

export default {
    props: ['node', 'updateAttrs', 'view', 'getPos'],

    data() {
        return {
            canHaveBorder: true,
            editable: true,

            paperScope: null,

            polygon: null,
            movedShape: null,

            all: null,
            grips: null,

            selectedGripIndex: -1,
            selectedGripOutline: null,

            editing: false,
            isSelected: false,
        };
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
                if (color != this.fillColor) {
                    this.updateAttrs({ color });
                }
                if (color == '#00000000') {
                    color = '#00000001';
                }
                this.polygon.fillColor = new paper.Color(color);
                this.grips.fillColor = new paper.Color(color).multiply(0.7);
                this.grips.fillColor.alpha = 1;
            },
        },

        borderColor: {
            get() {
                return this.node.attrs.borderColor;
            },

            set(borderColor) {
                if (borderColor != this.borderColor) {
                    this.updateAttrs({ borderColor });
                }
                if (borderColor == '#00000000') {
                    borderColor = '#00000001';
                }
                this.polygon.strokeColor = new paper.Color(borderColor);
            },
        },

        selected: {
            get() {
                return null;
            },

            set(value) {
                this.grips.visible = value;
                this.isSelected = value;
                if (!value) {
                    this.editing = false;
                    this.selectGrip(-1);
                }
            },
        },

        sides: {
            get() {
                return this.polygon.segments.length;
            },
        },
    },

    watch: {
        node: function () {
            this.render();
        },
    },

    methods: {
        render() {
            this.paperScope = new paper.PaperScope();
            this.paperScope.setup(this.$refs.canvas);
            this.paperScope.activate();

            const attrs = this.node.attrs;
            this.polygon = new paper.Path();
            this.polygon.closed = true;
            this.polygon.style.strokeWidth = 3;

            this.grips = new paper.Group();
            this.grips.visible = this.isSelected;

            if (attrs.vertices) {
                attrs.vertices.forEach((v) => this.addPoint(new paper.Point(v)));
            }

            this.selectedGripOutline = new paper.Path.Circle(new paper.Point(0, 0), 8);
            this.selectedGripOutline.strokeColor = new paper.Color('#ffbb33');
            this.selectedGripOutline.style.strokeWidth = 4;
            this.selectedGripOutline.locked = true; // non-hittable
            this.selectGrip(this.selectedGripIndex);

            this.all = new paper.Group([this.polygon, this.grips, this.selectedGripOutline]);

            this.fillColor = attrs.color;
            this.borderColor = attrs.borderColor;
        },

        handleResize(width, height) {
            this.paperScope.view.setViewSize(new paper.Size(width, height));
        },

        getPosition() {
            return this.polygon.position;
        },

        move(shift) {
            this.all.translate(shift);
        },

        scale(factor, center) {
            this.polygon.scale(factor, new paper.Point(center));
            this.save();
        },

        containedInBounds(bounds) {
            return this.polygon.intersects(new paper.Path.Rectangle(bounds)) || bounds.contains(this.polygon.bounds);
        },

        getSnapPoints() {
            return this.grips.children.map((g) => g.position);
        },

        onDelete() {
            if (this.selectedGripIndex != -1 && this.sides > 3) {
                this.polygon.removeSegment(this.selectedGripIndex);
                this.grips.children[this.selectedGripIndex].remove();
                this.selectGrip(-1);
                return true;
            }
            this.all.remove();
        },

        onMouseMove(event, hitResult, cursorStyle) {
            if (!hitResult && this.editing) {
                cursorStyle.cursor = 'cell';
            } else if (hitResult && this.grips.children.some((item) => item == hitResult.item)) {
                cursorStyle.cursor = 'crosshair';
            } else if (hitResult && this.polygon == hitResult.item && this.editing) {
                cursorStyle.cursor = 'cell';
            } else if (hitResult && this.polygon == hitResult.item && !this.editing) {
                cursorStyle.cursor = 'move';
            }
        },

        onMouseDown(event, hitResult) {
            if (this.editing && (!hitResult || (this.polygon == hitResult.item && hitResult.type == 'fill'))) {
                const newIndex = this.selectedGripIndex != -1 ? this.selectedGripIndex + 1 : this.grips.children.length;
                this.addPoint(event.point, newIndex);
                this.selectGrip(newIndex);
                this.movedShape = this.grips.children[newIndex];
                return true;
            }

            if (this.editing && this.polygon == hitResult.item && hitResult.type == 'stroke') {
                const indexBetween = hitResult.location.index + 1;
                this.addPoint(event.point, indexBetween);
                this.selectGrip(indexBetween);
                this.movedShape = this.grips.children[indexBetween];
                return true;
            }

            if (!hitResult) {
                return false;
            }
            if (this.polygon == hitResult.item) {
                this.movedShape = this.all;
            }
            let result = this.grips.children.findIndex((grip) => grip == hitResult.item);
            if (result != -1) {
                this.movedShape = this.grips.children[result];
                this.selectGrip(result);
            }
            return !!this.movedShape;
        },

        onMouseDrag(event, snapPoints) {
            if (!this.movedShape) {
                return false;
            }

            let result = this.grips.children.findIndex((grip) => grip == this.movedShape);
            if (result != -1) {
                let snapShift = event.modifiers.shift
                    ? Shape.snapShift([event.point], snapPoints)
                    : new paper.Point(0, 0);
                this.movedShape.position = event.point.add(snapShift);
                this.polygon.segments[result].point = this.movedShape.position;
                this.selectedGripOutline.position = this.movedShape.position;
                return true;
            } else {
                return false;
            }
        },

        onMouseUp() {
            this.movedShape = null;
        },

        addPoint(position, index = this.polygon.segments.length) {
            this.polygon.insert(index, position);
            let grip = new paper.Path.Circle(position, 6);
            grip.style.strokeWidth = 0;
            grip.fillColor = new paper.Color(this.fillColor).multiply(0.7);
            this.grips.insertChild(index, grip);
        },

        save() {
            this.updateAttrs({
                vertices: this.polygon.segments.map((s) => ({
                    x: s.point.x,
                    y: s.point.y,
                })),
            });
        },

        selectGrip(index) {
            this.selectedGripIndex = index;
            this.selectedGripOutline.visible = index != -1;
            if (index != -1) {
                this.selectedGripOutline.position = this.grips.children[index].position;
            }
        },

        makeRegular(sides, center) {
            this.selectGrip(-1);
            this.updateAttrs({
                vertices: new paper.Path.RegularPolygon(center || this.getPosition(), sides, 70).segments.map((s) => ({
                    x: s.point.x,
                    y: s.point.y,
                })),
            });
            this.editing = false;
        },
    },
};
</script>

<style scoped lang="scss">
@import '@/style/global';
canvas {
    position: absolute;
    pointer-events: none;
}
</style>
