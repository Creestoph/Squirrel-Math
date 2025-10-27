<template>
    <node-view-wrapper>
        <button ref="geometryEditor" class="geometry-editor" @focus="focused = true" @blur="onBlur($event)">
            <div v-if="focused" class="geometry-toolbar-wrapper">
                <div class="geometry-toolbar">
                    <button @mousedown="addSquare($event)">
                        <icon>crop_square</icon>
                    </button>
                    <button @mousedown="addPolygon($event)">
                        <icon>pentagon</icon>
                    </button>
                    <button @mousedown="addCircle($event)">
                        <icon>circle</icon>
                    </button>
                    <button @mousedown="addLine($event)">
                        <icon>show_chart</icon>
                    </button>
                    <button @mousedown="addCurve($event)">
                        <icon>gesture</icon>
                    </button>
                    <button @mousedown="addArc($event)">
                        <icon>compass</icon>
                    </button>
                    <button @mousedown="addTextArea($event)">
                        <span class="T-icon">T</span>
                    </button>
                    <template v-if="selection.length">
                        <color-picker
                            :color="fillColor"
                            @mousedown.native="$event.preventDefault()"
                            @selected="fillColor = $event"
                        >
                            wypełnienie
                        </color-picker>
                        <color-picker
                            v-if="canAnyHaveBorder(selection)"
                            :color="borderColor"
                            @mousedown.native="$event.preventDefault()"
                            @selected="borderColor = $event"
                        >
                            krawędź
                        </color-picker>
                        <color-picker
                            v-if="canAnyHaveText(selection)"
                            :color="textColor"
                            @mousedown.native="$event.preventDefault()"
                            @selected="textColor = $event"
                        >
                            tekst
                        </color-picker>
                        <button
                            v-if="canAnyHaveText(selection)"
                            @mousedown="align = 'top'"
                            :class="{ active: align == 'top' }"
                        >
                            <icon>align_top</icon>
                        </button>
                        <button
                            v-if="canAnyHaveText(selection)"
                            @mousedown="align = 'middle'"
                            :class="{ active: align == 'middle' }"
                        >
                            <icon>align_vertically</icon>
                        </button>
                        <button
                            v-if="canAnyHaveText(selection)"
                            @mousedown="align = 'bottom'"
                            :class="{ active: align == 'bottom' }"
                        >
                            <icon>align_bottom</icon>
                        </button>
                        <span v-if="selectedRectangle() || selectedCircle()">
                            szerokość <input type="number" v-model="shapeAtIndex(selection[0]).width" />
                        </span>
                        <span v-if="selectedRectangle() || selectedCircle()">
                            wysokość <input type="number" v-model="shapeAtIndex(selection[0]).height" />
                        </span>
                        <button v-if="canBeEdited()" @mousedown="toggleEdit()">
                            {{ shapeAtIndex(selection[0]).editing ? 'zatwierdź' : 'edytuj' }}
                        </button>
                        <span v-if="selectedPolygon()">
                            wierzchołki
                            <input
                                type="number"
                                :value="shapeAtIndex(selection[0]).sides"
                                @keyup="createRegular($event)"
                            />
                        </span>
                        <span v-if="selectedArc()">
                            promień <input type="number" v-model.number="shapeAtIndex(selection[0]).radius.value" />
                        </span>
                        <span v-if="selectedArc()">
                            kąt <input type="number" v-model.number="shapeAtIndex(selection[0]).angle.value" />
                        </span>
                    </template>
                </div>
            </div>
            <div class="canvas-wrapper" ref="canvasWrapper">
                <canvas ref="eventsCatcher" resize="true"></canvas>
                <div @mousedown="forwardClickEventToCanvas($event)">
                    <node-view-content />
                </div>
                <canvas ref="overlayCanvas" class="overlay-canvas"></canvas>
            </div>
        </button>
    </node-view-wrapper>
</template>

<script>
import paper from 'paper';
import { idGenerator, Shape } from './Shape';
import ColorPicker from '../../ColorPicker.vue';

let copiedNodes = null;

import Vue from 'vue';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/vue-2';

export default Vue.extend({
    components: {
        NodeViewWrapper,
        NodeViewContent,
        ColorPicker,
    },
    props: ['node', 'view', 'getPos'],

    data() {
        return {
            eventsCatcherPaperScope: null,
            overlayPaperScope: null,
            selection: [],
            snapPoints: [],
            dragStartPoint: null,
            shapeDragged: -1,
            shapeDragStartPosition: null,
            shapeEdited: -1,
            selectionBox: null,
            selectionBoxAnchor: null,
            focused: false,
            resizeObserver: null,
            lastTextAreaClickEvent: null,
            hitOptions: {
                segments: true,
                stroke: true,
                fill: true,
                tolerance: 5,
            },
        };
    },

    computed: {
        canvas: {
            get() {
                return this.node.attrs.canvas;
            },
            set(canvas) {
                this.updateAttributes({ canvas });
            },
        },
        fillColor: {
            get() {
                const firstSelected = this.shapeAtIndex(this.selection[0]);
                return this.selection
                    .map((i) => this.shapeAtIndex(i))
                    .every((shape) => shape.fillColor.value == firstSelected.fillColor.value)
                    ? firstSelected.fillColor.value
                    : false;
            },
            set(color) {
                this.selection.forEach((i) => (this.shapeAtIndex(i).fillColor.value = color));
            },
        },
        borderColor: {
            get() {
                const firstSelected = this.shapeAtIndex(this.selection[0]);
                return this.selection
                    .map((i) => this.shapeAtIndex(i))
                    .filter((shape) => shape.canHaveBorder)
                    .every((shape) => shape.borderColor.value == firstSelected.borderColor.value)
                    ? firstSelected.borderColor.value
                    : false;
            },
            set(color) {
                this.selection
                    .map((i) => this.shapeAtIndex(i))
                    .filter((shape) => shape.canHaveBorder)
                    .forEach((shape) => (shape.borderColor.value = color));
            },
        },
        textColor: {
            get() {
                const firstSelected = this.shapeAtIndex(this.selection[0]);
                return this.selection
                    .map((i) => this.shapeAtIndex(i))
                    .filter((shape) => shape.node.type.name === 'textArea')
                    .every((shape) => shape.textColor == firstSelected.textColor)
                    ? firstSelected.textColor
                    : false;
            },
            set(color) {
                this.selection
                    .map((i) => this.shapeAtIndex(i))
                    .filter((shape) => this.isTextArea(shape))
                    .forEach((shape) => (shape.textColor = color));
            },
        },
        align: {
            get() {
                const firstSelected = this.shapeAtIndex(this.selection[0]);
                return this.selection
                    .map((i) => this.shapeAtIndex(i))
                    .filter((shape) => this.isTextArea(shape))
                    .every((shape) => shape.align == firstSelected.align)
                    ? firstSelected.align
                    : false;
            },
            set(align) {
                this.selection
                    .map((i) => this.shapeAtIndex(i))
                    .filter((shape) => this.isTextArea(shape))
                    .forEach((shape) => (shape.align = align));
            },
        },
    },

    mounted() {
        this.eventsCatcherPaperScope = new paper.PaperScope();
        this.eventsCatcherPaperScope.setup(this.$refs.eventsCatcher);
        this.eventsCatcherPaperScope.tool = new paper.Tool();
        this.eventsCatcherPaperScope.tool.onMouseMove = this.handleMouseMove;
        this.eventsCatcherPaperScope.tool.onMouseDown = this.handleMouseDown;
        this.eventsCatcherPaperScope.tool.onMouseDrag = this.handleMouseDrag;
        this.eventsCatcherPaperScope.tool.onMouseUp = this.handleMouseUp;
        this.eventsCatcherPaperScope.tool.onKeyDown = this.handleKeyDown;
        this.$refs.eventsCatcher.addEventListener('wheel', this.handleScroll);

        this.overlayPaperScope = new paper.PaperScope();
        this.overlayPaperScope.setup(this.$refs.overlayCanvas);

        this.initializeFromAttributes();

        (this.resizeObserver = new ResizeObserver(this.handleResize)).observe(this.$refs.eventsCatcher);
    },

    destroyed() {
        this.resizeObserver.disconnect();
    },

    methods: {
        lastShape() {
            return this.shapeAtIndex(this.totalShapes() - 1);
        },

        totalShapes() {
            return this.node.childCount;
        },

        shapeAtIndex(i) {
            const id = this.node.child(i).attrs.id;
            return this.editor.storage.geometry.controllers.get(id);
        },

        initializeFromAttributes() {
            if (this.canvas) {
                this.$refs.eventsCatcher.width = this.canvas.width;
                this.$refs.eventsCatcher.height = this.canvas.height;
                this.$refs.overlayCanvas.width = this.canvas.width;
                this.$refs.overlayCanvas.height = this.canvas.height;
                this.$refs.canvasWrapper.style.width = this.canvas.width + 'px';
                this.$refs.canvasWrapper.style.height = this.canvas.height + 'px';
            }
        },

        handleResize() {
            const width = this.$refs.eventsCatcher.offsetWidth;
            const height = this.$refs.eventsCatcher.offsetHeight;
            this.eventsCatcherPaperScope.view.setViewSize(new paper.Size(width, height));
            this.overlayPaperScope.view.setViewSize(new paper.Size(width, height));
            for (let i = 0; i < this.totalShapes(); i++) {
                this.shapeAtIndex(i).handleResize(width, height);
            }
            if (this.canvas.width !== width || this.canvas.height !== height) {
                this.canvas = { width, height };
            }
        },

        handleMouseMove(event) {
            this.$refs.eventsCatcher.style.cursor = 'default';
            for (let i = 0; i < this.totalShapes(); i++) {
                if (this.shapeEdited == -1 || this.shapeEdited == i) {
                    const shape = this.shapeAtIndex(i);
                    const hitResult = shape.paperScope
                        ? shape.paperScope.project.hitTest(event.point, this.hitOptions)
                        : null;
                    shape.onMouseMove(event, hitResult, this.$refs.eventsCatcher.style);
                }
            }
        },

        handleMouseDown(event) {
            this.$refs.geometryEditor.focus();
            let clickedShape = -1;
            if (event.modifiers.control || event.modifiers.shift) {
                for (let i = 0; i < this.totalShapes(); i++) {
                    if (this.shapeEdited == -1 || this.shapeEdited == i) {
                        const shape = this.shapeAtIndex(i);
                        const hitResult = shape.paperScope
                            ? shape.paperScope.project.hitTest(event.point, this.hitOptions)
                            : null;
                        if (shape.onMouseDown(event, hitResult)) {
                            clickedShape = i;
                            if (!this.selection.includes(i)) {
                                this.select(i, shape);
                            }
                        }
                    }
                }
            } else {
                for (let i = this.totalShapes() - 1; i >= 0; i--) {
                    if (this.shapeEdited == -1 || this.shapeEdited == i) {
                        const shape = this.shapeAtIndex(i);
                        const hitResult = shape.paperScope
                            ? shape.paperScope.project.hitTest(event.point, this.hitOptions)
                            : null;
                        if (shape.onMouseDown(event, hitResult)) {
                            clickedShape = i;
                            break;
                        }
                    }
                }
                if (clickedShape === -1) {
                    this.deselectAll();
                }
                if (clickedShape != -1 && !this.selection.some((shapeIndex) => shapeIndex == clickedShape)) {
                    this.deselectAll();
                    this.select(clickedShape);
                }
            }

            if (clickedShape != -1) {
                this.dragStartPoint = event.point;
                this.shapeDragStartPosition = this.shapeAtIndex(clickedShape).getPosition().clone();
                this.shapeDragged = clickedShape;
                this.selectionBox = null;
            } else {
                this.overlayPaperScope.activate();
                this.shapeDragged = -1;
                this.selectionBox = new paper.Shape.Rectangle(new paper.Rectangle(event.point, event.point));
                this.selectionBox.fillColor = new paper.Color(0, 0, 0, 0.4);
                this.selectionBox.strokeColor = new paper.Color(0, 0, 0, 0.6);
                this.selectionBox.style.strokeWidth = 1;
                this.selectionBoxAnchor = event.point;
            }
        },

        handleMouseDrag(event) {
            let moveObjects = true;
            for (let i = 0; i < this.totalShapes(); i++) {
                if (this.shapeEdited == -1 || this.shapeEdited == i) {
                    const shape = this.shapeAtIndex(i);
                    if (shape.onMouseDrag(event, this.snapPoints)) {
                        moveObjects = false;
                    }
                }
            }
            if (moveObjects && this.shapeDragged != -1) {
                let deltaToCurrentPosition = event.point
                    .subtract(this.dragStartPoint)
                    .add(this.shapeDragStartPosition)
                    .subtract(this.shapeAtIndex(this.shapeDragged).getPosition());
                if (event.modifiers.shift) {
                    let futurePositions = this.selection.flatMap((i) =>
                        this.shapeAtIndex(i)
                            .getSnapPoints()
                            .map((p) => p.add(deltaToCurrentPosition)),
                    );
                    let snapShift = Shape.snapShift(futurePositions, this.snapPoints);
                    deltaToCurrentPosition = deltaToCurrentPosition.add(snapShift);
                }
                this.selection.forEach((i) => this.shapeAtIndex(i).move(deltaToCurrentPosition));
            } else if (this.selectionBox) {
                this.selectionBox.position = event.point.add(this.selectionBoxAnchor).multiply(0.5);
                this.selectionBox.size = new paper.Size(
                    Math.abs(event.point.x - this.selectionBoxAnchor.x),
                    Math.abs(event.point.y - this.selectionBoxAnchor.y),
                );
            }
        },

        handleMouseUp() {
            for (let i = 0; i < this.totalShapes(); i++) {
                if (this.shapeEdited == -1 || this.shapeEdited == i) {
                    this.shapeAtIndex(i).onMouseUp();
                }
            }
            if (this.selectionBox) {
                for (let i = 0; i < this.totalShapes(); i++) {
                    const shape = this.shapeAtIndex(i);
                    if (shape.containedInBounds(this.selectionBox.bounds)) {
                        this.select(i, shape);
                    }
                }
                this.selectionBox.remove();
                this.selectionBox = null;
            }
            // delay attrs update to avoid collisions with prosemirror selection update, which also happens on mouseup
            requestAnimationFrame(() => this.save());
        },

        handleKeyDown(event) {
            if (event.key == 'control' || (event.key == 'z' && event.modifiers.control)) {
                return;
            }

            if (this.selection.length > 0) {
                const anyTextAreaSelected = this.selection.some((i) => this.isTextArea(this.shapeAtIndex(i)));
                let catchedEvent = true;
                if (event.key == 'delete') {
                    for (let i = this.totalShapes() - 1; i >= 0; i--) {
                        if (this.selection.includes(i)) {
                            const shape = this.shapeAtIndex(i);
                            if (!shape.onDelete()) {
                                this.deselect(i);
                                const elementBegin = shape.getPos();
                                const transaction = this.view.state.tr.delete(
                                    elementBegin,
                                    elementBegin + shape.node.nodeSize,
                                );
                                transaction.setMeta('allowDelete', true); //see TextAreaNode.ts for usage
                                this.view.dispatch(transaction);
                            }
                        }
                    }
                    this.handleResize(); // some components might be re-rendered and need to have canvas size reassigned
                } else if (event.key == 'up' && !anyTextAreaSelected) {
                    this.selection.forEach((i) => this.shapeAtIndex(i).move(new paper.Point(0, -1)));
                } else if (event.key == 'down' && !anyTextAreaSelected) {
                    this.selection.forEach((i) => this.shapeAtIndex(i).move(new paper.Point(0, 1)));
                } else if (event.key == 'left' && !anyTextAreaSelected) {
                    this.selection.forEach((i) => this.shapeAtIndex(i).move(new paper.Point(-1, 0)));
                } else if (event.key == 'right' && !anyTextAreaSelected) {
                    this.selection.forEach((i) => this.shapeAtIndex(i).move(new paper.Point(1, 0)));
                } else if (event.key == 'escape') {
                    this.onBlur();
                } else if (event.key == 'c' && event.modifiers.control) {
                    copiedNodes = this.selection.map((i) => this.shapeAtIndex(i).node);
                } else {
                    catchedEvent = false;
                }
                if (catchedEvent) {
                    event.preventDefault();
                }
            }
            if (event.key == 'v' && event.modifiers.control && copiedNodes) {
                this.deselectAll();
                copiedNodes.forEach((shapeNode) => {
                    const node = shapeNode.type.createAndFill(
                        { ...shapeNode.attrs, id: idGenerator.next().value },
                        shapeNode.content,
                    );
                    const transaction = this.view.state.tr.insert(this.insertPosition(), node);
                    this.view.dispatch(transaction);

                    const cloned = this.lastShape();
                    cloned.move(new paper.Point(40, 40));
                    this.select(this.totalShapes() - 1, cloned);
                });
                this.save();
                this.handleResize();
                event.preventDefault();
            } else if (event.key == 'a' && event.modifiers.control) {
                this.deselectAll();
                for (let i = 0; i < this.totalShapes(); i++) {
                    this.select(i);
                }
                event.preventDefault();
            }
        },

        handleScroll(event) {
            if (!event.ctrlKey) {
                return;
            }

            const zoomFactor = Math.pow(1.1, -Math.sign(event.deltaY));

            if (this.selection.length > 0) {
                for (let i = this.totalShapes() - 1; i >= 0; i--) {
                    if (this.selection.includes(i)) {
                        this.shapeAtIndex(i).scale(zoomFactor, {
                            x: event.offsetX,
                            y: event.offsetY,
                        });
                        event.preventDefault();
                    }
                }
            } else if (this.shapeEdited == -1) {
                for (let i = 0; i < this.totalShapes(); i++) {
                    this.shapeAtIndex(i).scale(zoomFactor, {
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                    event.preventDefault();
                }
            }
        },

        insertPosition() {
            return this.getPos() + this.node.nodeSize - 1;
        },

        addShape(command, attrs, event) {
            this.editor.commands[command](attrs, this.insertPosition());
            const added = this.lastShape();
            this.deselectAll();
            this.select(this.totalShapes() - 1, added);
            added.handleResize(this.canvas.width, this.canvas.height);
            if (event) {
                event.preventDefault();
            }
            return added;
        },

        addSquare(event) {
            this.addShape(
                'createRectangle',
                {
                    center: {
                        x: this.canvas.width / 2,
                        y: this.canvas.height / 2,
                    },
                },
                event,
            );
        },

        addPolygon(event) {
            const added = this.addShape('createPolygon', {}, event);
            added.makeRegular(3, {
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
            });
        },

        addCircle(event) {
            this.addShape(
                'createCircle',
                {
                    center: {
                        x: this.canvas.width / 2,
                        y: this.canvas.height / 2,
                    },
                },
                event,
            );
        },

        addLine(event) {
            const added = this.addShape('createLine', {}, event);
            added.editing = true;
            this.shapeEdited = this.totalShapes() - 1;
        },

        addCurve(event) {
            const added = this.addShape('createLine', { smooth: true }, event);
            added.editing = true;
            this.shapeEdited = this.totalShapes() - 1;
        },

        addArc(event) {
            this.addShape(
                'createArc',
                {
                    center: {
                        x: this.canvas.width / 2 - 50,
                        y: this.canvas.height / 2,
                    },
                    arms: [
                        {
                            x: this.canvas.width / 2 + 50,
                            y: this.canvas.height / 2 - 50,
                        },
                        {
                            x: this.canvas.width / 2 + 50,
                            y: this.canvas.height / 2 + 50,
                        },
                    ],
                },
                event,
            );
        },

        addTextArea(event) {
            this.addShape(
                'createTextArea',
                {
                    width: 160,
                    height: 44,
                    x: this.canvas.width / 2 - 80,
                    y: this.canvas.height / 2 - 20,
                },
                event,
            );
        },

        canAnyHaveBorder(selection) {
            return selection.some((i) => this.shapeAtIndex(i).canHaveBorder);
        },

        canAnyHaveText(selection) {
            return selection.some((i) => this.isTextArea(this.shapeAtIndex(i)));
        },

        toggleEdit() {
            const shape = this.shapeAtIndex(this.selection[0]);
            shape.editing = !shape.editing;
            this.shapeEdited = shape.editing ? this.selection[0] : -1;
        },

        canBeEdited() {
            return this.selection.length == 1 && this.shapeAtIndex(this.selection[0]).editable;
        },

        selectedRectangle() {
            return this.selection.length == 1 && this.shapeAtIndex(this.selection[0]).node.type.name === 'rectangle';
        },

        selectedCircle() {
            return this.selection.length == 1 && this.shapeAtIndex(this.selection[0]).node.type.name === 'circle';
        },

        selectedPolygon() {
            return this.selection.length == 1 && this.shapeAtIndex(this.selection[0]).node.type.name === 'polygon';
        },

        selectedArc() {
            return this.selection.length == 1 && this.shapeAtIndex(this.selection[0]).node.type.name === 'arc';
        },

        createRegular(event) {
            const sides = Math.min(event.srcElement.value, 100);
            if (sides >= 3) {
                this.shapeAtIndex(this.selection[0]).makeRegular(sides);
            }
        },

        isTextArea(shape) {
            return shape.node.type.name === 'textArea';
        },

        select(index, shape = this.shapeAtIndex(index)) {
            shape.setSelected(true);
            this.selection.push(index);
            this.recalculateSnapPoints();
        },

        deselect(index, shape = this.shapeAtIndex(index)) {
            shape.setSelected(false);
            this.selection.splice(
                this.selection.findIndex((s) => s == index),
                1,
            );
            this.recalculateSnapPoints();
            this.shapeEdited = -1;
        },

        deselectAll() {
            for (let i = 0; i < this.totalShapes(); i++) {
                this.shapeAtIndex(i).setSelected(false);
            }
            this.shapeEdited = -1;
            this.selection = [];
            this.snapPoints = [];
        },

        recalculateSnapPoints() {
            this.snapPoints = Array(this.totalShapes())
                .fill(0)
                .map((_, i) => i)
                .filter((i) => !this.selection.includes(i))
                .flatMap((i) => this.shapeAtIndex(i).getSnapPoints());
        },

        save() {
            // this.canvas = {
            //     width: this.$refs.eventsCatcher.offsetWidth,
            //     height: this.$refs.eventsCatcher.offsetHeight,
            // };
            for (let i = 0; i < this.totalShapes(); i++) {
                this.shapeAtIndex(i).save();
            }
            this.handleResize();
        },

        onBlur(event) {
            if (!event) {
                this.deselectAll();
            } else if (
                event.relatedTarget &&
                !this.$refs.geometryEditor.contains(event.relatedTarget) &&
                (!this.lastTextAreaClickEvent || event.timeStamp > this.lastTextAreaClickEvent.timeStamp + 10)
            ) {
                this.deselectAll();
                this.focused = false;
            }
            // delay attrs update to avoid collisions with prosemirror selection update
            requestAnimationFrame(() => this.save());
        },

        forwardClickEventToCanvas(event) {
            const copiedEvent = new Event('mousedown');
            copiedEvent.pageX = event.pageX;
            copiedEvent.pageY = event.pageY;
            this.$refs.eventsCatcher.dispatchEvent(copiedEvent);
            this.lastTextAreaClickEvent = event;
        },
    },
});
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/colors';

.geometry-editor {
    display: block;
    margin: 0 auto;
    padding: 0;
    background: none;
    position: relative;
    cursor: initial;
}

.canvas-wrapper {
    border: 2px colors.$gray dashed;
    resize: both;
    overflow: hidden;

    > canvas {
        width: 100%;
        height: 100%;

        &.overlay-canvas {
            pointer-events: none;
            position: absolute;
            top: 0;
            left: 0;
        }
    }

    > div {
        position: absolute;
        top: 0;
        // width: 100%;
        // height: 100%;
        // overflow: hidden;
    }
}

.canvas-wrapper:hover {
    border: 2px colors.$darker-gray dashed;
}

.canvas-wrapper:focus {
    border: 2px black dashed;
}

.geometry-toolbar-wrapper {
    width: 100%;
    height: 0;
    position: absolute;
    z-index: 1;
}

.geometry-toolbar {
    background: colors.$light-gray;
    transform: translateY(-100%);
    &::after {
        //clearfix
        content: '';
        clear: both;
        display: table;
    }

    > * {
        padding: 0 10px;
        height: 47px;
        width: max-content;
        line-height: 47px;
        float: left;
        display: flex;
        align-items: center;

        &:hover {
            background: colors.$gray;
        }

        &.active {
            background: colors.$dark-gray;
        }

        &.active:hover {
            background: colors.$dark-gray;
            outline: 1px solid colors.$darker-gray;
            outline-offset: -1px;
        }
    }
}

.color-picker-wrapper {
    > div {
        float: left;
        display: flex;
        align-items: center;
        height: 47px;
        line-height: 47px;
    }
}
.color-picker {
    width: 20px;
    height: 20px;
    border: 2px solid black;
    background: yellow;
    margin-left: 5px;
}
input[type='checkbox'] {
    width: 15px;
}
input[type='number'] {
    width: 50px;
}
.T-icon {
    font-style: italic;
    font-weight: bold;
    font-family: 'Times New Roman', Times, serif;
}
</style>
