function ColumnarSubtractionStart(inputId, nextId, prevId, scriptId, commentId, tableId)
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
	var inputTab = input.split("-");
	var columnarSubtraction = ColumnarSubtraction.CreateFromNumbers(inputTab, scriptId, commentId, nextId, prevId);
	if (columnarSubtraction != undefined)
	{
		document.getElementById(nextId).onclick = function() {
			columnarSubtraction.NextStep();
			columnarSubtraction.Print();
		};
		document.getElementById(prevId).onclick = function() {
			columnarSubtraction.PrevStep();
			columnarSubtraction.Print();
		};
		columnarSubtraction.NextStep();
		columnarSubtraction.Print();	
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
class ColumnarSubtraction{
	
	constructor(id, commentId)
	{
		this.step = 0;
		this.id = id;
		this.numbersTable = [];
		this.crossedNumbers = [];
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
		var diff = 0;
		if (this.currentColumn < 0) 
		{
			this.highlightColumn = -1;
			this.step++;
			this.comment = "Odczytujemy wynik: ";
			var w = "";
			for (var i = 0; i < this.numbersTable[this.numbersTable.length - 1].length; i++)
				w += (i==this.longestBeforeComma ? "," : "")+this.numbersTable[this.numbersTable.length - 1][i];
			while (w[0] == "0") w = w.replace("0","");
			this.comment += (w=="" ? "0" : w)+".";
			document.getElementById(this.buttonRightId).style.visibility = "hidden";
			return;
		}
		if (this.step == 1)
		{
			var r = false;
			for (var i = this.numbersTable[0].length-this.comma; i < this.numbersTable[0].length; i++)
			{
				for (var j = 2; j < 4; j++)
				{
					if (this.numbersTable[j][i] == "")
					{
						this.numbersTable[j][i] = "0";
						r = true;
						this.comment = "Wypełniamy puste miejsca zerami.";
					}
				}
			}
			if (r)
			{
				this.step++;
				return;
			}
		}
		if (this.step == 0) 
		{
			this.comment = "Zapisujemy obie liczby jedna pod drugą z wyrównaniem do " + (this.comma == 0 ? "prawej" : "przecinka")+ " i podkreślamy.";
			document.getElementById(this.buttonLeftId).style.visibility = "hidden";
		}
		else
		{
			var k =2;
			for (; this.crossedNumbers[k][this.currentColumn]; k--);
			diff = this.numbersTable[k][this.currentColumn] - this.numbersTable[3][this.currentColumn];
			if (diff >= 0)
			{
				this.numbersTable[4][this.currentColumn] = diff;
				if (this.numbersTable[3][this.currentColumn] == "" )
					this.comment = "Cyfra " +this.numbersTable[k][this.currentColumn]+ " jest samotna, więc przepisujemy ją bez zmian.";
				else 
					this.comment = "Odejmujemy liczby " +this.numbersTable[k][this.currentColumn]+ " i " + this.numbersTable[3][this.currentColumn] + ", otrzymujemy " + diff + ". Wynik zapisujemy pod kreską.";
			}
			else
			{
				var i = 0;
				var j = 0;
				for (i = this.currentColumn - 1; i >= 0; i--)
				{
					
					j =2;
					for (; this.crossedNumbers[j][i]; j--);
					this.crossedNumbers[j][i] = true;
					if (this.numbersTable[j][i] == 0)
						this.numbersTable[j-1][i] =  9;
					else
					{
						this.numbersTable[j-1][i] = parseInt(this.numbersTable[2][i])-1;
						break;
					}
				}
				if (i == this.currentColumn - 1)
					this.comment = "Chcemy odjąć cyfry " +this.numbersTable[k][this.currentColumn]+ " i " + this.numbersTable[3][this.currentColumn] + ". Napotykamy trudności, więc musimy wykonać zapożyczenie. Cyfrę " +
						this.numbersTable[k][this.currentColumn] + " zwiększamy do " + (parseInt(this.numbersTable[k][this.currentColumn])+10) + " kosztem cyfry bezpośrednio po lewej, którą zmiejszamy do " + this.numbersTable[j-1][i] +".";
				else
					this.comment = "Chcemy odjąć cyfry " +this.numbersTable[k][this.currentColumn]+ " i " +this.numbersTable[3][this.currentColumn]+ 
						". Naptykamy trudności, więc chcemy wykonać pożyczkę od cyfry bezpośrednio po lewej. Ponieważ jest ona zerem, zapożyczenia musimy dokonać od dalszej cyfry - od " + (parseInt(this.numbersTable[j-1][i])+1) + 
						". Zmniejszamy ją do " + this.numbersTable[j-1][i] + ", wszystkie zera po drodze do 9, a wyjściowe " + this.numbersTable[k][this.currentColumn] + " zwiększamy do " +
						(parseInt(this.numbersTable[k][this.currentColumn])+10) +
						". Odejmujemy liczby " +(parseInt(this.numbersTable[k][this.currentColumn])+10)+ " i " +this.numbersTable[3][this.currentColumn]+ ", otrzymujemy " + (10+parseInt(diff)) + ". Wynik zapisujemy pod kreską.";
				i =2;
				for (; this.crossedNumbers[i][this.currentColumn]; i--);
				this.crossedNumbers[i][this.currentColumn] = true;
				this.numbersTable[i-1][this.currentColumn] = parseInt(this.numbersTable[i][this.currentColumn])+10;
				this.numbersTable[4][this.currentColumn] = 10+parseInt(diff);
			}
			
		}
		this.highlightColumn = -1;
		if (this.step != 0)
		{
			this.highlightColumn = this.currentColumn;
			this.currentColumn -= 1;
		}
		
		this.step += 1;
	}
	
	PrevStep()
	{
		if (this.step > 1)
		{
			for (var i = 0; i < this.numbersTable[0].length; i++)
			{
				this.numbersTable[0][i] = "";
				this.numbersTable[1][i] = "";
				this.numbersTable[this.numbersTable.length-1][i] = "";
			}
			for (var i = 0; i < this.crossedNumbers.length; i++)
				for (var j = 0; j < this.crossedNumbers[i].length; j++)
					this.crossedNumbers[i][j] = false;
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
		ColumnarSubtraction.InsertTable(this.numbersTable,this.id,this.crossedNumbers,this.comma, this.highlightColumn);
	}
	
	static CreateFromNumbers(numbersStr, id, commentId, buttonRightID, buttonLeftID)
	{
		var ret = new ColumnarSubtraction(id, commentId);
		ret.buttonLeftId = buttonLeftID;
		ret.buttonRightId = buttonRightID;
		var numbers = [];
		document.getElementById(buttonRightID).style.visibility = "visible";
		document.getElementById(buttonLeftID).style.visibility = "visible";
		if (numbersStr.length == 1)
		{
			ret.comment = "Wpisz liczby do odjęcia <br>np. 1234-73";
			ret.Print();
			document.getElementById(buttonRightID).style.visibility = "hidden";
			document.getElementById(buttonLeftID).style.visibility = "hidden";
			return;			
		}
		var ok = numbersStr.length == 2;
		for (var i = 0; i < numbersStr.length; i++)
		{
			var wasComma = false;
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
				ret.comment = "Wpisz liczby do odjęcia <br>np. 1234-73";
				ret.Print();
				document.getElementById(buttonRightID).style.visibility = "hidden";
				document.getElementById(buttonLeftID).style.visibility = "hidden";
				return;
			}
			numbers[i] = parseFloat(numbersStr[i]);
		}
		if (numbers[0] - numbers[1] < 0)
		{
			ret.comment = "YYYYY NIE";
			ret.Print();
			document.getElementById(buttonRightID).style.visibility = "hidden";
			document.getElementById(buttonLeftID).style.visibility = "hidden";
			return;
		}
		for (var i = 0; i < numbersStr.length; i++)
		{
			while (numbersStr[i][0] == "0") numbersStr[i] = numbersStr[i].replace("0","");
			if (numbersStr[i] == "") numbersStr[i] = "0";
			numbers[i] = numbersStr[i];			
			if (numbers[i].length > 39)
			{
				ret.comment = "<b>ERROR</b><br>Wprowadzone liczby są zbyt długie.<br>Ich wyświetlenie przeczy design'owi strony.<br>Szanujmy się.";
				ret.Print();
				document.getElementById(buttonRightID).style.visibility = "hidden";
				document.getElementById(buttonLeftID).style.visibility = "hidden";
				return;
			}
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
		for (var i = 0; i < numbers.length+3; i++)
		{
			ret.numbersTable[i] = [];
			ret.crossedNumbers[i] = [];
			for (var j = 0; j < longestAfterComma + longestBeforeComma; j++)
			{
				ret.numbersTable[i][j] = "";
				ret.crossedNumbers[i][j] = false;
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
				ret.numbersTable[i+2][longestBeforeComma-beforeComma+k] = iStr[k];
			}
		}
		ret.longestBeforeComma = longestBeforeComma;
		ret.currentColumn = ret.numbersTable[0].length-1;
		ret.highlightColumn = ret.numbersTable[0].length-1;
		ret.comma = longestAfterComma;
		return ret;
		
	}
	
	static InsertTable(rows, id, crossedNumbers, comma = 0, highlight_column = -1)
	{
		var table = "<table align = \"center\" class=\"columnar_operation\">";
		for (var i = 0; i < rows.length; i++)
		{
			table += "<tr>";
			if (i == 0)
				table+="<td class = \"columnar_operation_carry\"></td><td class = \"columnar_operation_carry\"></td>";
			else if (i == rows.length-2)
				table+="<td class = \"columnar_operation_underlined\">-</td><td class = \"columnar_operation_underlined\"></td>";
			else 
				table+="<td class = \"columnar_operation\"></td><td class = \"columnar_operation\"></td>";
			
			for (var j = 0; j < rows[i].length; j++)
			{	
				if (j == rows[i].length - comma)
				{
					var c = (rows[i][j] != "" ? "," : "");
					if (i == 0 || i == 1)
						table += "<td class = \"columnar_operation_carry\"></td>";
					else if (i == rows.length - 2)
						table += "<td class = \"columnar_operation_underlined\">"+c+"</td>";
					else
						table += "<td class = \"columnar_operation\">"+c+"</td>";			
				}
				if (i == 0 || i == 1)
					table += "<td class = \"columnar_operation_carry";
				else if (i == rows.length - 2)
					table += "<td class = \"columnar_operation_underlined";
				else
					table += "<td class = \"columnar_operation";
				if (highlight_column == j)
					table += " columnar_operation_highlight";
				if (crossedNumbers[i][j]) table += " strikethrough\"";
				else table+= "\"";
				table += ">" + rows[i][j] +"</td>";
			}
			table += "</tr>";
		}
		table += "</table>";
		document.getElementById(id).innerHTML = table;
	}
}

