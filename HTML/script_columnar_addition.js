function ColumnarAdditionStart(inputId, nextId, prevId, scriptId, commentId, tableId)
{	
	document.getElementById(tableId).style.visibility = "visible";
	document.getElementById(tableId).style.marginBottom = "60px";
	document.getElementById(tableId).style.height = "400px";
	document.getElementById(tableId).style.padding = "20px";
	document.getElementById(scriptId).style.marginTop = "60px";
	document.getElementById(commentId).style.marginTop = "60px";
	document.getElementById(prevId).childNodes[0].nextSibling.setAttribute("height", "60px");
	document.getElementById(nextId).childNodes[0].nextSibling.setAttribute("height", "60px");
	var input = document.getElementById(inputId).value;
	input = input.replace(/ /g,"");
	input = input.replace(/,/g,".");
	var inputTab = input.split("+");
	var columnarAddition = ColumnarAddition.CreateFromNumbers(inputTab, scriptId, commentId, nextId, prevId);
	if (columnarAddition != undefined)
	{
		document.getElementById(nextId).onclick = function() {
			columnarAddition.NextStep();
			columnarAddition.Print();
		};
		document.getElementById(prevId).onclick = function() {
			columnarAddition.PrevStep();
			columnarAddition.Print();
		};
		columnarAddition.NextStep();
		columnarAddition.Print();	
	}
}

function SetInputEnterEvent(inputId, btnId)
{
	document.getElementById(inputId)
		.addEventListener("keyup", function(event) {
		event.preventDefault();
		if (event.keyCode == 13) {
			document.getElementById(btnId).click();
		}
	});
}
class ColumnarAddition{
	
	constructor(id, commentId)
	{
		this.step = 0;
		this.id = id;
		this.numbersTable = [];
		this.comma = 0;
		this.commentId = commentId;
		this.comment = "";
		this.buttonRightId = "";
		this.buttonLeftId = "";
	}
	
	NextStep()
	{
		document.getElementById(this.buttonLeftId).style.visibility = "visible";
		document.getElementById(this.buttonRightId).style.visibility = "visible";
		var digits = [];
		if (this.currentColumn < 0) 
		{
			this.highlightColumn = -1;
			this.step++;
			this.comment = "Odczytujemy wynik: ";
			for (var i = 0; i < this.numbersTable[this.numbersTable.length - 1].length; i++)
				this.comment += (i==this.longestBeforeComma ? "," : "")+this.numbersTable[this.numbersTable.length - 1][i];
			this.comment += ".";
			document.getElementById(this.buttonRightId).style.visibility = "hidden";
			return;
		}
		if (this.step == 0) 
		{
			this.comment = "Zapisujemy "+(this.numbersTable.length == 4 ? "obie" : "wszystkie")+" liczby jedna pod drugą z wyrównaniem do " + (this.comma == 0 ? "prawej" : "przecinka")+ " i podkreślamy.";
			document.getElementById(this.buttonLeftId).style.visibility = "hidden";
		}
		else
		{
			for (var i = 0; i < this.numbersTable.length-1; i++ )
			{
				if (this.numbersTable[i][this.currentColumn] != "") digits.push(this.numbersTable[i][this.currentColumn]);
			}
			
			if (digits.length == 0) 
			{
				this.highlightColumn = -1;
				this.step++;
				this.comment = "Odczytujemy wynik: ";
				for (var i = 0; i < this.numbersTable[this.numbersTable.length - 1].length; i++)
					this.comment += (i==this.longestBeforeComma ? "," : "")+this.numbersTable[this.numbersTable.length - 1][i];
				this.comment += ".";
				document.getElementById(this.buttonRightId).style.visibility = "hidden";
				return;
			}
			
			if (this.step == 1)
				this.comment = "Analizujemy słupek od prawej strony. "
			else 
				this.comment = "";
					
			
			if (digits.length == 1)
			{
				this.comment += "Cyfra " + digits[0] + " jest samotna, więc przepisujemy ją bez zmian.";
				this.numbersTable[this.numbersTable.length-1][this.currentColumn] = digits[0];
			}	
			else
			{
				this.comment = "Dodajemy cyfry ";
				if (digits.length == 2) this.comment += digits[0] + " i " + digits[1] +", ";
				else
				{
					for (var i = 0; i < digits.length - 1; i++)
					{
						this.comment += digits[i]+", ";
					}
					this.comment += digits[digits.length-1] + " i ";
				}
				this.comment += " otrzymujemy ";
				var sum = 0;
				for (var i = 0; i < digits.length; i++) sum += parseInt(digits[i]);
				this.comment += sum;
				var carry = parseInt(sum / 10);
				if (carry == 0)
				{
					this.comment += ". Wynik zapisujemy pod kreską.";
					this.numbersTable[this.numbersTable.length-1][this.currentColumn] = sum;
				}
				else
				{
					this.comment += ". Ponieważ wynik jest dwucyfrowy, rozbijamy go na " + carry + " i " + sum%10 + ". Cyfrę " + sum%10 + " zapisujemy pod kreską, a " + carry + " przenosimy do następnej kolumny.";
					this.numbersTable[this.numbersTable.length-1][this.currentColumn] = sum%10;
					this.numbersTable[0][this.currentColumn-1] = carry;
				}
			}
			
		}
		this.highlightColumn = -1;
		if (this.step != 0) this.highlightColumn = (digits.length == 0 ? this.currentColumn - 1: this.currentColumn);
		if (this.step != 0)this.currentColumn -= 1;
		this.step += 1;
	}
	
	PrevStep()
	{
		if (this.step > 1)
		{
			for (var i = 0; i < this.numbersTable[0].length; i++)
			{
				this.numbersTable[0][i] = "";
				this.numbersTable[this.numbersTable.length-1][i] = "";
			}
			var prevStep = this.step - 1;
			this.currentColumn = this.numbersTable[0].length-1;
			this.step = 0;
			while (this.step != prevStep)
				this.NextStep();
		}
	}
	
	Print()
	{
		document.getElementById(this.commentId).innerHTML = this.comment;
		ColumnarAddition.InsertTable(this.numbersTable,this.id,this.comma, this.highlightColumn);
	}
	
	static CreateFromNumbers(numbersStr, id, commentId, buttonRightID, buttonLeftID)
	{
		var ret = new ColumnarAddition(id, commentId);
		ret.buttonLeftId = buttonLeftID;
		ret.buttonRightId = buttonRightID;
		var numbers = [];
		document.getElementById(buttonRightID).style.visibility = "visible";
		document.getElementById(buttonLeftID).style.visibility = "visible";
		if (numbersStr.length == 1)
		{
			ret.comment = "Wpisz liczby do dodania <br>np. 1234+73";
			ret.Print();
			document.getElementById(buttonRightID).style.visibility = "hidden";
			document.getElementById(buttonLeftID).style.visibility = "hidden";
			return;			
		}
		for (var i = 0; i < numbersStr.length; i++)
		{
			var wasComma = false;
			var ok = true;
			for (var j = 0; j < numbersStr[i].length; j++)
			{
				if (numbersStr[i][j] == ".")
				{
					if (wasComma)
					{
						ok = false;
						break;
					}
					else wasComma = true;
				}
				else if (isNaN(parseInt(numbersStr[i][j])))
				{
					ok = false;
					break;					
				}
			}
			if (!ok)
			{
				ret.comment = "Wpisz liczby do dodania <br>np. 1234+73";
				ret.Print();
				document.getElementById(buttonRightID).style.visibility = "hidden";
				document.getElementById(buttonLeftID).style.visibility = "hidden";
				return;
			}
			numbers[i] = parseFloat(numbersStr[i]);
		}
		
		var longestBeforeComma = 0;
		var longestAfterComma = 0;
		for (var i = 0; i<numbers.length; i++)
		{
			var j;
			var iStr = numbers[i].toString();
			for (j = 0; j < iStr.length && iStr[j] != '.'; j++){}
			if (j > longestBeforeComma) longestBeforeComma = j;
			if (iStr.length-1-j > longestAfterComma) longestAfterComma = iStr.length-1-j;
		}
		longestBeforeComma += 1;
		for (var i = 0; i < numbers.length+2; i++)
		{
			ret.numbersTable[i] = [];
			for (var j = 0; j < longestAfterComma + longestBeforeComma; j++)
			{
				ret.numbersTable[i][j] = "";
			}
		}
		for (var i = 0; i<numbers.length; i++)
		{
			var beforeComma = 0;
			var afterComma = 0;
			var iStr = numbers[i].toString();
			var j;
			for (j = 0; j < iStr.length && iStr[j] != '.'; j++){}
			if (j > beforeComma) beforeComma = j;
			if (iStr.length-1-j > afterComma) afterComma = iStr.length-1-j;
			iStr = iStr.replace(".","")
			for (var k = 0; k < iStr.length; k++)
			{
				ret.numbersTable[i+1][longestBeforeComma-beforeComma+k] = iStr[k];
			}
		}
		ret.longestBeforeComma = longestBeforeComma;
		ret.currentColumn = ret.numbersTable[0].length-1;
		ret.highlightColumn = ret.numbersTable[0].length-1;
		ret.comma = longestAfterComma;
		return ret;
		
	}
	
	static InsertTable(rows, id, comma = 0, highlight_column = -1)
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
				if (j == rows[i].length - comma)
				{
					var c = (rows[i][j] != "" ? "," : "");
					if (i == 0)
						table += "<td class = \"columnar_operation_carry\"></td>";
					else if (i == rows.length - 2)
						table += "<td class = \"columnar_operation_underlined\">"+c+"</td>";
					else
						table += "<td class = \"columnar_operation\">"+c+"</td>";			
				}
				if (i == 0)
					table += "<td class = \"columnar_operation_carry";
				else if (i == rows.length - 2)
					table += "<td class = \"columnar_operation_underlined";
				else
					table += "<td class = \"columnar_operation";
				if (highlight_column == j)
					table += " columnar_operation_highlight\"";
				else table+= "\"";
				table += ">" + rows[i][j] +"</td>";
			}
			table += "</tr>";
		}
		table += "</table>";
		document.getElementById(id).innerHTML = table;
	}
}

