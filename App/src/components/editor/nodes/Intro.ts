import { Node, VueNodeViewRenderer } from '@tiptap/vue-2';
import LessonIntro from './Intro.vue';
import { VueConstructor } from 'vue';

export default Node.create({
    name: 'intro',
    content: 'block+',
    parseHTML: () => [{ tag: 'intro' }],
    renderHTML: () => ['intro', 0],
    addNodeView: () => VueNodeViewRenderer(LessonIntro as unknown as VueConstructor<Vue>),
});
