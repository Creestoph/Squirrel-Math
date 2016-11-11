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
function Columnar_operation_node (str) {
	var tab = str.split(":");
	if (tab.length == 1) {
		this.value = tab[0];
		this.update_styles("");
	}
	else if (tab.length == 2){
		this.value = tab[1];
		this.update_styles(tab[0]);
	}
	else{
		throw "Invalid node pattern: " + str;
	}
}

/**
 * Updates node styles
 * @param str pattern: /styleid/styleid.../styleid
 */
Columnar_operation_node.prototype.update_styles = function (str) {
	this.style_ids = str.split("/");
	this.style_ids.splice(0,1);	
}

Columnar_operation_node.prototype.print = function () {
	var class_str = " class = \"columnar_operation\"";
	if (this.style_ids.length > 0){
		class_str = " class = \"" + this.style_ids.map(Columnar_operation_node.style_id_to_style_name).join(" ") + "\"";
	}
	return "<td"+class_str+">"+ this.value + "</td>";
}

Columnar_operation_node.style_dictionary = {};
Columnar_operation_node.style_dictionary["c"] = "columnar_operation_carry";
Columnar_operation_node.style_dictionary["u"] = "columnar_operation_underlined";
Columnar_operation_node.style_dictionary["h"] = "columnar_operation_highlight";
Columnar_operation_node.style_dictionary["s"] = "strikethrough";

Columnar_operation_node.style_id_to_style_name = function (style_id) {
	if (!(style_id in  Columnar_operation_node.style_dictionary)){
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
function Display_table (nodes) {
	this.nodes = nodes;
}

Display_table.prototype.print = function (target_id) {

	var table = "<table align = \"center\" class=\"columnar_operation\">";
	for (var i = 0; i < this.nodes.length; i++){
		table += "<tr>";
		for (var j = 0; j < this.nodes[i].length; j++) {
			table += this.nodes[i][j].print();
		}
		table += "</tr>";
	}
	table += "</table>";
	document.getElementById(target_id).innerHTML = table;
}

Display_table.create_custom = function (strs) {
	var nodes = [];
	for (var i = 0; i < strs.length; i++){
		nodes[i] = [];
		for (var j = 0; j < strs[i].length; j++){
			nodes[i][j] = new Columnar_operation_node(strs[i][j]);
		}
	}
	return new Display_table(nodes);
}

Display_table.create_from_table = function (operation, numbers) {
	var nodes = [];
	for (var i = 0; i < numbers.length; i++){
		nodes[i] = [];
		var style = "";
		switch (operation){
			case "+":
				if (i == 0){
					style += "/c";
				}
				if (i == numbers.length - 2){
					style += "/u";
					nodes[i][0] = new Columnar_operation_node(style+":+");
					nodes[i][1] = new Columnar_operation_node(style+":");
				}
				else{
					nodes[i][0] = new Columnar_operation_node(style+":");
					nodes[i][1] = new Columnar_operation_node(style+":");
				}
				for (var j = 0; j < numbers[i].length; j++){
					nodes[i][j+2] = new Columnar_operation_node(style + (numbers[i][j].length > 0 && numbers[i][j][0] == "/" ? "" : ":") + numbers[i][j]);
				}
				break;
			case "-":
				if (i == 0 || i == 1){
					style += "/c";
				}
				if (i == numbers.length - 2){
					style += "/u";
					nodes[i][0] = new Columnar_operation_node(style+":-");
					nodes[i][1] = new Columnar_operation_node(style+":");
				}
				else{
					nodes[i][0] = new Columnar_operation_node(style+":");
					nodes[i][1] = new Columnar_operation_node(style+":");
				}
				for (var j = 0; j < numbers[i].length; j++){
					nodes[i][j+2] = new Columnar_operation_node(style + (numbers[i][j].length > 0 && numbers[i][j][0] == "/" ? "" : ":") + numbers[i][j]);
				}
				break;
		}
	}
	return new Display_table(nodes);
}