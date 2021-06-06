import { setBlockType } from 'tiptap-commands'
import { Node } from "tiptap";

export default class Paragraph extends Node {

    get name() {
        return 'paragraph'
    }

    get schema() {
        return {
            attrs: {
                textAlign: {
                    default: ''
                }
            },
            content: 'inline*',
            group: 'block',
            draggable: false,
            parseDOM: [{
                tag: 'p',
                getAttrs: (dom: any) => ({ textAlign: dom.style.textAlign }),
            }],
            toDOM: (node: any) => node.attrs.textAlign ? ['p', {style: `text-align: ${node.attrs.textAlign}`}, 0] : ['p', 0],
        }
    }

    commands({ type }: any) {
        return () => setBlockType(type)
    }
}
