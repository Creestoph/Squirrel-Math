declare module 'tiptap' {
    import Vue from 'vue';
    export class Editor {
        public constructor({});

        public setOptions({}): void;
        public setContent(content: string): void;
        public destroy(): void;
    }

    export class EditorMenuBar extends Vue {}

    export class EditorContent extends Vue {}
}