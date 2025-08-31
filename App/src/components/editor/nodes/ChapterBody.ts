import { Node } from 'tiptap';

export default class ChapterBody extends Node {
    constructor(private shortVersion: boolean) {
        super();
    }

    get name() {
        return 'chapter_body';
    }

    get schema() {
        return {
            content: this.shortVersion ? 'block+' : '(semantic_tag block+)+',
            parseDOM: [{ tag: 'chapter-body' }],
            toDOM: () => ['chapter-body', { class: 'chapter_mask' }, ['div', { class: 'chapter-body' }, 0]],
        };
    }
}
