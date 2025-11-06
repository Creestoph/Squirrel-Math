<template>
    <div class="tree-container">
        <canvas ref="canvas" resize="true" />
        <div class="tree-tools">
            <router-link v-if="!editMode" custom v-slot="{ navigate }" to="/editor">
                <button @click="navigate">+ Stwórz nową lekcję</button>
            </router-link>
            <button v-if="!editMode" @click="enableEdit()">Edytuj drzewo</button>
            <button v-if="editMode" @click="save()">Zapisz</button>
            <button v-if="editMode" @click="discard()">Anuluj</button>
        </div>
        <tooltip class="lesson-summary" :visible="showTooltip" :timeout="750" :offset="{ x: 50, y: -50 }">
            <div v-if="lessonTooltipData">
                <div class="display-lesson-title">{{ lessonTooltipData.title }}</div>
                <b>Dział:</b> {{ lessonTooltipData.field }}<br />
                <b>Poziom:</b> {{ lessonTooltipData.level }}<br />
                <b>Wymagane:</b>
                <div v-for="(item, i) in lessonTooltipData.requires" :key="i">{{ item }}<br /></div>
            </div>
        </tooltip>
    </div>
</template>

<script setup lang="ts">
import graphLessons from '@/assets/current-lesson-graph.json';
import graphCoordinates from '@/assets/current-graph-coordinates.json';
import Tooltip from '@/components/utils/Tooltip.vue';
import { getCurrentInstance, onMounted, ref } from 'vue';
import { Point } from './utils/point';
import paper from 'paper';

class Lesson {
    title: string = '';
    requires: string[] = [];
    isRequiredBy: string[] = [];
    field?: string;
    level?: string;
}

const editMode = ref(false);
const showTooltip = ref(false);
const lessonTooltipData = ref<Lesson | null>(null);
const canvas = ref<HTMLCanvasElement>(null!);
const proxy = getCurrentInstance()!.proxy!;

let lessons: { [name: string]: Lesson } = {};
let positions: { [lesson: string]: Point } = {};
let stairsX: { [lesson: string]: { [req: string]: number } } = {}; //e.g. stairsX[Wyrażenia algebraiczne][Ułamki dziesiętne] = 200 - x position of edge "jump" is 200

let hoveredLesson: paper.PointText | null = null;
let hoveredStair: paper.Path | null = null;
let boldLesson: string | null = null;

let mypaper: paper.PaperScope = new paper.PaperScope();
let nodes: { [name: string]: paper.PointText } = {};
let edges: { [from: string]: { [to: string]: paper.Path } } = {};

onMounted(() => {
    initialize();
    loadLessons();
    reloadPositions();
    setBoldLesson();
    displayLessons();
});

function setBoldLesson() {
    for (let l of Object.values(lessons)) {
        if (l.title == proxy.$route.params.sourceFile) {
            boldLesson = l.title;
        }
    }
}

function download(data: string, filename: string, type: string) {
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

function enableEdit() {
    editMode.value = true;
}

function save() {
    editMode.value = false;
    const json: { nodes: [string, number, number][]; edgeJumps: [string, string, number][] } = {
        nodes: [],
        edgeJumps: [],
    };
    for (let name in lessons) {
        json.nodes.push([name, positions[name].x, positions[name].y]);
    }
    for (let lesson in stairsX) {
        for (let req in stairsX[lesson]) {
            json.edgeJumps.push([lesson, req, stairsX[lesson][req]]);
        }
    }
    download(JSON.stringify(json), 'current-graph-coordinates.json', 'application/json');
}

function discard() {
    editMode.value = false;
    reloadPositions();
    displayLessons();
}

function addEventHandlers() {
    const hitOptions = {
        segments: false,
        stroke: true,
        fill: true,
        tolerance: 5,
    };
    mypaper.tool = new paper.Tool();

    mypaper.view.onResize = () => {
        reloadPositions();
        displayLessons();
    };

    mypaper.tool.onMouseMove = (event: paper.ToolEvent) => {
        const hitResult = mypaper.project!.hitTest(event.point!, hitOptions);
        hoveredStair = null;
        if (!hitResult || hitResult.type != 'fill') {
            clearHoveredLesson();
        }
        if (hitResult && hitResult.type == 'stroke') {
            if (editMode.value && hitResult.item!.data.hasStair) {
                const stairPosition = stairsX[hitResult.item!.data.lesson][hitResult.item!.data.req];
                if (Math.abs(hitResult.point!.x! - stairPosition) < 5) {
                    canvas.value.style.cursor = 'ew-resize';
                }
                hoveredStair = hitResult.item as paper.Path;
            }
        }
        if (hitResult && hitResult.type == 'fill') {
            canvas.value.style.cursor = 'pointer';
            if (!hoveredLesson) {
                const redColor = new paper.Color('#dd3333');
                hoveredLesson = hitResult.item as paper.PointText;
                hoveredLesson.style!.fillColor = redColor;
                let lessonName = hoveredLesson.content!;
                lessonTooltipData.value = lessons[lessonName];
                showTooltip.value = true;
                for (let req of lessons[lessonName].requires) {
                    edges[lessonName][req].style!.strokeColor = redColor;
                    edges[lessonName][req].bringToFront();
                }
            }
        }
    };

    mypaper.tool.onMouseDown = (event: paper.ToolEvent) => {
        if (!editMode.value && hoveredLesson) {
            if (boldLesson) {
                nodes[boldLesson].style!.fontWeight = 'normal';
            }
            boldLesson = hoveredLesson!.content!;
            nodes[boldLesson].style!.fontWeight = 'bold';
            if ((event as any).event.button === 0) {
                proxy.$router
                    .replace({
                        name: 'lesson',
                        params: {
                            sourceFile: lessons[boldLesson].title,
                        },
                    })
                    .catch(() => {});
            } else if ((event as any).event.button === 1) {
                let url = proxy.$router.resolve('/lesson/' + lessons[boldLesson].title);
                window.open(url.href, '_blank');
            }
            clearHoveredLesson();
        }
    };

    mypaper.tool.onMouseDrag = (event: paper.ToolEvent) => {
        if (!editMode.value) {
            return;
        }
        let deltaX = event.delta!.x!;
        let deltaY = event.delta!.y!;
        if (hoveredStair) {
            hoveredStair.segments![2].point!.x! += deltaX;
            hoveredStair.segments![3].point!.x! += deltaX;
            stairsX[hoveredStair.data.lesson][hoveredStair.data.req] = hoveredStair.segments![2].point!.x!;
        }
        if (hoveredLesson) {
            let clickedTitle = hoveredLesson.content!;
            hoveredLesson.position = hoveredLesson.position!.add(new paper.Point(deltaX, deltaY));
            positions[clickedTitle].x = hoveredLesson.position.x!;
            positions[clickedTitle].y = hoveredLesson.position.y!;
            for (let path of Object.values(edges[clickedTitle])) {
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
            for (let upper of lessons[clickedTitle].isRequiredBy) {
                let segments = edges[upper][clickedTitle].segments as paper.Segment[];
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

    mypaper.tool.onMouseUp = () => {
        const snap = (x: number) => Math.floor((x + 5) / 10) * 10;
        if (editMode.value) {
            for (let pos of Object.values(positions)) {
                pos.x = snap(pos.x);
                pos.y = snap(pos.y);
            }
            for (let lesson in stairsX) {
                for (let req in stairsX[lesson]) {
                    stairsX[lesson][req] = snap(stairsX[lesson][req]);
                }
            }
            displayLessons();
        }
    };
}

function clearHoveredLesson() {
    canvas.value.style.cursor = 'default';
    if (hoveredLesson) {
        hoveredLesson.style!.fillColor = new paper.Color('black');
        const lessonName = hoveredLesson.content!;
        for (let req of lessons[lessonName].requires) {
            edges[lessonName][req].style!.strokeColor = new paper.Color('black');
        }
        hoveredLesson = null;
        showTooltip.value = false;
    }
}

function initialize() {
    mypaper.setup(canvas.value);
    mypaper.activate();
    addEventHandlers();
}

function loadLessons() {
    for (let lesson of graphLessons) {
        lessons[lesson.title] = {
            title: lesson.title,
            requires: lesson.requires,
            isRequiredBy: [],
            field: lesson.field,
            level: lesson.level,
        };
    }
    for (let lesson of graphLessons) {
        for (let req of lesson.requires) {
            lessons[req].isRequiredBy.push(lesson.title);
        }
    }
}

function reloadPositions() {
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
        positions[lesson.title] = { x: 300, y: 300 };
    }
    for (let lesson of graphCoordinates.nodes) {
        positions[lesson[0]] = {
            x: mypaper.view.center!.x! + (lesson[1] as number) - centerX,
            y: 130 + (lesson[2] as number) - minY,
        };
    }

    for (let lesson of graphLessons) {
        if (lesson.requires.length != 1) {
            for (let req of lesson.requires) {
                if (lessons[req].isRequiredBy.length != 1) {
                    if (!stairsX[lesson.title]) {
                        stairsX[lesson.title] = {};
                    }
                    stairsX[lesson.title][req] = (positions[lesson.title].x + positions[req].x) / 2;
                }
            }
        }
    }
    for (let stairs of graphCoordinates.edgeJumps) {
        stairsX[stairs[0] as string][stairs[1] as string] = mypaper.view.center!.x! + (stairs[2] as number) - centerX;
    }
}

function displayLessons() {
    mypaper.activate();
    mypaper.project!.clear();

    //add text edges
    const fontSize = 16;
    for (let name in lessons) {
        let text = new paper.PointText(new paper.Point(positions[name].x, positions[name].y));
        text.content = name;
        text.style = new paper.Style({
            justification: 'center',
            fontFamily: 'Segoe UI, sans',
            fontSize: fontSize,
            fontWeight: boldLesson == name ? 'bold' : 'normal',
        });
        nodes[name] = text;
        edges[name] = {};
    }

    //add edges
    for (const name in lessons) {
        for (const req of lessons[name].requires) {
            const edge = new paper.Path();
            edge.style = new paper.Style({
                strokeColor: 'black',
                strokeWidth: 3,
            });
            edge.data = { lesson: name, req: req };
            edges[name][req] = edge;
            if (lessons[name].requires.length == 1) {
                edge.add(new paper.Point(positions[name].x, positions[name].y + 5));
                edge.add(new paper.Point(positions[name].x, positions[req].y - fontSize - 10));
                edge.add(new paper.Point(positions[req].x, positions[req].y - fontSize - 10));
                edge.add(new paper.Point(positions[req].x, positions[req].y - fontSize));
            } else if (lessons[req].isRequiredBy.length == 1) {
                edge.add(new paper.Point(positions[name].x, positions[name].y + 5));
                edge.add(new paper.Point(positions[name].x, positions[name].y + 15));
                edge.add(new paper.Point(positions[req].x, positions[name].y + 15));
                edge.add(new paper.Point(positions[req].x, positions[req].y - fontSize));
            } else {
                edge.add(new paper.Point(positions[name].x, positions[name].y + 5));
                edge.add(new paper.Point(positions[name].x, positions[name].y + 15));
                edge.add(new paper.Point(stairsX[name][req], positions[name].y + 15));
                edge.add(new paper.Point(stairsX[name][req], positions[req].y - fontSize - 10));
                edge.add(new paper.Point(positions[req].x, positions[req].y - fontSize - 10));
                edge.add(new paper.Point(positions[req].x, positions[req].y - fontSize));
                edge.data.hasStair = true;
            }
        }
    }
}
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/colors';
@use '@/style/fonts';

canvas[resize] {
    width: 100%;
    height: 100%;
    position: fixed;
    background: colors.$light-gray;
}

.tree-container {
    position: relative;
}

.tree-tools {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 7px;
    right: 0px;
    padding: 7px;

    button {
        display: block;
        background: none;
        font-size: 0.8em;
        color: colors.$half-gray;

        &:hover {
            box-shadow: none;
            text-decoration: underline;
        }
    }
}

.lesson-summary {
    border: 2px solid black;
    background: white;
    padding: 10px;
    font-size: 0.8em;
    font-family: fonts.$main-font;
}

.display-lesson-title {
    font-weight: bold;
    font-size: 1.7em;
    font-family: fonts.$secondary-font;
    margin-bottom: 10px;
}
</style>
