import temml from 'temml';
import renderMathInElement from './renderMathInElement';

export interface LatexRenderer {
    recalculateWholePage(): void;
    render(latex: string, displayMode?: boolean): string;
}

export const useLatexRenderer: () => LatexRenderer = () => ({
    recalculateWholePage: () => {
        return;
        renderMathInElement(document.body, { delimeters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
        ]});
    },
    render: (latex: string, displayMode: boolean = false): string => {
        return temml.renderToString(latex, { displayMode });
    }

})