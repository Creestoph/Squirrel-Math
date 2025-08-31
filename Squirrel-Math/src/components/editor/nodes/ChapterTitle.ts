import { Node } from 'tiptap';
import ChapterTitleVue from './ChapterTitle.vue';

export default class ChapterTitle extends Node {
    get name() {
        return 'chapter_title';
    }

    get schema() {
        return {
            attrs: {
                isHidden: {
                    default: false,
                },
            },
            content: 'inline*',
            marks: '',
            parseDOM: [
                {
                    tag: 'chapter-title',
                    getAttrs: (dom: any) => ({
                        isHidden: dom.getAttribute('isHidden') === 'true',
                    }),
                },
            ],
            toDOM: (node: any) => [
                'chapter-title',
                { isHidden: node.attrs.isHidden },
                0,
            ],
        };
    }

    get view() {
        return ChapterTitleVue;
    }
}
