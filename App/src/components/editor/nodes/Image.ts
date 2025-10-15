import { Node, nodeInputRule } from '@tiptap/core';
import { Plugin } from '@tiptap/pm/state';
import ImagePicker from '../ImagePicker.vue';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        image: {
            createImage: (attrs: Partial<ImageAttrs>) => ReturnType;
        };
    }
}

/**
 * Matches: ![alt](src "title")
 * Captures: [, alt, src, title?]
 */
const IMAGE_INPUT_REGEX = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

export interface ImageAttrs {
    key: string | null;
}

export default Node.create({
    name: 'image',

    group: 'block',
    draggable: true,
    inline: false,
    selectable: true,

    addAttributes() {
        return {
            key: {
                default: null,
                parseHTML: (element) => element.getAttribute('key'),
                renderHTML: (attrs: ImageAttrs) => (attrs.key ? { key: attrs.key } : {}),
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'img[src]',
                getAttrs: (dom) => {
                    const key = dom.getAttribute('key');
                    if (key) {
                        return { key };
                    }

                    // No `key` on the <img> — prompt and register in ImagePicker
                    const proposed = prompt('Nazwa obrazu:') || 'unnamed';
                    const img = {
                        src: dom.getAttribute('src')!,
                        key: proposed,
                        name: proposed,
                        scoped: true,
                    };
                    ImagePicker.lessonImages[proposed] = img;
                    return { key: proposed };
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        const image = ImagePicker.getImage(HTMLAttributes.key);
        return ['img', { key: image.key, src: image.src, alt: image.name }];
    },

    addCommands() {
        return {
            createImage:
                (attrs: Partial<ImageAttrs>) =>
                ({ state, chain }) => {
                    const position = state.selection.$head.pos;
                    const node = this.type.create(attrs);
                    return chain().insertContentAt(position, node).scrollIntoView().run();
                },
        };
    },

    addInputRules() {
        return [
            nodeInputRule({
                find: IMAGE_INPUT_REGEX,
                type: this.type,
                getAttributes: (match) => ({ key: match[1] }),
            }),
        ];
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                props: {
                    handleDOMEvents: {
                        drop: (view, event) => {
                            const files = event.dataTransfer?.files;
                            const hasFiles = files?.length;

                            if (!hasFiles) {
                                return false;
                            }

                            const images = Array.from(files!).filter((f) => /image/i.test(f.type));
                            if (images.length === 0) {
                                return false;
                            }

                            event.preventDefault();

                            const coords = view.posAtCoords({
                                left: event.clientX,
                                top: event.clientY,
                            })!;

                            images.forEach((file) => {
                                const reader = new FileReader();
                                reader.onload = (readerEvent) => {
                                    const name = prompt('Nazwa obrazu:');
                                    if (name != null) {
                                        const src = '' + readerEvent.target!.result;
                                        const image = {
                                            src,
                                            key: name,
                                            name,
                                            scoped: true,
                                        };
                                        ImagePicker.lessonImages[name] = image;

                                        const node = view.state.schema.nodes.image.create({ key: name });
                                        const tr = view.state.tr.insert(coords.pos, node);
                                        view.dispatch(tr.scrollIntoView());
                                    }
                                };
                                reader.readAsDataURL(file);
                            });

                            return true;
                        },
                    },
                },
            }),
        ];
    },
});
