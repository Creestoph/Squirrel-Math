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
                            szerokość <input class="with-highlight" type="number" v-model="width" />
                        </span>
                        <span v-if="selectedRectangle() || selectedCircle()">
                            wysokość <input class="with-highlight" type="number" v-model="height" />
                        </span>
                        <button
                            v-if="selectedLine() || selectedPolygon() || selectedTextArea()"
                            @mousedown="toggleEdit()"
                        >
                            {{ shapeEdited === -1 ? 'edytuj' : 'zatwierdź' }}
                        </button>
                        <span v-if="selectedPolygon()">
                            wierzchołki
                            <input class="with-highlight" type="number" v-model="sides" />
                        </span>
                        <span v-if="selectedArc()">
                            promień <input class="with-highlight" type="number" v-model.number="radius" />
                        </span>
                        <span v-if="selectedArc()">
                            kąt <input class="with-highlight" type="number" v-model.number="angle" />
                        </span>
                    </template>
                </div>
            </div>
            <div class="canvas-wrapper" ref="canvasWrapper">
                <canvas ref="eventsCatcher" resize="true"></canvas>
                <node-view-content
                    @mousedown="forwardClickEventToCanvas($event)"
                    class="shapes-container"
                    :style="{ width: canvas.width + 'px', height: canvas.height + 'px' }"
                />
                <canvas ref="overlayCanvas" class="overlay-canvas"></canvas>
            </div>
        </button>
    </node-view-wrapper>
</template>

<script setup lang="ts">
import paper from 'paper';
import { idGenerator, snapShift } from './Shape';
import ColorPicker from '../../ColorPicker.vue';

import { computed, onMounted, onUnmounted, ref } from 'vue';
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
import { ShapeController } from './Canvas';
import { Node as PMNode } from '@tiptap/pm/model';
import { LineShapeController } from './LineNode';
import { PolygonShapeController } from './PolygonNode';
import { TextAreaShapeController } from './TextAreaNode';
import { ArcShapeController } from './ArcNode';
import { CircleShapeController } from './CircleNode';
import { RectangleShapeController } from './RectangleNode';
import { ValueObject } from '@/models/common';

type ShapeWithBorder = ShapeController & { borderColor: ValueObject<string | null> };

const props = defineProps(nodeViewProps);

const selection = ref<number[]>([]);
const focused = ref(false);

let eventsCatcherPaperScope: paper.PaperScope = null!;
let overlayPaperScope: paper.PaperScope = null!;
let snapPoints: paper.Point[] = [];
let dragStartPoint: paper.Point | null = null;
let shapeDragged = -1;
let shapeDragStartPosition: paper.Point | null = null;
let shapeEdited = ref(-1);
let copiedNodes: PMNode[] | null = null;
let selectionBox: paper.Shape.Rectangle | null = null;
let selectionBoxAnchor: paper.Point | null = null;
let resizeObserver: ResizeObserver = null!;
let lastTextAreaClickEvent: MouseEvent | null = null;
const hitOptions = {
    segments: true,
    stroke: true,
    fill: true,
    tolerance: 5,
};
const eventsCatcher = ref<HTMLCanvasElement>(null!);
const overlayCanvas = ref<HTMLCanvasElement>(null!);
const canvasWrapper = ref<HTMLDivElement>(null!);
const geometryEditor = ref<HTMLElement>(null!);

const canvas = computed({
    get() {
        return props.node.attrs.canvas;
    },
    set(canvas) {
        props.updateAttributes({ canvas });
    },
});
const fillColor = computed({
    get() {
        const firstSelected = shapeAtIndex(selection.value[0])!;
        return selection.value
            .map((i) => shapeAtIndex(i)!)
            .every((shape) => shape.fillColor.value == firstSelected.fillColor.value)
            ? firstSelected.fillColor.value
            : null;
    },
    set(color) {
        selection.value.forEach((i) => (shapeAtIndex(i)!.fillColor.value = color as string));
    },
});
const borderColor = computed({
    get() {
        const firstSelected = shapeAtIndex(selection.value[0])! as ShapeWithBorder;
        return selection.value
            .map((i) => shapeAtIndex(i)!)
            .filter((shape) => canHaveBorder(shape))
            .every((shape) => shape.borderColor.value == firstSelected.borderColor.value)
            ? firstSelected.borderColor.value
            : null;
    },
    set(color) {
        selection.value
            .map((i) => shapeAtIndex(i)!)
            .filter((shape) => canHaveBorder(shape))
            .forEach((shape) => (shape.borderColor.value = color));
    },
});
const align = computed({
    get() {
        const firstSelected = shapeAtIndex(selection.value[0])! as TextAreaShapeController;
        return selection.value
            .map((i) => shapeAtIndex(i)!)
            .filter((shape) => isTextArea(shape))
            .every((shape) => shape.align.value == firstSelected.align.value)
            ? firstSelected.align.value
            : null;
    },
    set(align) {
        selection.value
            .map((i) => shapeAtIndex(i)!)
            .filter((shape) => isTextArea(shape))
            .forEach((shape) => (shape.align.value = align));
    },
});
const width = computed({
    get() {
        return (shapeAtIndex(selection.value[0]) as CircleShapeController | RectangleShapeController).width.value;
    },
    set(value) {
        (shapeAtIndex(selection.value[0]) as CircleShapeController | RectangleShapeController).width.value = value;
    },
});
const height = computed({
    get() {
        return (shapeAtIndex(selection.value[0]) as CircleShapeController | RectangleShapeController).height.value;
    },
    set(value) {
        (shapeAtIndex(selection.value[0]) as CircleShapeController | RectangleShapeController).height.value = value;
    },
});
const radius = computed({
    get() {
        return (shapeAtIndex(selection.value[0]) as ArcShapeController).radius.value;
    },
    set(value) {
        (shapeAtIndex(selection.value[0]) as ArcShapeController).radius.value = value;
    },
});
const angle = computed({
    get() {
        return (shapeAtIndex(selection.value[0]) as ArcShapeController).angle.value;
    },
    set(value) {
        (shapeAtIndex(selection.value[0]) as ArcShapeController).angle.value = value;
    },
});
const sides = computed({
    get() {
        return (shapeAtIndex(selection.value[0]) as PolygonShapeController).sides.value;
    },
    set(value) {
        const sides = Math.min(value, 100);
        if (sides >= 3) {
            (shapeAtIndex(selection.value[0])! as PolygonShapeController).makeRegular(sides);
        }
    },
});

onMounted(() => {
    eventsCatcherPaperScope = new paper.PaperScope();
    eventsCatcherPaperScope.setup(eventsCatcher.value);
    eventsCatcherPaperScope.tool = new paper.Tool();
    eventsCatcherPaperScope.tool.onMouseMove = handleMouseMove;
    eventsCatcherPaperScope.tool.onMouseDown = handleMouseDown;
    eventsCatcherPaperScope.tool.onMouseDrag = handleMouseDrag;
    eventsCatcherPaperScope.tool.onMouseUp = handleMouseUp;
    eventsCatcherPaperScope.tool.onKeyDown = handleKeyDown;
    eventsCatcher.value.addEventListener('wheel', handleScroll);

    overlayPaperScope = new paper.PaperScope();
    overlayPaperScope.setup(overlayCanvas.value);

    initializeFromAttributes();

    (resizeObserver = new ResizeObserver(handleResize)).observe(eventsCatcher.value);
});

onUnmounted(() => resizeObserver.disconnect());

function lastShape() {
    return shapeAtIndex(totalShapes() - 1)!;
}

function totalShapes() {
    return props.node.childCount;
}

function shapeAtIndex(i: number) {
    const id = props.node.child(i).attrs.id;
    return props.editor.storage.geometry.controllers.get(id);
}

function allShapes(): ShapeController[] {
    return props.node.children.map((c) => props.editor.storage.geometry.controllers.get(c.attrs.id)!);
}

function initializeFromAttributes() {
    if (canvas.value) {
        eventsCatcher.value.width = canvas.value.width;
        eventsCatcher.value.height = canvas.value.height;
        overlayCanvas.value.width = canvas.value.width;
        overlayCanvas.value.height = canvas.value.height;
        canvasWrapper.value.style.width = canvas.value.width + 'px';
        canvasWrapper.value.style.height = canvas.value.height + 'px';
    }
}

function handleResize() {
    const width = eventsCatcher.value.offsetWidth;
    const height = eventsCatcher.value.offsetHeight;
    eventsCatcherPaperScope.view.viewSize = new paper.Size(width, height);
    overlayPaperScope.view.viewSize = new paper.Size(width, height);
    allShapes().forEach((shape) => shape.handleResize(width, height));
    if (canvas.value.width !== width || canvas.value.height !== height) {
        canvas.value = { width, height };
    }
}

function handleMouseMove(event: paper.ToolEvent) {
    eventsCatcher.value.style.cursor = 'default';
    for (let i = 0; i < totalShapes(); i++) {
        if (shapeEdited.value == -1 || shapeEdited.value == i) {
            const shape = shapeAtIndex(i)!;
            const hitResult = shape.paperScope ? shape.paperScope.project.hitTest(event.point, hitOptions) : null;
            shape.onMouseMove(event, hitResult, eventsCatcher.value.style);
        }
    }
}

function handleMouseDown(event: paper.ToolEvent) {
    geometryEditor.value.focus();
    let clickedShape = -1;
    if (event.modifiers.control || event.modifiers.shift) {
        for (let i = 0; i < totalShapes(); i++) {
            if (shapeEdited.value == -1 || shapeEdited.value == i) {
                const shape = shapeAtIndex(i)!;
                const hitResult = shape.paperScope ? shape.paperScope.project.hitTest(event.point, hitOptions) : null;
                if (shape.onMouseDown(event, hitResult)) {
                    clickedShape = i;
                    if (!selection.value.includes(i)) {
                        select(i, shape);
                    }
                }
            }
        }
    } else {
        for (let i = totalShapes() - 1; i >= 0; i--) {
            if (shapeEdited.value == -1 || shapeEdited.value == i) {
                const shape = shapeAtIndex(i)!;
                const hitResult = shape.paperScope ? shape.paperScope.project.hitTest(event.point, hitOptions) : null;
                if (shape.onMouseDown(event, hitResult)) {
                    clickedShape = i;
                    break;
                }
            }
        }
        if (clickedShape === -1) {
            deselectAll();
        }
        if (clickedShape != -1 && !selection.value.some((shapeIndex) => shapeIndex == clickedShape)) {
            deselectAll();
            select(clickedShape);
        }
    }

    if (clickedShape != -1) {
        dragStartPoint = event.point;
        shapeDragStartPosition = shapeAtIndex(clickedShape)!.getPosition().clone();
        shapeDragged = clickedShape;
        selectionBox = null;
    } else {
        overlayPaperScope.activate();
        shapeDragged = -1;
        selectionBox = new paper.Shape.Rectangle(new paper.Rectangle(event.point, event.point));
        selectionBox.fillColor = new paper.Color(0, 0, 0, 0.4);
        selectionBox.strokeColor = new paper.Color(0, 0, 0, 0.6);
        selectionBox.style.strokeWidth = 1;
        selectionBoxAnchor = event.point;
    }
}

function handleMouseDrag(event: paper.ToolEvent) {
    let moveObjects = true;
    for (let i = 0; i < totalShapes(); i++) {
        if (shapeEdited.value == -1 || shapeEdited.value == i) {
            const shape = shapeAtIndex(i)!;
            if (shape.onMouseDrag(event, snapPoints)) {
                moveObjects = false;
            }
        }
    }
    if (moveObjects && shapeDragged != -1) {
        let deltaToCurrentPosition = event.point
            .subtract(dragStartPoint!)
            .add(shapeDragStartPosition!)
            .subtract(shapeAtIndex(shapeDragged)!.getPosition());
        if (event.modifiers.shift) {
            const futurePositions = selection.value.flatMap((i) =>
                shapeAtIndex(i)!
                    .getSnapPoints()
                    .map((p) => p.add(deltaToCurrentPosition)),
            );
            deltaToCurrentPosition = deltaToCurrentPosition.add(snapShift(futurePositions, snapPoints));
        }
        selection.value.forEach((i) => shapeAtIndex(i)!.move(deltaToCurrentPosition));
    } else if (selectionBox) {
        selectionBox.position = event.point.add(selectionBoxAnchor!).multiply(0.5);
        selectionBox.size = new paper.Size(
            Math.abs(event.point.x - selectionBoxAnchor!.x),
            Math.abs(event.point.y - selectionBoxAnchor!.y),
        );
    }
}

function handleMouseUp() {
    for (let i = 0; i < totalShapes(); i++) {
        if (shapeEdited.value == -1 || shapeEdited.value == i) {
            shapeAtIndex(i)!.onMouseUp();
        }
    }
    if (selectionBox) {
        for (let i = 0; i < totalShapes(); i++) {
            const shape = shapeAtIndex(i);
            if (shape!.containedInBounds(selectionBox.bounds)) {
                select(i, shape);
            }
        }
        selectionBox.remove();
        selectionBox = null;
    }
    // delay attrs update to avoid collisions with prosemirror selection update, which also happens on mouseup
    requestAnimationFrame(() => save());
}

function handleKeyDown(event: paper.KeyEvent) {
    if (event.key == 'control' || (event.key == 'z' && event.modifiers.control)) {
        return;
    }

    if (selection.value.length > 0) {
        const anyTextAreaSelected = selection.value.some((i) => isTextArea(shapeAtIndex(i)!));
        let catchedEvent = true;
        if (event.key == 'delete') {
            for (let i = totalShapes() - 1; i >= 0; i--) {
                if (selection.value.includes(i)) {
                    const shape = shapeAtIndex(i)!;
                    shape.onDelete();
                    deselect(i);
                    const elementBegin = shape.getPos()!;
                    const transaction = props.editor.view.state.tr.delete(
                        elementBegin,
                        elementBegin + shape.node.nodeSize,
                    );
                    transaction.setMeta('allowDelete', true); //see TextAreaNode.ts for usage
                    props.editor.view.dispatch(transaction);
                }
            }
            handleResize(); // some components might be re-rendered and need to have canvas size reassigned
        } else if (event.key == 'up' && !anyTextAreaSelected) {
            selection.value.forEach((i) => shapeAtIndex(i)!.move(new paper.Point(0, -1)));
        } else if (event.key == 'down' && !anyTextAreaSelected) {
            selection.value.forEach((i) => shapeAtIndex(i)!.move(new paper.Point(0, 1)));
        } else if (event.key == 'left' && !anyTextAreaSelected) {
            selection.value.forEach((i) => shapeAtIndex(i)!.move(new paper.Point(-1, 0)));
        } else if (event.key == 'right' && !anyTextAreaSelected) {
            selection.value.forEach((i) => shapeAtIndex(i)!.move(new paper.Point(1, 0)));
        } else if (event.key == 'escape') {
            onBlur();
        } else if (event.key == 'c' && event.modifiers.control) {
            copiedNodes = selection.value.map((i) => shapeAtIndex(i)!.node);
        } else {
            catchedEvent = false;
        }
        if (catchedEvent) {
            event.preventDefault();
        }
    }
    if (event.key == 'v' && event.modifiers.control && copiedNodes) {
        deselectAll();
        copiedNodes.forEach((shapeNode) => {
            const node = shapeNode.type.createAndFill(
                { ...shapeNode.attrs, id: idGenerator.next().value },
                shapeNode.content,
            )!;
            const transaction = props.editor.view.state.tr.insert(insertPosition(), node);
            props.editor.view.dispatch(transaction);

            const cloned = lastShape();
            cloned.move(new paper.Point(40, 40));
            select(totalShapes() - 1, cloned);
        });
        save();
        handleResize();
        event.preventDefault();
    } else if (event.key == 'a' && event.modifiers.control) {
        deselectAll();
        for (let i = 0; i < totalShapes(); i++) {
            select(i);
        }
        event.preventDefault();
    }
}

function handleScroll(event: WheelEvent) {
    if (!event.ctrlKey) {
        return;
    }

    const zoomFactor = Math.pow(1.1, -Math.sign(event.deltaY));

    if (selection.value.length > 0) {
        for (let i = totalShapes() - 1; i >= 0; i--) {
            if (selection.value.includes(i)) {
                shapeAtIndex(i)!.scale(zoomFactor, {
                    x: event.offsetX,
                    y: event.offsetY,
                });
                event.preventDefault();
            }
        }
    } else if (shapeEdited.value == -1) {
        for (let i = 0; i < totalShapes(); i++) {
            shapeAtIndex(i)!.scale(zoomFactor, {
                x: event.offsetX,
                y: event.offsetY,
            });
        }
        event.preventDefault();
    }
}

function insertPosition() {
    return props.getPos()! + props.node.nodeSize - 1;
}

function addShape(event: MouseEvent) {
    const added = lastShape();
    deselectAll();
    select(totalShapes() - 1, added);
    added.handleResize(canvas.value.width, canvas.value.height);
    if (event) {
        event.preventDefault();
    }
    return added;
}

function addSquare(event: MouseEvent) {
    props.editor.commands.createRectangle(
        {
            center: {
                x: canvas.value.width / 2,
                y: canvas.value.height / 2,
            },
        },
        insertPosition(),
    );
    addShape(event);
}

function addPolygon(event: MouseEvent) {
    props.editor.commands.createPolygon({}, insertPosition());
    const added = addShape(event) as PolygonShapeController;
    added.makeRegular(3, {
        x: canvas.value.width / 2,
        y: canvas.value.height / 2,
    });
}

function addCircle(event: MouseEvent) {
    props.editor.commands.createCircle(
        {
            center: {
                x: canvas.value.width / 2,
                y: canvas.value.height / 2,
            },
        },
        insertPosition(),
    );
    addShape(event);
}

function addLine(event: MouseEvent) {
    props.editor.commands.createLine({}, insertPosition());
    const added = addShape(event) as LineShapeController;
    added.editing.value = true;
    shapeEdited.value = totalShapes() - 1;
}

function addCurve(event: MouseEvent) {
    props.editor.commands.createLine({ smooth: true }, insertPosition());
    const added = addShape(event) as LineShapeController;
    added.editing.value = true;
    shapeEdited.value = totalShapes() - 1;
}

function addArc(event: MouseEvent) {
    props.editor.commands.createArc(
        {
            center: {
                x: canvas.value.width / 2 - 50,
                y: canvas.value.height / 2,
            },
            arms: [
                {
                    x: canvas.value.width / 2 + 50,
                    y: canvas.value.height / 2 - 50,
                },
                {
                    x: canvas.value.width / 2 + 50,
                    y: canvas.value.height / 2 + 50,
                },
            ],
        },
        insertPosition(),
    );
    addShape(event);
}

function addTextArea(event: MouseEvent) {
    props.editor.commands.createTextArea(
        {
            width: 160,
            height: 44,
            x: canvas.value.width / 2 - 80,
            y: canvas.value.height / 2 - 20,
        },
        insertPosition(),
    );

    addShape(event);
}

function canAnyHaveBorder(selection: number[]) {
    return selection.some((i) => canHaveBorder(shapeAtIndex(i)!));
}

function canAnyHaveText(selection: number[]) {
    return selection.some((i) => isTextArea(shapeAtIndex(i)!));
}

function toggleEdit() {
    const shape = shapeAtIndex(selection.value[0])! as
        | PolygonShapeController
        | LineShapeController
        | TextAreaShapeController;
    shape.editing.value = !shape.editing.value;
    shapeEdited.value = shape.editing.value ? selection.value[0] : -1;
}

function selectedRectangle() {
    return selection.value.length == 1 && isRectangle(shapeAtIndex(selection.value[0])!);
}

function selectedCircle() {
    return selection.value.length == 1 && isCircle(shapeAtIndex(selection.value[0])!);
}

function selectedPolygon() {
    return selection.value.length == 1 && isPolygon(shapeAtIndex(selection.value[0])!);
}

function selectedLine() {
    return selection.value.length == 1 && isLine(shapeAtIndex(selection.value[0])!);
}

function selectedArc() {
    return selection.value.length == 1 && isArc(shapeAtIndex(selection.value[0])!);
}

function selectedTextArea() {
    return selection.value.length == 1 && isTextArea(shapeAtIndex(selection.value[0])!);
}

function canHaveBorder(shape: ShapeController): shape is ShapeWithBorder {
    return isArc(shape) || isCircle(shape) || isPolygon(shape) || isRectangle(shape) || isTextArea(shape);
}

function isArc(shape: ShapeController) {
    return shape.node.type.name === 'arc';
}

function isCircle(shape: ShapeController) {
    return shape.node.type.name === 'circle';
}

function isRectangle(shape: ShapeController) {
    return shape.node.type.name === 'rectangle';
}

function isPolygon(shape: ShapeController) {
    return shape.node.type.name === 'polygon';
}

function isLine(shape: ShapeController) {
    return shape.node.type.name === 'line';
}

function isTextArea(shape: ShapeController): shape is TextAreaShapeController {
    return shape.node.type.name === 'textArea';
}

function select(index: number, shape = shapeAtIndex(index)!) {
    shape.setSelected(true);
    selection.value.push(index);
    recalculateSnapPoints();
}

function deselect(index: number, shape = shapeAtIndex(index)!) {
    shape.setSelected(false);
    selection.value.splice(
        selection.value.findIndex((s) => s == index),
        1,
    );
    recalculateSnapPoints();
    shapeEdited.value = -1;
}

function deselectAll() {
    allShapes().forEach((shape) => shape.setSelected(false));
    shapeEdited.value = -1;
    selection.value = [];
    snapPoints = [];
}

function recalculateSnapPoints() {
    snapPoints = Array(totalShapes())
        .fill(0)
        .map((_, i) => i)
        .filter((i) => !selection.value.includes(i))
        .flatMap((i) => shapeAtIndex(i)!.getSnapPoints());
}

function save() {
    allShapes().forEach((shape) => shape.save());
    handleResize();
}

function onBlur(event?: FocusEvent) {
    if (!event) {
        deselectAll();
    } else if (
        shapeEdited.value == -1 &&
        event.relatedTarget instanceof Node &&
        !geometryEditor.value.contains(event.relatedTarget) &&
        (!lastTextAreaClickEvent || event.timeStamp > lastTextAreaClickEvent.timeStamp + 10)
    ) {
        deselectAll();
        focused.value = false;
    }
    // delay attrs update to avoid collisions with prosemirror selection update
    requestAnimationFrame(() => save());
}

function forwardClickEventToCanvas(event: MouseEvent) {
    const copiedEvent = new MouseEvent('mousedown', {
        clientX: event.pageX,
        clientY: event.pageY,
    });
    eventsCatcher.value.dispatchEvent(copiedEvent);
    lastTextAreaClickEvent = event;
}
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

    .shapes-container {
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
        pointer-events: none;
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
    user-select: none;
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
