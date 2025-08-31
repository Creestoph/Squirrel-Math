import { ListItem } from 'tiptap-extensions';

export default class CustomListItem extends ListItem {
    get schema() {
        return {
            content:
                'paragraph (paragraph | bullet_list | ordered_list | expression)*',
            defining: true,
            draggable: false,
            parseDOM: [{ tag: 'li' }],
            toDOM: () => ['li', 0],
        };
    }
}
