import { Node } from '@tiptap/vue-3';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import BuiltInComponentVue from './BuiltInComponent.vue';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        component: {
            createComponent: () => ReturnType;
        };
    }
}

export default Node.create({
    name: 'component',
    group: 'block',
    draggable: true,

    parseHTML: () => [{ tag: 'component' }],

    renderHTML: ({ HTMLAttributes }) => ['component', HTMLAttributes],

    addAttributes() {
        return {
            componentName: {
                default: '',
                parseHTML: (element) => element.getAttribute('componentName'),
                renderHTML: (attributes) => ({ componentName: attributes.componentName }),
            },
            args: {
                default: [],
                parseHTML: (element) => JSON.parse(element.getAttribute('args')!),
                renderHTML: (attributes) => ({ args: JSON.stringify(attributes.args) }),
            },
        };
    },

    addNodeView: () => VueNodeViewRenderer(BuiltInComponentVue),

    addCommands() {
        return {
            createComponent:
                () =>
                ({ state, commands }) =>
                    commands.insertContentAt(state.selection.$head.pos, this.type.create({})),
        };
    },
});
