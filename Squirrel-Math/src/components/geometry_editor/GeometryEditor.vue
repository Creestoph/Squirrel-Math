<template>
    <div id="whole">
        <div id="menu">
            <button @click="addRectangle()">Add rectangle</button>
        </div>
        <canvas id="canvas" ref="canvas" resize="true"></canvas>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import paper from "paper";

@Component
export default class GeometricEditor extends Vue{
    
    mypaper: paper.PaperScope = new paper.PaperScope();

    mounted() {
        console.log(this.$refs.canvas);
        this.mypaper.setup(this.$refs.canvas as HTMLCanvasElement);
        this.mypaper.activate();
        this.mypaper.tool = new paper.Tool();
        this.addEventHandlers();
    }

    addEventHandlers() {

    }

    addRectangle() {
        let rectangle = new paper.Rectangle(new paper.Point(10, 10), new paper.Size(100, 62));
        let path = new paper.Path.Rectangle(rectangle);
        path.fillColor = new paper.Color("#dd3333");
    }
}
</script>

<style scoped lang="scss">
@import "@/style/global";

#whole {
    width: 700px;
    margin: 0 auto;
    background: none;
}

#menu {
    background: $dark-gray;
    padding: 0;

    button {
        background: none;
        padding: 10px;
        color: black;
        box-shadow: none;
        margin: 0;
    }

    button:hover {
        background: $darker-gray;
    }
}

#canvas {
    width: 696px;
    height: 500px;
    border: 2px solid black;
    background: $light-gray;
}
</style>
