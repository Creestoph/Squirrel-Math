import { Node, VueNodeViewRenderer } from '@tiptap/vue-3';
import TitleShort from './TitleShort.vue';
import Title from './Title.vue';
import { Plugin } from '@tiptap/pm/state';
import { dropNewlines } from '../tiptap-utils';

export default Node.create<{ shortVersion: boolean }>({
    name: 'title',
    content: 'text*',
    marks: '',
    selectable: false,

    addOptions() {
        return {
            shortVersion: false,
        };
    },

    parseHTML: () => [{ tag: 'h1' }],
    renderHTML: () => ['h1', 0],

    addNodeView() {
        return VueNodeViewRenderer(this.options.shortVersion ? TitleShort : Title);
    },

    /**
     * Drop newline characters when pasting into title node
     */
    addProseMirrorPlugins() {
        return [
            new Plugin({
                props: {
                    handleDOMEvents: {
                        paste: (view, event) => {
                            return view.state.selection.$from.parent.type.name === this.name
                                ? dropNewlines(event as ClipboardEvent, view)
                                : false;
                        },
                    },
                },
            }),
        ];
    },
});
