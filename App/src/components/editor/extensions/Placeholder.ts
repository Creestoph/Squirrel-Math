import { Extension } from '@tiptap/core';
import { Plugin, PluginKey, EditorState } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Node as PMNode } from 'prosemirror-model';

export interface PlaceholderOptions {
    emptyNodeClass: string;
    emptyNodeText: (node: PMNode) => string;
}

export default Extension.create<PlaceholderOptions>({
    name: 'placeholder',

    addOptions() {
        return {
            emptyNodeClass: 'empty',
            emptyNodeText: () => 'Write something …',
        };
    },

    addProseMirrorPlugins() {
        const options = this.options;

        return [
            new Plugin({
                key: new PluginKey('placeholder'),
                props: {
                    decorations(state: EditorState) {
                        const decos: Decoration[] = [];

                        state.doc.descendants((node: PMNode, pos: number) => {
                            if (node.content.size === 0) {
                                decos.push(
                                    Decoration.node(pos, pos + node.nodeSize, {
                                        class: options.emptyNodeClass,
                                        'data-empty-text': options.emptyNodeText(node),
                                    }),
                                );
                            }

                            // stop descending into tables or elements having text
                            return (
                                node.type.name !== 'table' &&
                                node.children.every((n) => !n.isText || !n.text || n.text.length === 0)
                            );
                        });

                        return DecorationSet.create(state.doc, decos);
                    },
                },
            }),
        ];
    },
});
