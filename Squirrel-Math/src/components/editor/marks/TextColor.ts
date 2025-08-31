import { colorsDifference, rgbToHex } from '@/components/utils/colors';
import { Mark } from 'tiptap';
import { updateMark } from 'tiptap-commands';
import ColorPicker from '../ColorPicker.vue';

export default class TextColor extends Mark {
    get name() {
        return 'text_color';
    }

    get schema() {
        return {
            attrs: {
                color: {
                    default: 'black',
                },
            },
            parseDOM: [
                {
                    tag: 'span[style^="color"]',
                    getAttrs: (dom: any) => {
                        const color = dom.style.color;
                        const colorHex =
                            color.substr(0, 3) == 'rgb'
                                ? rgbToHex(color)
                                : color;
                        const candidates = ColorPicker.data()
                            .availableColors.flat()
                            .map((hex: string) => [
                                hex,
                                colorsDifference(hex, colorHex),
                            ]);
                        candidates.sort(
                            (candidate1: any, candidate2: any) =>
                                candidate1[1] - candidate2[1],
                        );
                        if (candidates[0][1] < 50)
                            return { color: candidates[0][0] };
                        else return { color: 'black' };
                    },
                },
            ],
            toDOM: (mark: any) => [
                'span',
                { style: 'color: ' + mark.attrs.color },
                0,
            ],
        };
    }

    commands({ type }: any) {
        return (attrs: any) => updateMark(type, attrs);
    }
}
