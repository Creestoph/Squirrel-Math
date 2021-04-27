import { Extension } from 'tiptap'
import { allComments } from '../Comment.vue';
import { LocalStorageSaver } from './LocalStorageManager';

export interface DraftPreview {
    name: string;
    created: Date;
    lastModified: Date;
}

export interface Draft extends DraftPreview {
    lesson: any;
}

export default class Save extends Extension {

    private autoSaveObserverId: number;
    private currentDraft: Draft = { name: '', created: new Date(), lastModified: new Date(), lesson: null };

    constructor() {
        super();
        const autoSavePeriod = 60 * 1000;
        this.autoSaveObserverId = setInterval(() => {
            this.saveToLocalStorage();
        }, autoSavePeriod);
    }

    get name() {
        return 'save'
    }

    keys() {
        return {
            'Ctrl-s': () => {
                this.saveToLocalStorage();
                return true;
            }
        }
    }

    commands() {
        return {
            saveToLocalStorage: () => () => this.saveToLocalStorage(),
            saveToFile: () => () => this.saveToFile()
        }
    }

    destroy() {
        clearInterval(this.autoSaveObserverId);
    }

    draftsList(): DraftPreview[] {
        return LocalStorageSaver.draftsList();
    }

    loadDraft(draft: DraftPreview) {
        this.currentDraft = LocalStorageSaver.loadDraft(draft).lesson;
        this.loadFromJSON(this.currentDraft);
    }

    deleteDraft(draft: DraftPreview) {
        return LocalStorageSaver.deleteDraft(draft);
    }

    loadFromJSON(json: any) {
        Object.entries(json.comments).forEach(([id, comment]: any) => {
          (allComments as any)[id] = { text: comment.text, hidden: comment.hidden, displayedInComponent: null }
        })
        this.editor.setContent(json);
    }

    private getLessonTitle(): string {
        const lessonTitleNode = this.editor.state.doc.content.content[0].content.content[0];
        return lessonTitleNode ? lessonTitleNode.text : 'lesson';
    }

    private getLessonJSON() {
        const lessonJSON = this.editor.getJSON();
        lessonJSON.comments = {};
        Object.entries(allComments).forEach(([id, comment]: any) => lessonJSON.comments[id] = { text: comment.text, hidden: comment.hidden });
        return lessonJSON;
    }

    private saveToLocalStorage() {
        this.currentDraft.name = this.getLessonTitle();
        this.currentDraft.lesson = this.getLessonJSON();
        LocalStorageSaver.saveDraft(this.currentDraft);
    }

    private saveToFile() {
        const lessonString = this.getLessonJSONString();
        const fileName = this.sourceFile || `${this.getLessonTitle()}.json`;
        this.download(lessonString, fileName, 'application/json');
        console.log(lessonString);
    }

    private download(data: any, filename: string, type: string) {
        var file = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"), url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            }, 0); 
        }
    }
}
