<template>
    <div v-html="attrs.code" ref="output"></div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class CustomComponent extends Vue { 
    @Prop() attrs?: any;

    private runScripts(htmlElement: Element) {
      Array.from(htmlElement.children).forEach(child => {
        if (child.tagName == 'SCRIPT') {
          htmlElement.removeChild(child);
          let childCopy = document.createElement('script');
          childCopy.innerHTML = child.innerHTML;
          childCopy.src = (child as HTMLScriptElement).src;
          htmlElement.appendChild(childCopy);
        }
        else 
          this.runScripts(child);
      });
    }

    mounted() {
        this.$nextTick(() => this.runScripts(this.$refs.output as Element));
    }
}
</script>
