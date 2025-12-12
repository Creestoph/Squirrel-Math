export interface DraftPreview {
    id: string;
    name: string | null;
    created: Date;
    lastModified: Date;
    fromAutosave: boolean;
}

export interface Draft extends DraftPreview {
    lesson: any;
}

export class LocalStorageSaver {
    static prefix = 'squirrel-math-';

    static draftsList(): DraftPreview[] {
        return Object.entries(localStorage)
            .filter(([key]) => key.startsWith(LocalStorageSaver.prefix + 'metadata-'))
            .map(([_key, value]) => {
                const parsed = JSON.parse(value);
                return {
                    id: parsed.id,
                    name: parsed.name,
                    created: new Date(parsed.created),
                    lastModified: new Date(parsed.lastModified),
                    fromAutosave: parsed.fromAutosave,
                };
            });
    }

    static loadDraft(draft: DraftPreview): Draft {
        return Object.assign(draft, {
            lesson: JSON.parse(localStorage.getItem(LocalStorageSaver.getLessonKey(draft))!),
        });
    }

    static deleteDraft(draft: { fromAutosave: boolean; id: string }): void {
        localStorage.removeItem(LocalStorageSaver.getLessonKey(draft));
        localStorage.removeItem(LocalStorageSaver.getMetadataKey(draft));
    }

    static saveDraft(draft: Draft, fromAutosave: boolean) {
        const metadata: DraftPreview = {
            id: draft.id,
            name: draft.name,
            created: draft.created,
            lastModified: new Date(),
            fromAutosave,
        };
        localStorage.setItem(LocalStorageSaver.getLessonKey(metadata), JSON.stringify(draft.lesson));
        localStorage.setItem(LocalStorageSaver.getMetadataKey(metadata), JSON.stringify(metadata));
        if (!fromAutosave) {
            LocalStorageSaver.deleteDraft({ fromAutosave: true, id: draft.id });
        }
    }

    private static getLessonKey(draft: { fromAutosave: boolean; id: string }): string {
        return LocalStorageSaver.prefix + (draft.fromAutosave ? 'autosave-' : '') + draft.id;
    }

    private static getMetadataKey(draft: { fromAutosave: boolean; id: string }): string {
        return LocalStorageSaver.prefix + 'metadata-' + (draft.fromAutosave ? 'autosave-' : '') + draft.id;
    }
}
