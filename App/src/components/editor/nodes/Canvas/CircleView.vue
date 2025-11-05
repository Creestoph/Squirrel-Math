<template>
    <node-view-wrapper as="canvas" ref="canvas"></node-view-wrapper>
</template>

<script setup lang="ts">
import paper from 'paper';
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
import { ComponentPublicInstance, onMounted, ref, watch } from 'vue';
import { snapShift } from './Shape';
import { CircleShapeController } from './CircleNode';

const props = defineProps(nodeViewProps);

let paperScope: paper.PaperScope = null!;

const circle = ref<paper.Shape.Ellipse>(null!);
const upper = ref<paper.Path.Circle>(null!);
const bottom = ref<paper.Path.Circle>(null!);
const left = ref<paper.Path.Circle>(null!);
const right = ref<paper.Path.Circle>(null!);
const upperLeft = ref<paper.Path.Circle>(null!);
const upperRight = ref<paper.Path.Circle>(null!);
const bottomLeft = ref<paper.Path.Circle>(null!);
const bottomRight = ref<paper.Path.Circle>(null!);
const all = ref<paper.Group>(null!);
const grips = ref<paper.Group>(null!);
const movedShape = ref<paper.Item | null>(null);
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
        circle.value.fillColor = new paper.Color(color);
        grips.value.fillColor = new paper.Color(color).multiply(0.7);
        grips.value.fillColor.alpha = 1;
    },
};

const borderColor = {
    get value() {
        return props.node.attrs.borderColor;
    },

    set value(borderColor) {
        circle.value.strokeColor = new paper.Color(borderColor);
        circle.value.style.strokeWidth = circle.value.strokeColor.alpha > 0 ? 3 : 0;
        if (borderColor != borderColor.value) {
            props.updateAttributes({ borderColor });
        }
    },
};

const width = {
    get value() {
        return circle.value.bounds.width;
    },

    set value(value) {
        let newWidth = typeof value == 'number' ? value : parseFloat(value);
        if (newWidth >= 3) {
            circle.value.bounds.width = newWidth;
            recalculateGripsPositions();
            save();
        }
    },
};

const height = {
    get value() {
        return circle.value.bounds.height;
    },

    set value(value) {
        let newHeight = typeof value == 'number' ? value : parseFloat(value);
        if (newHeight >= 3) {
            circle.value.bounds.height = newHeight;
            recalculateGripsPositions();
            save();
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
    const controller: CircleShapeController = {
        node: props.node,
        getPos: props.getPos,
        paperScope,
        fillColor,
        borderColor,
        width,
        height,
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

    let center = new paper.Point(attrs.center.x, attrs.center.y);
    let size = new paper.Size(attrs.size.width, attrs.size.height);

    circle.value = new paper.Shape.Ellipse(
        new paper.Rectangle(center.add(new paper.Point(-size.width / 2, -size.height / 2)), size),
    );

    let grip = new paper.Path.Circle(new paper.Point(0, 0), 6);
    grip.style.strokeWidth = 0;
    upper.value = grip.clone();
    bottom.value = grip.clone();
    left.value = grip.clone();
    right.value = grip.clone();
    upperLeft.value = grip.clone();
    upperRight.value = grip.clone();
    bottomLeft.value = grip.clone();
    bottomRight.value = grip.clone();
    recalculateGripsPositions();
    grip.remove();

    grips.value = new paper.Group([
        upper.value,
        bottom.value,
        left.value,
        right.value,
        upperLeft.value,
        upperRight.value,
        bottomLeft.value,
        bottomRight.value,
    ]);
    all.value = new paper.Group([circle.value, grips.value]);
    grips.value.visible = isSelected.value;

    fillColor.value = attrs.color;
    borderColor.value = attrs.borderColor;
}

function save() {
    props.updateAttributes({
        size: {
            width: circle.value.bounds.width,
            height: circle.value.bounds.height,
        },
        center: {
            x: circle.value.position.x,
            y: circle.value.position.y,
        },
    });
}

function handleResize(width: number, height: number) {
    paperScope.view.viewSize = new paper.Size(width, height);
}

function getPosition() {
    return circle.value.position;
}

function move(shift: paper.Point) {
    all.value.translate(shift);
}

function scale(factor: number, center: paper.Point) {
    circle.value.scale(factor, new paper.Point(center));
    recalculateGripsPositions();
    save();
}

function setSelected(value: boolean) {
    isSelected.value = value;
    grips.value.visible = value;
}

function containedInBounds(bounds: paper.Rectangle) {
    return circle.value.bounds.intersects(bounds);
}

function getSnapPoints() {
    return [upperLeft.value.position, circle.value.position, bottomRight.value.position];
}

function onDelete() {
    all.value.remove();
}

function onMouseMove(_event: paper.ToolEvent, hitResult: paper.HitResult, cursorStyle: CSSStyleDeclaration) {
    if (!hitResult) {
        return;
    } else if (circle.value == hitResult.item) {
        cursorStyle.cursor = 'move';
    } else if (upper.value == hitResult.item || bottom.value == hitResult.item) {
        cursorStyle.cursor = 'ns-resize';
    } else if (left.value == hitResult.item || right.value == hitResult.item) {
        cursorStyle.cursor = 'ew-resize';
    } else if (upperLeft.value == hitResult.item || bottomRight.value == hitResult.item) {
        cursorStyle.cursor = 'nwse-resize';
    } else if (upperRight.value == hitResult.item || bottomLeft.value == hitResult.item) {
        cursorStyle.cursor = 'nesw-resize';
    }
}

function onMouseDown(_event: paper.ToolEvent, hitResult: paper.HitResult) {
    if (!hitResult) {
        return false;
    }
    if (circle.value == hitResult.item) {
        movedShape.value = all.value;
        return true;
    }
    let result = grips.value.children.find((grip) => grip == hitResult.item);
    if (result) {
        movedShape.value = result;
    }
    return !!result;
}

function onMouseDrag(event: paper.ToolEvent, snapPoints: paper.Point[]) {
    if (!movedShape.value || movedShape.value == all.value) {
        return false;
    }

    let shift = event.modifiers.shift ? snapShift([event.point], snapPoints) : new paper.Point(0, 0);
    if (movedShape.value == upperLeft.value || movedShape.value == left.value || movedShape.value == bottomLeft.value) {
        if (event.point.x > right.value.position.x - 3) {
            left.value.position.x = right.value.position.x - 3;
        } else {
            left.value.position.x = event.point.add(shift).x;
        }
    }
    if (
        movedShape.value == upperRight.value ||
        movedShape.value == right.value ||
        movedShape.value == bottomRight.value
    ) {
        if (event.point.x < left.value.position.x + 3) {
            right.value.position.x = left.value.position.x + 3;
        } else {
            right.value.position.x = event.point.add(shift).x;
        }
    }
    if (
        movedShape.value == upperLeft.value ||
        movedShape.value == upper.value ||
        movedShape.value == upperRight.value
    ) {
        if (event.point.y > bottom.value.position.y - 3) {
            upper.value.position.y = bottom.value.position.y - 3;
        } else {
            upper.value.position.y = event.point.add(shift).y;
        }
    }
    if (
        movedShape.value == bottomLeft.value ||
        movedShape.value == bottom.value ||
        movedShape.value == bottomRight.value
    ) {
        if (event.point.y < upper.value.position.y + 3) {
            bottom.value.position.y = upper.value.position.y + 3;
        } else {
            bottom.value.position.y = event.point.add(shift).y;
        }
    }

    circle.value.bounds.width = right.value.position.x - left.value.position.x;
    circle.value.bounds.height = bottom.value.position.y - upper.value.position.y;
    circle.value.position.x = (left.value.position.x + right.value.position.x) / 2;
    circle.value.position.y = (bottom.value.position.y + upper.value.position.y) / 2;
    recalculateGripsPositions();

    return true;
}

function onMouseUp() {
    movedShape.value = null;
}

function recalculateGripsPositions() {
    upper.value.position = circle.value.position.add(new paper.Point(0, -circle.value.bounds.height / 2));
    bottom.value.position = circle.value.position.add(new paper.Point(0, circle.value.bounds.height / 2));
    left.value.position = circle.value.position.add(new paper.Point(-circle.value.bounds.width / 2, 0));
    right.value.position = circle.value.position.add(new paper.Point(circle.value.bounds.width / 2, 0));
    upperLeft.value.position = circle.value.position.add(
        new paper.Point(-circle.value.bounds.width / 2, -circle.value.bounds.height / 2),
    );
    upperRight.value.position = circle.value.position.add(
        new paper.Point(circle.value.bounds.width / 2, -circle.value.bounds.height / 2),
    );
    bottomLeft.value.position = circle.value.position.add(
        new paper.Point(-circle.value.bounds.width / 2, circle.value.bounds.height / 2),
    );
    bottomRight.value.position = circle.value.position.add(
        new paper.Point(circle.value.bounds.width / 2, circle.value.bounds.height / 2),
    );
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
