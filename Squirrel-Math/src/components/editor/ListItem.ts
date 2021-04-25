import { ListItem } from 'tiptap-extensions';

export default class CustomListItem extends ListItem {
  get schema() {
    return {
      content: 'paragraph (bullet_list | ordered_list)?',
      defining: true,
      draggable: false,
      parseDOM: [
        { tag: 'li' },
      ],
      toDOM: () => ['li', 0],
    }
  }
}
