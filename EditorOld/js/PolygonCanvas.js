/**
 * Created by InvincibleWombat on 17.05.2017.
 */
class PolygonCanvas extends MovingShape{

    constructor(parent_div, index) {
        super(parent_div, index);
        let tri = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
        tri.setAttribute('points', "53,40 87,40 105,70 87,100 53,100 35,70");
        tri.setAttribute('style', "fill:rgb(200,0,0);stroke:rgb(70, 0, 0);stroke-width:2");
        tri.setAttribute("transform", "matrix(1 0 0 1 0 0)");
        const a = this;
        this.updateHTML(tri);
        tri.onmousedown = function (evt) {
            evt.stopPropagation();
            MovingShape.select(evt, a);
        };

    }
}