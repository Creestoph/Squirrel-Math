/**
 * Created by InvincibleWombat on 17.05.2017.
 */
class TriangleCanvas extends MovingShape{

    constructor(parent_div, index) {
        super(parent_div, index);
        let tri = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
        tri.setAttribute('points', "40,40 40,100 80,80");
        tri.setAttribute('style', "fill:lime;stroke:purple;stroke-width:1");
        tri.setAttribute("transform", "matrix(1 0 0 1 0 0)");
        const a = this;
        this.updateHTML(tri);
        tri.onmousedown = function (evt) {
            MovingShape.select(evt, a);
        };

    }
}