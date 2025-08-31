import { Point } from './point';
import { Integer } from '../algebra-engine/numbers';
import { Product } from '../algebra-engine/product';

export class Vector extends Point {
    static fromPoint(p: Point): Vector {
        return new Vector(p.x, p.y);
    }
    opposite(): Vector {
        return new Vector(
            Product.of(Integer.minusOne, this.x),
            Product.of(Integer.minusOne, this.y),
        );
    }
}
