<template>
    <node-view-wrapper as="canvas" ref="canvas"></node-view-wrapper>
</template>

<script>
import paper from 'paper';
import { Shape } from './Shape';
import { NodeViewWrapper } from '@tiptap/vue-2';
import Vue from 'vue';

export default Vue.extend({
    components: {
        NodeViewWrapper,
    },
    props: ['node', 'view', 'getPos'],

    data() {
        return {
            editable: true,

            paperScope: null,

            line: null,
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
        this.paperScope = new paper.PaperScope();
        this.paperScope.setup(this.$refs.canvas.$el);
        this.render();
        this.editor.storage.geometry.controllers.set(this.node.attrs.id, this);
    },

    computed: {
        fillColor: {
            get() {
                return this.node.attrs.color;
            },

            set(color) {
                this.line.strokeColor = new paper.Color(color);
                this.grips.fillColor = new paper.Color(color).multiply(0.7);
                if (this.fillColor != color) {
                    this.updateAttributes({ color });
                }
            },
        },

        borderColor: {
            get() {
                return '';
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
            this.paperScope.activate();
            this.paperScope.project.clear();

            const attrs = this.node.attrs;
            this.line = new paper.Path();
            this.line.style.strokeWidth = 3;

            this.grips = new paper.Group();
            this.grips.visible = this.isSelected;

            this.fillColor = attrs.color;

            if (attrs.points) {
                attrs.points.forEach((p) => this.addPoint(new paper.Point(p)));
            }

            if (attrs.smooth) {
                this.line.smooth({ type: 'continuous' });
            }

            this.selectedGripOutline = new paper.Path.Circle(new paper.Point(0, 0), 8);
            this.selectedGripOutline.strokeColor = new paper.Color('#ffbb33');
            this.selectedGripOutline.style.strokeWidth = 4;
            this.selectedGripOutline.locked = true; // non-hittable
            this.selectGrip(this.selectedGripIndex);

            this.all = new paper.Group([this.line, this.grips, this.selectedGripOutline]);
        },

        handleResize(width, height) {
            this.paperScope.view.setViewSize(new paper.Size(width, height));
        },

        getPosition() {
            return this.line.position;
        },

        move(shift) {
            this.all.translate(shift);
        },

        scale(factor, center) {
            this.line.scale(factor, new paper.Point(center));
            this.save();
        },

        setSelected(value) {
            this.grips.visible = value;
            this.isSelected = value;
            if (!value) {
                this.editing = false;
                this.selectGrip(-1);
            }
        },

        containedInBounds(bounds) {
            return this.line.intersects(new paper.Path.Rectangle(bounds)) || bounds.contains(this.line.bounds);
        },

        getSnapPoints() {
            return this.grips.children.map((g) => g.position);
        },

        onDelete() {
            if (this.selectedGripIndex != -1) {
                this.line.removeSegment(this.selectedGripIndex);
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
            } else if (hitResult && this.line == hitResult.item && this.editing) {
                cursorStyle.cursor = 'cell';
            } else if (hitResult && this.line == hitResult.item && !this.editing) {
                cursorStyle.cursor = 'move';
            }
        },

        onMouseDown(event, hitResult) {
            if (!hitResult) {
                if (this.editing) {
                    const newIndex =
                        this.selectedGripIndex != -1 ? this.selectedGripIndex + 1 : this.grips.children.length;
                    this.addPoint(event.point, newIndex);
                    this.selectGrip(newIndex);
                    this.movedShape = this.grips.children[newIndex];
                    return true;
                }
                return false;
            }
            if (this.line == hitResult.item) {
                if (this.editing) {
                    const indexBetween = hitResult.location.index + 1;
                    this.addPoint(event.point, indexBetween);
                    this.selectGrip(indexBetween);
                    this.movedShape = this.grips.children[indexBetween];
                    return true;
                } else {
                    this.movedShape = this.all;
                }
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
                this.line.segments[result].point = this.movedShape.position;
                this.selectedGripOutline.position = this.movedShape.position;
                return true;
            } else {
                return false;
            }
        },

        onMouseUp() {
            this.movedShape = null;
        },

        addPoint(position, index = this.line.segments.length) {
            this.line.insert(index, position);
            let grip = new paper.Path.Circle(position, 6);
            grip.style.strokeWidth = 0;
            grip.fillColor = new paper.Color(this.fillColor).multiply(0.7);
            this.grips.insertChild(index, grip);
        },

        save() {
            this.updateAttributes({
                points: this.line.segments.map((s) => ({
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
    },
});
</script>

<style scoped lang="scss">
@use '@/style/global';
canvas {
    position: absolute;
    pointer-events: none;
}
</style>
