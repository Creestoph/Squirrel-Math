<template>
    <node-view-wrapper
        class="area no-selection"
        :style="{
            left: x + 0.5 + 'px',
            top: y + 2 + 'px',
            background: fillColor.value,
            outline: focused ? '3px dotted #cccccc' : 'none',
            border: `3px solid ${borderColor.value}`,
            width: width + 'px',
            height: height + 'px',
            'pointer-events': editing ? 'all' : 'none',
        }"
        :contenteditable="editing"
        ref="wrapper"
    >
        <div
            class="align-wrapper no-selection"
            :style="{
                'vertical-align': align.value,
            }"
        >
            <node-view-content class="content no-selection" />
        </div>
    </node-view-wrapper>
</template>

<script setup lang="ts">
import paper from 'paper';
import { snapShift } from './Shape';
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
import { ComponentPublicInstance, computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { TextAreaShapeController } from './TextAreaNode';

const props = defineProps(nodeViewProps);

const focused = ref(false);
const wrapper = ref<ComponentPublicInstance>(null!);
const resizing = ref('');
const editing = ref(false);
let resizeObserver: ResizeObserver;
let minWidth = 44;
let minHeight = 44;

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

const controller: TextAreaShapeController = {
    node: props.node,
    getPos: props.getPos,
    fillColor,
    borderColor,
    align,
    editing,
    handleResize: () => {},
    getPosition,
    move,
    scale,
    containedInBounds,
    getSnapPoints,
    onDelete: () => {},
    onMouseMove,
    onMouseDown,
    onMouseDrag,
    onMouseUp,
    setSelected,
    save: () => {},
};

watch(() => props.node, afterNodeChanged);

onMounted(() => {
    afterNodeChanged();

    (resizeObserver = new ResizeObserver(([wrapper]) => {
        const newWidth = wrapper.borderBoxSize[0].inlineSize;
        const newHeight = wrapper.borderBoxSize[0].blockSize;
        if (newWidth === width.value && newHeight === height.value) {
            return;
        }
        if (newWidth > width.value) {
            minWidth = Math.max(newWidth, 44);
        }
        if (newHeight > height.value) {
            minHeight = Math.max(newHeight, 44);
        }
        requestAnimationFrame(() => {
            width.value = newWidth;
            height.value = newHeight;
        });
    })).observe(wrapper.value.$el as HTMLElement);
});

onUnmounted(() => resizeObserver.disconnect());

function afterNodeChanged() {
    props.editor.storage.geometry.controllers.set(props.node.attrs.id, controller);
}

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

function onMouseMove(event: paper.ToolEvent, hitResult: paper.HitResult | null, cursorStyle: CSSStyleDeclaration) {
    if (editing.value) {
        return;
    }
    const resizeArea = getHoveredResizeArea(event);
    if (resizeArea == 'left' || resizeArea == 'right') {
        cursorStyle.cursor = 'ew-resize';
    } else if (resizeArea == 'top' || resizeArea == 'bottom') {
        cursorStyle.cursor = 'ns-resize';
    } else if (resizeArea == 'inside') {
        cursorStyle.cursor = 'move';
    }
}

function onMouseDown(event: paper.ToolEvent) {
    if (editing.value) {
        return true;
    }

    const area = getHoveredResizeArea(event);
    resizing.value = area === 'inside' ? '' : area;
    return !!area;
}

function getHoveredResizeArea(event: paper.ToolEvent): string {
    const mousePosition = event.point;
    const boundingBox = new paper.Rectangle(
        new paper.Point(x.value, y.value),
        new paper.Size(width.value, height.value),
    );
    const margin = 4;
    if (Math.abs(boundingBox.left - mousePosition.x) < margin) {
        return 'left';
    } else if (Math.abs(boundingBox.right - mousePosition.x) < margin) {
        return 'right';
    } else if (Math.abs(boundingBox.top - mousePosition.y) < margin) {
        return 'top';
    } else if (Math.abs(boundingBox.bottom - mousePosition.y) < margin) {
        return 'bottom';
    } else if (
        mousePosition.x > boundingBox.left - margin &&
        mousePosition.x < boundingBox.right + margin &&
        mousePosition.y > boundingBox.top - margin &&
        mousePosition.y < boundingBox.bottom + margin
    ) {
        return 'inside';
    }
    return '';
}

function onMouseDrag(event: paper.ToolEvent, snapPoints: paper.Point[]) {
    if (editing.value) {
        return true;
    }

    if (!resizing.value) {
        return false;
    }

    const mousePosition = event.point;
    const boundingBox = new paper.Rectangle(
        new paper.Point(x.value, y.value),
        new paper.Size(width.value, height.value),
    );

    let shift = event.modifiers.shift ? snapShift([mousePosition], snapPoints) : new paper.Point(0, 0);

    if (resizing.value == 'left') {
        const w =
            mousePosition.x > boundingBox.right - minWidth ? minWidth : boundingBox.right - mousePosition.add(shift).x;
        width.value = w;
        x.value = boundingBox.right - w;
    } else if (resizing.value == 'right') {
        width.value =
            mousePosition.x < boundingBox.left + minWidth ? minWidth : mousePosition.add(shift).x - boundingBox.left;
    } else if (resizing.value == 'top') {
        const h =
            mousePosition.y > boundingBox.bottom - minHeight
                ? minHeight
                : boundingBox.bottom - mousePosition.add(shift).y;
        height.value = h;
        y.value = boundingBox.bottom - h;
    } else if (resizing.value == 'bottom') {
        height.value =
            mousePosition.y < boundingBox.top + minHeight ? minHeight : mousePosition.add(shift).y - boundingBox.top;
    }

    return true;
}

function onMouseUp() {
    resizing.value = '';
}
</script>

<style scoped lang="scss">
@use '@/style/global';
.area {
    position: absolute;
    box-sizing: border-box;
    display: table;

    .content {
        box-sizing: border-box;
        padding: 5px;
        outline: none;
    }

    .align-wrapper {
        display: table-cell;
    }
}
</style>
<style lang="scss">
.area p {
    margin: 0;
}
</style>
