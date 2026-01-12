import { Node, nodeInputRule } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import { Plugin } from '@tiptap/pm/state';
import { globalImages, lessonImages } from '../shared-state';
import ImageVue from './Image.vue';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        image: {
            createImage: (key: string) => ReturnType;
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
    width?: number | null;
    height?: number | null;
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
            width: {
                default: null,
                parseHTML: (element) => {
                    const widthAttr = element.getAttribute('width');
                    return widthAttr ? Number.parseInt(widthAttr, 10) : null;
                },
                renderHTML: (attrs: ImageAttrs) => (attrs.width ? { width: Math.round(attrs.width) } : {}),
            },
            height: {
                default: null,
                parseHTML: (element) => {
                    const heightAttr = element.getAttribute('height');
                    return heightAttr ? Number.parseInt(heightAttr, 10) : null;
                },
                renderHTML: (attrs: ImageAttrs) => (attrs.height ? { height: Math.round(attrs.height) } : {}),
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
                        const widthAttr = dom.getAttribute('width');
                        const heightAttr = dom.getAttribute('height');
                        const width = widthAttr ? Number.parseInt(widthAttr, 10) : null;
                        const height = heightAttr ? Number.parseInt(heightAttr, 10) : null;
                        return {
                            key,
                            width,
                            height,
                        };
                    }

                    const proposed = prompt('Nazwa obrazu:') || 'unnamed';
                    const img = {
                        src: dom.getAttribute('src')!,
                        key: proposed,
                        name: proposed,
                        scoped: true,
                    };
                    lessonImages.value[proposed] = img;
                    return { key: proposed };
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        const key = HTMLAttributes.key;
        const image = lessonImages.value[key] || globalImages.value[key];
        return [
            'img',
            {
                src: image.src,
                alt: image.name,
                ...HTMLAttributes,
            },
        ];
    },

    addCommands() {
        return {
            createImage:
                (key: string) =>
                ({ state, chain }) => {
                    const position = state.selection.$head.pos;
                    const node = this.type.create({ key });
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

    addNodeView: () => VueNodeViewRenderer(ImageVue),

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
                                        lessonImages.value[name] = image;

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
