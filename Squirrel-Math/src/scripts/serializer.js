export class Serializer {

    constructor(tag){
        this.tag = tag
        this.get = function() {return "";};
    }

    serialize() {
        return "<" + this.tag + ">" + this.get() + "</" + this.tag + ">"
    }

}