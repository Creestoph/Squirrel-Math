import Document from '@tiptap/extension-document';

export default Document.extend({
    addOptions() {
        return {
            shortVersion: false,
        };
    },

    content() {
        return this.options.shortVersion ? 'title chapter*' : 'title intro chapter*';
    },
});
