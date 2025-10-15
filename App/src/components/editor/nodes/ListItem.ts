import ListItem from '@tiptap/extension-list-item';

export default ListItem.extend({
    content: 'paragraph (paragraph | bulletList | orderedList | expression)*',
    defining: true,
    draggable: false,
    parseHTML: () => [{ tag: 'li' }],
    renderHTML: () => ['li', 0],
});
