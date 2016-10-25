$(document).ready(function(){
	var table = document.getElementById("multiplication_table");
	var field = document.getElementById("multiplication_table_field");
	var k, i, j;

	for (i = 1; i<table.rows.length; i++)
		 for (j = 1; j < table.rows[i].cells.length; j++)
			  table.rows[i].cells[j].addEventListener("mouseover", f1);

	table.addEventListener("mouseout", f2);

	function f1()
	{
		 for (i = 0; i < table.rows.length; i++)
			  for (j = 0; j < table.rows[i].cells.length; j++)
					table.rows[i].cells[j].style.background = "#FFFFFF";

		 for (i = 0; i < table.rows.length; i++)
			  for (j = 0; j < table.rows[i].cells.length; j++)
					if (table.rows[i].cells[j] === this)
					{
						 for (r = 0; r < table.rows.length; r++)
							  table.rows[r].cells[j].style.background = "#F0E0E0";
						 for (r = 0; r < table.rows[i].cells.length; r++)
							  table.rows[i].cells[r].style.background = "#F0E0E0";
						 table.rows[i].cells[j].style.background = "#CA7777";

						 field.innerHTML = (j - 1) + " &middot; " + (i - 1) + " = " + ((i-1)*(j-1));
					}
	}

	function f2()
	{
		 for (i = 0; i < this.rows.length; i++)
			  for (j = 0; j < this.rows[i].cells.length; j++)
					this.rows[i].cells[j].style.background = "#FFFFFF";

		 for (r = 0; r < this.rows.length; r++)
			  this.rows[r].cells[8].style.background = "#F0E0E0";
		 for (r = 0; r < this.rows[9].cells.length; r++)
			  this.rows[9].cells[r].style.background = "#F0E0E0";
		 this.rows[9].cells[8].style.background = "#CA7777";

		 field.innerHTML = "7 &middot; 8 = 56";
	}
	
});