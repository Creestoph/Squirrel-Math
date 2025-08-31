import { Figure } from './figure';
import { Vector } from './vector';
import { Expression } from '../algebra-engine/expression';
import { Point } from './point';
import { Integer } from '../algebra-engine/numbers';

export class Group implements Figure {
    figures: Figure[];

    constructor(...figures: Figure[]) {
        this.figures = figures;
    }

    draw() {
        this.figures.forEach((f) => f.draw());
    }

    translated(v: Vector): Group {
        return new Group(...this.figures.map((f) => f.translated(v)));
    }
    scaled(scale: Expression, p: Point = new Point(Integer.zero, Integer.zero)): Group {
        return new Group(...this.figures.map((f) => f.scaled(scale, p)));
    }
}
