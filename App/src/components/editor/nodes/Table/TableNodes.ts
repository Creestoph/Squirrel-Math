import { tableNodes } from 'prosemirror-tables';

export default tableNodes({
    tableGroup: 'block',
    cellContent: 'block+',
    cellAttributes: {
        background: {
            default: null,
            getFromDOM: (dom) => (dom as HTMLElement).style.backgroundColor || null,
            setDOMAttr: (value, attrs) => {
                if (value) {
                    Object.assign(attrs, {
                        style: `${attrs.style || ''}background-color: ${value};`,
                    });
                }
            },
        },
        borderColor: {
            default: '#cccccc',
            getFromDOM: (dom) => (dom as HTMLElement).style.borderColor || null,
            setDOMAttr: (value, attrs) => {
                Object.assign(attrs, {
                    style: `${attrs.style || ''}border-color: ${value};`,
                });
            },
        },
        borderLeft: {
            default: 1,
            getFromDOM: (dom) => {
                const borderLeftSize = parseInt((dom as HTMLElement).style.borderLeftWidth);
                const borderSize = parseInt((dom as HTMLElement).style.borderWidth);
                return !isNaN(borderLeftSize) ? borderLeftSize : !isNaN(borderSize) ? borderSize : null;
            },
            setDOMAttr: (value, attrs) => {
                Object.assign(attrs, {
                    style: `${attrs.style || ''}border-left-width: ${value}px;`,
                });
            },
        },
        borderRight: {
            default: 1,
            getFromDOM: (dom) => {
                const borderRightSize = parseInt((dom as HTMLElement).style.borderRightWidth);
                const borderSize = parseInt((dom as HTMLElement).style.borderWidth);
                return !isNaN(borderRightSize) ? borderRightSize : !isNaN(borderSize) ? borderSize : null;
            },
            setDOMAttr: (value, attrs) => {
                Object.assign(attrs, {
                    style: `${attrs.style || ''}border-right-width: ${value}px;`,
                });
            },
        },
        borderBottom: {
            default: 1,
            getFromDOM: (dom) => {
                const borderBottomSize = parseInt((dom as HTMLElement).style.borderBottomWidth);
                const borderSize = parseInt((dom as HTMLElement).style.borderWidth);
                return !isNaN(borderBottomSize) ? borderBottomSize : !isNaN(borderSize) ? borderSize : null;
            },
            setDOMAttr: (value, attrs) => {
                Object.assign(attrs, {
                    style: `${attrs.style || ''}border-bottom-width: ${value}px;`,
                });
            },
        },
        borderTop: {
            default: 1,
            getFromDOM: (dom) => {
                const borderTopSize = parseInt((dom as HTMLElement).style.borderTopWidth);
                const borderSize = parseInt((dom as HTMLElement).style.borderWidth);
                return !isNaN(borderTopSize) ? borderTopSize : !isNaN(borderSize) ? borderSize : null;
            },
            setDOMAttr: (value, attrs) => {
                Object.assign(attrs, {
                    style: `${attrs.style || ''}border-top-width: ${value}px;`,
                });
            },
        },
    },
});
