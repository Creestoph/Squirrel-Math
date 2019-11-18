import { Guid } from "guid-typescript";


export abstract class NodeData {
    id!: string
    name!: string
    constructor(name: string) {
        this.id = Guid.create().toString()
        this.name = name
    }
}

export class LessonTitleNodeData extends NodeData {
    data!: string
    constructor(data: string) {
        super('lesson-title-node')
        this.data = data
    }
}


export class LessonIntroNodeData extends NodeData {
    nodes!: ParagraphNodeData[]
    constructor(nodes: ParagraphNodeData[]) {
        super('lesson-intro-node')
        this.nodes = nodes
    }
}


export class LessonChapterNodeData extends NodeData {
    title!: string
    nodes!: ParagraphNodeData[]
    constructor(title: string, nodes: ParagraphNodeData[]){
        super('lesson-chapter-node')
        this.title = title
        this.nodes = nodes  
    }
}

export class LessonNodeData extends NodeData {
    routeShortVersion!: string
    routeLongVersion!: string
    title!: LessonTitleNodeData
    intro!: LessonIntroNodeData
    chapters!: LessonChapterNodeData[]

    constructor(
        routeShortVersion: string,
        routeLongVersion: string,
        title: LessonTitleNodeData,
        intro: LessonIntroNodeData,
        chapters: LessonChapterNodeData[]) {
        super('lesson-node')
        this.routeShortVersion = routeShortVersion
        this.routeLongVersion = routeLongVersion
        this.title = title
        this.intro = intro
        this.chapters = chapters
    }

}


export class ParagraphNodeData extends NodeData {
    data!: string
    constructor(data: string){
        super('paragraph-node')
        this.data = data
    }
}