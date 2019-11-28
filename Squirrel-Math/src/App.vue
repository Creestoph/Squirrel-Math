<template>
  <div>
    <interactive-tree />
    <router-view />
    <app-menu/>
  </div>
</template>

<script>
  import Menu from './components/NewMenu'
  import InteractiveTree from './components/content/InteractiveTree'

  export default {
    name: 'App',
    components: {
		AppMenu: Menu,
		InteractiveTree
	},
  }
</script>

<style>
/* ========================================== GENERAL ========================================== */

/* https://stackoverflow.com/questions/34550467/why-is-there-a-default-margin-on-the-body-element/34550634 */
body {
	margin: 0;
	padding: 0;
}

* {
	box-sizing: content-box;
}

p
{
	margin: 1.2em 0;
}

p:not(.printable)
{
	text-align: justify;
	line-height: 26.4px;
}

.no_selection 
{
    -webkit-user-select: none; /* webkit (safari, chrome) browsers */
    -moz-user-select: none; /* mozilla browsers */
    -khtml-user-select: none; /* webkit (konqueror) browsers */
    -ms-user-select: none; /* IE10+ */
}

a
{
	text-decoration: none;
	color: inherit;
}

ul
{
	list-style: none;
	display: table;
}

li
{
	display: table-row;
	margin: 50px 0;
}

ul li:before
{
	/*content: "♣";*/
	content: "◆";
	color: #dd3333;
	margin: 0 1em;  
	display: table-cell;
	padding-right:  0.5em;
}

ul ul li:before
{
	content: "◈";
	color: #dd3333;
	margin: 0 1.5em;
}

ol
{
	counter_reset: foo;
}

ol li
{
	counter-increment: foo;
}

ol li:before
{
	content: counter(foo) ")";
	color: #DD3333;
	margin: 0 1em;  
	display: table-cell;
	padding-right:  0.5em;
}

@media screen and (max-width: 700px)
{
	ul, ol
	{
		padding-left: 0;
	}
}

button
{
	background-color: #dd3333;
	border: none;
	color: white;
	padding: 15px 32px;
	text-align: center;
	text-decoration: none;
	/*display: inline-block;*/
	font-size: 0.9em;
	margin: 4px 2px;
	cursor: pointer;
}

button:hover
{
	box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
	background-color: #771111;
}

button:focus
{
	outline: none;
}

input
{
	border-radius: 7px;
	border: 1px solid #AAAAAA;
	padding-left: 6px;
	padding-right: 6px; 
	height: 25px;
}

input:focus
{
	border-color: #EEAAAA;
	outline: none;
	box-shadow: 0 0 15px 0 #FFAAAA;
}

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none; 
}

::selection
{
	background: #EF0000;
	color: #FFFFFF;
}

::moz-selection
{
	background: #EF0000;
	color: #FFFFFF;
}

.modal
{
	display: none;
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.7);
}

.modal_content
{
	background: #EEEEEE;
	top: 40%;
	width: 50%;
	padding: 30px;
	margin: auto;
}

.center
{
	margin-left: auto;
	margin-right: auto;
}

table
{
	font-size: 1em;
}

a.link:link
{
	color: #dd3333;
}

a.link:visited
{
	color: #990000;
}

a.link:hover
{
	color: #FA0000;
}

a.link:active
{
	color: #300000;
}

/* ========================================== LESSON ========================================== */


.comment_visible_window
{
	position: absolute;
  background: #FEFEFE;
  padding: 6px;
	border-right: 1px solid black;
	border-bottom: 1px solid black;
	font-family: calibri light;
	font-size: 15px;
	box-shadow: inset 0px -15px 15px -5px rgba(0, 0, 0, 0.15);
}

.comment_visible_question_mark
{
	color: #DD0000;
	font-family: "Copperplate Gothic Light";
	font-size: 28px;
}

.example
{
	background-color: #f6f6f6;
	border-left: 3px solid #dd3333;
	box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.4);
	padding: 15px;
	margin: 30px 30px;
}

.example:hover
{
	background-color: #eeeeee;
}

@media screen and (max-width: 700px)
{
	.example
	{
		margin: 30px 0;
	}
}


p.type
{
	/* line-height: 0%; */
	display: inline-block;
	background-color: #dd3333;
	padding: 0 5px;
	height: 31px;
	line-height: 31px;
	color: white;
	margin-top: 0;
	margin-bottom: 0.1em;
	transition: background-color 0.1s;
	/* box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.4); */
	font-size: 0.9em;
	font-family: Corbel;
}

p.type + *
{
	margin-top: 0;
}

p.type:hover
{
	background-color: #cc3333;
	transition: background-color 0.1s;
}

p.optional-hide:after
{
	content: ">";
	display: inline-block;
	background: #aa0000;
	margin: 0 0 5px 5px;
	width: 21px;
	height: 21px;
	border-radius: 50%;
	text-align: center;
	vertical-align: middle;
	font-family: Consolas;
	line-height: 21px;
	font-size: 21px;
	transition: transform 0.5s;
}


p.optional-hide:hover:after
{
	background: #990000;
	transform: rotate(90deg);
	transition: transform 0.5s;
}

p.optional-show:after
{
	content: ">";
	display: inline-block;
	background: #aa0000;
	margin: 0 0 5px 5px;
	width: 21px;
	height: 21px;
	border-radius: 50%;
	text-align: center;
	vertical-align: middle;
	font-family: Consolas;
	line-height: 21px;
	font-size: 21px;
	transform: rotate(90deg);
	transition: transform 0.5s;
}

p.optional-show:hover:after
{
	background: #990000;
	transform: rotate(0deg);
	transition: transform 0.5s;
}

p.optional-show ~ div
{
	margin: -5px -25px;
	padding: 5px 25px;
}

p.optional-hide:hover ~ div
{
	background: #fff0f0;
}

p.optional-show:hover ~ div
{
	background: #fff0f0;
}

.proof-sticker
{
	position: absolute;
	display: inline-block;
	padding: 5px;
	margin: 0px;
	top: 0;
	left: -1px;
	color: white;
	background-color: #aaaaaa;
	transition: background-color 0.1s;
	box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.4);
}

p.warning
{
	font-family: arial;
	color: #888888;
	font-size: 0.7em;
	margin-top: -0.1em;
	margin-bottom: -1.7em;
}	

.proof .warning
{
	font-family: arial;
	color: #888888;
	font-size: 0.7em;
	margin-top: 0
}	

p.problem
{
	font-weight: bold;
	text-align: center;
}

.formula
{
	text-align: center !important;
	background-color: #e0e0e0;
	padding: 10px;
	margin: 0px;
}

.proof
{
	position: relative;
	padding: 40px 10px 10px 10px;
	border: 1px solid #aaaaaa;
	border-top:  1px solid #e0e0e0;
	border-bottom:  1px solid #e0e0e0;
	background: #ffffff;
}

.proof + .proof
{
	border-top: 1em solid #e0e0e0;
}

/* ========================================== COMMON ELEMENTS ========================================== */

table.operation_table
{
	text-align: center;
	border-collapse: collapse;
	border-style: hidden;
}

table.operation_table td
{
	height: 34px;
	width: 32px;
	border: 1px solid black;
}

table.operation_table th 
{
    height: 34px;
    width: 32px;
    border: 2px solid black;
    color: #772222;
}

table.tiles
{
	border-collapse: collapse;
}

table.tiles td
{
	height: 45px;
	width: 41px;
	background-color: #EEDDDD;
	border: 3px groove #AA2222;
}

table.tiles td:hover
{
	background-color: #DD8888;
	border-style: ridge;
}

polygon
{
	/*fill: #DD2222; */
	fill: url(#gradient);
	stroke-width:0;
	box-shadow: 0 0px 100px 0 rgba(0,0,0,0.24);
}

circle
{
	/*fill: #DD2222; */
	fill: url(#gradient);
	stroke-width:0;
	box-shadow: 0 0px 100px 0 rgba(0,0,0,0.24);
}

.draggable
{
	cursor: move;
}

/* ========================================== COLUMNAR OPERATIONS ========================================== */

.strikethrough 
{
	position: relative;
}

.strikethrough:before 
{
	position: absolute;
	content: "";
	left: -1px;
	top: 50%;
	right: 0;
	border-top: 2px solid;
	border-color: inherit;

	-webkit-transform:rotate(-60deg);
	-moz-transform:rotate(-60deg);
	-ms-transform:rotate(-60deg);
	-o-transform:rotate(-60deg);
	transform:rotate(-60deg);
}

table.columnar_operation
{
	border-collapse: collapse; 
}

td.columnar_operation_not_carry
{
	padding-top: 0px;
	padding-bottom: 0px;
	padding-left: 2px;
	padding-right: 2px;
	height: 27px;
}

td.columnar_operation_underlined
{
	border-bottom: 1pt solid black;
}

td.columnar_operation_carry
{
	font-size: 0.7em;
	vertical-align: center;
	text-align: center;
	height: 19px;
}

td.columnar_operation_highlight
{
	background: #FFCCCC;
}

</style>
