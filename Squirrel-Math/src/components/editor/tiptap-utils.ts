import { Plugin } from 'prosemirror-state'
import { Slice, Fragment } from 'prosemirror-model'
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
    const handler = (fragment: any, parent?: any) => {
        const nodes: any = []

        fragment.forEach((child: any) => {
            if (child.isText) {
                const { text } = child
                let pos = 0
                let match

                while ((match = regexp.exec(text)) !== null) {
                    if (parent && parent.type.allowsMarkType(type) && match[1]) {
                        const start = match.index
                        const end = start + match[0].length
                        const attrs = getAttrs instanceof Function ? getAttrs(match[match.length - 1]) : getAttrs

                        if (start > 0) {
                            nodes.push(child.cut(pos, start))
                        }

                        nodes.push(type.create(attrs))
                        pos = end
                    }
                }

                if (pos < text.length) {
                    nodes.push(child.cut(pos))
                }
            } else {
                nodes.push(child.copy(handler(child.content, child)))
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
