import ListItem from '@tiptap/extension-list-item';

export default ListItem.extend({
    content: 'paragraph (paragraph | bulletList | orderedList | expression)*',
    draggable: false,
    parseHTML: () => [{ tag: 'li' }],
    renderHTML: () => ['li', 0],
});
