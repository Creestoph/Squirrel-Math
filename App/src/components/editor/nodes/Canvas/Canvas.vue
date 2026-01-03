<template>
    <node-view-wrapper>
        <button
            ref="geometryEditor"
            class="geometry-editor"
            @focus="focused = true"
            @blur="onBlur($event)"
            contenteditable="false"
        >
            <div v-if="focused" class="geometry-toolbar-wrapper">
                <div class="geometry-toolbar" contenteditable="false">
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
                        <dropdown title="kolejność rysowania" class="layers-dropdown">
                            <template v-slot:placeholder><icon>layers</icon></template>
                            <dropdown-option @click="onMoveToBottom">przenieś na spód</dropdown-option>
                            <dropdown-option @click="onMoveDown">przenieś w dół</dropdown-option>
                            <dropdown-option @click="onMoveUp">przenieś w górę</dropdown-option>
                            <dropdown-option @click="onMoveToTop">przenieś na wierzch</dropdown-option>
                        </dropdown>
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
                        <span class="input-button" v-if="selectedRectangle() || selectedCircle()">
                            <span @mousedown="(widthInput.focus(), $event.preventDefault())">szerokość</span>
                            <input type="number" ref="widthInput" v-model="width" />
                        </span>
                        <span class="input-button" v-if="selectedRectangle() || selectedCircle()">
                            <span @mousedown="(heightInput.focus(), $event.preventDefault())">wysokość</span>
                            <input type="number" ref="heightInput" v-model="height" />
                        </span>
                        <button
                            v-if="selectedLine() || selectedPolygon() || selectedTextArea()"
                            @mousedown="toggleEdit()"
                        >
                            {{ shapeEdited === -1 ? 'edytuj' : 'zatwierdź' }}
                        </button>
                        <span class="input-button" v-if="selectedPolygon()">
                            <span @mousedown="(sidesInput.focus(), $event.preventDefault())">wierzchołki</span>
                            <input type="number" ref="sidesInput" v-model="sides" />
                        </span>
                        <span class="input-button" v-if="selectedArc()">
                            <span @mousedown="(radiusInput.focus(), $event.preventDefault())">promień</span>
                            <input type="number" ref="radiusInput" v-model.number="radius" />
                        </span>
                        <span class="input-button" v-if="selectedArc()">
                            <span @mousedown="(arcInput.focus(), $event.preventDefault())">kąt</span>
                            <input type="number" ref="arcInput" v-model.number="angle" />
                        </span>
                    </template>
                </div>
            </div>
            <div class="canvas-wrapper" ref="canvasWrapper">
                <canvas ref="eventsCatcher" resize="true"></canvas>
                <node-view-content
                    contenteditable="true"
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
import { idGenerator, Snapper } from './utils';
import ColorPicker from '../../ColorPicker.vue';
import Dropdown from '../../Dropdown.vue';
import DropdownOption from '../../DropdownOption.vue';

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

let eventsCatcherPaperScope: paper.PaperScope = null!;
let overlayPaperScope: paper.PaperScope = null!;
let dragStartPoint: paper.Point | null = null;
let shapeDragged = -1;
let shapeDragStartPosition: paper.Point | null = null;
let copiedNodes: PMNode[] | null = null;
let selectionBox: paper.Shape.Rectangle | null = null;
let selectionBoxAnchor: paper.Point | null = null;
let resizeObserver: ResizeObserver = null!;
let lastTextAreaClickEvent: MouseEvent | null = null;
let snapper: Snapper = null!;
let saveTimeout: number | null = null;
const hitOptions = {
    segments: true,
    stroke: true,
    fill: true,
    tolerance: 5,
};
const selection = ref<number[]>([]);
const focused = ref(false);
const shapeEdited = ref(-1);
const eventsCatcher = ref<HTMLCanvasElement>(null!);
const overlayCanvas = ref<HTMLCanvasElement>(null!);
const canvasWrapper = ref<HTMLDivElement>(null!);
const geometryEditor = ref<HTMLElement>(null!);
const widthInput = ref<HTMLInputElement>(null!);
const heightInput = ref<HTMLInputElement>(null!);
const sidesInput = ref<HTMLInputElement>(null!);
const arcInput = ref<HTMLInputElement>(null!);
const radiusInput = ref<HTMLInputElement>(null!);

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
        const shapes = selection.value.map((i) => shapeAtIndex(i)!);
        return shapes.every((shape) => shape.fillColor.value == shapes[0].fillColor.value)
            ? shapes[0].fillColor.value
            : null;
    },
    set(color) {
        selection.value.forEach((i) => (shapeAtIndex(i)!.fillColor.value = color as string));
    },
});
const borderColor = computed({
    get() {
        const shapesWithBorder = selection.value.map((i) => shapeAtIndex(i)!).filter((shape) => canHaveBorder(shape));
        return shapesWithBorder.every((shape) => shape.borderColor.value == shapesWithBorder[0].borderColor.value)
            ? shapesWithBorder[0].borderColor.value
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
        const textAreas = selection.value.map((i) => shapeAtIndex(i)!).filter((shape) => isTextArea(shape));
        return textAreas.every((shape) => shape.align.value === textAreas[0].align.value)
            ? textAreas[0].align.value
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
        return Math.round(
            (shapeAtIndex(selection.value[0]) as CircleShapeController | RectangleShapeController).width.value,
        );
    },
    set(value) {
        (shapeAtIndex(selection.value[0]) as CircleShapeController | RectangleShapeController).width.value = value;
    },
});
const height = computed({
    get() {
        return Math.round(
            (shapeAtIndex(selection.value[0]) as CircleShapeController | RectangleShapeController).height.value,
        );
    },
    set(value) {
        (shapeAtIndex(selection.value[0]) as CircleShapeController | RectangleShapeController).height.value = value;
    },
});
const radius = computed({
    get() {
        return Math.round((shapeAtIndex(selection.value[0]) as ArcShapeController).radius.value);
    },
    set(value) {
        (shapeAtIndex(selection.value[0]) as ArcShapeController).radius.value = value;
    },
});
const angle = computed({
    get() {
        return Math.round((shapeAtIndex(selection.value[0]) as ArcShapeController).angle.value);
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
    eventsCatcherPaperScope.tool.onKeyUp = handleKeyUp;
    eventsCatcher.value.addEventListener('wheel', handleScroll);

    overlayPaperScope = new paper.PaperScope();
    overlayPaperScope.setup(overlayCanvas.value);
    snapper = new Snapper(overlayPaperScope);

    initializeFromAttributes();

    (resizeObserver = new ResizeObserver(handleResize)).observe(eventsCatcher.value);

    props.editor.on('textAreaDelete' as any, () => deleteSelected(true));
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
    const isLeftButtonPressed = (event as any).event.buttons & 1;
    if (!isLeftButtonPressed) {
        return;
    }

    geometryEditor.value.focus();
    let clickedShape = -1;
    for (let i = totalShapes() - 1; i >= 0; i--) {
        if (shapeEdited.value == -1 || shapeEdited.value == i) {
            const shape = shapeAtIndex(i)!;
            const hitResult = shape.paperScope ? shape.paperScope.project.hitTest(event.point, hitOptions) : null;
            if (shape.onMouseDown(event, hitResult)) {
                clickedShape = i;
                if (event.modifiers.shift) {
                    select(i, shape);
                } else if (event.modifiers.control) {
                    select(i, shape);
                    break;
                } else {
                    if (!selection.value.includes(i)) {
                        selectOnly(i);
                    }
                    break;
                }
            }
        }
    }

    if (clickedShape === -1) {
        if (!event.modifiers.control && !event.modifiers.shift) {
            deselectAll();
        }
        shapeDragged = -1;
        overlayPaperScope.activate();
        selectionBox = new paper.Shape.Rectangle(new paper.Rectangle(event.point, event.point));
        selectionBox.fillColor = new paper.Color(0, 0, 0, 0.4);
        selectionBox.strokeColor = new paper.Color(0, 0, 0, 0.6);
        selectionBox.style.strokeWidth = 1;
        selectionBoxAnchor = event.point;
    } else {
        dragStartPoint = event.point;
        shapeDragStartPosition = shapeAtIndex(clickedShape)!.getPosition().clone();
        shapeDragged = clickedShape;
        selectionBox = null;
    }
}

function handleMouseDrag(event: paper.ToolEvent) {
    const isMiddleButtonPressed = (event as any).event.buttons & 4;
    if (isMiddleButtonPressed) {
        allShapes().forEach((s) => s.move(event.delta));
        return;
    }
    const isLeftButtonPressed = (event as any).event.buttons & 1;
    if (!isLeftButtonPressed) {
        return;
    }

    let moveObjects = true;
    for (let i = 0; i < totalShapes(); i++) {
        if (shapeEdited.value == -1 || shapeEdited.value == i) {
            const shape = shapeAtIndex(i)!;
            if (shape.onMouseDrag(event, snapper)) {
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
            const futureOwnSnaps = selectedSnapPoints().map((p) => p.add(deltaToCurrentPosition));
            deltaToCurrentPosition = deltaToCurrentPosition.add(snapper.snapShift(futureOwnSnaps));
        }
        selection.value.forEach((i) => shapeAtIndex(i)!.move(deltaToCurrentPosition));
        if (event.modifiers.shift) {
            snapper.drawSnapLines(selectedSnapPoints());
        }
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
    snapper.clearSnapLines();
    // delay attrs update to avoid collisions with prosemirror selection update, which also happens on mouseup
    requestAnimationFrame(() => save());
}

function handleKeyDown(event: paper.KeyEvent) {
    if (event.key == 'control' || (event.key == 'z' && event.modifiers.control)) {
        return;
    }

    if (selection.value.length > 0) {
        const anyTextAreaSelected = selection.value.some((i) => isTextArea(shapeAtIndex(i)!));
        let capturedEvent = true;
        if (event.key == 'delete' || event.key === 'backspace') {
            deleteSelected();
            capturedEvent = false;
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
            copySelected();
        } else if (event.key == 'x' && event.modifiers.control) {
            copySelected();
            deleteSelected();
        } else {
            capturedEvent = false;
        }
        if (capturedEvent) {
            event.preventDefault();
        }
    }
    if (event.key == 'v' && event.modifiers.control && copiedNodes) {
        deselectAll();
        copiedNodes.forEach((shapeNode) => {
            const serializedNode = shapeNode.toJSON();
            serializedNode.attrs = { ...serializedNode.attrs, id: idGenerator.next().value };
            props.editor.commands.insertContentAt(insertPosition(), props.editor.schema.nodeFromJSON(serializedNode));

            const added = lastShape();
            select(totalShapes() - 1, added);
            added.handleResize(canvas.value.width, canvas.value.height);
            added.move(new paper.Point(40, 40));
        });
        event.preventDefault();
        save();
    } else if (event.key == 'a' && event.modifiers.control) {
        deselectAll();
        for (let i = 0; i < totalShapes(); i++) {
            select(i);
        }
        event.preventDefault();
    }
}

function copySelected() {
    copiedNodes = selection.value.map((i) => shapeAtIndex(i)!.getNode());
}

function deleteSelected(force = false) {
    let selectedShapeIds = selection.value.map((i) => props.node.children[i].attrs.id);
    for (let i = totalShapes() - 1; i >= 0; i--) {
        if (!selection.value.includes(i)) {
            continue;
        }
        const shape = shapeAtIndex(i)!;
        const captured = shape.onDelete();
        if (captured && !force) {
            continue;
        }
        deselect(i);
        selectedShapeIds = selectedShapeIds.filter((s) => s !== shape.getNode().attrs.id);
        const elementBegin = shape.getPos()!;
        const transaction = props.editor.view.state.tr.delete(
            elementBegin,
            elementBegin + shape.getNode().nodeSize - 1,
        );
        props.editor.view.dispatch(transaction);
    }
    handleResize(); // some components might be re-rendered and need to have canvas size reassigned
    selection.value = selectedShapeIds.map((s) => props.node.children.findIndex((c) => c.attrs.id === s));
}

function handleKeyUp(event: paper.KeyEvent) {
    if (event.key === 'shift') {
        snapper.clearSnapLines();
    }
}

function handleScroll(event: WheelEvent) {
    if (!event.ctrlKey) {
        return;
    }

    const zoomFactor = Math.pow(1.1, -Math.sign(event.deltaY));
    const center = {
        x: event.offsetX,
        y: event.offsetY,
    };

    for (let i = totalShapes() - 1; i >= 0; i--) {
        if (selection.value.length === 0 || selection.value.includes(i)) {
            shapeAtIndex(i)!.scale(zoomFactor, center);
            event.preventDefault();
        }
    }

    clearTimeout(saveTimeout ?? undefined);
    saveTimeout = setTimeout(() => save(), 100);
}

function insertPosition() {
    return props.getPos()! + props.node.nodeSize - 1;
}

function addShape(event: MouseEvent | paper.KeyEvent) {
    const added = lastShape();
    deselectAll();
    select(totalShapes() - 1, added);
    added.handleResize(canvas.value.width, canvas.value.height);
    save();
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

function onMoveToBottom() {
    const selectedShapeIds = selection.value.map((i) => props.node.children[i].attrs.id);
    props.editor.commands.moveShapesToBottom(props.getPos()!, selection.value);
    deselectAll();
    selectedShapeIds.forEach((s) => select(props.node.children.findIndex((c) => c.attrs.id === s)));
    save();
}

function onMoveDown() {
    const selectedShapeIds = selection.value.map((i) => props.node.children[i].attrs.id);
    props.editor.commands.moveShapesDown(props.getPos()!, selection.value);
    deselectAll();
    selectedShapeIds.forEach((s) => select(props.node.children.findIndex((c) => c.attrs.id === s)));
    save();
}

function onMoveUp() {
    const selectedShapeIds = selection.value.map((i) => props.node.children[i].attrs.id);
    props.editor.commands.moveShapesUp(props.getPos()!, selection.value);
    deselectAll();
    selectedShapeIds.forEach((s) => select(props.node.children.findIndex((c) => c.attrs.id === s)));
    save();
}

function onMoveToTop() {
    const selectedShapeIds = selection.value.map((i) => props.node.children[i].attrs.id);
    props.editor.commands.moveShapesToTop(props.getPos()!, selection.value);
    deselectAll();
    selectedShapeIds.forEach((s) => select(props.node.children.findIndex((c) => c.attrs.id === s)));
    save();
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
    props.editor.commands.focus();
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
    return shape.getNode().type.name === 'arc';
}

function isCircle(shape: ShapeController) {
    return shape.getNode().type.name === 'circle';
}

function isRectangle(shape: ShapeController) {
    return shape.getNode().type.name === 'rectangle';
}

function isPolygon(shape: ShapeController) {
    return shape.getNode().type.name === 'polygon';
}

function isLine(shape: ShapeController) {
    return shape.getNode().type.name === 'line';
}

function isTextArea(shape: ShapeController): shape is TextAreaShapeController {
    return shape.getNode().type.name === 'textArea';
}

function select(index: number, shape = shapeAtIndex(index)!) {
    if (!selection.value.includes(index)) {
        shape.setSelected(true);
        selection.value.push(index);
        recalculateSnapPoints();
    }
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
    snapper.setSnapPoints([]);
}

function selectOnly(index: number) {
    allShapes().forEach((shape, i) => {
        if (i !== index) {
            shape.setSelected(false);
        } else if (!selection.value.includes(index)) {
            shape.setSelected(true);
        }
    });
    shapeEdited.value = shapeEdited.value === index ? shapeEdited.value : -1;
    selection.value = [index];
    recalculateSnapPoints();
}

function selectedSnapPoints() {
    return selection.value.flatMap((i) => shapeAtIndex(i)!.getSnapPoints());
}

function recalculateSnapPoints() {
    snapper.setSnapPoints(
        Array(totalShapes())
            .fill(0)
            .map((_, i) => i)
            .filter((i) => !selection.value.includes(i))
            .flatMap((i) => shapeAtIndex(i)!.getSnapPoints()),
    );
}

function save() {
    clearTimeout(saveTimeout ?? undefined);
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

.ProseMirror-selectednode .geometry-editor {
    outline: 4px dotted colors.$main-red;
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
        outline: none;
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
    &,
    * {
        @extend .no-selection;
    }

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
        cursor: pointer;

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
.input-button {
    padding: 0;

    span {
        padding: 0 5px 0 10px;
    }

    input[type='number'] {
        width: 30px;
        height: 100%;
        background: transparent;
        padding: 0 5px;
        text-overflow: ellipsis;

        &:focus {
            background: colors.$dark-gray;
            width: 40px;
            @extend .allow-selection;
        }
    }
}
.T-icon {
    font-style: italic;
    font-weight: bold;
    font-family: 'Times New Roman', Times, serif;
}
[dropdown-option] {
    background: colors.$gray;
    padding: 0 10px;

    &:hover {
        background: colors.$dark-gray;
    }
}
</style>
