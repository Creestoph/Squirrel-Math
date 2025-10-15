import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';

type Target = {
    selector: string;
    idAttr: string;
    onClick: (info: { id: string; el: HTMLElement; rect: DOMRect }) => void;
};

export default Extension.create<{ targets: Target[] }>({
    name: 'hoverClick',

    addOptions() {
        return {
            targets: [],
        };
    },

    addProseMirrorPlugins() {
        const findMatch = (start: EventTarget | null): { target: Target; el: HTMLElement } | null => {
            if (!(start instanceof HTMLElement)) {
                return null;
            }
            let node: HTMLElement | null = start;
            while (node) {
                for (const target of this.options.targets) {
                    if (node.matches(target.selector)) {
                        return { target, el: node };
                    }
                }
                node = node.parentElement;
            }
            return null;
        };

        const clearAllHovers = (root: HTMLElement) => {
            root.querySelectorAll(`.is-hovered`).forEach((n) => n.classList.remove('is-hovered'));
        };

        return [
            new Plugin({
                key: new PluginKey('hoverClick'),
                props: {
                    handleDOMEvents: {
                        mousemove: (view, e) => {
                            clearAllHovers(view.dom);
                            findMatch(e.target)?.el.classList.add('is-hovered');
                            return false;
                        },
                        mouseleave: (view) => {
                            clearAllHovers(view.dom as HTMLElement);
                            return false;
                        },
                        click: (_, e) => {
                            const match = findMatch(e.target);
                            if (!match) {
                                return false;
                            }

                            const { target, el } = match;
                            const id = el.getAttribute(target.idAttr)!;

                            target.onClick({ id, el, rect: el.getBoundingClientRect() });
                            return true;
                        },
                    },
                },
            }),
        ];
    },
});
