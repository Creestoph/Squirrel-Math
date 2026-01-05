import { Node, VueNodeViewRenderer } from '@tiptap/vue-3';
import TitleShort from './TitleShort.vue';
import Title from './Title.vue';
import { Plugin, TextSelection } from '@tiptap/pm/state';
import { dropNewlines } from '../tiptap-utils';

export default Node.create<{ shortVersion: boolean }>({
    name: 'title',
    content: 'text*',
    marks: '',

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
                            const { state } = view;
                            const { $from } = state.selection;

                            /**
                             * Some weird quick clicks and pastes to the title may result in NodeSelection on the title,
                             * and then pasting any content throws error; so changing to TextSelestion at pos 1 (start of title)
                             */
                            if ($from.parent.type.name === 'doc') {
                                state.tr.setSelection(TextSelection.create(state.doc, 1));
                            } else if ($from.parent.type.name !== this.name) {
                                return false;
                            }

                            return dropNewlines(event as ClipboardEvent, view);
                        },
                    },
                },
            }),
        ];
    },
});
