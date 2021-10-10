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
            
            canHaveBorder: true,

            rectangle: null,
            upper: null,
            bottom: null,
            left: null,
            right: null,
            upperLeft: null,
            upperRight: null,
            bottomLeft: null,
            bottomRight: null,
            
            all: null,
            grips: null,

            movedShape: null,

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
                if (this.fillColor != color)
                    this.updateAttrs({ color });
                if (color == '#00000000')
                    color = '#00000001';
                this.rectangle.fillColor = new paper.Color(color);
                this.grips.fillColor = new paper.Color(color).multiply(0.7);
                this.grips.fillColor.alpha = 1;
            },
        },

        borderColor: {
            get() {
                return this.node.attrs.borderColor;
            },

            set(borderColor) {
                this.rectangle.strokeColor = new paper.Color(borderColor);
                this.rectangle.style.strokeWidth = this.rectangle.strokeColor.alpha > 0 ? 4 : 0;
                if (this.borderColor != borderColor)
                    this.updateAttrs({ borderColor });
            },
        },

        width: {
            get() {
                return this.rectangle.size.width;
            },

            set(value) {
                let newWidth = typeof value == "number" ? value : parseFloat(value);
                if (newWidth >= 3) {
                    this.rectangle.size.width = newWidth;
                    this.recalculateGripsPositions();
                    this.save();
                }
            },
        },

        height: {
            get() {
                return this.rectangle.size.height;
            },

            set(value) {
                let newHeight = typeof value == "number" ? value : parseFloat(value);
                if (newHeight >= 3) {
                    this.rectangle.size.height = newHeight;
                    this.recalculateGripsPositions();
                    this.save();
                }
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

            let center =  new paper.Point(attrs.center.x, attrs.center.y);
            let size = new paper.Size(attrs.size.width, attrs.size.height);
        
            this.rectangle = new paper.Shape.Rectangle(new paper.Rectangle(center.add(new paper.Point(-size.width / 2, -size.height / 2)), size));

            let grip = new paper.Path.Circle(new paper.Point(0, 0), 6);
            grip.style.strokeWidth = 0;
            this.upper = grip.clone();
            this.bottom = grip.clone();
            this.left = grip.clone();
            this.right = grip.clone();
            this.upperLeft = grip.clone();
            this.upperRight = grip.clone();
            this.bottomLeft = grip.clone();
            this.bottomRight = grip.clone();
            this.recalculateGripsPositions();
            grip.remove();

            this.grips = new paper.Group([this.upper, this.bottom, this.left, this.right, this.upperLeft, this.upperRight, this.bottomLeft, this.bottomRight]);
            this.all = new paper.Group([this.rectangle, this.grips]);
            this.grips.visible = this.isSelected;

            this.fillColor = attrs.color;
            this.borderColor = attrs.borderColor;
        },

        save() {
            this.updateAttrs({ 
                size: { width: this.rectangle.size.width, height: this.rectangle.size.height },
                center: { x: this.rectangle.position.x, y: this.rectangle.position.y } 
            });
        },

        handleResize(width, height) {
            this.paperScope.view.setViewSize(new paper.Size(width, height));
        },

        getPosition() {
            return this.rectangle.position;
        },

        move(shift) {
            this.rectangle.position.x += shift.x;
            this.rectangle.position.y += shift.y;
            this.grips.children.forEach(child => {
                child.position.x += shift.x;
                child.position.y += shift.y;
            })
            // this.all.translate(shift);
        },

        containedInBounds(bounds) {
            return this.rectangle.bounds.intersects(bounds);
        },

        getSnapPoints() {
            return [this.upperLeft.position, this.bottomRight.position];
        },

        onDelete() {
            this.all.remove();
        },

        onMouseMove(event, hitResult, cursorStyle) {
            if (!hitResult)
                return;
            else if (this.rectangle == hitResult.item)
                cursorStyle.cursor = "move";
            else if (this.upper == hitResult.item || this.bottom == hitResult.item)
                cursorStyle.cursor = "ns-resize";
            else if (this.left == hitResult.item || this.right == hitResult.item)
                cursorStyle.cursor = "ew-resize";
            else if (this.upperLeft == hitResult.item || this.bottomRight == hitResult.item)
                cursorStyle.cursor = "nwse-resize";
            else if (this.upperRight == hitResult.item || this.bottomLeft == hitResult.item)
                cursorStyle.cursor = "nesw-resize";
        },

        onMouseDown(event, hitResult) {
            if (!hitResult)
                return false;
            if (this.rectangle == hitResult.item) {
                this.movedShape = this.all;
                return true;
            }
            let result = this.grips.children.find(grip => grip == hitResult.item);
            if (result)
                this.movedShape = result;
            return !!result;
        },

        onMouseDrag(event, snapPoints) {
            if (!this.movedShape || this.movedShape == this.all)
                return false;

            let snapShift = event.modifiers.shift ? Shape.snapShift([event.point], snapPoints) : new paper.Point(0, 0);
            if (this.movedShape == this.upperLeft || this.movedShape == this.left || this.movedShape == this.bottomLeft) {
                if (event.point.x > this.right.position.x - 3)
                    this.left.position.x = this.right.position.x - 3;
                else
                    this.left.position.x = event.point.add(snapShift).x;
            }
            if (this.movedShape == this.upperRight || this.movedShape == this.right || this.movedShape == this.bottomRight) {
                if (event.point.x < this.left.position.x + 3)
                    this.right.position.x = this.left.position.x + 3;
                else
                    this.right.position.x = event.point.add(snapShift).x;
            }
            if (this.movedShape == this.upperLeft || this.movedShape == this.upper || this.movedShape == this.upperRight) {
                if (event.point.y > this.bottom.position.y - 3)
                    this.upper.position.y = this.bottom.position.y - 3;
                else
                    this.upper.position.y = event.point.add(snapShift).y;
            }
            if (this.movedShape == this.bottomLeft || this.movedShape == this.bottom || this.movedShape == this.bottomRight) {
                if (event.point.y < this.upper.position.y + 3)
                    this.bottom.position.y = this.upper.position.y + 3;
                else
                    this.bottom.position.y = event.point.add(snapShift).y;
            }
            
            this.rectangle.size.width = this.right.position.x - this.left.position.x;
            this.rectangle.size.height = this.bottom.position.y - this.upper.position.y;
            this.rectangle.position.x = (this.left.position.x + this.right.position.x) / 2;
            this.rectangle.position.y = (this.bottom.position.y + this.upper.position.y) / 2;
            this.recalculateGripsPositions();

            return true;
        },

        onMouseUp() {
            this.movedShape = null;
        },

        recalculateGripsPositions() {
            this.upper.position = this.rectangle.position.add(new paper.Point(0, -this.rectangle.size.height / 2));
            this.bottom.position =  this.rectangle.position.add(new paper.Point(0, this.rectangle.size.height / 2));
            this.left.position =  this.rectangle.position.add(new paper.Point(-this.rectangle.size.width / 2, 0));
            this.right.position =  this.rectangle.position.add(new paper.Point(this.rectangle.size.width / 2, 0));
            this.upperLeft.position =  this.rectangle.position.add(new paper.Point(-this.rectangle.size.width / 2, -this.rectangle.size.height / 2))
            this.upperRight.position =  this.rectangle.position.add(new paper.Point(this.rectangle.size.width / 2, -this.rectangle.size.height / 2));
            this.bottomLeft.position =  this.rectangle.position.add(new paper.Point(-this.rectangle.size.width / 2, this.rectangle.size.height / 2));
            this.bottomRight.position =  this.rectangle.position.add(new paper.Point(this.rectangle.size.width / 2, this.rectangle.size.height / 2));
        },
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
