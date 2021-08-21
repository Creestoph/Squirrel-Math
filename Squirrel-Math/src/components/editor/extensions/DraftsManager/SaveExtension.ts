import { Extension } from 'tiptap'
import { allComments } from '../../marks/Comment.vue';
import { Draft, DraftPreview, LocalStorageSaver } from './LocalStorageManager';
import ImagePicker from '../../ImagePicker.vue';

export default class Save extends Extension {

    private autoSaveObserverId: number;
    private currentDraft: Draft = { name: '', created: new Date(), lastModified: new Date(), lesson: null, fromAutosave: false };

    longVersionJSON: string = '';
    shortVersionJSON: string = '';
    shortMode: boolean = false;

    constructor() {
        super();
        const autoSavePeriod = 60 * 1000;
        this.autoSaveObserverId = setInterval(() => this.saveToLocalStorage(true), autoSavePeriod);
    }

    get name() {
        return 'save'
    }

    keys() {
        return {
            'Ctrl-s': () => {
                this.saveToLocalStorage(false);
                return true;
            }
        }
    }

    commands() {
        return {
            saveToLocalStorage: () => () => this.saveToLocalStorage(false),
            saveToFile: () => () => this.saveToFile()
        }
    }

    destroy() {
        clearInterval(this.autoSaveObserverId);
    }

    draftsList(): DraftPreview[] {
        return LocalStorageSaver.draftsList().sort((d1, d2) => {
            const d1AutoSave = d1.fromAutosave ? 1 : 0;
            const d2AutoSave = d2.fromAutosave ? 1 : 0;
            return d1.name == d2.name ? d1AutoSave - d2AutoSave : d2.lastModified.getTime() - d1.lastModified.getTime();
        });
    }

    loadDraft(draft: DraftPreview) {
        this.currentDraft = LocalStorageSaver.loadDraft(draft);
        this.loadFromJSON(this.currentDraft.lesson);
    }

    deleteDraft(draft: DraftPreview) {
        return LocalStorageSaver.deleteDraft(draft);
    }

    loadFromJSON(json: any) {
        for (let commentId in allComments) 
            delete (allComments as any)[commentId];
        if (json.comments)
            Object.entries(json.comments).forEach(([id, comment]: any) => {
                (allComments as any)[id] = { text: comment.text, hidden: comment.hidden, displayedInComponent: null }
            })

        ImagePicker.lessonImages = {};
        if (json.images)
            Object.entries(json.images).forEach(([key, image]: any) => {
                (ImagePicker.lessonImages as any)[key] = { ...image, key, scoped: true };
            })

        this.shortVersionJSON = json.short;
        this.longVersionJSON = json.long;
        if (this.shortMode)
            this.editor.setContent(this.shortVersionJSON);
        else
            this.editor.setContent(this.longVersionJSON);
    }

    saveToLocalStorage(fromAutosave: boolean) {
        this.currentDraft.name = this.getLessonTitle();
        this.currentDraft.lesson = this.getLessonJSON();
        LocalStorageSaver.saveDraft(this.currentDraft, fromAutosave);
    }

    saveToFile() {
        const lessonString = JSON.stringify(this.getLessonJSON());
        const fileName = this.sourceFile || `${this.getLessonTitle()}.json`;
        this.download(lessonString, fileName, 'application/json');
        console.debug(lessonString);
    }

    private getLessonTitle(): string {
        const lessonTitleNode = this.editor.state.doc.content.content[0].content.content[0];
        return lessonTitleNode ? lessonTitleNode.text : 'lesson';
    }

    private getLessonJSON() {
        if (this.shortMode)
            this.shortVersionJSON = this.editor.getJSON();
        else
            this.longVersionJSON = this.editor.getJSON();

        const lessonJSON: any = {};
        lessonJSON.long = this.longVersionJSON;
        lessonJSON.short = this.shortVersionJSON;
        
        if (Object.entries(allComments).length > 0)
            lessonJSON.comments = {};
        Object.entries(allComments).forEach(([id, comment]: any) => lessonJSON.comments[id] = { text: comment.text, hidden: comment.hidden });

        if (Object.entries(ImagePicker.lessonImages).length > 0)
            lessonJSON.images = {};
        Object.entries(ImagePicker.lessonImages).forEach(([key, image]: any) => lessonJSON.images[key] = { src: image.src, name: image.name });
        return lessonJSON;
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
