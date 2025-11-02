import { Extension, SingleCommands } from '@tiptap/vue-2';
import { Draft, DraftPreview, LocalStorageSaver } from './LocalStorageManager';
import { downloadFile } from '@/components/utils/files';
import { allComments, lessonImages } from '../../shared-state';
import { LessonData, LessonVersionData } from '@/models/lesson';

interface SaveStorage {
    autoSaveObserverId: number | null;
    currentDraft: Draft;
    longVersionJSON: LessonVersionData | null;
    shortVersionJSON: LessonVersionData | null;
    shortMode: boolean;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        save: {
            saveToLocalStorage: (fromAutosave?: boolean) => ReturnType;
            saveToFile: (fileName?: string) => ReturnType;
            loadDraft: (draft: DraftPreview) => ReturnType;
            deleteDraft: (draft: DraftPreview) => ReturnType;
            loadFromJSON: (json: LessonData) => ReturnType;
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
            longVersionJSON: null,
            shortVersionJSON: null,
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
                this.storage.shortVersionJSON = this.editor.getJSON() as LessonVersionData;
            } else {
                this.storage.longVersionJSON = this.editor.getJSON() as LessonVersionData;
            }

            const lessonJSON: LessonData = {
                long: this.storage.longVersionJSON || undefined,
                short: this.storage.shortVersionJSON || undefined,
            };

            if (Object.entries(allComments.value).length > 0) {
                lessonJSON.comments = {};
            }
            Object.entries(allComments.value).forEach(([id, comment]) => {
                lessonJSON.comments![id] = {
                    text: comment.text,
                    hidden: comment.hidden,
                };
            });

            if (Object.entries(lessonImages.value).length > 0) {
                lessonJSON.images = {};
            }
            Object.entries(lessonImages.value).forEach(([key, image]) => {
                lessonJSON.images![key] = { src: image.src, name: image.name };
            });

            return lessonJSON;
        };

        const loadFromJSON =
            (json: LessonData) =>
            ({ commands }: { commands: SingleCommands }) => {
                // reset comments
                allComments.value = {};
                if (json?.comments) {
                    Object.entries(json.comments).forEach(([id, comment]) => {
                        allComments.value[id] = {
                            text: comment.text,
                            hidden: comment.hidden,
                        };
                    });
                }

                // reset scoped images
                lessonImages.value = {};
                if (json?.images) {
                    Object.entries(json.images).forEach(([key, image]) => (lessonImages.value[key] = { ...image }));
                }

                this.storage.shortVersionJSON = json?.short || null;
                this.storage.longVersionJSON = json?.long || null;

                return commands.setContent(
                    this.storage.shortMode ? this.storage.shortVersionJSON! : this.storage.longVersionJSON!,
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
