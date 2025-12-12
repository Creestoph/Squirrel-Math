import { Draft, DraftPreview, LocalStorageSaver } from './LocalStorageManager';
import { downloadFile } from '@/components/utils/files';
import { allComments, lessonImages } from './shared-state';
import { LessonData, LessonVersionData } from '@/models/lesson';
import { generateGUID } from './tiptap-utils';

export class SaveManager {
    private currentDraft: Draft = {
        id: generateGUID(),
        name: '',
        created: new Date(),
        lastModified: new Date(),
        lesson: null,
        fromAutosave: false,
    };
    private isDirty = false;

    getIsDirty() {
        return this.isDirty;
    }

    getCurrentDraftName() {
        return this.currentDraft.name;
    }

    getCurrentDraftId() {
        return this.currentDraft.id;
    }

    loadFromJSON(json: LessonData) {
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
    }

    setIsDirty(isDirty: boolean) {
        this.isDirty = isDirty;
        this.updateTitle();
    }

    makeNewFile(fileName: string | null) {
        this.currentDraft.id = generateGUID();
        this.currentDraft.name = fileName;
        this.currentDraft.created = new Date();
        this.currentDraft.lastModified = new Date();
        this.currentDraft.fromAutosave = false;
    }

    saveToLocalStorage(
        fileName: string | null,
        lessonData: { long: LessonVersionData | null; short: LessonVersionData | null },
        fromAutosave = false,
    ) {
        this.currentDraft.name = fileName;
        this.currentDraft.lesson = this.getLessonJSON(lessonData);
        if (!fromAutosave) {
            this.setIsDirty(false);
        }
        LocalStorageSaver.saveDraft(this.currentDraft, fromAutosave);
    }

    saveToFile(
        fileName: string | null,
        lessonData: { long: LessonVersionData | null; short: LessonVersionData | null },
    ) {
        const lessonString = JSON.stringify(this.getLessonJSON(lessonData));
        const finalName = fileName || `${fileName || 'lekcja'}.json`;
        downloadFile(lessonString, finalName, 'application/json');
    }

    loadDraft(draft: DraftPreview) {
        this.currentDraft = LocalStorageSaver.loadDraft(draft);
        this.loadFromJSON(this.currentDraft.lesson);
        return this.currentDraft.lesson;
    }

    private getLessonJSON(lessonData: { long: LessonVersionData | null; short: LessonVersionData | null }): LessonData {
        const lessonJSON: LessonData = {
            long: lessonData.long || undefined,
            short: lessonData.short || undefined,
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
    }

    private updateTitle() {
        document.title = (this.currentDraft.name || 'Nowa lekcja') + (this.isDirty ? ' *' : '');
    }
}
