import { Node, Plugin } from 'tiptap'
import { nodeInputRule } from 'tiptap-commands'
import ImagePicker from '../ImagePicker.vue'

/**
 * Matches following attributes in Markdown-typed image: [, alt, src, title]
 *
 * Example:
 * ![Lorem](image.jpg) -> [, "Lorem", "image.jpg"]
 * ![](image.jpg "Ipsum") -> [, "", "image.jpg", "Ipsum"]
 * ![Lorem](image.jpg "Ipsum") -> [, "Lorem", "image.jpg", "Ipsum"]
 */
const IMAGE_INPUT_REGEX = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/

export default class Image extends Node {

  get name() {
    return 'image'
  }

  get schema() {
    return {
      attrs: {
        key: {},
        name: { default: null },
        scoped: { default: false }
      },
      group: 'block',
      draggable: true,
      parseDOM: [
        {
          tag: 'img[src]',
          getAttrs: (dom: any) => {
            const key = dom.getAttribute('key');
            if (key) 
              return { key, name: dom.getAttribute('name'), scoped: dom.getAttribute('scoped') }
            else {
              const key = prompt('Nazwa obrazu:');
              const image = { src: dom.getAttribute('src'), key, name: key, scoped: true };
              ImagePicker.lessonImages[key] = image;
              console.log('new', image);
              return image;
            }
          }
        },
      ],
      toDOM: (node: any) => {
        const src = ImagePicker.srcOf(node.attrs.key, node.attrs.scoped);
        return ['img', {...node.attrs, src, alt: node.attrs.name, title: node.attrs.name}]
      },
    }
  }

  commands({ type }: any) {
    return (attrs: any) => (state: any, dispatch: any) => {
      const { selection } = state
      const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos
      const node = type.create(attrs)
      const transaction = state.tr.insert(position, node)
      dispatch(transaction)
    }
  }

  inputRules({ type }: any) {
    return [
      nodeInputRule(IMAGE_INPUT_REGEX, type, (match: any) => {
        const [, key, name] = match
        return {
          key,
          name,
        }
      }),
    ]
  }

  get plugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            drop(view: any, event: any) {

              const hasFiles = event.dataTransfer
              && event.dataTransfer.files
              && event.dataTransfer.files.length

              if (!hasFiles) {
                return
              }

              const images = Array
                .from(event.dataTransfer.files)
                .filter((file: any) => (/image/i).test(file.type))

              if (images.length === 0) {
                return
              }

              event.preventDefault()

              const { schema } = view.state
              const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY })

              images.forEach((image: any) => {
                const reader = new FileReader()

                reader.onload = (readerEvent: any) => {
                  const name = prompt('Nazwa obrazu:');
                  if (name != null) {
                    const src = readerEvent.target.result;
                    const image = { src, key: name, name, scoped: true };
                    ImagePicker.lessonImages[name] = image;
  
                    const node = schema.nodes.image.create(image)
                    const transaction = view.state.tr.insert(coordinates.pos, node)
                    view.dispatch(transaction)
                  }
                }
                reader.readAsDataURL(image)
              })
            },
          },
        },
      }),
    ]
  }

}
