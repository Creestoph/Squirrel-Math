<template>
    <node-view-wrapper as="canvas" ref="canvas"></node-view-wrapper>
</template>

<script setup lang="ts">
import paper from 'paper';
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
import { ComponentPublicInstance, onMounted, ref, watch } from 'vue';
import { Point } from '@/models/point';
import { PolygonShapeController } from './PolygonNode';
import { Snapper } from './utils';

const props = defineProps(nodeViewProps);

const polygon = ref<paper.Path>(null!);
const movedShape = ref<paper.Item | null>(null);

const all = ref<paper.Group>(null!);
const grips = ref<paper.Group>(null!);

const selectedGripIndex = ref(-1);
const selectedGripOutline = ref<paper.Path.Circle>(null!);

const editing = ref(false);
const isSelected = ref(false);

const canvas = ref<ComponentPublicInstance>(null!);

const fillColor = {
    get value() {
        return props.node.attrs.color;
    },

    set value(color) {
        if (color != fillColor.value) {
            props.updateAttributes({ color });
        }
        if (color == '#00000000') {
            color = '#00000001';
        }
        polygon.value.fillColor = new paper.Color(color);
        grips.value.fillColor = new paper.Color(color).multiply(0.7);
        grips.value.fillColor.alpha = 1;
    },
};

const borderColor = {
    get value() {
        return props.node.attrs.borderColor;
    },

    set value(borderColor) {
        if (borderColor != borderColor.value) {
            props.updateAttributes({ borderColor });
        }
        if (borderColor == '#00000000') {
            borderColor = '#00000001';
        }
        polygon.value.strokeColor = new paper.Color(borderColor);
    },
};

const sides = {
    get value() {
        return polygon.value.segments.length;
    },
};

const controller: PolygonShapeController = {
    getNode: () => props.node,
    getPos: props.getPos,
    paperScope: new paper.PaperScope(),
    fillColor,
    editing,
    sides,
    borderColor,
    makeRegular,
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

watch(() => props.node, afterNodeChanged);

onMounted(() => {
    controller.paperScope!.setup(canvas.value.$el as HTMLCanvasElement);
    afterNodeChanged();
});

function afterNodeChanged() {
    render();
    props.editor.storage.geometry.controllers.set(props.node.attrs.id, controller);
}

function render() {
    controller.paperScope!.activate();
    controller.paperScope!.project.clear();

    const attrs = props.node.attrs;
    polygon.value = new paper.Path();
    polygon.value.closed = true;
    polygon.value.style.strokeWidth = 3;

    grips.value = new paper.Group();
    grips.value.visible = isSelected.value;

    if (attrs.vertices) {
        attrs.vertices.forEach((v: Point) => addPoint(new paper.Point(v)));
    }

    selectedGripOutline.value = new paper.Path.Circle(new paper.Point(0, 0), 8);
    selectedGripOutline.value.strokeColor = new paper.Color('#ffbb33');
    selectedGripOutline.value.style.strokeWidth = 4;
    selectedGripOutline.value.locked = true; // non-hittable
    selectGrip(selectedGripIndex.value);

    all.value = new paper.Group([polygon.value, grips.value, selectedGripOutline.value]);

    fillColor.value = attrs.color;
    borderColor.value = attrs.borderColor;
}

function handleResize(width: number, height: number) {
    controller.paperScope!.view.viewSize = new paper.Size(width, height);
}

function getPosition() {
    return polygon.value.position;
}

function move(shift: paper.Point) {
    all.value.translate(shift);
}

function scale(factor: number, center: paper.Point) {
    polygon.value.scale(factor, new paper.Point(center));
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
    return polygon.value.intersects(new paper.Path.Rectangle(bounds)) || bounds.contains(polygon.value.bounds);
}

function getSnapPoints() {
    return grips.value.children.map((g) => g.position);
}

function onDelete() {
    if (selectedGripIndex.value != -1 && sides.value > 3) {
        polygon.value.removeSegment(selectedGripIndex.value);
        grips.value.children[selectedGripIndex.value].remove();
        selectGrip(
            selectedGripIndex.value < grips.value.children.length
                ? selectedGripIndex.value
                : selectedGripIndex.value - 1,
        );
        return true;
    }
    all.value.remove();
    return false;
}

function onMouseMove(_event: paper.ToolEvent, hitResult: paper.HitResult, cursorStyle: CSSStyleDeclaration) {
    if (!hitResult && editing.value) {
        cursorStyle.cursor = 'cell';
    } else if (hitResult && grips.value.children.some((item) => item == hitResult.item)) {
        cursorStyle.cursor = 'crosshair';
    } else if (hitResult && polygon.value == hitResult.item && editing.value) {
        cursorStyle.cursor = 'cell';
    } else if (hitResult && polygon.value == hitResult.item && !editing.value) {
        cursorStyle.cursor = 'move';
    }
}

function onMouseDown(event: paper.ToolEvent, hitResult: paper.HitResult) {
    if (editing.value && (!hitResult || (polygon.value == hitResult.item && hitResult.type == 'fill'))) {
        const newIndex = selectedGripIndex.value != -1 ? selectedGripIndex.value + 1 : grips.value.children.length;
        addPoint(event.point, newIndex);
        selectGrip(newIndex);
        movedShape.value = grips.value.children[newIndex];
        return true;
    }

    if (editing.value && polygon.value == hitResult.item && hitResult.type == 'stroke') {
        const indexBetween = hitResult.location.index + 1;
        addPoint(event.point, indexBetween);
        selectGrip(indexBetween);
        movedShape.value = grips.value.children[indexBetween];
        return true;
    }

    if (!hitResult) {
        return false;
    }
    if (polygon.value == hitResult.item) {
        movedShape.value = all.value;
    }
    let result = grips.value.children.findIndex((grip) => grip == hitResult.item);
    if (result != -1) {
        movedShape.value = grips.value.children[result];
        selectGrip(result);
    }
    return !!movedShape.value;
}

function onMouseDrag(event: paper.ToolEvent, snapper: Snapper) {
    if (!movedShape.value) {
        return false;
    }

    let result = grips.value.children.findIndex((grip) => grip == movedShape.value);
    if (result != -1) {
        let shift = event.modifiers.shift ? snapper.snapShift([event.point]) : new paper.Point(0, 0);
        movedShape.value.position = event.point.add(shift);
        polygon.value.segments[result].point = movedShape.value.position;
        selectedGripOutline.value.position = movedShape.value.position;
        if (event.modifiers.shift) {
            snapper.drawSnapLines([movedShape.value.position]);
        }
        return true;
    } else {
        return false;
    }
}

function onMouseUp() {
    movedShape.value = null;
}

function addPoint(position: paper.Point, index = polygon.value.segments.length) {
    polygon.value.insert(index, position);
    let grip = new paper.Path.Circle(position, 6);
    grip.style.strokeWidth = 0;
    grip.fillColor = new paper.Color(fillColor.value).multiply(0.7);
    grips.value.insertChild(index, grip);
}

function save() {
    props.updateAttributes({
        vertices: polygon.value.segments.map((s) => ({
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

function makeRegular(sides: number, center?: Point) {
    selectGrip(-1);
    props.updateAttributes({
        vertices: new paper.Path.RegularPolygon(center || getPosition(), sides, 70).segments.map((s) => ({
            x: s.point.x,
            y: s.point.y,
        })),
    });
    editing.value = false;
}
</script>

<style scoped lang="scss">
@use '@/style/canvas-node';
</style>
