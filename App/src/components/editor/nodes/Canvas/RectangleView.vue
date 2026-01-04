<template>
    <node-view-wrapper as="canvas" ref="canvas"></node-view-wrapper>
</template>

<script setup lang="ts">
import paper from 'paper';
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
import { ComponentPublicInstance, onMounted, ref, watch } from 'vue';
import { RectangleShapeController } from './RectangleNode';
import { Snapper } from './utils';

const props = defineProps(nodeViewProps);

let rectangle: paper.Shape.Rectangle = null!;
let upper: paper.Path.Circle = null!;
let bottom: paper.Path.Circle = null!;
let left: paper.Path.Circle = null!;
let right: paper.Path.Circle = null!;
let upperLeft: paper.Path.Circle = null!;
let upperRight: paper.Path.Circle = null!;
let bottomLeft: paper.Path.Circle = null!;
let bottomRight: paper.Path.Circle = null!;

let all: paper.Group = null!;
let grips: paper.Group = null!;

let movedShape: paper.Item | null = null;

let isSelected = false;

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
        rectangle.fillColor = new paper.Color(color);
        grips.fillColor = new paper.Color(color).multiply(0.7);
        grips.fillColor.alpha = 1;
    },
};

const borderColor = {
    get value() {
        return props.node.attrs.borderColor;
    },

    set value(color) {
        rectangle.strokeColor = new paper.Color(color);
        rectangle.style.strokeWidth = rectangle.strokeColor.alpha > 0 ? 3 : 0;
        if (borderColor.value != color) {
            props.updateAttributes({ borderColor: color });
        }
    },
};

const width = {
    get value() {
        return rectangle.bounds.width;
    },

    set value(value) {
        let newWidth = typeof value == 'number' ? value : parseFloat(value);
        if (newWidth >= 3) {
            rectangle.bounds.width = newWidth;
            recalculateGripsPositions();
            save();
        }
    },
};

const height = {
    get value() {
        return rectangle.bounds.height;
    },

    set value(value) {
        let newHeight = typeof value == 'number' ? value : parseFloat(value);
        if (newHeight >= 3) {
            rectangle.bounds.height = newHeight;
            recalculateGripsPositions();
            save();
        }
    },
};

const controller: RectangleShapeController = {
    getNode: () => props.node,
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

    rectangle = new paper.Shape.Rectangle(
        new paper.Rectangle(center.add(new paper.Point(-size.width / 2, -size.height / 2)), size),
    );

    let grip = new paper.Path.Circle(new paper.Point(0, 0), 6);
    grip.style.strokeWidth = 0;
    upper = grip.clone();
    bottom = grip.clone();
    left = grip.clone();
    right = grip.clone();
    upperLeft = grip.clone();
    upperRight = grip.clone();
    bottomLeft = grip.clone();
    bottomRight = grip.clone();
    recalculateGripsPositions();
    grip.remove();

    grips = new paper.Group([upper, bottom, left, right, upperLeft, upperRight, bottomLeft, bottomRight]);
    all = new paper.Group([rectangle, grips]);
    updateGripsVisibility();

    fillColor.value = attrs.color;
    borderColor.value = attrs.borderColor;
}

function save() {
    props.updateAttributes({
        size: {
            width: rectangle.bounds.width,
            height: rectangle.bounds.height,
        },
        center: {
            x: rectangle.position.x,
            y: rectangle.position.y,
        },
    });
}

function handleResize(width: number, height: number) {
    controller.paperScope!.view.viewSize = new paper.Size(width, height);
}

function getPosition() {
    return rectangle.position;
}

function move(shift: paper.Point) {
    rectangle.position.x += shift.x;
    rectangle.position.y += shift.y;
    grips.visible = false;
}

function scale(factor: number, center: paper.Point) {
    rectangle.scale(factor, new paper.Point(center));
    recalculateGripsPositions();
}

function setSelected(value: boolean) {
    isSelected = value;
    updateGripsVisibility();
}

function updateGripsVisibility(): void {
    grips.visible = isSelected;
    [left, right].forEach((grip) => (grip.visible = height.value > 40));
    [upper, bottom].forEach((grip) => (grip.visible = width.value > 40));
}

function containedInBounds(bounds: paper.Rectangle) {
    return rectangle.bounds.intersects(bounds);
}

function getSnapPoints() {
    return [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
    ].map(
        ([w, h]) =>
            new paper.Point(
                rectangle.position.x + (w * width.value) / 2,
                rectangle.position.y + (h * height.value) / 2,
            ),
    );
}

function onDelete() {
    all.remove();
    return false;
}

function onMouseMove(_event: paper.ToolEvent, hitResult: paper.HitResult, cursorStyle: CSSStyleDeclaration) {
    if (!hitResult) {
        return;
    } else if (rectangle == hitResult.item) {
        cursorStyle.cursor = 'move';
    } else if (upper == hitResult.item || bottom == hitResult.item) {
        cursorStyle.cursor = 'ns-resize';
    } else if (left == hitResult.item || right == hitResult.item) {
        cursorStyle.cursor = 'ew-resize';
    } else if (upperLeft == hitResult.item || bottomRight == hitResult.item) {
        cursorStyle.cursor = 'nwse-resize';
    } else if (upperRight == hitResult.item || bottomLeft == hitResult.item) {
        cursorStyle.cursor = 'nesw-resize';
    }
}

function onMouseDown(_event: paper.ToolEvent, hitResult: paper.HitResult) {
    if (!hitResult) {
        return false;
    }
    if (rectangle == hitResult.item) {
        movedShape = all;
        return true;
    }
    let result = grips.children.find((grip) => grip == hitResult.item);
    if (result) {
        movedShape = result;
    }
    return !!result;
}

function onMouseDrag(event: paper.ToolEvent, snapper: Snapper) {
    if (!movedShape || movedShape == all) {
        return false;
    }

    const shift = event.modifiers.shift ? snapper.snapShift([event.point]) : new paper.Point(0, 0);
    const shifted = event.point.add(shift);
    if (movedShape == upperLeft || movedShape == left || movedShape == bottomLeft) {
        if (event.point.x > right.position.x - 3) {
            left.position.x = right.position.x - 3;
        } else {
            left.position.x = shifted.x;
        }
    }
    if (movedShape == upperRight || movedShape == right || movedShape == bottomRight) {
        if (event.point.x < left.position.x + 3) {
            right.position.x = left.position.x + 3;
        } else {
            right.position.x = shifted.x;
        }
    }
    if (movedShape == upperLeft || movedShape == upper || movedShape == upperRight) {
        if (event.point.y > bottom.position.y - 3) {
            upper.position.y = bottom.position.y - 3;
        } else {
            upper.position.y = shifted.y;
        }
    }
    if (movedShape == bottomLeft || movedShape == bottom || movedShape == bottomRight) {
        if (event.point.y < upper.position.y + 3) {
            bottom.position.y = upper.position.y + 3;
        } else {
            bottom.position.y = shifted.y;
        }
    }

    rectangle.bounds.width = right.position.x - left.position.x;
    rectangle.bounds.height = bottom.position.y - upper.position.y;
    rectangle.position.x = (left.position.x + right.position.x) / 2;
    rectangle.position.y = (bottom.position.y + upper.position.y) / 2;
    updateGripsVisibility();
    recalculateGripsPositions();

    if (event.modifiers.shift) {
        snapper.drawSnapLines([shifted]);
    }

    return true;
}

function onMouseUp() {
    movedShape = null;
    recalculateGripsPositions();
    updateGripsVisibility();
}

function recalculateGripsPositions() {
    let blank = { position: null };
    [
        [upperLeft, upper, upperRight],
        [left, blank, right],
        [bottomLeft, bottom, bottomRight],
    ].forEach((row, i) =>
        row.forEach(
            (grip, j) =>
                (grip.position = rectangle.position.add(
                    new paper.Point(((j - 1) * width.value) / 2, ((i - 1) * height.value) / 2),
                )),
        ),
    );
}
</script>

<style scoped lang="scss">
@use '@/style/canvas-node';
</style>
