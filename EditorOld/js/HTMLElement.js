/**
 * Created by InvincibleWombat on 17.05.2017.
 */

var id = 0;

class HTMLElement {

    // element;
    // parent;
    // index;
    // id;

    constructor(parent_div, sibling_number) {
        this.parent = parent_div;
        this.index = sibling_number;
        this.id = id++;
    }

    updateHTML(content) {
        if (this.element) this.parent.removeChild(this.element);
        content.id = this.id;
        this.element = content;
        this.insertAtIndex();

    }

    insertAtIndex() {
        if (!this.index) this.index = 0;
        if (this.index >= this.parent.children.length) {
            this.parent.appendChild(this.element)
        } else {
            this.parent.insertBefore(this.element, this.parent.children[this.index])
        }
    }
}