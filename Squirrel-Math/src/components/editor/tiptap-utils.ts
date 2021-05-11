import { Plugin } from 'prosemirror-state'
import { Slice, Fragment, Node } from 'prosemirror-model'
import { InputRule } from 'prosemirror-inputrules'

export function nodeInputRule(regexp: RegExp, type: any, getAttrs: Function) {
    return new InputRule(regexp, (state, match, start, end) => {
        const { tr } = state
        const m = match.length - 1
        let markEnd = end
        let markStart = start

        if (match[m]) {
            const matchStart = start + match[0].indexOf(match[m - 1])
            const matchEnd = matchStart + match[m - 1].length - 1
            const textStart = matchStart + match[m - 1].lastIndexOf(match[m])
            const textEnd = textStart + match[m].length

            if (textEnd < matchEnd) {
                tr.delete(textEnd, matchEnd)
            }
            if (textStart > matchStart) {
                tr.delete(matchStart, textStart)
            }
            markStart = matchStart
            markEnd = markStart + match[m].length
        }
        const attrs = getAttrs instanceof Function ? getAttrs(match[match.length - 1]) : getAttrs
        tr.replaceWith(markStart, markEnd, type.create(attrs))
        return tr
    })
}

export function nodePasteRule(regexp: RegExp, type: any, getAttrs: Function) {
    const handler = (fragment: Fragment, parent?: Node) => {
        const nodes: Node[] = []

        fragment.forEach((child: Node) => {
            if (child.isText) {
                const { text } = child
                let pos = 0
                let match

                while ((match = regexp.exec(text!)) !== null) {
                    if (match[1]) {
                        const start = match.index
                        const end = start + match[0].length
                        const attrs = getAttrs instanceof Function ? getAttrs(match[match.length - 1]) : getAttrs

                        if (start > 0 && pos != start) {
                            nodes.push(child.cut(pos, start))
                        }

                        nodes.push(type.create(attrs))
                        pos = end
                    }
                }

                if (pos < text!.length) {
                    nodes.push(child.cut(pos))
                }
            } else {
                if (child.content && child.content.size) {
                    const transformedChild = handler(child.content, child);
                    let inlineNodes: Node[] = [];
                    transformedChild.forEach(node => {
                        if (node.type.name !== 'expression') { //it sucks
                            inlineNodes.push(node);
                        }
                        else {
                            if (inlineNodes.length) {
                                nodes.push(child.copy(Fragment.fromArray(inlineNodes)));
                                inlineNodes = [];
                            }
                            nodes.push(node);
                        }
                    })
                    if (inlineNodes.length) {
                        nodes.push(child.copy(Fragment.fromArray(inlineNodes)));
                    }
                }
                else {
                    nodes.push(child);
                }
            }
        })

        return Fragment.fromArray(nodes)
    }

    return new Plugin({
        props: {
            transformPasted: slice => new Slice(handler(slice.content), slice.openStart, slice.openEnd),
        },
    })
}
