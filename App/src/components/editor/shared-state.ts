import { ValueObject } from '@/models/common';
import { ImageData } from '@/models/lesson';

export const allComments: ValueObject<Record<string, { text: string; hidden: boolean }>> = { value: {} };
export const lessonImages: ValueObject<{ [key: string]: ImageData }> = { value: {} };
export const globalImages: ValueObject<{ [key: string]: ImageData }> = {
    value: {
        'sheep.png': { src: require(`@/assets/global-images/sheep.png`), name: 'Owca' },
        'squirrel.png': { src: require(`@/assets/global-images/squirrel.png`), name: 'Wiewiórka' },
    },
};
