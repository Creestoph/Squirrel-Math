<template>
    <node-view-wrapper as="canvas" ref="canvas"></node-view-wrapper>
</template>

<script setup lang="ts">
import paper from 'paper';
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
import { ComponentPublicInstance, onMounted, ref, watch } from 'vue';
import { Point } from '@/components/utils/point';
import { snapShift } from './Shape';
import { LineShapeController } from './LineNode';

const props = defineProps(nodeViewProps);

let paperScope: paper.PaperScope = null!;

const line = ref<paper.Path>(null!);
const movedShape = ref<paper.Item | null>(null);

const all = ref<paper.Group>(null!);
const grips = ref<paper.Group>(null!);

const selectedGripIndex = ref(-1);
const selectedGripOutline = ref<paper.Path.Circle>(null!);

const editing = { value: false };
const isSelected = ref(false);

const canvas = ref<ComponentPublicInstance>(null!);

const fillColor = {
    get value() {
        return props.node.attrs.color;
    },

    set value(color) {
        line.value.strokeColor = new paper.Color(color);
        grips.value.fillColor = new paper.Color(color).multiply(0.7);
        if (fillColor.value != color) {
            props.updateAttributes({ color });
        }
    },
};

watch(
    () => props.node,
    () => render(),
);

onMounted(() => {
    paperScope = new paper.PaperScope();
    paperScope.setup(canvas.value.$el as HTMLCanvasElement);
    render();
    const controller: LineShapeController = {
        node: props.node,
        getPos: props.getPos,
        paperScope,
        fillColor,
        editing,
        handleResize,
        getPosition,
        move,
        scale,
        containedInBounds,
        getSnapPoints,
        onDelete,
        onMouseMove,
        onMouseDown,
        onMouseDrag,
        onMouseUp,
        setSelected,
        save,
    };
    props.editor.storage.geometry.controllers.set(props.node.attrs.id, controller);
});

function render() {
    paperScope.activate();
    paperScope.project.clear();

    const attrs = props.node.attrs;
    line.value = new paper.Path();
    line.value.style.strokeWidth = 3;

    grips.value = new paper.Group();
    grips.value.visible = isSelected.value;

    fillColor.value = attrs.color;

    if (attrs.points) {
        attrs.points.forEach((p: Point) => addPoint(new paper.Point(p)));
    }

    if (attrs.smooth) {
        line.value.smooth({ type: 'continuous' });
    }

    selectedGripOutline.value = new paper.Path.Circle(new paper.Point(0, 0), 8);
    selectedGripOutline.value.strokeColor = new paper.Color('#ffbb33');
    selectedGripOutline.value.style.strokeWidth = 4;
    selectedGripOutline.value.locked = true; // non-hittable
    selectGrip(selectedGripIndex.value);

    all.value = new paper.Group([line.value, grips.value, selectedGripOutline.value]);
}

function handleResize(width: number, height: number) {
    paperScope.view.viewSize = new paper.Size(width, height);
}

function getPosition() {
    return line.value.position;
}

function move(shift: paper.Point) {
    all.value.translate(shift);
}

function scale(factor: number, center: paper.Point) {
    line.value.scale(factor, new paper.Point(center));
    save();
}

function setSelected(value: boolean) {
    grips.value.visible = value;
    isSelected.value = value;
    if (!value) {
        editing.value = false;
        selectGrip(-1);
    }
}

function containedInBounds(bounds: paper.Rectangle) {
    return line.value.intersects(new paper.Path.Rectangle(bounds)) || bounds.contains(line.value.bounds);
}

function getSnapPoints() {
    return grips.value.children.map((g) => g.position);
}

function onDelete() {
    if (selectedGripIndex.value != -1) {
        line.value.removeSegment(selectedGripIndex.value);
        grips.value.children[selectedGripIndex.value].remove();
        selectGrip(-1);
        return true;
    }
    all.value.remove();
}

function onMouseMove(_event: paper.ToolEvent, hitResult: paper.HitResult, cursorStyle: CSSStyleDeclaration) {
    if (!hitResult && editing.value) {
        cursorStyle.cursor = 'cell';
    } else if (hitResult && grips.value.children.some((item) => item == hitResult.item)) {
        cursorStyle.cursor = 'crosshair';
    } else if (hitResult && line.value == hitResult.item && editing.value) {
        cursorStyle.cursor = 'cell';
    } else if (hitResult && line.value == hitResult.item && !editing.value) {
        cursorStyle.cursor = 'move';
    }
}

function onMouseDown(event: paper.ToolEvent, hitResult: paper.HitResult) {
    if (!hitResult) {
        if (editing.value) {
            const newIndex = selectedGripIndex.value != -1 ? selectedGripIndex.value + 1 : grips.value.children.length;
            addPoint(event.point, newIndex);
            selectGrip(newIndex);
            movedShape.value = grips.value.children[newIndex];
            return true;
        }
        return false;
    }
    if (line.value == hitResult.item) {
        if (editing.value) {
            const indexBetween = hitResult.location.index + 1;
            addPoint(event.point, indexBetween);
            selectGrip(indexBetween);
            movedShape.value = grips.value.children[indexBetween];
            return true;
        } else {
            movedShape.value = all.value;
        }
    }
    let result = grips.value.children.findIndex((grip) => grip == hitResult.item);
    if (result != -1) {
        movedShape.value = grips.value.children[result];
        selectGrip(result);
    }
    return !!movedShape.value;
}

function onMouseDrag(event: paper.ToolEvent, snapPoints: paper.Point[]) {
    if (!movedShape.value) {
        return false;
    }

    let result = grips.value.children.findIndex((grip) => grip == movedShape.value);
    if (result != -1) {
        let shift = event.modifiers.shift ? snapShift([event.point], snapPoints) : new paper.Point(0, 0);
        movedShape.value.position = event.point.add(shift);
        line.value.segments[result].point = movedShape.value.position;
        selectedGripOutline.value.position = movedShape.value.position;
        return true;
    } else {
        return false;
    }
}

function onMouseUp() {
    movedShape.value = null;
}

function addPoint(position: paper.Point, index = line.value.segments.length) {
    line.value.insert(index, position);
    let grip = new paper.Path.Circle(position, 6);
    grip.style.strokeWidth = 0;
    grip.fillColor = new paper.Color(fillColor.value).multiply(0.7);
    grips.value.insertChild(index, grip);
}

function save() {
    props.updateAttributes({
        points: line.value.segments.map((s) => ({
            x: s.point.x,
            y: s.point.y,
        })),
    });
}

function selectGrip(index: number) {
    selectedGripIndex.value = index;
    selectedGripOutline.value.visible = index != -1;
    if (index != -1) {
        selectedGripOutline.value.position = grips.value.children[index].position;
    }
}
</script>

<style scoped lang="scss">
@use '@/style/global';
canvas {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
}
</style>
