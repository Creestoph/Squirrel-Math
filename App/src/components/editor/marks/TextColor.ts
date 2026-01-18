import { colorsDifference, rgbToHex } from '@/utils/colors';
import { Mark } from '@tiptap/vue-3';
import { colors } from '@/style/palette';
import { getSurroundingWord } from '../tiptap-utils';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        textColor: {
            setColor: (attrs: { color: string }) => ReturnType;
        };
    }
}

export default Mark.create({
    name: 'textColor',

    addAttributes() {
        return {
            color: {
                default: 'black',
            },
        };
    },

    parseHTML: () => [
        {
            tag: 'span[style^="color"]',
            getAttrs: (dom: any) => {
                const color = dom.style.color;
                const colorHex = color.substr(0, 3) == 'rgb' ? rgbToHex(color) : color;
                const candidates = colors.map((hex) => [hex, colorsDifference(hex, colorHex)]) as [string, number][];
                candidates.sort(([_1, d1], [_2, d2]) => d1 - d2);
                return { color: candidates[0][1] < 50 ? candidates[0][0] : 'black' };
            },
        },
    ],

    renderHTML: ({ HTMLAttributes }) => ['span', { style: 'color: ' + HTMLAttributes.color }, 0],

    addCommands() {
        return {
            setColor:
                (attrs) =>
                ({ commands, state, chain }) => {
                    const { selection } = state;

                    if (!selection.empty) {
                        return commands.setMark(this.type, attrs);
                    }

                    const word = getSurroundingWord(selection.$from);

                    if (!word) {
                        return false;
                    }

                    return chain()
                        .setTextSelection(word)
                        .setMark(this.type, attrs)
                        .setTextSelection(selection.from)
                        .run();
                },
        };
    },
});
