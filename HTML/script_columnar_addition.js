class ColumnarAddition{
	
	static InsertTable(rows, id)
	{
		var table = "<table align = \"center\" class=\"columnar_operation\">";
		for (var i = 0; i < rows.length; i++)
		{
			table += "<tr>";
			var sign = 0;
			if (i == rows.length-2)
			{
				table+="<td class = \"columnar_operation_underlined\">+</td><td class = \"columnar_operation_underlined\"></td>";
				sign = 1;
			}	
			else table+="<td class = \"columnar_operation\"></td><td class = \"columnar_operation\"></td>";
			for (var j = 0; j < rows[i].length; j++)
			{			
				table += "<td"+(sign == 1 ? " class = \"columnar_operation_underlined\"" : " class = \"columnar_operation\"" )+">" + rows[i][j] + "</td>";
			}
			table += "</tr>";
		}
		table += "</table>";
		var target = document.getElementById(id).innerHTML = table;
	}
}

