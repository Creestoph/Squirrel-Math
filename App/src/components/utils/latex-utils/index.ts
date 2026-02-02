import katex from 'katex';


export interface LatexRenderer {
    render(latex: string, displayMode?: boolean): string;
}

export const useLatexRenderer: () => LatexRenderer = () => ({
    render: (latex: string, displayMode: boolean = false): string => {
        return katex.renderToString(latex, {
            displayMode,
            throwOnError: false,
            strict: false,
            output: 'html'
        });
    }
})