import { Extension } from 'tiptap';
import { EditorState } from 'prosemirror-state';

export default class TextAlign extends Extension {
    private static alignToAttribute(align: string) {
        return align === 'left' ? '' : align;
    }

    get name() {
        return 'text_align';
    }

    get commands() {
        return () =>
            (newAlign: string) =>
            (state: EditorState, dispatch: any) => {
                if (dispatch) {
                    const transaction = state.tr;

                    state.tr.selection.ranges.forEach((range) => {
                        const from = range.$from.pos;
                        const to = range.$to.pos;

                        state.doc.nodesBetween(from, to, (node, pos) => {
                            if (node.type.name === 'paragraph')
                                transaction.setNodeMarkup(pos, undefined, {
                                    ...node.attrs,
                                    textAlign:
                                        TextAlign.alignToAttribute(newAlign),
                                });
                        });
                    });

                    dispatch(transaction);
                }

                return true;
            };
    }

    isActive(align: string) {
        let found = false;
        this.editor.state.tr.selection.ranges.forEach((range: any) => {
            const from = range.$from.pos;
            const to = range.$to.pos;
            this.editor.state.doc.nodesBetween(from, to, (node: any) => {
                found =
                    found ||
                    (node.type.name === 'paragraph' &&
                        node.attrs.textAlign ==
                            TextAlign.alignToAttribute(align));
            });
        });
        return found;
    }
}
