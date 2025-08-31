import { Vector } from './vector';
import { Point } from './point';
import { Expression } from '../algebra-engine/expression';

export interface Figure {
    draw(): void;

    translated(v: Vector): Figure;
    scaled(scale: Expression, point?: Point): Figure;
    //rotate(angle: Expression, point?: Point): void; (requires trigonometry)
}
