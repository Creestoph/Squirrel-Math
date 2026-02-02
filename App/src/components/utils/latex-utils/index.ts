import temml from 'temml';

export interface LatexRenderer {
    render(latex: string, displayMode?: boolean): string;
}

export const useLatexRenderer: () => LatexRenderer = () => ({
    render: (latex: string, displayMode: boolean = false): string => {
        return temml.renderToString(latex, { displayMode });
    }

})