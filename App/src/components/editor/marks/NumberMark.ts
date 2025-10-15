import { InputRule, Mark, markPasteRule } from '@tiptap/core';

const CHAR_CLASS = '[0-9><=%+⋅]';

export default Mark.create({
    name: 'number',
    inclusive: false,

    parseHTML: () => [{ tag: 'number' }],

    renderHTML: () => ['number', 0],

    addInputRules() {
        return [
            new InputRule({
                find: new RegExp(`(${CHAR_CLASS})$`),
                handler: ({ range }) => {
                    queueMicrotask(() => {
                        const { state, view } = this.editor;
                        const tr = state.tr.addMark(range.from, range.to + 1, this.type.create());
                        view.dispatch(tr);
                    });
                    return;
                },
            }),
        ];
    },

    addPasteRules() {
        return [markPasteRule({ find: new RegExp(`(${CHAR_CLASS}+)`, 'g'), type: this.type })];
    },
});
