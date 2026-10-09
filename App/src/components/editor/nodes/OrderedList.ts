import OrderedList from '@tiptap/extension-ordered-list';
import { wrappingInputRule } from '@tiptap/core';

export default OrderedList.extend({
    addInputRules() {
        return [
            wrappingInputRule({
                find: /^(\d+)[.)]\s$/,
                type: this.type,
                getAttributes: (match) => ({ start: +match[1] }),
                joinPredicate: (match, node) => node.childCount + node.attrs.start === +match[1],
            }),
        ];
    },
});
