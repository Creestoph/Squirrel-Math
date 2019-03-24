/**
 * Created by Creestoph on 31.10.2016.
 */

/**
 * class Columnar_operation_node
 *  variables:
 *      style_ids - array with styles ids
 *      value
 *  static_variables:
 *      style_dictionary
 */

/**
 * Creates new node from string
 * @param str pattern: /styleid/styleid.../styleid:value
 * @constructor
 */
function Columnar_operation_node(str) {
    if (str.indexOf("/") != 0) {
        this.value = str;
        this.update_styles("");
    }
    else {
        var s = str.indexOf(":");
        if (s == -1)
            throw "Invalid node pattern: " + str;
        this.value = str.substring(s + 1);
        this.update_styles(str.substring(0, s));
    }

}

/**
 * Updates node styles
 * @param str pattern: /styleid/styleid.../styleid
 */
Columnar_operation_node.prototype.update_styles = function (str) {
    this.style_ids = str.split("/");
    this.style_ids.splice(0, 1);
}

Columnar_operation_node.prototype.print = function () {
    if (this.style_ids.indexOf("c") == -1)
        this.style_ids.push("n")
    var class_str = " class = \"" + this.style_ids.map(Columnar_operation_node.style_id_to_style_name).join(" ") + "\"";
    return this.value ? "<td" + class_str + ">$" + this.value + "$</td>" : "<td" + class_str + "></td>";
}

Columnar_operation_node.style_dictionary = {};
Columnar_operation_node.style_dictionary["n"] = "columnar_operation_not_carry";
Columnar_operation_node.style_dictionary["c"] = "columnar_operation_carry";
Columnar_operation_node.style_dictionary["u"] = "columnar_operation_underlined";
Columnar_operation_node.style_dictionary["h"] = "columnar_operation_highlight";
Columnar_operation_node.style_dictionary["s"] = "strikethrough";

Columnar_operation_node.style_id_to_style_name = function (style_id) {
    if (!(style_id in Columnar_operation_node.style_dictionary)) {
        throw "Ivalid style id: " + style_id;
    }
    return Columnar_operation_node.style_dictionary[style_id];
}


/**
 * class Display_table
 *  variables:
 *      nodes
 */

/**
 * Creates new Display_table from given nodes
 * @param nodes two dimensional table of nodes
 * @constructor
 */
export class Display_table {
    constructor(nodes) {
        this.nodes = nodes;
    }

    print(target) {

        var table = "<table align = \"center\" class=\"columnar_operation\">";
        for (var i = 0; i < this.nodes.length; i++) {
            table += "<tr>";
            for (var j = 0; j < this.nodes[i].length; j++) {
                table += this.nodes[i][j].print();
            }
            table += "</tr>";
        }
        table += "</table>";
        target.innerHTML = table;
    }

    static create_custom(strs) {
        var nodes = [];
        for (var i = 0; i < strs.length; i++) {
            nodes[i] = [];
            for (var j = 0; j < strs[i].length; j++) {
                nodes[i][j] = new Columnar_operation_node(strs[i][j]);
            }
        }
        return new Display_table(nodes);
    }

    static create_from_table(operation, numbers) {
        var nodes = [];
        var t;
        for (var i = 0; i < numbers.length; i++) {
            nodes[i] = [];
            var style = "";
            switch (operation) {
                case "+":
                    if (i == 0) {
                        style += "/c";
                    }
                    if (i == numbers.length - 2) {
                        style += "/u";
                        t = style + ":+";
                        nodes[i][0] = new Columnar_operation_node(t[0] == ':' ? t.substring(1) : t);
                        t = style + ":";
                        nodes[i][1] = new Columnar_operation_node(t[0] == ':' ? t.substring(1) : t);
                    }
                    else {
                        t = style + ":";
                        nodes[i][0] = new Columnar_operation_node(t[0] == ':' ? t.substring(1) : t);
                        nodes[i][1] = new Columnar_operation_node(t[0] == ':' ? t.substring(1) : t);
                    }
                    for (var j = 0; j < numbers[i].length; j++) {
                        t = style + (numbers[i][j].length > 0 && numbers[i][j][0] == "/" ? "" : ":") + numbers[i][j]
                        nodes[i][j + 2] = new Columnar_operation_node(t[0] == ':' ? t.substring(1) : t);
                    }
                    break;
                case "-":
                    if (i == 0 || i == 1) {
                        style += "/c";
                    }
                    if (i == numbers.length - 2) {
                        style += "/u";
                        t = style + ":-";
                        nodes[i][0] = new Columnar_operation_node(t[0] == ':' ? t.substring(1) : t);
                        t = style + ":";
                        nodes[i][1] = new Columnar_operation_node(t[0] == ':' ? t.substring(1) : t);
                    }
                    else {
                        t = style + ":";
                        nodes[i][0] = new Columnar_operation_node(t[0] == ':' ? t.substring(1) : t);
                        nodes[i][1] = new Columnar_operation_node(t[0] == ':' ? t.substring(1) : t);
                    }
                    for (var j = 0; j < numbers[i].length; j++) {
                        t = style + (numbers[i][j].length > 0 && numbers[i][j][0] == "/" ? "" : ":") + numbers[i][j];
                        nodes[i][j + 2] = new Columnar_operation_node(t[0] == ':' ? t.substring(1) : t);
                    }
                    break;
            }
        }
        return new Display_table(nodes);
    }
}

