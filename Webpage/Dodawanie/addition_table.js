$(document).ready(function(){
	var table = document.getElementById("adding_table");
	var field = document.getElementById("adding_table_field");
	var i, j;
	const color_white = "#FFFFFF";
	const color_light = "#F0E0E0";
	const color_dark = "#CC4444";

	for (i = 1; i<table.rows.length; i++)
		 for (j = 1; j < table.rows[i].cells.length; j++)
			  table.rows[i].cells[j].addEventListener("mouseover", f1);

	table.addEventListener("mouseout", f2);

	function f1()
	{
		 for (i = 0; i < table.rows.length; i++)
			  for (j = 0; j < table.rows[i].cells.length; j++)
					table.rows[i].cells[j].style.background = color_white;

		 for (i = 0; i < table.rows.length; i++)
			  for (j = 0; j < table.rows[i].cells.length; j++)
					if (table.rows[i].cells[j] === this)
					{
						 for (r = 0; r < table.rows.length; r++)
							  table.rows[r].cells[j].style.background = color_light;
						 for (r = 0; r < table.rows[i].cells.length; r++)
							  table.rows[i].cells[r].style.background = color_light;
						 table.rows[i].cells[j].style.background = color_dark;

						 field.innerHTML = (j - 1) + " + " + (i - 1) + " = " + (i + j - 2);
						 field.style.visibility = "visible";
					}
	}

	function f2()
	{
		 for (i = 0; i < this.rows.length; i++)
			  for (j = 0; j < this.rows[i].cells.length; j++)
					this.rows[i].cells[j].style.background = color_white;

		 for (r = 0; r < this.rows.length; r++)
			  this.rows[r].cells[9].style.background = color_light;
		 for (r = 0; r < this.rows[10].cells.length; r++)
			  this.rows[10].cells[r].style.background = color_light;
		 this.rows[10].cells[9].style.background = color_dark;

		 field.innerHTML = "a";
		 field.style.visibility = "hidden";
	}
	
});