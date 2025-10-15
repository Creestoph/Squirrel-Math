import { Node } from '@tiptap/vue-2';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        chapter: {
            createChapter: () => ReturnType;
            removeChapter: () => ReturnType;
        };
    }
}

export default Node.create({
    name: 'chapter',
    content: 'chapterTitle chapterBody',
    parseHTML: () => [{ tag: 'chapter' }],
    renderHTML: () => ['chapter', ['div', { class: 'chapter' }, 0]],
    addCommands() {
        return {
            createChapter:
                () =>
                ({ state, commands }) => {
                    const { $from } = state.selection;

                    // Find chapter node
                    let chapterDepth = $from.depth;
                    let chapterPos = $from.pos;

                    // Walk up the tree to find the chapter node
                    for (let d = $from.depth; d > 0; d--) {
                        const node = $from.node(d);
                        if (node.type.name === this.name) {
                            chapterDepth = d;
                            chapterPos = $from.after(d);
                            break;
                        }
                    }

                    // Insert at the end of current chapter if we're inside one
                    if (chapterDepth > 0) {
                        return commands.insertContentAt(chapterPos, this.type.createAndFill());
                    }

                    // Otherwise insert at current position
                    return commands.insertContent(this.type.createAndFill());
                },
            removeChapter:
                () =>
                ({ state, chain }) => {
                    const $pos = state.selection.$anchor;
                    for (let d = $pos.depth; d > 0; d--) {
                        const node = $pos.node(d);
                        if (node.type.name === this.name) {
                            return chain()
                                .deleteRange({ from: $pos.before(d), to: $pos.after(d) })
                                .run();
                        }
                    }
                    return false;
                },
        };
    },
});
