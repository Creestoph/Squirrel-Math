import temml from 'temml';

export interface LatexRenderer {
    recalculateWholePage(): void;
    render(latex: string, displayMode?: boolean): string;
}

export const useLatexRenderer: () => LatexRenderer = () => ({
    recalculateWholePage: () => {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT
        );
        
        const nodes: Node[] = [];
        let node = walker.nextNode();
        while (node) {
            if (node.textContent?.match(/\$\$[\s\S]+?\$\$|\$[^$]+?\$/)) {
                nodes.push(node);
            }
            node = walker.nextNode();
        }
        
        nodes.forEach(n => {
            const parent = n.parentElement;
            if (!parent) {
                return;
            }

            const text = n.textContent || '';
            const html = text
                .replace(/\$\$([\s\S]+?)\$\$/g, (_, latex) => temml.renderToString(latex, {displayMode: true}))
                .replace(/\$([^$]+?)\$/g, (_, latex) => temml.renderToString(latex, {displayMode: false}));
            
            const span = document.createElement('span');
            span.innerHTML = html;
            parent.replaceChild(span, n);
        });
    },
    render: (latex: string, displayMode: boolean = false): string => {
        return temml.renderToString(latex, { displayMode });
    }

})