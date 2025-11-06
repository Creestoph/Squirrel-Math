import { TableCell } from '@tiptap/extension-table';

interface TableCellAttributes {
    style: string;
    background: string | null;
    borderColorLeft: string;
    borderColorRight: string;
    borderColorTop: string;
    borderColorBottom: string;
    borderLeft: number;
    borderRight: number;
    borderTop: number;
    borderBottom: number;
}

export default TableCell.extend({
    content: '(paragraph | expression | image | component | geometry)+',

    addAttributes() {
        return {
            ...(this as any).parent?.(),

            background: {
                default: null,
                parseHTML: (dom: HTMLElement) => dom.style.backgroundColor || null,
                renderHTML: (attrs: TableCellAttributes) => ({ style: `background-color: ${attrs.background}` }),
            },
            borderColorLeft: {
                default: '#cccccc',
                parseHTML: (dom: HTMLElement) => dom.style.borderLeftColor,
                renderHTML: (attrs: TableCellAttributes) => ({ style: `border-left-color: ${attrs.borderColorLeft}` }),
            },
            borderColorRight: {
                default: '#cccccc',
                parseHTML: (dom: HTMLElement) => dom.style.borderRightColor,
                renderHTML: (attrs: TableCellAttributes) => ({
                    style: `border-right-color: ${attrs.borderColorRight}`,
                }),
            },
            borderColorBottom: {
                default: '#cccccc',
                parseHTML: (dom: HTMLElement) => dom.style.borderBottomColor,
                renderHTML: (attrs: TableCellAttributes) => ({
                    style: `border-bottom-color: ${attrs.borderColorBottom}`,
                }),
            },
            borderColorTop: {
                default: '#cccccc',
                parseHTML: (dom: HTMLElement) => dom.style.borderTopColor,
                renderHTML: (attrs: TableCellAttributes) => ({ style: `border-top-color: ${attrs.borderColorTop}` }),
            },
            borderLeft: {
                default: 1,
                parseHTML: (dom: HTMLElement) => {
                    const borderLeftSize = parseInt(dom.style.borderLeftWidth);
                    const borderSize = parseInt(dom.style.borderWidth);
                    return !isNaN(borderLeftSize) ? borderLeftSize : !isNaN(borderSize) ? borderSize : null;
                },
                renderHTML: (attrs: TableCellAttributes) => ({ style: `border-left-width: ${attrs.borderLeft}px` }),
            },
            borderRight: {
                default: 1,
                parseHTML: (dom: HTMLElement) => {
                    const borderRightSize = parseInt(dom.style.borderRightWidth);
                    const borderSize = parseInt(dom.style.borderWidth);
                    return !isNaN(borderRightSize) ? borderRightSize : !isNaN(borderSize) ? borderSize : null;
                },
                renderHTML: (attrs: TableCellAttributes) => ({ style: `border-right-width: ${attrs.borderRight}px` }),
            },
            borderBottom: {
                default: 1,
                parseHTML: (dom: HTMLElement) => {
                    const borderBottomSize = parseInt(dom.style.borderBottomWidth);
                    const borderSize = parseInt(dom.style.borderWidth);
                    return !isNaN(borderBottomSize) ? borderBottomSize : !isNaN(borderSize) ? borderSize : null;
                },
                renderHTML: (attrs: TableCellAttributes) => ({
                    style: `border-bottom-width: ${attrs.borderBottom}px`,
                }),
            },
            borderTop: {
                default: 1,
                parseHTML: (dom: HTMLElement) => {
                    const borderTopSize = parseInt(dom.style.borderTopWidth);
                    const borderSize = parseInt(dom.style.borderWidth);
                    return !isNaN(borderTopSize) ? borderTopSize : !isNaN(borderSize) ? borderSize : null;
                },
                renderHTML: (attrs: TableCellAttributes) => ({
                    style: `${attrs.style || ''}border-top-width: ${attrs.borderTop}px`,
                }),
            },
        };
    },
});
