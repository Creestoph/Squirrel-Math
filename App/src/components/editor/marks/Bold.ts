import Bold from '@tiptap/extension-bold';
import { getSurroundingWord } from '../tiptap-utils';

export default Bold.extend({
    addCommands() {
        const parent = this.parent?.();

        return {
            ...parent,

            toggleBold: () => (commandProps) => {
                const { selection } = commandProps.state;

                if (!selection.empty) {
                    return parent?.toggleBold!()(commandProps);
                }

                const word = getSurroundingWord(selection.$from);

                if (!word) {
                    return false;
                }

                return commandProps.chain().setTextSelection(word).toggleBold().setTextSelection(selection.from).run();
            },
        };
    },
});
