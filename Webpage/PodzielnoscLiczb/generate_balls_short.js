$(document).ready(function(){
	var x = "<tr>";
	for (i = 1; i<=30; i++)
		x+="<td>"+i+"</td>";

	x+="</tr><tr>";

	for (i = 1; i<=30; i++)
		x+='<td>\
				<svg height="20" width="20">\
				<linearGradient id="gradient_2">\
					<stop offset="20%" stop-color="#CCC"></stop><stop offset="90%" stop-color="#999"></stop>\
				</linearGradient>\
				<linearGradient id="gradient">\
					<stop offset="20%" stop-color="#C33"></stop><stop offset="90%" stop-color="#833"></stop>\
				</linearGradient>' +
					((i % 4 == 0) ? '<circle cx="10" cy="10" r="8"/>' : '<circle class="empty" cx="10" cy="10" r="8"/>') +
				'</svg>\
			</td>';

	x+="</tr><tr>"

	for (i = 1; i<=30; i++)
		x+='<td>\
				<svg height="20" width="20">' +
					((i % 6 == 0) ? '<circle cx="10" cy="10" r="8"/>' : '<circle class="empty" cx="10" cy="10" r="8"/>') +
				'</svg>\
			</td>';

	x+="</tr>";

	document.getElementById("NWW_1").innerHTML = x;
});