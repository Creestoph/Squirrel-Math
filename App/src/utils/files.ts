import { LessonData } from '@/models/lesson';

function downloadFile(data: BlobPart, filename: string, type: string) {
    const file = new Blob([data], { type: type });
    const a = document.createElement('a'),
        url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

export function downloadLesson(data: LessonData, filename: string) {
    downloadFile(JSON.stringify(data, null, 4), filename, 'application/json');
}
