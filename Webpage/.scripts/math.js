var maths;
var pos;

function element_mathML(input)
{
    var result = "";
    if (input[pos] == '(')
    {
        var nawias = 1;
        for (var j = pos+1; j < input.length; j++) 
        {
            if (input[j] == '(')
                nawias++;
            if (input[j] == ')')
                nawias--;
            if (nawias == 0)
            {
				 result = "<mrow>" + to_mathML(input.substring(pos + 1, j)) + "</mrow>";
                //result = '<mfenced separators="">' + to_mathML(input.substring(pos + 1, j)) + "</mfenced>";
                //result = '<mrow>' + to_mathML(input.substring(pos + 1, j)) + "</mrow>";
                pos = j;
                break;
            }
        }
		pos++;
    }
    else if (input[pos] >= '0' && input[pos] <= '9')
    {
        result = "<mn>"
        while ((input[pos] >= '0' && input[pos] <= '9') || input[pos] == '.' || input[pos] == ',')
        {
            result += input[pos];
            pos++;
        }
        result += "</mn>";
    }
    else if (input[pos] == '<' && input[pos + 1] == 'b' && input[pos + 2] == 'r' && input[pos + 3] == '>')
    {
        result += "<mo linebreak='newline'></mo>";
        pos += 4;
    }
	else if (input.substring(pos, pos+7)=='Newton(')
	{
		pos+=7; //Newton(
		result+="<mfenced open='(' close=')' separators=''><mtable><mtr><mtd>" + element_mathML(input);
		pos++; //,
		result+="</mtd></mtr><mtr><mtd>" + element_mathML(input) + "</mtd></mtr></mtable></mfenced>";
		pos++; //)
	}
    else if (input[pos] == '+' || input[pos] == '-' || input[pos] == ':' || input[pos] == '=')
	{
		result = "<mo>" + input[pos] + "</mo>";
		pos++;
	}
    else if (input.substring(pos, pos + 4) == '&lt;')
    {
        result = "<mi><</mi>";
        pos += 4;
    }
    else if (input.substring(pos, pos + 4) == '&gt;')
    {
        pos += 4;
        result = "<mi>></mi>";
    }
	else if (input.substring(pos, pos + 6) == '&nbsp;')
    {
        pos += 6;
        result = "<mi>&nbsp;</mi>";
    }
	else if (input.substring(pos, pos + 2) == 'r.')
    {
        pos += 2;
        result = "<mo>r.</mo>";
    }
    else if (input[pos] == '*' || input[pos] == '∙' || input[pos] == '·')
	{
		pos++;
		result = "<mo>&middot;</mo>";
	}
	 else if (input[pos] == '×')
	{
		pos++;
		result = "<mo>×</mo>";
	}
    else if (input[pos] == '∶' || input[pos] == ':')
	{
		pos++;
		result = "<mo>:</mo>";
	}
	else if (input[pos] == '|' || input[pos]=='∣')
	{
		pos++;
		result = "<mo>|</mo>";
	}
	else if (input[pos] == '∤') //ł
	{
		pos++;
		result = "<mo>∤</mo>";
	}
	else if (input[pos] == " ")
	{
		pos++
	}
    else
	{
        result = "<mi>" + input[pos] + "</mi>";
		pos++;
	}
    
    return result;
}

function to_mathML(input)
{
    var output = "";
	pos=0;
	while (pos < input.length)
    {
        var result = element_mathML(input);

        if (input[pos] == '_')
        {
            pos ++;
            output += "<msub>" + result + element_mathML(input) + "</msub>";
        }
        else if (input[pos] == '^')
        {
            pos++
            output += "<msup>" + result + element_mathML(input) + "</msup>";
        }
        else if (input[pos] == '/')
        {
            pos++
            output += "<mfrac>" + result + element_mathML(input) + "</mfrac>";
        }
        else
            output += result;
    }
    return output;
}

$(document).ready(function(){
	 maths = document.getElementsByClassName("math");
	for (k = 0; k < maths.length; k++)
	{
		maths[k].innerHTML = '<math xmlns="http://www.w3.org/1998/Math/MathML" display="inline" fontFamily="MathJax">' + to_mathML(maths[k].innerHTML) + "</math>";
	}
});