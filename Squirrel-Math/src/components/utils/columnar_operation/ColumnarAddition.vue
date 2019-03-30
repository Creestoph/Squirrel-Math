<template>
  <div>
    <p style="text-align: center">
      <input style="width: 85%" name="numberInput" type="text" ref="columnar_addition_input">
    </p>
    <p style="text-align: center">
      <button ref="columnar_addition_start" id="columnar_addition_start" style="float: center;" @click="ColumnarAdditionStartArgs()">Start</button>
    </p>
    <div class="columnar_operation_script center" ref="columnar_addition_area">
      <table>
        <tr>
          <td ref="columnar_operation_button_left" id="columnar_operation_button_left" @click="prev()">
            <svg height="0" width="30">
              <defs>
                <linearGradient id="gradient">
                  <stop offset="20%" stop-color="#C33"></stop>
                  <stop offset="90%" stop-color="#833"></stop>
                </linearGradient>
                <linearGradient id="hover_gradient">
                  <stop offset="20%" stop-color="#A33"></stop>
                  <stop offset="90%" stop-color="#433"></stop>
                </linearGradient>
              </defs>
              <polygon points="20,0 0,30 20,60"></polygon>
            </svg>
          </td>
          <td>
            <div ref="columnar_addition_table" class="no_selection"></div>
            <p ref="columnar_addition_comment" class="no_selection"></p>
          </td>
          <td ref="columnar_operation_button_right" id="columnar_operation_button_right" @click="next()">
            <svg height="0" width="30">
              <polygon points="0,0 20,30 0,60"></polygon>
            </svg>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { Columnar_addition } from "./columnar_addition";

export default {
  name: "ColumnarAddition",
  data() {
    return {
      columnar_addition: null
    };
  },
  mounted() {
    this.columnar_addition = new Columnar_addition(
      this.$refs.columnar_addition_table,
      this.$refs.columnar_addition_comment,
      this.$refs.columnar_operation_button_right,
      this.$refs.columnar_operation_button_left
    );
  },
  methods: {
    ColumnarAdditionStartArgs() {
      var success = this.columnar_addition.generate_from_input(
        this.$refs.columnar_addition_input,
        this.$refs.columnar_addition_area,
        false
      );
      if (success) {
        this.columnar_addition.print_step(0);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      }
    },
    next() {
      this.columnar_addition.next();
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    },
    prev() {
      this.columnar_addition.prev();
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }
  }
};
</script>

<style scoped lang="scss">

.columnar_operation_script
{
	border: 1px solid #888888;
	width: 80%;
	height: 0px;
	text-align: center;
	padding: 0; /*20px*/
	visibility: hidden;
	box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.2);
}

.columnar_operation_script table
{
  width: 100%;
  height: 100%;
}


.columnar_operation_script td
{
	vertical-align: center;
}

#columnar_operation_button_left:hover
{
	transform: scale(1.2);
}

#columnar_operation_button_left:hover polygon
{
	fill: url(#hover_gradient);
}

#columnar_operation_button_right:hover
{
	transform: scale(1.2);
}

#columnar_operation_button_right:hover polygon
{
	fill: url(#hover_gradient);
}

#columnar_operation_button_left + td
{
	width: 75%;
	vertical-align: top;
}
</style>
