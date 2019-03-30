<template>
  <div>
    <p style="text-align: center">
      <input style="width: 85%" name="numberInput" type="text" ref="columnar_addition_input">
    </p>
    <LOL></LOL>
    <p style="text-align: center">
      <button
        ref="columnar_addition_start"
        style="float: center;"
        @click="ColumnarAdditionStartArgs()"
      >Start</button>
    </p>
    <table class="columnar_operation_script center" ref="columnar_addition_area">
      <tr>
        <td ref="columnar_operation_button_left" @click="prev()">
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
        <td ref="columnar_operation_button_right" @click="next()">
          <svg height="0" width="30">
            <polygon points="0,0 20,30 0,60"></polygon>
          </svg>
        </td>
      </tr>
    </table>
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
</style>
