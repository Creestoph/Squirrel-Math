import { Node, VueNodeViewRenderer } from '@tiptap/vue-2';
import TitleShort from './TitleShort.vue';
import Title from './Title.vue';
import { VueConstructor } from 'vue';

export default Node.create<{ shortVersion: boolean }>({
    name: 'title',
    content: 'text*',
    // defining: true,
    marks: '',

    addOptions() {
        return {
            shortVersion: false,
        };
    },

    parseHTML: () => [{ tag: 'h1' }],
    renderHTML: () => ['h1', 0],

    addNodeView() {
        return VueNodeViewRenderer((this.options.shortVersion ? TitleShort : Title) as unknown as VueConstructor<Vue>);
    },
});
