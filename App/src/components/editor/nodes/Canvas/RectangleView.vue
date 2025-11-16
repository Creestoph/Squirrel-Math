<template>
    <node-view-wrapper as="canvas" ref="canvas"></node-view-wrapper>
</template>

<script setup lang="ts">
import paper from 'paper';
import { snapShift } from './Shape';
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
import { ComponentPublicInstance, onMounted, ref, watch } from 'vue';
import { RectangleShapeController } from './RectangleNode';

const props = defineProps(nodeViewProps);

const rectangle = ref<paper.Shape.Rectangle>(null!);
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
        if (fillColor.value != color) {
            props.updateAttributes({ color });
        }
        if (color == '#00000000') {
            color = '#00000001';
        }
        rectangle.value.fillColor = new paper.Color(color);
        grips.value.fillColor = new paper.Color(color).multiply(0.7);
        grips.value.fillColor.alpha = 1;
    },
};

const borderColor = {
    get value() {
        return props.node.attrs.borderColor;
    },

    set value(borderColor) {
        rectangle.value.strokeColor = new paper.Color(borderColor);
        rectangle.value.style.strokeWidth = rectangle.value.strokeColor.alpha > 0 ? 3 : 0;
        if (borderColor.value != borderColor) {
            props.updateAttributes({ borderColor });
        }
    },
};

const width = {
    get value() {
        return rectangle.value.bounds.width;
    },

    set value(value) {
        let newWidth = typeof value == 'number' ? value : parseFloat(value);
        if (newWidth >= 3) {
            rectangle.value.bounds.width = newWidth;
            recalculateGripsPositions();
            save();
        }
    },
};

const height = {
    get value() {
        return rectangle.value.bounds.height;
    },

    set value(value) {
        let newHeight = typeof value == 'number' ? value : parseFloat(value);
        if (newHeight >= 3) {
            rectangle.value.bounds.height = newHeight;
            recalculateGripsPositions();
            save();
        }
    },
};

const controller: RectangleShapeController = {
    node: props.node,
    getPos: props.getPos,
    paperScope: new paper.PaperScope(),
    width,
    height,
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

    let center = new paper.Point(attrs.center.x, attrs.center.y);
    let size = new paper.Size(attrs.size.width, attrs.size.height);

    rectangle.value = new paper.Shape.Rectangle(
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
    all.value = new paper.Group([rectangle.value, grips.value]);
    grips.value.visible = isSelected.value;

    fillColor.value = attrs.color;
    borderColor.value = attrs.borderColor;
}

function save() {
    props.updateAttributes({
        size: {
            width: rectangle.value.bounds.width,
            height: rectangle.value.bounds.height,
        },
        center: {
            x: rectangle.value.position.x,
            y: rectangle.value.position.y,
        },
    });
}

function handleResize(width: number, height: number) {
    controller.paperScope!.view.viewSize = new paper.Size(width, height);
}

function getPosition() {
    return rectangle.value.position;
}

function move(shift: paper.Point) {
    rectangle.value.position.x += shift.x;
    rectangle.value.position.y += shift.y;
    grips.value.children.forEach((child) => {
        child.position.x += shift.x;
        child.position.y += shift.y;
    });
}

function scale(factor: number, center: paper.Point) {
    rectangle.value.scale(factor, new paper.Point(center));
    recalculateGripsPositions();
    save();
}

function setSelected(value: boolean) {
    isSelected.value = value;
    grips.value.visible = value;
}

function containedInBounds(bounds: paper.Rectangle) {
    return rectangle.value.bounds.intersects(bounds);
}

function getSnapPoints() {
    return [upperLeft.value.position, bottomRight.value.position];
}

function onDelete() {
    all.value.remove();
}

function onMouseMove(_event: paper.ToolEvent, hitResult: paper.HitResult, cursorStyle: CSSStyleDeclaration) {
    if (!hitResult) {
        return;
    } else if (rectangle.value == hitResult.item) {
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
    if (rectangle.value == hitResult.item) {
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

    rectangle.value.bounds.width = right.value.position.x - left.value.position.x;
    rectangle.value.bounds.height = bottom.value.position.y - upper.value.position.y;
    rectangle.value.position.x = (left.value.position.x + right.value.position.x) / 2;
    rectangle.value.position.y = (bottom.value.position.y + upper.value.position.y) / 2;
    recalculateGripsPositions();

    return true;
}

function onMouseUp() {
    movedShape.value = null;
}

function recalculateGripsPositions() {
    upper.value.position = rectangle.value.position.add(new paper.Point(0, -rectangle.value.bounds.height / 2));
    bottom.value.position = rectangle.value.position.add(new paper.Point(0, rectangle.value.bounds.height / 2));
    left.value.position = rectangle.value.position.add(new paper.Point(-rectangle.value.bounds.width / 2, 0));
    right.value.position = rectangle.value.position.add(new paper.Point(rectangle.value.bounds.width / 2, 0));
    upperLeft.value.position = rectangle.value.position.add(
        new paper.Point(-rectangle.value.bounds.width / 2, -rectangle.value.bounds.height / 2),
    );
    upperRight.value.position = rectangle.value.position.add(
        new paper.Point(rectangle.value.bounds.width / 2, -rectangle.value.bounds.height / 2),
    );
    bottomLeft.value.position = rectangle.value.position.add(
        new paper.Point(-rectangle.value.bounds.width / 2, rectangle.value.bounds.height / 2),
    );
    bottomRight.value.position = rectangle.value.position.add(
        new paper.Point(rectangle.value.bounds.width / 2, rectangle.value.bounds.height / 2),
    );
}
</script>

<style scoped lang="scss">
@use '@/style/canvas-node';
</style>
