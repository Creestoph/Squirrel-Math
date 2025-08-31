<template>
    <div id="tree-container">
        <canvas ref="canvas" resize="true" />
        <div id="tree-tools">
            <button v-if="!editMode" @click="enableEdit()">Edit</button>
            <button v-if="editMode" @click="save()">Save</button>
            <button v-if="editMode" @click="discard()">Discard</button>
        </div>
        <tooltip id="lessonSummary" :visible="displayLesson" timeout="750" :offset="{ x: 50, y: -50 }">
            <div v-if="displayLesson">
                <div id="displaylessonTitle">
                    {{ displayLesson.title }}
                </div>
                <b>Dział:</b> {{ displayLesson.field }}<br />
                <b>Poziom:</b> {{ displayLesson.level }}<br />
                <b>Wymagane:</b>
                <div v-for="(item, i) in displayLesson.requires" :key="i">{{ item }}<br /></div>
            </div>
        </tooltip>
    </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import graphLessons from '@/assets/current_lesson_graph.json';
import graphCoordinates from '@/assets/current_graph_coordinates.json';
import Tooltip from '@/components/utils/Tooltip.vue';
import Vue from 'vue';
import Point from './utils/point';
import paper from 'paper';

class Lesson {
    title: string = '';
    requires: string[] = [];
    isRequiredBy: string[] = [];
    field?: string;
    level?: string;
}

@Component({
    components: {
        Tooltip,
    },
})
export default class InteractiveTree extends Vue {
    lessons: { [name: string]: Lesson } = {};
    positions: { [lesson: string]: Point } = {};
    stairsX: { [lesson: string]: { [req: string]: number } } = {}; //e.g. stairsX[Wyrażenia algebraiczne][Ułamki dziesiętne] = 200 - x position of edge "jump" is 200

    hoveredLesson: paper.PointText | null = null;
    hoveredStair: paper.Path | null = null;
    boldLesson: string | null = null;

    mypaper: paper.PaperScope = new paper.PaperScope();
    nodes: { [name: string]: paper.PointText } = {};
    edges: { [from: string]: { [to: string]: paper.Path } } = {};

    editMode: boolean = false;
    displayLesson: any = null;

    mounted() {
        this.initialize();
        this.loadLessons();
        this.reloadPositions();
        this.setBoldLesson();
        this.displayLessons();
    }

    setBoldLesson() {
        for (let l of Object.values(this.lessons)) {
            if (l.title == this.$route.params.sourceFile) {
                this.boldLesson = l.title;
            }
        }
    }

    download(data: any, filename: string, type: string) {
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

    enableEdit() {
        this.editMode = true;
    }

    save() {
        this.editMode = false;
        const json: { nodes: any[]; edgeJumps: any[] } = {
            nodes: [],
            edgeJumps: [],
        };
        for (let name in this.lessons) {
            json.nodes.push([name, this.positions[name].x, this.positions[name].y]);
        }
        for (let lesson in this.stairsX) {
            for (let req in this.stairsX[lesson]) {
                json.edgeJumps.push([lesson, req, this.stairsX[lesson][req]]);
            }
        }
        this.download(JSON.stringify(json), 'current_graph_coordinates.json', 'application/json');
    }

    discard() {
        this.editMode = false;
        this.reloadPositions();
        this.displayLessons();
    }

    addEventHandlers() {
        const hitOptions = {
            segments: false,
            stroke: true,
            fill: true,
            tolerance: 5,
        };
        this.mypaper.tool = new paper.Tool();

        this.mypaper.view.onResize = () => {
            this.reloadPositions();
            this.displayLessons();
        };

        this.mypaper.tool.onMouseMove = (event: paper.ToolEvent) => {
            const hitResult = this.mypaper.project!.hitTest(event.point!, hitOptions);
            this.hoveredStair = null;
            if (!hitResult || hitResult.type != 'fill') {
                this.clearHoveredLesson();
            }
            if (hitResult && hitResult.type == 'stroke') {
                if (this.editMode && hitResult.item!.data.hasStair) {
                    const stairPosition = this.stairsX[hitResult.item!.data.lesson][hitResult.item!.data.req];
                    if (Math.abs(hitResult.point!.x! - stairPosition) < 5) {
                        (this.$refs.canvas as HTMLElement).style.cursor = 'ew-resize';
                    }
                    this.hoveredStair = hitResult.item as paper.Path;
                }
            }
            if (hitResult && hitResult.type == 'fill') {
                (this.$refs.canvas as HTMLElement).style.cursor = 'pointer';
                if (!this.hoveredLesson) {
                    const redColor = new paper.Color('#dd3333');
                    this.hoveredLesson = hitResult.item as paper.PointText;
                    this.hoveredLesson.style!.fillColor = redColor;
                    let lessonName = this.hoveredLesson.content!;
                    this.displayLesson = this.lessons[lessonName];
                    for (let req of this.lessons[lessonName].requires) {
                        this.edges[lessonName][req].style!.strokeColor = redColor;
                        this.edges[lessonName][req].bringToFront();
                    }
                }
            }
        };

        this.mypaper.tool.onMouseDown = (event: paper.ToolEvent) => {
            if (!this.editMode && this.hoveredLesson) {
                if (this.boldLesson) {
                    this.nodes[this.boldLesson].style!.fontWeight = 'normal';
                }
                this.boldLesson = this.hoveredLesson!.content!;
                this.nodes[this.boldLesson].style!.fontWeight = 'bold';
                if ((event as any).event.button === 0) {
                    this.$router
                        .replace({
                            name: 'lesson',
                            params: {
                                sourceFile: this.lessons[this.boldLesson].title,
                            },
                        })
                        .catch(() => {});
                } else if ((event as any).event.button === 1) {
                    let url = this.$router.resolve('/lesson/' + this.lessons[this.boldLesson].title);
                    window.open(url.href, '_blank');
                }
                this.clearHoveredLesson();
            }
        };

        this.mypaper.tool.onMouseDrag = (event: paper.ToolEvent) => {
            if (!this.editMode) {
                return;
            }
            let deltaX = event.delta!.x!;
            let deltaY = event.delta!.y!;
            if (this.hoveredStair) {
                this.hoveredStair.segments![2].point!.x! += deltaX;
                this.hoveredStair.segments![3].point!.x! += deltaX;
                this.stairsX[this.hoveredStair.data.lesson][this.hoveredStair.data.req] =
                    this.hoveredStair.segments![2].point!.x!;
            }
            if (this.hoveredLesson) {
                let clickedTitle = this.hoveredLesson.content!;
                this.hoveredLesson.position = this.hoveredLesson.position!.add(new paper.Point(deltaX, deltaY));
                this.positions[clickedTitle].x = this.hoveredLesson.position.x!;
                this.positions[clickedTitle].y = this.hoveredLesson.position.y!;
                for (let path of Object.values(this.edges[clickedTitle])) {
                    let segments = path.segments as paper.Segment[];

                    if (segments.length == 4) {
                        segments[0].point!.x! += deltaX;
                        segments[0].point!.y! += deltaY;
                        segments[1].point!.x! += deltaX;
                    } else {
                        segments[0].point!.x! += deltaX;
                        segments[0].point!.y! += deltaY;
                        segments[1].point!.x! += deltaX;
                        segments[3].point!.x = (segments[1].point!.x! + segments[4].point!.x!) / 2;
                        segments[2].point!.x = (segments[1].point!.x! + segments[4].point!.x!) / 2;
                    }
                }
                for (let upper of this.lessons[clickedTitle].isRequiredBy) {
                    let segments = this.edges[upper][clickedTitle].segments as paper.Segment[];
                    if (segments.length == 4) {
                        segments[3].point!.x! += deltaX;
                        segments[3].point!.y! += deltaY;
                        segments[2].point!.x! += deltaX;
                        if (segments[3].point!.y! < segments[2].point!.y! + 5) {
                            segments[2].point!.y = segments[3].point!.y! - 5;
                            segments[1].point!.y = segments[3].point!.y! - 5;
                        }
                    } else {
                        segments[5].point!.y! += deltaY;
                        segments[5].point!.x! += deltaX;
                        segments[4].point!.y! += deltaY;
                        segments[4].point!.x! += deltaX;
                        segments[3].point!.y! += deltaY;
                        segments[3].point!.x = (segments[1].point!.x! + segments[4].point!.x!) / 2;
                        segments[2].point!.x = (segments[1].point!.x! + segments[4].point!.x!) / 2;
                    }
                }
            }
        };

        this.mypaper.tool.onMouseUp = () => {
            const snap = (x: number) => Math.floor((x + 5) / 10) * 10;
            if (this.editMode) {
                for (let pos of Object.values(this.positions)) {
                    pos.x = snap(pos.x);
                    pos.y = snap(pos.y);
                }
                for (let lesson in this.stairsX) {
                    for (let req in this.stairsX[lesson]) {
                        this.stairsX[lesson][req] = snap(this.stairsX[lesson][req]);
                    }
                }
                this.displayLessons();
            }
        };
    }

    private clearHoveredLesson() {
        (this.$refs.canvas as HTMLElement).style.cursor = 'default';
        if (this.hoveredLesson) {
            this.hoveredLesson.style!.fillColor = new paper.Color('black');
            const lessonName = this.hoveredLesson.content!;
            for (let req of this.lessons[lessonName].requires) {
                this.edges[lessonName][req].style!.strokeColor = new paper.Color('black');
            }
            this.hoveredLesson = null;
            this.displayLesson = null;
        }
    }

    initialize() {
        this.mypaper.setup(this.$refs.canvas as HTMLCanvasElement);
        this.mypaper.activate();
        this.addEventHandlers();
    }

    loadLessons() {
        for (let lesson of graphLessons) {
            this.lessons[lesson.title] = {
                title: lesson.title,
                requires: lesson.requires,
                isRequiredBy: [],
                field: lesson.field,
                level: lesson.level,
            };
        }
        for (let lesson of graphLessons) {
            for (let req of lesson.requires) {
                this.lessons[req].isRequiredBy.push(lesson.title);
            }
        }
    }

    reloadPositions() {
        let minX = 10000,
            maxX = 0,
            minY = 10000,
            maxY = 0;
        for (let lesson of graphCoordinates.nodes) {
            minX = Math.min(minX, lesson[1] as number);
            maxX = Math.max(maxX, lesson[1] as number);
            minY = Math.min(minY, lesson[2] as number);
            maxY = Math.max(maxY, lesson[2] as number);
        }
        const centerX = (minX + maxX) / 2;

        for (let lesson of graphLessons) {
            this.positions[lesson.title] = { x: 300, y: 300 };
        }
        for (let lesson of graphCoordinates.nodes) {
            this.positions[lesson[0]] = {
                x: this.mypaper.view.center!.x! + (lesson[1] as number) - centerX,
                y: 130 + (lesson[2] as number) - minY,
            };
        }

        for (let lesson of graphLessons) {
            if (lesson.requires.length != 1) {
                for (let req of lesson.requires) {
                    if (this.lessons[req].isRequiredBy.length != 1) {
                        if (!this.stairsX[lesson.title]) {
                            this.stairsX[lesson.title] = {};
                        }
                        this.stairsX[lesson.title][req] = (this.positions[lesson.title].x + this.positions[req].x) / 2;
                    }
                }
            }
        }
        for (let stairs of graphCoordinates.edgeJumps) {
            this.stairsX[stairs[0] as string][stairs[1] as string] =
                this.mypaper.view.center!.x! + (stairs[2] as number) - centerX;
        }
    }

    displayLessons() {
        this.mypaper.activate();
        this.mypaper.project!.clear();

        //add text edges
        const fontSize = 16;
        for (let name in this.lessons) {
            let text = new paper.PointText(new paper.Point(this.positions[name].x, this.positions[name].y));
            text.content = name;
            text.style = new paper.Style({
                justification: 'center',
                fontFamily: 'Segoe UI, sans',
                fontSize: fontSize,
                fontWeight: this.boldLesson == name ? 'bold' : 'normal',
            });
            this.nodes[name] = text;
            this.edges[name] = {};
        }

        //add edges
        for (const name in this.lessons) {
            for (const req of this.lessons[name].requires) {
                const edge = new paper.Path();
                edge.style = new paper.Style({
                    strokeColor: 'black',
                    strokeWidth: 3,
                });
                edge.data = { lesson: name, req: req };
                this.edges[name][req] = edge;
                if (this.lessons[name].requires.length == 1) {
                    edge.add(new paper.Point(this.positions[name].x, this.positions[name].y + 5));
                    edge.add(new paper.Point(this.positions[name].x, this.positions[req].y - fontSize - 10));
                    edge.add(new paper.Point(this.positions[req].x, this.positions[req].y - fontSize - 10));
                    edge.add(new paper.Point(this.positions[req].x, this.positions[req].y - fontSize));
                } else if (this.lessons[req].isRequiredBy.length == 1) {
                    edge.add(new paper.Point(this.positions[name].x, this.positions[name].y + 5));
                    edge.add(new paper.Point(this.positions[name].x, this.positions[name].y + 15));
                    edge.add(new paper.Point(this.positions[req].x, this.positions[name].y + 15));
                    edge.add(new paper.Point(this.positions[req].x, this.positions[req].y - fontSize));
                } else {
                    edge.add(new paper.Point(this.positions[name].x, this.positions[name].y + 5));
                    edge.add(new paper.Point(this.positions[name].x, this.positions[name].y + 15));
                    edge.add(new paper.Point(this.stairsX[name][req], this.positions[name].y + 15));
                    edge.add(new paper.Point(this.stairsX[name][req], this.positions[req].y - fontSize - 10));
                    edge.add(new paper.Point(this.positions[req].x, this.positions[req].y - fontSize - 10));
                    edge.add(new paper.Point(this.positions[req].x, this.positions[req].y - fontSize));
                    edge.data.hasStair = true;
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/style/global';

canvas[resize] {
    width: 100%;
    height: 100%;
    position: fixed;
    background: $light-gray;
}

#tree-container {
    position: relative;
}

#tree-tools {
    position: fixed;
    right: 0px;
}

#tree-tools button {
    display: block;
    width: 80px;
    padding-top: 7px;
    padding-bottom: 0px;
    background: none;
    font-size: 0.8em;
    color: $half-gray;
}

#tree-tools button:hover {
    box-shadow: none;
    text-decoration: underline;
}

#lessonSummary {
    border: 2px solid black;
    background: white;
    padding: 10px;
    font-size: 0.8em;
    font-family: $main-font;
}

#displaylessonTitle {
    font-weight: bold;
    font-size: 1.7em;
    font-family: $secondary-font;
    margin-bottom: 10px;
}
</style>
