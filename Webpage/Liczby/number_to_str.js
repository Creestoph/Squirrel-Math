$(document).ready(function() {
	$("#number_to_str").on("keyup", function() {
	  this.value = this.value.replace(/ /g, '');
	  var number = this.value;
	  this.value = number.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	  numberToStr();
	});
	
	//var t_height = $('#out').height();
	var t_height = document.getElementById('out').clientHeight;
	$('#out_mask').css('height', 0);
});


function numberToStr() {
  var out = document.getElementById("out");
  out.innerHTML = "";
  var input = document.getElementsByTagName("input")[0].value;
  var jedn = ["", "jeden", "dwa", "trzy", "cztery", "pięć", "sześć", "siedem", "osiem", "dziewięć",
    "dziesięć", "jedenaście", "dwanaście", "trzynaście", "czternaście", "piętnaście", "szesnaście", "siedemnaście", "osiemnaście", "dziewiętnaście"
  ];
  var dzies = ["", "", "dwadzieścia", "trzydzieści", "czterdzieści", "pięćdziesiąt", "sześćdziesiąt", "siedemdziesiąt", "osiemdziesiąt", "dziewięćdziesiąt"];
  var set = ["", "sto", "dwieście", "trzysta", "czterysta", "pięćset", "sześćset", "siedemset", "osiemset", "dziewięćset"];
  var rzedy1 = ["", "tysiąc", "milion", "miliard", "bilion", "biliard", "trylion", "tryliard", "kwadrylion", "kwadryliard", "kwintylion", "kwintyliard", "sekstylion", "sekstyliard", "septylion", "septyliard", "oktylion", "oktyliard", "nonylion", "nonyliard", "decylion", "decyliard", "undecylion", "undecyliard",
    "duodecylion", "duodecyliard"
  ];
  var rzedy234 = ["", "tysiące", "miliony", "miliardy", "biliony", "biliardy", "tryliony", "tryliardy", "kwadryliony", "kwadryliardy", "kwintyliony", "kwintyliardy", "sekstyliony", "sekstyliardy", "septyliony", "septyliardy", "oktyliony", "oktyliardy", "nonyliony", "nonyliardy", "decyliony", "decyliardy", "undecyliony", "undecyliardy",
    "duodecyliony", "duodecyliardy"
  ];
  var rzedy = ["", "tysięcy", "milionów", "miliardów", "bilionów", "biliardów", "trylionów", "tryliardów", "kwadrylionów", "kwadryliardów", "kwintylionów", "kwintyliardów", "sekstylionów", "sekstyliardów", "septylionów", "septyliardów", "oktylionów", "oktyliardów", "nonylionów", "nonyliardów", "decylionów", "decyliardów", "undecylionów", "undecyliardów",
    "duodecylionów", "duodecyliardów"
  ];
  var outstr = "";
  var ok = true;
  input = input.replace(/ /g, "");
  for (i = 0; i < input.length; i++) {
    if (String(parseInt(input.charAt(i))) !== input.charAt(i)) {
      outstr = "Nie umiesz wpisać liczby naturalnej?";
      ok = false;
    }
  }
  if (parseInt(input) === 0 && ok) {
    outstr = "zero";
    ok = false;
  }
  for (i = input.length - 1; i >= 0 && ok; i -= 3) {
    temp = ""
    tempdz = "";
    if (i - 1 >= 0) tempdz = tempdz.concat(input.charAt(i - 1));
    tempdz = tempdz.concat(input.charAt(i));
    x = parseInt(tempdz);
    if (i - 2 >= 0) tempdz = (input.charAt(i - 2)).concat(tempdz);
    if (x < 20) temp = jedn[x];
    else {
      if (i - 1 >= 0) {
        temp = temp.concat(dzies[parseInt(input.charAt(i - 1))] + " ");
      }
      temp = temp.concat(jedn[parseInt(input.charAt(i))]);
    }
    if (i - 2 >= 0) {
      temp = (set[parseInt(input.charAt(i - 2))] + " ").concat(temp);
    }
    x = parseInt(input.charAt(i));
    rz = (input.length - i - 1) / 3;
    if (rz >= rzedy.length)
    {
      outstr = "To dla mnie za dużo. Daj mi spokój.";
      ok = false;
    }
    else if (parseInt(tempdz) === 1 && rz > 0) temp = rzedy1[rz];
    else if (x < 5 && x > 1 && input.charAt(i-1) !== '1') temp = temp.concat(" " + rzedy234[rz]);
    else if (parseInt(tempdz) > 0) temp = temp.concat(" " + rzedy[rz]);
    if (ok)
      outstr = temp.concat(" " + outstr);
  }
 

  out.innerHTML = outstr;
  
  var t_height = document.getElementById('out').clientHeight;
  $('#out_mask').css('height', outstr === "" ? 0 : t_height);
  //$('#out_mask').css('display', outstr === "" ? "none" : "block");

}
