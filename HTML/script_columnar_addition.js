class ColumnarAddition{
	
	static InsertTable(rows, id)
	{
		var table = "<table align = \"center\" class=\"columnar_operation\">";
		for (var i = 0; i < rows.length; i++)
		{
			table += "<tr>";
			if (i == 0)
				table+="<td class = \"columnar_operation_carry\"></td><td class = \"columnar_operation_carry\"></td>";
			else if (i == rows.length-2)
				table+="<td class = \"columnar_operation_underlined\">+</td><td class = \"columnar_operation_underlined\"></td>";
			else 
				table+="<td class = \"columnar_operation\"></td><td class = \"columnar_operation\"></td>";
			
			for (var j = 0; j < rows[i].length; j++)
			{	
				if (i == 0)
					table += "<td class = \"columnar_operation_carry\">" + rows[i][j] +"</td>"
				else if (i == rows.length - 2)
					table += "<td class = \"columnar_operation_underlined\">" + rows[i][j] +"</td>"
				else
					table += "<td class = \"columnar_operation\">" + rows[i][j] +"</td>";
			}
			table += "</tr>";
		}
		table += "</table>";
		var target = document.getElementById(id).innerHTML = table;
	}
}

