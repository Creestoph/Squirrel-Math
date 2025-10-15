import { Node } from '@tiptap/vue-2';

export default Node.create<{ shortVersion: boolean }>({
    name: 'chapterBody',

    addOptions() {
        return {
            shortVersion: false,
        };
    },

    content() {
        return this.options.shortVersion ? 'block+' : '(semanticTag block+)+';
    },

    parseHTML() {
        return [{ tag: 'chapter-body' }];
    },

    renderHTML() {
        return ['chapter-body', { class: 'chapter_mask' }, ['div', { class: 'chapter-body' }, 0]];
    },
});
