<template>
    <node-view-wrapper as="canvas" ref="canvas"></node-view-wrapper>
</template>

<script setup lang="ts">
import paper from 'paper';
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
import { ComponentPublicInstance, computed, onMounted, ref, watch } from 'vue';
import { snapShift } from './Shape';
import { ArcShapeController } from './ArcNode';

const props = defineProps(nodeViewProps);

let paperScope: paper.PaperScope = null!;

const line1 = ref<paper.Path>(null!);
const line2 = ref<paper.Path>(null!);
const arcStroke = ref<paper.Path.Arc>(null!);
const arcFill = ref<paper.Path.Arc>(null!);
const r = ref(0);
const movedShape = ref<paper.Item | 'arc' | null>(null);

const all = ref<paper.Group>(null!);
const grips = ref<paper.Group>(null!);

const isSelected = ref(false);

const canvas = ref<ComponentPublicInstance>(null!);

const fillColor = {
    get value() {
        return props.node.attrs.color;
    },

    set value(color) {
        arcFill.value.fillColor = new paper.Color(color);
        if (fillColor.value != color) {
            props.updateAttributes({ color });
        }
    },
};

const borderColor = {
    get value() {
        return props.node.attrs.borderColor;
    },

    set value(color) {
        if (borderColor.value != color) {
            props.updateAttributes({ borderColor: color });
        }
        assignStrokeColor(color);
    },
};

const radius = {
    get value() {
        return r.value;
    },

    set value(v) {
        if (v > 0) {
            r.value = v;
            save();
        }
    },
};

const angle = {
    get value() {
        return Math.round(((arm2.value.angle - arm1.value.angle + 360) % 360) * 100) / 100;
    },

    set value(v) {
        arm2.value.angle = Math.round((v + arm1.value.angle) * 100) / 100;
        line2.value.segments[1].point = grips.value.children[2].position = arm2.value.add(center.value);
        save();
    },
};

const center = computed(() => line1.value.segments[0].point);

const arm1End = computed(() => line1.value.segments[1].point);

const arm2End = computed(() => line2.value.segments[1].point);

const arm1 = computed(() => arm1End.value.subtract(center.value));

const arm2 = computed(() => arm2End.value.subtract(center.value));

watch(
    () => props.node,
    () => render(),
);

onMounted(() => {
    paperScope = new paper.PaperScope();
    paperScope.setup(canvas.value.$el as HTMLCanvasElement);
    render();
    const controller: ArcShapeController = {
        node: props.node,
        getPos: props.getPos,
        paperScope,
        angle,
        radius,
        fillColor,
        borderColor,
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

    line1.value = new paper.Path([new paper.Point(attrs.center), new paper.Point(attrs.arms[0])]);
    line2.value = new paper.Path([new paper.Point(attrs.center), new paper.Point(attrs.arms[1])]);
    line1.value.style.strokeWidth = line2.value.style.strokeWidth = 3;
    line1.value.strokeColor = line2.value.strokeColor = new paper.Color(0.8, 0.8, 0.8);
    line1.value.dashArray = line2.value.dashArray = [8, 10];

    r.value = attrs.radius;
    recalculateArc();

    grips.value = new paper.Group();
    [center.value, arm1End.value, arm2End.value].forEach((point) => {
        const grip = new paper.Path.Circle(point, 6);
        grip.style.strokeWidth = 0;
        grips.value.addChild(grip);
    });
    grips.value.fillColor = line1.value.strokeColor.multiply(0.7);

    fillColor.value = attrs.color;
    setSelected(isSelected.value);

    all.value = new paper.Group([line1.value, line2.value, arcFill.value, arcStroke.value, grips.value]);
}

function handleResize(width: number, height: number) {
    paperScope.view.viewSize = new paper.Size(width, height);
}

function getPosition() {
    return center.value;
}

function move(shift: paper.Point) {
    all.value.translate(shift);
}

function setSelected(value: boolean) {
    grips.value.visible = value;
    line1.value.visible = line2.value.visible = value;
    isSelected.value = value;
}

function scale(factor: number, center: paper.Point) {
    line1.value.scale(factor, new paper.Point(center));
    line2.value.scale(factor, new paper.Point(center));
    radius.value *= factor;
    save();
}

function containedInBounds(bounds: paper.Rectangle) {
    return arcFill.value.intersects(new paper.Path.Rectangle(bounds)) || bounds.contains(arcFill.value.bounds);
}

function getSnapPoints() {
    return grips.value.children.map((g) => g.position);
}

function onDelete() {
    all.value.remove();
}

function onMouseMove(_event: paper.ToolEvent, hitResult: paper.HitResult, cursorStyle: CSSStyleDeclaration) {
    if (
        hitResult &&
        (arcStroke.value == hitResult.item || grips.value.children.some((item) => item == hitResult.item))
    ) {
        cursorStyle.cursor = 'crosshair';
    } else if (
        hitResult &&
        (line1.value == hitResult.item || line2.value == hitResult.item || arcFill.value == hitResult.item)
    ) {
        cursorStyle.cursor = 'move';
    }
}

function onMouseDown(_event: paper.ToolEvent, hitResult: paper.HitResult) {
    if (!hitResult) {
        return false;
    }
    if (line1.value == hitResult.item || line2.value == hitResult.item || arcFill.value == hitResult.item) {
        movedShape.value = all.value;
    }
    if (arcStroke.value == hitResult.item) {
        movedShape.value = 'arc';
    }
    let result = grips.value.children.findIndex((grip) => grip == hitResult.item);
    if (result != -1) {
        movedShape.value = grips.value.children[result];
    }
    return !!movedShape.value;
}

function onMouseDrag(event: paper.ToolEvent, snapPoints: paper.Point[]) {
    if (!movedShape.value) {
        return false;
    }

    if (movedShape.value == 'arc') {
        const mouseArm = event.point.subtract(center.value);
        r.value = mouseArm.length;
        if (
            (arm1.value.angle < arm2.value.angle &&
                (mouseArm.angle < arm1.value.angle || mouseArm.angle > arm2.value.angle)) ||
            (arm1.value.angle > arm2.value.angle &&
                mouseArm.angle > arm2.value.angle &&
                mouseArm.angle < arm1.value.angle)
        ) {
            const swapTemp = line1.value.segments[1].point.clone();
            line1.value.segments[1].point = line2.value.segments[1].point.clone();
            line2.value.segments[1].point = swapTemp;
            save();
        } else {
            recalculateArc();
        }
        return true;
    }

    let result = grips.value.children.findIndex((grip) => grip == movedShape.value);
    if (result != -1) {
        let shift = event.modifiers.shift ? snapShift([event.point], snapPoints) : new paper.Point(0, 0);
        movedShape.value.position = event.point.add(shift);
        if (result == 0) {
            line1.value.segments[0].point = movedShape.value.position;
            line2.value.segments[0].point = movedShape.value.position;
        } else if (result == 1) {
            line1.value.segments[1].point = movedShape.value.position;
        } else if (result == 2) {
            line2.value.segments[1].point = movedShape.value.position;
        }
        recalculateArc();
        return true;
    }

    return false;
}

function onMouseUp() {
    movedShape.value = null;
}

function save() {
    props.updateAttributes({
        center: { x: center.value.x, y: center.value.y },
        arms: [
            { x: arm1End.value.x, y: arm1End.value.y },
            { x: arm2End.value.x, y: arm2End.value.y },
        ],
        radius: radius.value,
    });
}

function recalculateArc() {
    paperScope.activate();

    if (arcStroke.value) {
        arcStroke.value.remove();
        arcFill.value.remove();
    }

    let mid = arm1End.value.add(arm2End.value).multiply(0.5).subtract(center.value);
    if ((angle.value as number) > 180) {
        mid = mid.multiply(-1);
    }
    mid = mid.add(arm1End.value.subtract(arm2End.value).rotate(90, new paper.Point(0, 0)).normalize(1));

    const arcStart = center.value.add(arm1.value.normalize(radius.value));
    const arcMiddle = center.value.add(mid.normalize(radius.value));
    const arcEnd = center.value.add(arm2.value.normalize(radius.value));

    arcFill.value = new paper.Path.Arc(arcStart, arcMiddle, arcEnd);
    arcFill.value.add(center.value);
    arcFill.value.fillColor = props.node.attrs.color;

    arcStroke.value = new paper.Path.Arc(arcStart, arcMiddle, arcEnd);
    assignStrokeColor(borderColor.value);
    arcStroke.value.style.strokeWidth = 3;
}

function assignStrokeColor(color: string) {
    if (color == '#00000000') {
        color = '#00000001';
    }
    arcStroke.value.strokeColor = new paper.Color(borderColor);
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
