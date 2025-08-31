<template>
    <div v-html="attrs.code" ref="output" style="position: relative"></div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class CustomComponent extends Vue {
    @Prop() attrs?: any;

    private runScripts(htmlElement: Element) {
        Array.from(htmlElement.children).forEach((child) => {
            if (child.tagName == 'SCRIPT') {
                const scriptChild = child as HTMLScriptElement;
                htmlElement.removeChild(scriptChild);
                const childCopy = document.createElement('script');
                childCopy.innerHTML = scriptChild.innerHTML;
                if (scriptChild.src) childCopy.src = scriptChild.src;
                htmlElement.appendChild(childCopy);
            } else this.runScripts(child);
        });
    }

    mounted() {
        this.$nextTick(() => this.runScripts(this.$refs.output as Element));
    }
}
</script>
