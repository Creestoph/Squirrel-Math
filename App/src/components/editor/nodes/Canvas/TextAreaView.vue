<template>
    <node-view-wrapper
        class="area"
        :style="{
            left: x + 0.5 + 'px',
            top: y + 2 + 'px',
            background: fillColor.value,
            color: textColor.value,
            outline: focused ? '3px dotted #cccccc' : 'none',
            border: `3px solid ${borderColor.value}`,
            width: width + 'px',
            height: height + 'px',
        }"
    >
        <div
            class="align-wrapper"
            :style="{
                'vertical-align': align.value,
            }"
        >
            <node-view-content class="content" />
        </div>
        <div class="top border-overlay"></div>
        <div class="bottom border-overlay"></div>
        <div class="left border-overlay"></div>
        <div class="right border-overlay"></div>
    </node-view-wrapper>
</template>

<script setup lang="ts">
import paper from 'paper';
import { snapShift } from './Shape';
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
import { computed, onMounted, ref } from 'vue';
import { TextAreaShapeController } from './TextAreaNode';

const props = defineProps(nodeViewProps);

const focused = ref(false);
let resizing = '';

onMounted(() => {
    const controller: TextAreaShapeController = {
        node: props.node,
        getPos: props.getPos,
        fillColor,
        borderColor,
        textColor,
        align,
        handleResize: () => {},
        getPosition,
        move,
        scale,
        containedInBounds,
        getSnapPoints,
        onDelete: () => {},
        onMouseMove: () => {},
        onMouseDown,
        onMouseDrag,
        onMouseUp: () => {},
        setSelected,
        save: () => {},
    };
    props.editor.storage.geometry.controllers.set(props.node.attrs.id, controller);
});

const x = computed({
    get() {
        return props.node.attrs.x;
    },
    set(x) {
        props.updateAttributes({ x });
    },
});

const y = computed({
    get() {
        return props.node.attrs.y;
    },
    set(y) {
        props.updateAttributes({ y });
    },
});

const width = computed({
    get() {
        return props.node.attrs.width;
    },
    set(width) {
        props.updateAttributes({ width });
    },
});

const height = computed({
    get() {
        return props.node.attrs.height;
    },
    set(height) {
        props.updateAttributes({ height });
    },
});

const borderColor = {
    get value() {
        return props.node.attrs.borderColor;
    },
    set value(borderColor) {
        props.updateAttributes({ borderColor });
    },
};

const textColor = {
    get value() {
        return props.node.attrs.textColor;
    },
    set value(textColor) {
        props.updateAttributes({ textColor });
    },
};

const fillColor = {
    get value() {
        return props.node.attrs.fillColor;
    },
    set value(fillColor) {
        props.updateAttributes({ fillColor });
    },
};

const align = {
    get value(): string {
        return props.node.attrs.align;
    },
    set value(align) {
        props.updateAttributes({ align });
    },
};

function getPosition() {
    return new paper.Point(x.value, y.value);
}

function move(shift: paper.Point) {
    x.value += shift.x;
    y.value += shift.y;
}

function scale(factor: number, center: paper.Point) {
    x.value = center.x + (x.value - center.x) * factor;
    y.value = center.y + (y.value - center.y) * factor;
}

function setSelected(value: boolean) {
    focused.value = value;
}

function containedInBounds(bounds: paper.Rectangle) {
    return new paper.Rectangle(new paper.Point(x.value, y.value), new paper.Size(width.value, height.value)).intersects(
        bounds,
    );
}

function getSnapPoints() {
    return [new paper.Point(x.value, y.value), new paper.Point(x.value + width.value, y.value + height.value)];
}

function onMouseDown(event: paper.ToolEvent) {
    const mousePosition = event.point;
    const boundingBox = new paper.Rectangle(
        new paper.Point(x.value, y.value),
        new paper.Size(width.value, height.value),
    );
    const inbounds =
        mousePosition.x > boundingBox.left - 3 &&
        mousePosition.x < boundingBox.right + 3 &&
        mousePosition.y > boundingBox.top - 3 &&
        mousePosition.y < boundingBox.bottom + 3;
    resizing = '';
    if (!inbounds) {
        return false;
    }
    if (Math.abs(boundingBox.left - mousePosition.x) < 3) {
        resizing = 'left';
    } else if (Math.abs(boundingBox.right - mousePosition.x) < 3) {
        resizing = 'right';
    } else if (Math.abs(boundingBox.top - mousePosition.y) < 3) {
        resizing = 'top';
    } else if (Math.abs(boundingBox.bottom - mousePosition.y) < 3) {
        resizing = 'bottom';
    }
    return true;
}

function onMouseDrag(event: paper.ToolEvent, snapPoints: paper.Point[]) {
    if (!resizing) {
        return false;
    }

    const mousePosition = event.point;
    const boundingBox = new paper.Rectangle(
        new paper.Point(x.value, y.value),
        new paper.Size(width.value, height.value),
    );

    let shift = event.modifiers.shift ? snapShift([mousePosition], snapPoints) : new paper.Point(0, 0);

    const minHeight = 44;
    const minWidth = 44;
    if (resizing == 'left') {
        const w =
            mousePosition.x > boundingBox.right - minWidth ? minWidth : boundingBox.right - mousePosition.add(shift).x;
        width.value = w;
        x.value = boundingBox.right - w;
    } else if (resizing == 'right') {
        width.value =
            mousePosition.x < boundingBox.left + minWidth ? minWidth : mousePosition.add(shift).x - boundingBox.left;
    } else if (resizing == 'top') {
        const h =
            mousePosition.y > boundingBox.bottom - minHeight
                ? minHeight
                : boundingBox.bottom - mousePosition.add(shift).y;
        height.value = h;
        y.value = boundingBox.bottom - h;
    } else if (resizing == 'bottom') {
        height.value =
            mousePosition.y < boundingBox.top + minHeight ? minHeight : mousePosition.add(shift).y - boundingBox.top;
    }

    return true;
}
</script>

<style scoped lang="scss">
@use '@/style/global';
.area {
    position: absolute;
    cursor: move;
    box-sizing: border-box;
    display: table;
    pointer-events: all;

    .content {
        box-sizing: border-box;
        padding: 5px;
        outline: none;
    }

    .align-wrapper {
        display: table-cell;
    }

    .border-overlay {
        position: absolute;
    }
    .top {
        left: 0;
        top: -6px;
        width: 100%;
        height: 4px;
        cursor: ns-resize;
    }
    .bottom {
        left: 0;
        bottom: -6px;
        width: 100%;
        height: 4px;
        cursor: ns-resize;
    }
    .left {
        top: 0;
        left: -6px;
        height: 100%;
        width: 4px;
        cursor: ew-resize;
    }
    .right {
        top: 0;
        right: -6px;
        height: 100%;
        width: 4px;
        cursor: ew-resize;
    }
}
</style>
<style lang="scss">
.area p {
    margin: 0;
}
</style>
