import { getSurroundingWord } from '../tiptap-utils';
import Strike from '@tiptap/extension-strike';

export default Strike.extend({
    addCommands() {
        const parent = this.parent?.();

        return {
            ...parent,

            toggleStrike: () => (commandProps) => {
                const { selection } = commandProps.state;

                if (!selection.empty) {
                    return parent?.toggleStrike!()(commandProps);
                }

                const word = getSurroundingWord(selection.$from);

                if (!word) {
                    return false;
                }

                return commandProps
                    .chain()
                    .setTextSelection(word)
                    .toggleStrike()
                    .setTextSelection(selection.from)
                    .run();
            },
        };
    },
});
