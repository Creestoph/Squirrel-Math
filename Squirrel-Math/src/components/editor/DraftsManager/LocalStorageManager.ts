export interface DraftPreview {
    name: string;
    created: Date;
    lastModified: Date;
}

export interface Draft extends DraftPreview {
    lesson: any;
}

export class LocalStorageSaver {
    static prefix = 'squirrel-math-';

    static draftsList(): DraftPreview[] {
        return Object.entries(localStorage).filter(([key]) => key.startsWith(LocalStorageSaver.prefix + 'metadata-')).map(([key, value]) => {
            const parsed = JSON.parse(value);
            return {
                name: parsed.name,
                created: new Date(parsed.created),
                lastModified: new Date(parsed.lastModified)
            }
        });
    }

    static loadDraft(draft: DraftPreview): Draft {
        return Object.assign(draft, { lesson: JSON.parse(localStorage.getItem(LocalStorageSaver.prefix + draft.name)!) });
    }

    static deleteDraft(draft: DraftPreview): void {
        localStorage.removeItem(LocalStorageSaver.prefix + draft.name);
        localStorage.removeItem(LocalStorageSaver.prefix + 'metadata-' + draft.name);
    }

    static saveDraft(draft: Draft) {
        const metadata: DraftPreview = {
            name: draft.name,
            created: draft.created,
            lastModified: new Date()
        };
        localStorage.setItem(LocalStorageSaver.prefix + draft.name, JSON.stringify(draft.lesson));
        localStorage.setItem(LocalStorageSaver.prefix + 'metadata-' + draft.name, JSON.stringify(metadata));
    }
}
