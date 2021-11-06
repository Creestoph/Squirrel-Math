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
            canHaveBorder: true,

            paperScope: null,

            line1: null,
            line2: null,
            arcStroke: null,
            arcFill: null,
            r: 0,
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
                this.arcFill.fillColor = new paper.Color(color);
                if (this.fillColor != color)
                    this.updateAttrs({ color });
            },
        },

        borderColor: {
            get() {
                return this.node.attrs.borderColor;
            },

            set(borderColor) {
                this.arcStroke.strokeColor = new paper.Color(borderColor);
                if (this.borderColor != borderColor)
                    this.updateAttrs({ borderColor });
            },
        },

        selected: {
            get() {
                return null;
            },

            set(value) {
                this.grips.visible = value;
                this.line1.visible = this.line2.visible = value;
                this.isSelected = value;
            },
        },

        radius: {
            get() {
                return this.r;
            },

            set(value) {
                if (value > 0) {
                    this.r = value;
                    this.save();
                }
            }
        },

        angle: {
            get() {
                return Math.round((this.arm2.angle - this.arm1.angle + 360) % 360 * 100) / 100;
            },

            set(value) {
                this.arm2.angle = Math.round(((parseFloat(value) || 0) + this.arm1.angle) * 100) / 100;
                this.line2.segments[1].point = this.grips.children[2].position = this.arm2.add(this.center);
                this.save();
            }
        },

        center: { get() { return this.line1.segments[0].point } },
        arm1End: { get() { return this.line1.segments[1].point } },
        arm2End: { get() { return this.line2.segments[1].point } },
        arm1: { get() { return this.arm1End.subtract(this.center) } },
        arm2: { get() { return this.arm2End.subtract(this.center) } }
    },

    watch: {
        node: function() { this.render(); }
    },

    methods: {
        render() {
            if (this.paperScope)
                this.paperScope.project.clear();
            this.paperScope = new paper.PaperScope();
            this.paperScope.setup(this.$refs.canvas);
            this.paperScope.activate();
            
            const attrs = this.node.attrs;

            this.line1 = new paper.Path([new paper.Point(attrs.center), new paper.Point(attrs.arms[0])]);
            this.line2 = new paper.Path([new paper.Point(attrs.center), new paper.Point(attrs.arms[1])]);
            this.line1.style.strokeWidth = this.line2.style.strokeWidth = 3;
            this.line1.strokeColor = this.line2.strokeColor = new paper.Color(0.8, 0.8, 0.8);
            this.line1.dashArray = this.line2.dashArray = [8, 10];

            this.r = attrs.radius;
            this.recalculateArc();

            this.grips = new paper.Group();
            [this.center, this.arm1End, this.arm2End].forEach(point => {
                const grip = new paper.Path.Circle(point, 6);
                grip.style.strokeWidth = 0;
                this.grips.addChild(grip);
            })
            this.grips.fillColor = this.line1.strokeColor.multiply(0.7);

            this.fillColor = attrs.color;
            this.selected = this.isSelected;

            this.all = new paper.Group([this.line1, this.line2, this.arcFill, this.arcStroke, this.grips]);
        },

        handleResize(width, height) {
            this.paperScope.view.setViewSize(new paper.Size(width, height));
        },

        getPosition() {
            return this.center;
        },

        move(shift) {
            this.all.translate(shift);
        },

        scale(factor, center) {
            this.line1.scale(factor, new paper.Point(center));
            this.line2.scale(factor, new paper.Point(center));
            this.radius *= factor;
            this.save();
        },

        containedInBounds(bounds) {
            return this.arcFill.intersects(new paper.Path.Rectangle(bounds)) || bounds.contains(this.arcFill.bounds);
        },

        getSnapPoints() {
            return this.grips.children.map(g => g.position);
        },

        onDelete() {
            this.all.remove();
        },

        onMouseMove(event, hitResult, cursorStyle) {
            if (hitResult && (this.arcStroke == hitResult.item || this.grips.children.some(item => item == hitResult.item)))
                cursorStyle.cursor = "crosshair";
            else if (hitResult && (this.line1 == hitResult.item || this.line2 == hitResult.item || this.arcFill == hitResult.item))
                cursorStyle.cursor = "move";
        },

        onMouseDown(event, hitResult) {
            if (!hitResult) {
                return false;
            }
            if (this.line1 == hitResult.item || this.line2 == hitResult.item || this.arcFill == hitResult.item) {
                this.movedShape = this.all;
            }
            if (this.arcStroke == hitResult.item) {
                this.movedShape = 'arc';
            }
            let result = this.grips.children.findIndex(grip => grip == hitResult.item);
            if (result != -1) {
                this.movedShape = this.grips.children[result];
            }
            return !!this.movedShape;
        },

        onMouseDrag(event, snapPoints) {
            if (!this.movedShape)
                return false;

            if (this.movedShape == 'arc') {
                const mouseArm = event.point.subtract(this.center);
                this.r = mouseArm.getDistance();
                if ((this.arm1.angle < this.arm2.angle && (mouseArm.angle < this.arm1.angle || mouseArm.angle > this.arm2.angle))
                 || this.arm1.angle > this.arm2.angle && (mouseArm.angle > this.arm2.angle && mouseArm.angle < this.arm1.angle)) {
                    const swapTemp = this.line1.segments[1].point.clone();
                    this.line1.segments[1].point = this.line2.segments[1].point.clone();
                    this.line2.segments[1].point = swapTemp;
                    this.save();
                }
                else 
                    this.recalculateArc();
                return true;
            }

            let result = this.grips.children.findIndex(grip => grip == this.movedShape);
            if (result != -1) {
                let snapShift = event.modifiers.shift ? Shape.snapShift([event.point], snapPoints) : new paper.Point(0, 0);
                this.movedShape.position = event.point.add(snapShift);
                if (result == 0) {
                    this.line1.segments[0].point = this.movedShape.position;
                    this.line2.segments[0].point = this.movedShape.position;
                }
                else if (result == 1) {
                    this.line1.segments[1].point = this.movedShape.position;
                }
                else if (result == 2) {
                    this.line2.segments[1].point = this.movedShape.position;
                }
                this.recalculateArc();
                return true;
            }

            return false;
        },

        onMouseUp() {
            this.movedShape = null;
        },

        save() {
            this.updateAttrs({ 
                center: { x: this.center.x, y: this.center.y }, 
                arms: [{ x: this.arm1End.x, y: this.arm1End.y }, { x: this.arm2End.x, y: this.arm2End.y }],
                radius: this.radius
            });
        },

        recalculateArc() {
            this.paperScope.activate();

            if (this.arcStroke) {
                this.arcStroke.remove();
                this.arcFill.remove();
            }

            let mid = this.arm1End.add(this.arm2End).multiply(0.5).subtract(this.center);
            if (this.angle > 180)
                mid = mid.multiply(-1);
            mid = mid.add(this.arm1End.subtract(this.arm2End).rotate(90).normalize(1));

            const arcStart = this.center.add(this.arm1.normalize(this.radius));
            const arcMiddle = this.center.add(mid.normalize(this.radius));
            const arcEnd = this.center.add(this.arm2.normalize(this.radius));

            this.arcFill = new paper.Path.Arc(arcStart, arcMiddle, arcEnd);
            this.arcFill.add(this.center);
            this.arcFill.fillColor = this.node.attrs.color;

            this.arcStroke = new paper.Path.Arc(arcStart, arcMiddle, arcEnd);
            this.arcStroke.strokeColor = this.node.attrs.borderColor;
            this.arcStroke.style.strokeWidth = 3;
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
