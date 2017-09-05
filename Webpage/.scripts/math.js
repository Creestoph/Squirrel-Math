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
                pos = j;
                break;
            }
        }
		pos++;
    }
	else if (input[pos] == '[')
    {
        var nawias = 1;
        for (var j = pos+1; j < input.length; j++) 
        {
            if (input[j] == '[')
                nawias++;
            if (input[j] == ']')
                nawias--;
            if (nawias == 0)
            {
                result = '<mfenced open="[" close="]" separators="">' + to_mathML(input.substring(pos + 1, j)) + "</mfenced>";
                pos = j;
                break;
            }
        }
		pos++;
    }
	else if (input[pos] == '⌊') //floor
    {
        var nawias = 1;
        for (var j = pos+1; j < input.length; j++) 
        {
            if (input[j] == '⌊')
                nawias++;
            if (input[j] == '⌋')
                nawias--;
            if (nawias == 0)
            {
                result = '<mfenced open="⌊" close="⌋" separators="">' + to_mathML(input.substring(pos + 1, j)) + "</mfenced>";
                pos = j;
                break;
            }
        }
		pos++;
    }
	else if (input[pos] == '⌈') //ceiling
    {
        var nawias = 1;
        for (var j = pos+1; j < input.length; j++) 
        {
            if (input[j] == '⌈')
                nawias++;
            if (input[j] == '⌉')
                nawias--;
            if (nawias == 0)
            {
                result = '<mfenced open="⌈" close="⌉" separators="">' + to_mathML(input.substring(pos + 1, j)) + "</mfenced>";
                pos = j;
                break;
            }
        }
		pos++;
    }
	else if (input[pos] == '{')
    {
        var nawias = 1;
        for (var j = pos+1; j < input.length; j++) 
        {
            if (input[j] == '{')
                nawias++;
            if (input[j] == '}')
                nawias--;
            if (nawias == 0)
            {
                result = '<mfenced open="{" close="}" separators="">' + to_mathML(input.substring(pos + 1, j)) + "</mfenced>";
                pos = j;
                break;
            }
        }
		pos++;
    }
	else if (input.substring(pos, pos+8)=="Bracket(")
	{
		pos += 8;
		var nawias = 1;
        for (var j = pos; j < input.length; j++) 
        {
            if (input[j] == '(')
				nawias++;
            if (input[j] == ')')
                nawias--;
            if (nawias == 0)
            {
				result = '<mfenced open="(" close=")" separators="">' + to_mathML(input.substring(pos, j)) + '</mfenced>';
                //result = '<mfenced separators="">' + to_mathML(input.substring(pos + 1, j)) + "</mfenced>";
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
    else if (input.substring(pos, pos+4)=="<br>")
    {
        result += "<mspace linebreak='newline'></mspace>";
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
	else if (input.substring(pos, pos+5)=='Text(')
	{
		pos+=5; //Text(
		result+="<mtext>";
		while (pos<input.length && input[pos]!=')')
		{
			result+=input[pos];
			pos++
		}
		result+="</mtext>";
		pos++; //)
	}
	else if (input.substring(pos, pos+4)=='Root')
	{
		pos+=4; //Root
		var deg = element_mathML(input);
		pos++;//(
		var arg = element_mathML(input)
		pos++;//)
		result+="<mroot>" + arg + deg + "</mroot>";
	}
	else if (input.substring(pos, pos+4)=='Sqrt')
	{
		pos+=4; //Sqrt
		result+="<msqrt>" + element_mathML(input) + "</msqrt>";
	}
	else if (input.substring(pos, pos+3)=="NWD")
	{
		result = "<mtext>NWD</mtext>";
		pos+=3;
	}
	else if (input.substring(pos, pos+3)=="NWW")
	{
		result = "<mtext>NWW</mtext>";
		pos+=3;
	}
	else if (input.substring(pos, pos+2)=="zł")
	{
		result = "<mtext>&nbsp;zł</mtext>";
		pos+=2;
	}
    else if (input[pos] == '+' || input[pos] == ':' || input[pos] == '=')
	{
		result = "<mo>" + input[pos] + "</mo>";
		pos++;
	}
    else if (input.substring(pos, pos + 4) == '&lt;')
    {
        result = "<mo><</mo>";
        pos += 4;
    }
    else if (input.substring(pos, pos + 4) == '&gt;')
    {
        pos += 4;
        result = "<mo>></mo>";
    }
	else if (input[pos] == '≅') //izomorfizm
	{
		pos ++;
        result = "<mo>≅</mo>";
	}
	else if (input[pos] == '≈')
	{
		pos ++;
        result = "<mo>≈</mo>";
	}
	else if (input[pos] == '≥')
	{
		pos ++;
        result = "<mo>≥</mo>";
	}
	else if (input[pos] == '≤')
	{
		pos ++;
        result = "<mo>≤</mo>";
	}
	else if (input[pos] == '÷')
	{
		pos ++;
        result = "<mo>÷</mo>";
	}
	else if (input[pos] == '≠')
	{
		pos++;
		result = "<mo>≠</mo>"
	}
	else if (input[pos] == '∈')
	{
		pos ++;
        result = "<mo>∈</mo>";
	}
	else if (input[pos] == '⇒' || input[pos]=='⟹')
	{
		pos ++;
        result = "<mo>⇒</mo>";
	}
	else if (input[pos] == '⇔' || input[pos] == '⟺')
	{
		pos ++;
        result = "<mo>⇔</mo>";
	}
	else if (input[pos] == '∧')
	{
		pos++;
		result = "<mo>∧</mo>";
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
	else if (input[pos]=='–' || input[pos]=='-')
	{
		pos++;
		result = "<mo>-</mo>";
	}
    else if (input[pos] == '*' || input[pos] == '∙' || input[pos] == '·' || input[pos] == '⋅' || input[pos]=='')
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
		maths[k].innerHTML = '<math xmlns="http://www.w3.org/1998/Math/MathML" display="inline" fontFamily="Cambria">' + to_mathML(maths[k].innerHTML) + "</math>";
	}
});