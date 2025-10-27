import { SingleCommands, VueNodeViewRenderer } from '@tiptap/vue-2';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import xml from 'highlight.js/lib/languages/xml';
import CustomElementVue from './CustomElement.vue';
import { TextSelection } from '@tiptap/pm/state';
import { VueConstructor } from 'vue';

const lowlight = createLowlight();
lowlight.register('html', xml);

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        customElement: {
            toggleCustomElement: () => ReturnType;
        };
    }
}

export default CodeBlockLowlight.extend({
    name: 'customElement',
    draggable: true,

    parseHTML: () => [{ tag: 'custom' }],

    renderHTML: () => ['custom', 0],

    addNodeView: () => VueNodeViewRenderer(CustomElementVue as unknown as VueConstructor<Vue>),

    addCommands() {
        return {
            toggleCustomElement:
                () =>
                ({ commands }: { commands: SingleCommands }) =>
                    commands.toggleNode(this.name, 'paragraph'),
        };
    },

    addKeyboardShortcuts() {
        return {
            Tab: () => {
                const { state, dispatch } = this.editor.view;
                if (state.selection.$from.parent.type !== this.type) {
                    return false;
                }

                dispatch?.(state.tr.insertText(' '.repeat(4)));
                return true;
            },

            'Mod-a': () => {
                const { state, dispatch } = this.editor.view;
                const { $from } = state.selection;
                if ($from.parent.type !== this.type) {
                    return false;
                }

                const start = $from.start();
                const end = start + $from.parent.content.size;
                dispatch?.(state.tr.setSelection(TextSelection.create(state.doc, start, end)));
                return true;
            },
        };
    },
}).configure({
    lowlight,
});
