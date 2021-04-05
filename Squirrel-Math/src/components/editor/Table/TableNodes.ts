import { tableNodes } from 'prosemirror-tables'

export default tableNodes({
  tableGroup: 'block',
  cellContent: 'block+',
  cellAttributes: {
    background: {
      default: null,
      getFromDOM: (dom) => (dom as HTMLElement).style.backgroundColor || null,
      setDOMAttr: (value, attrs) => Object.assign(attrs, { style: `${(attrs.style || '')}background-color: ${value};` })
    },
    borderColor: {
      default: null,
      getFromDOM: (dom) => (dom as HTMLElement).style.borderColor || null,
      setDOMAttr: (value, attrs) => Object.assign(attrs, { style: `${(attrs.style || '')}border-color: ${value};` })
    },
    borderSize: {
      default: null,
      getFromDOM: (dom) => (dom as HTMLElement).style.borderWidth || null,
      setDOMAttr: (value, attrs) => Object.assign(attrs, { style: `${(attrs.style || '')}border-width: ${value};` })
    },
  },
})
