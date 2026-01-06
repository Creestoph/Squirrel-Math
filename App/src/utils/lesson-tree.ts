import graphLessons from '@/assets/current-lesson-graph.json';

export interface LessonInfo {
    title: string;
    requires: string[];
    isRequiredBy: string[];
    field?: string;
    level?: string;
}

class LessonTree {
    private lessons: { [title: string]: LessonInfo } = {};

    constructor() {
        for (const lesson of graphLessons) {
            this.lessons[lesson.title] = {
                ...lesson,
                isRequiredBy: [],
            };
        }
        for (const lesson of graphLessons) {
            for (const req of lesson.requires) {
                this.lessons[req].isRequiredBy.push(lesson.title);
            }
        }
    }

    allLessonNames(): string[] {
        return Object.keys(this.lessons);
    }

    allLessons(): LessonInfo[] {
        return Object.values(this.lessons);
    }

    getLesson(title: string): LessonInfo {
        return this.lessons[title];
    }

    getAllRequiredLessons(titles: string[]): Set<string> {
        const result = new Set<string>();
        const visit = (lessonTitle: string) => {
            if (result.has(lessonTitle)) {
                return;
            }
            result.add(lessonTitle);
            const lesson = this.getLesson(lessonTitle);
            for (const req of lesson.requires) {
                visit(req);
            }
        };
        titles.forEach((t) => visit(t));
        titles.forEach((t) => result.delete(t));
        return result;
    }
}

export const lessonTree = new LessonTree();
