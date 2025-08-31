import { Node } from 'tiptap';
import { toggleWrap } from 'tiptap-commands';

export default class Formula extends Node {
    get name() {
        return 'formula';
    }

    get schema() {
        return {
            content: '(paragraph | expression | ordered_list | bullet_list)+',
            group: 'block',
            defining: true,
            draggable: true,
            parseDOM: [{ tag: 'formula' }],
            toDOM: () => ['formula', { class: 'formula' }, 0],
        };
    }

    commands({ type }: any) {
        return () => toggleWrap(type);
    }
}
