import { getSurroundingWord } from '../tiptap-utils';
import Underline from '@tiptap/extension-underline';

export default Underline.extend({
    addCommands() {
        const parent = this.parent?.();

        return {
            ...parent,

            toggleUnderline: () => (commandProps) => {
                const { selection } = commandProps.state;

                if (!selection.empty) {
                    return parent?.toggleUnderline!()(commandProps);
                }

                const word = getSurroundingWord(selection.$from);

                if (!word) {
                    return false;
                }

                return commandProps
                    .chain()
                    .setTextSelection(word)
                    .toggleUnderline()
                    .setTextSelection(selection.from)
                    .run();
            },
        };
    },
});
