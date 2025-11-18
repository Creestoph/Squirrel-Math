import { getSurroundingWord } from '../tiptap-utils';
import Italic from '@tiptap/extension-italic';

export default Italic.extend({
    addCommands() {
        const parent = this.parent?.();

        return {
            ...parent,

            toggleItalic: () => (commandProps) => {
                const { selection } = commandProps.state;

                if (!selection.empty) {
                    return parent?.toggleItalic!()(commandProps);
                }

                const word = getSurroundingWord(selection.$from);

                if (!word) {
                    return false;
                }

                return commandProps
                    .chain()
                    .setTextSelection(word)
                    .toggleItalic()
                    .setTextSelection(selection.from)
                    .run();
            },
        };
    },
});
