<template>
    <div v-html="attrs.code" ref="output" style="position: relative"></div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';

defineProps<{ attrs: { code: string } }>();
const output = ref<HTMLDivElement>(null!);

onMounted(() => nextTick(() => runScripts(output.value)));

function runScripts(htmlElement: Element) {
    Array.from(htmlElement.children).forEach((child) => {
        if (child.tagName == 'SCRIPT') {
            const scriptChild = child as HTMLScriptElement;
            htmlElement.removeChild(scriptChild);
            const childCopy = document.createElement('script');
            childCopy.innerHTML = scriptChild.innerHTML;
            if (scriptChild.src) {
                childCopy.src = scriptChild.src;
            }
            htmlElement.appendChild(childCopy);
        } else {
            runScripts(child);
        }
    });
}
</script>
