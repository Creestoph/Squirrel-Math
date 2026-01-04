<template>
    <node-view-wrapper as="canvas" ref="canvas"></node-view-wrapper>
</template>

<script setup lang="ts">
import paper from 'paper';
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
import { ComponentPublicInstance, onMounted, ref, watch } from 'vue';
import { CircleShapeController } from './CircleNode';
import { Snapper } from './utils';

const props = defineProps(nodeViewProps);

let circle: paper.Shape.Ellipse = null!;
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
        if (color != fillColor.value) {
            props.updateAttributes({ color });
        }
        if (color == '#00000000') {
            color = '#00000001';
        }
        circle.fillColor = new paper.Color(color);
        grips.fillColor = new paper.Color(color).multiply(0.7);
        grips.fillColor.alpha = 1;
    },
};

const borderColor = {
    get value() {
        return props.node.attrs.borderColor;
    },

    set value(color) {
        circle.strokeColor = new paper.Color(color);
        circle.style.strokeWidth = circle.strokeColor.alpha > 0 ? 3 : 0;
        if (color != borderColor.value) {
            props.updateAttributes({ borderColor: color });
        }
    },
};

const width = {
    get value() {
        return circle.bounds.width;
    },

    set value(value) {
        let newWidth = typeof value == 'number' ? value : parseFloat(value);
        if (newWidth >= 3) {
            circle.bounds.width = newWidth;
            recalculateGripsPositions();
            save();
        }
    },
};

const height = {
    get value() {
        return circle.bounds.height;
    },

    set value(value) {
        let newHeight = typeof value == 'number' ? value : parseFloat(value);
        if (newHeight >= 3) {
            circle.bounds.height = newHeight;
            recalculateGripsPositions();
            save();
        }
    },
};

const controller: CircleShapeController = {
    getNode: () => props.node,
    getPos: props.getPos,
    paperScope: new paper.PaperScope(),
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

    circle = new paper.Shape.Ellipse(
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
    all = new paper.Group([circle, grips]);
    updateGripsVisibility();

    fillColor.value = attrs.color;
    borderColor.value = attrs.borderColor;
}

function save() {
    props.updateAttributes({
        size: {
            width: circle.bounds.width,
            height: circle.bounds.height,
        },
        center: {
            x: circle.position.x,
            y: circle.position.y,
        },
    });
}

function handleResize(width: number, height: number) {
    controller.paperScope!.view.viewSize = new paper.Size(width, height);
}

function getPosition() {
    return circle.position;
}

function move(shift: paper.Point) {
    all.translate(shift);
    grips.visible = false;
}

function scale(factor: number, center: paper.Point) {
    circle.scale(factor, new paper.Point(center));
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
    return circle.bounds.intersects(bounds);
}

function getSnapPoints(): paper.Point[] {
    return [left, upper, right, bottom, circle].map((c) => c.position);
}

function onDelete() {
    all.remove();
    return false;
}

function onMouseMove(_event: paper.ToolEvent, hitResult: paper.HitResult, cursorStyle: CSSStyleDeclaration) {
    if (!hitResult) {
        return;
    } else if (circle == hitResult.item) {
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
    if (circle == hitResult.item) {
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

    let shift = event.modifiers.shift ? snapper.snapShift([event.point]) : new paper.Point(0, 0);
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

    circle.bounds.width = right.position.x - left.position.x;
    circle.bounds.height = bottom.position.y - upper.position.y;
    circle.position.x = (left.position.x + right.position.x) / 2;
    circle.position.y = (bottom.position.y + upper.position.y) / 2;
    recalculateGripsPositions();
    updateGripsVisibility();

    if (event.modifiers.shift) {
        snapper.drawSnapLines([shifted]);
    }

    return true;
}

function onMouseUp() {
    movedShape = null;
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
                (grip.position = circle.position.add(
                    new paper.Point(((j - 1) * width.value) / 2, ((i - 1) * height.value) / 2),
                )),
        ),
    );
}
</script>

<style scoped lang="scss">
@use '@/style/canvas-node';
</style>
