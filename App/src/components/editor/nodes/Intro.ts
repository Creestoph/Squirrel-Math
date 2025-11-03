import { Node, VueNodeViewRenderer } from '@tiptap/vue-3';
import LessonIntro from './Intro.vue';

export default Node.create({
    name: 'intro',
    content: 'block+',
    parseHTML: () => [{ tag: 'intro' }],
    renderHTML: () => ['intro', 0],
    addNodeView: () => VueNodeViewRenderer(LessonIntro),
});
