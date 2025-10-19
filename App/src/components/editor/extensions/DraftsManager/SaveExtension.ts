import { Extension, SingleCommands } from '@tiptap/vue-2';
import { Draft, DraftPreview, LocalStorageSaver } from './LocalStorageManager';
import ImagePicker from '../../ImagePicker.vue';
import { downloadFile } from '@/components/utils/files';
import { allComments } from '../../shared-state';

interface SaveStorage {
    autoSaveObserverId: number | null;
    currentDraft: Draft;
    longVersionJSON: any;
    shortVersionJSON: any;
    shortMode: boolean;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        save: {
            saveToLocalStorage: (fromAutosave?: boolean) => ReturnType;
            saveToFile: (fileName?: string) => ReturnType;
            loadDraft: (draft: DraftPreview) => ReturnType;
            deleteDraft: (draft: DraftPreview) => ReturnType;
            loadFromJSON: (json: any) => ReturnType;
        };
    }
    interface Storage {
        save: SaveStorage;
    }
}

export default Extension.create<{}, SaveStorage>({
    name: 'save',

    addStorage(): SaveStorage {
        return {
            autoSaveObserverId: null,
            currentDraft: {
                name: '',
                created: new Date(),
                lastModified: new Date(),
                lesson: null,
                fromAutosave: false,
            },
            longVersionJSON: '',
            shortVersionJSON: '',
            shortMode: false,
        };
    },

    onCreate() {
        // autosave every 60s
        const autoSavePeriod = 60 * 1000;
        this.storage.autoSaveObserverId = setInterval(
            () => this.editor.commands.saveToLocalStorage(true),
            autoSavePeriod,
        );
    },

    onDestroy() {
        if (this.storage.autoSaveObserverId != null) {
            clearInterval(this.storage.autoSaveObserverId);
            this.storage.autoSaveObserverId = null;
        }
    },

    addKeyboardShortcuts() {
        return {
            'Mod-s': () => {
                this.editor.commands.saveToLocalStorage(false);
                return true;
            },
        };
    },

    addCommands() {
        const getLessonTitle = (): string => {
            const node: any = this.editor.state.doc?.content?.content?.[0]?.content?.content?.[0];
            return node?.text ?? 'lesson';
        };

        const getLessonJSON = () => {
            if (this.storage.shortMode) {
                this.storage.shortVersionJSON = this.editor.getJSON();
            } else {
                this.storage.longVersionJSON = this.editor.getJSON();
            }

            const lessonJSON: any = {
                long: this.storage.longVersionJSON,
                short: this.storage.shortVersionJSON,
            };

            if (Object.entries(allComments).length > 0) {
                lessonJSON.comments = {};
            }
            Object.entries(allComments).forEach(([id, comment]: any) => {
                lessonJSON.comments[id] = {
                    text: comment.text,
                    hidden: comment.hidden,
                };
            });

            if (Object.entries(ImagePicker.lessonImages).length > 0) {
                lessonJSON.images = {};
            }
            Object.entries(ImagePicker.lessonImages).forEach(([key, image]: any) => {
                lessonJSON.images[key] = { src: image.src, name: image.name };
            });

            return lessonJSON;
        };

        const loadFromJSON =
            (json: any) =>
            ({ commands }: { commands: SingleCommands }) => {
                // reset comments
                for (const commentId in allComments) {
                    delete (allComments as any)[commentId];
                }
                if (json?.comments) {
                    Object.entries(json.comments).forEach(([id, comment]: any) => {
                        (allComments as any)[id] = {
                            text: comment.text,
                            hidden: comment.hidden,
                            displayedInComponent: null,
                        };
                    });
                }

                // reset scoped images
                ImagePicker.lessonImages = {};
                if (json?.images) {
                    Object.entries(json.images).forEach(([key, image]: any) => {
                        (ImagePicker.lessonImages as any)[key] = {
                            ...image,
                            key,
                            scoped: true,
                        };
                    });
                }

                this.storage.shortVersionJSON = json?.short;
                this.storage.longVersionJSON = json?.long;

                return commands.setContent(
                    this.storage.shortMode ? this.storage.shortVersionJSON : this.storage.longVersionJSON,
                );
            };

        return {
            saveToLocalStorage:
                (fromAutosave = false) =>
                () => {
                    this.storage.currentDraft.name = getLessonTitle();
                    this.storage.currentDraft.lesson = getLessonJSON();
                    LocalStorageSaver.saveDraft(this.storage.currentDraft, fromAutosave);
                    return true;
                },

            saveToFile: (fileName?: string) => () => {
                const lessonString = JSON.stringify(getLessonJSON());
                const finalName = fileName || `${getLessonTitle()}.json`;
                downloadFile(lessonString, finalName, 'application/json');
                console.debug(lessonString);
                return true;
            },

            loadDraft: (draft: DraftPreview) => {
                this.storage.currentDraft = LocalStorageSaver.loadDraft(draft);
                return loadFromJSON(this.storage.currentDraft.lesson);
            },

            deleteDraft: (draft: DraftPreview) => () => {
                LocalStorageSaver.deleteDraft(draft);
                return true;
            },

            loadFromJSON,
        };
    },
});
