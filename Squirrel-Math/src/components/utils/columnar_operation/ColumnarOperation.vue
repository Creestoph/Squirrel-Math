<template>
  <div>
    <zero-division-error />
    <p style="text-align: center">
      <input
        style="width: 85%"
        name="numberInput"
        type="text"
        ref="columnar_operation_input"
      >
    </p>
    <p style="text-align: center">
      <button
        style="float: center;"
        @click="ColumnarOperationStartArgs()"
      >
        Start
      </button>
    </p>
    <div
      class="columnar_operation_script center"
      ref="columnar_operation_area"
    >
      <table>
        <tr>
          <td
            ref="columnar_operation_button_left"
            id="columnar_operation_button_left"
            @click="prev()"
          >
            <svg
              height="0"
              width="30"
            >
              <defs>
                <linearGradient id="gradient">
                  <stop
                    offset="20%"
                    stop-color="#C33"
                  />
                  <stop
                    offset="90%"
                    stop-color="#833"
                  />
                </linearGradient>
                <linearGradient id="hover_gradient">
                  <stop
                    offset="20%"
                    stop-color="#A33"
                  />
                  <stop
                    offset="90%"
                    stop-color="#433"
                  />
                </linearGradient>
              </defs>
              <polygon points="20,0 0,30 20,60" />
            </svg>
          </td>
          <td>
            <div
              ref="columnar_operation_table"
              class="no_selection"
            />
            <p
              ref="columnar_operation_comment"
              class="no_selection"
            />
          </td>
          <td
            ref="columnar_operation_button_right"
            id="columnar_operation_button_right"
            @click="next()"
          >
            <svg
              height="0"
              width="30"
            >
              <polygon points="0,0 20,30 0,60" />
            </svg>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { Columnar_addition } from "./columnar_addition";
import { Columnar_subtraction } from "./columnar_subtraction";
import { Columnar_division } from "./columnar_division";
import { Columnar_multiplication } from "./columnar_multiplication";
import { Columnar_operation } from "./columnar_operation";
import ZeroDivisionError from "./ZeroDivisionError"

export default {
  name: "ColumnarOperation",
  props: ["operation", "floats"],
  data() {
    return {
      columnar_operation: null
    };
  },
  methods: {
    ColumnarOperationStartArgs() {
      switch (this.operation) {
        case "addition": {
          this.columnar_operation = new Columnar_addition(
            this.$refs.columnar_operation_table,
            this.$refs.columnar_operation_comment,
            this.$refs.columnar_operation_button_right,
            this.$refs.columnar_operation_button_left
          );
          break;
        }
        case "subtraction": {
          this.columnar_operation = new Columnar_subtraction(
            this.$refs.columnar_operation_table,
            this.$refs.columnar_operation_comment,
            this.$refs.columnar_operation_button_right,
            this.$refs.columnar_operation_button_left
          );
          break;
        }
        case "division": {
          this.columnar_operation = new Columnar_division(
            this.$refs.columnar_operation_table,
            this.$refs.columnar_operation_comment,
            this.$refs.columnar_operation_button_right,
            this.$refs.columnar_operation_button_left
          );
          break;
        }
        case "multiplication": {
          this.columnar_operation = new Columnar_multiplication(
            this.$refs.columnar_operation_table,
            this.$refs.columnar_operation_comment,
            this.$refs.columnar_operation_button_right,
            this.$refs.columnar_operation_button_left
          );
          break;
        }
        default: {
          var t = new Columnar_operation(
            this.$refs.columnar_operation_table,
            this.$refs.columnar_operation_comment,
            this.$refs.columnar_operation_button_right,
            this.$refs.columnar_operation_button_left
          );
          this.columnar_operation = t.get_operation(
            this.$refs.columnar_operation_input,
            this.$refs.columnar_operation_area
          );
        }
      }
      var success = this.columnar_operation.generate_from_input(
        this.$refs.columnar_operation_input,
        this.$refs.columnar_operation_area,
        this.floats
      );
      if (success) {
        this.columnar_operation.print_step(0);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      }
    },
    next() {
      this.columnar_operation.next();
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    },
    prev() {
      this.columnar_operation.prev();
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }
  },
  components: {
    ZeroDivisionError
  }
};
</script>

<style scoped lang="scss">
.columnar_operation_script {
  border: 1px solid #888888;
  width: 80%;
  height: 0px;
  text-align: center;
  padding: 0; /*20px*/
  visibility: hidden;
  box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.2);
}

.columnar_operation_script table {
  width: 100%;
  height: 100%;
}

.columnar_operation_script td {
  vertical-align: center;
}

#columnar_operation_button_left:hover {
  transform: scale(1.2);
}

#columnar_operation_button_left:hover polygon {
  fill: url(#hover_gradient);
}

#columnar_operation_button_right:hover {
  transform: scale(1.2);
}

#columnar_operation_button_right:hover polygon {
  fill: url(#hover_gradient);
}

#columnar_operation_button_left + td {
  width: 75%;
  vertical-align: top;
}
</style>
