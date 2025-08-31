import { Node, Plugin } from 'tiptap';
import { nodeInputRule } from 'tiptap-commands';
import ImagePicker from '../ImagePicker.vue';

/**
 * Matches following attributes in Markdown-typed image: [, alt, src, title]
 *
 * Example:
 * ![Lorem](image.jpg) -> [, "Lorem", "image.jpg"]
 * ![](image.jpg "Ipsum") -> [, "", "image.jpg", "Ipsum"]
 * ![Lorem](image.jpg "Ipsum") -> [, "Lorem", "image.jpg", "Ipsum"]
 */
const IMAGE_INPUT_REGEX = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

export default class Image extends Node {
    get name() {
        return 'image';
    }

    get schema() {
        return {
            attrs: {
                key: {},
            },
            group: 'block',
            draggable: true,
            parseDOM: [
                {
                    tag: 'img[src]',
                    getAttrs: (dom: any) => {
                        const key = dom.getAttribute('key');
                        if (key) {
                            return { key };
                        } else {
                            const key = prompt('Nazwa obrazu:') || 'unnamed';
                            const image = {
                                src: dom.getAttribute('src'),
                                key,
                                name: key,
                                scoped: true,
                            };
                            ImagePicker.lessonImages[key] = image;
                            return { key };
                        }
                    },
                },
            ],
            toDOM: (node: any) => {
                const image = ImagePicker.getImage(node.attrs.key);
                return ['img', { key: image.key, src: image.src, alt: image.name }];
            },
        };
    }

    commands({ type }: any) {
        return (attrs: any) => (state: any, dispatch: any) => {
            const { selection } = state;
            const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos;
            const node = type.create(attrs);
            const transaction = state.tr.insert(position, node);
            dispatch(transaction);
        };
    }

    inputRules({ type }: any) {
        return [
            nodeInputRule(IMAGE_INPUT_REGEX, type, (match: any) => {
                const [, key] = match;
                return { key };
            }),
        ];
    }

    get plugins() {
        return [
            new Plugin({
                props: {
                    handleDOMEvents: {
                        drop(view: any, event: any) {
                            const hasFiles =
                                event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length;

                            if (!hasFiles) {
                                return;
                            }

                            const images = Array.from(event.dataTransfer.files).filter((file: any) =>
                                /image/i.test(file.type),
                            );

                            if (images.length === 0) {
                                return;
                            }

                            event.preventDefault();

                            const { schema } = view.state;
                            const coordinates = view.posAtCoords({
                                left: event.clientX,
                                top: event.clientY,
                            });

                            images.forEach((image: any) => {
                                const reader = new FileReader();

                                reader.onload = (readerEvent: any) => {
                                    const name = prompt('Nazwa obrazu:');
                                    if (name != null) {
                                        const src = readerEvent.target.result;
                                        const image = {
                                            src,
                                            key: name,
                                            name,
                                            scoped: true,
                                        };
                                        ImagePicker.lessonImages[name] = image;

                                        const node = schema.nodes.image.create({
                                            key: name,
                                        });
                                        const transaction = view.state.tr.insert(coordinates.pos, node);
                                        view.dispatch(transaction);
                                    }
                                };
                                reader.readAsDataURL(image);
                            });
                        },
                    },
                },
            }),
        ];
    }
}
