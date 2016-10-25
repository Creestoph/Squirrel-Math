

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
                result = '<mfenced separators="">' + to_mathML(input.substring(pos + 1, j)) + "</mfenced>";
                //result = '<mrow>' + to_mathML(input.substring(pos + 1, j)) + "</mrow>";
                pos = j;
                break;
            }
        }
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
        pos--;
    }
    else if (input[pos] == '<' && input[pos + 1] == 'b' && input[pos + 2] == 'r' && input[pos + 3] == '>')
    {
        result += "<mo linebreak='newline'></mo>";
        pos += 3;
    }
    else if (input[pos] == '+' || input[pos] == '-' || input[pos] == ':' || input[pos] == '=')
        result = "<mo>" + input[pos] + "</mo>";
    else if (input.substring(pos, pos + 4) == '&lt;')
    {
        result = "<mi><</mi>";
        pos += 3;
    }
    else if (input.substring(pos, pos + 4) == '&gt;')
    {
        pos += 3;
        result = "<mi>></mi>";
    }
    else if (input[pos] == '*' || input[pos] == '∙')
        result = "<mo>&middot;</mo>";
    else if (input[pos] == '∶' || input[pos] == ':')
        result = "<mo>:</mo>";
    else
        result = "<mi>" + input[pos] + "</mi>";
    
    return result;
}

function to_mathML(input)
{
    var output = "";
    for (var i = 0; i < input.length; i++)
    {
        pos = i;
        var result = element_mathML(input);
        i = pos;

        if (input[i + 1] == '_')
        {
            pos = i + 2;
            output += "<msub>" + result + element_mathML(input) + "</msub>";
            i = pos;
        }
        else if (input[i + 1] == '^')
        {
            pos = i + 2;
            output += "<msup>" + result + element_mathML(input) + "</msup>";
            i = pos;
        }
        else if (input[i+1] == '/')
        {
            pos = i + 2;
            output += "<mfrac>" + result + element_mathML(input) + "</mfrac>";
            i = pos;
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
		maths[k].innerHTML = '<math xmlns="http://www.w3.org/1998/Math/MathML" display="inline">' + to_mathML(maths[k].innerHTML) + "</math>";
	}
});