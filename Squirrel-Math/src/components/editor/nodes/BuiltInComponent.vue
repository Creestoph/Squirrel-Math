<template>
  <div class="container">
    <div v-if="editMode" class="editor-wrapper">
      <div class="form">
        <div class="form-header">
          <label for="type-select">Komponent</label>
          <select v-model="componentName" id="type-select" @change="onComponentSelect()">
            <option value="div" disabled>Wybierz komponent...</option>
            <option value="operation-table">Tabliczka działania</option>
            <option value="columnar-operation-table">Działanie w słupku</option>
            <option value="columnar-operation-guide">Tutorial działania w słupku</option>
          </select>
        </div>
        <div class="form-body">
          <div v-for="(parameterSchema, parameterName, i) in schemas[componentName]" :key="i" class="form-row">
            <div class="form-col">
              {{ labels[componentName][parameterName] }}
            </div>
            <div class="form-col">
              <input v-if="parameterSchema.type.name == 'TEXT'" :required="parameterSchema.required" v-model="formArgs[i]" @paste.stop>
              <input v-if="parameterSchema.type.name == 'NUMBER'" :required="parameterSchema.required" type="number" v-model="formArgs[i]" @paste.stop>
              <input v-if="parameterSchema.type.name == 'BOOLEAN'" :required="parameterSchema.required" type="checkbox" v-model="formArgs[i]">
              <input v-if="parameterSchema.type.name == 'FUNCTION'" :required="parameterSchema.required" type="function" v-model="formArgs[i]" @paste.stop>
              <div v-if="parameterSchema.type.name == 'ARRAY'">
                <input v-for="(arg, j) in formArgs[i]" :key="j" :required="parameterSchema.required && j == 0" type="array" v-model="formArgs[i][j]" @paste.stop>
                <button @click="addElementForArrayParameter(i)" class="array-parameter-button">+ element</button>
                <button @click="removeElementForArrayParameter(i)" class="array-parameter-button">- element</button>
              </div>
              <select v-if="parameterSchema.type.name == 'ENUM'" :required="parameterSchema.required" v-model="formArgs[i]">
                <option v-for="(value, j) in parameterSchema.type.values" :key="j" :value="value">{{ value }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <button @click="run()" class="toggle-edit-button">Run</button>
    </div>
    <div v-if="!editMode" class="output-wrapper">
      <div :is="componentName" v-bind="componentConfiguration" :class="{ output: true }">
      </div>
      <button @click="edit()" class="toggle-edit-button">Edit</button>
    </div>
  </div>  
</template>

<script>
import OperationTable from '@/components/store/operation-table/OperationTable'
import { operationTableSchema } from '@/components/store/operation-table/OperationTableSchema'
import { operationTableLabels } from '@/components/store/operation-table/OperationTableLabels'
import ColumnarOperationTable from '@/components/store/columnar-operation-table/ColumnarOperationTable'
import { columnarOperationTableSchema } from '@/components/store/columnar-operation-table/ColumnarOperationTableSchema'
import { columnarOperationTableLabels } from '@/components/store/columnar-operation-table/ColumnarOperationTableLabels'
import ColumnarOperationGuide from '@/components/store/columnar-operation-guide/ColumnarOperationGuide'
import { columnarOperationGuideSchema } from '@/components/store/columnar-operation-guide/ColumnarOperationGuideSchema'
import { columnarOperationGuideLabels } from '@/components/store/columnar-operation-guide/ColumnarOperationGuideLabels'
import Vue from 'vue';

export default {
  props: ["node", "updateAttrs", "view"],
  components: {
    OperationTable,
    ColumnarOperationTable,
    ColumnarOperationGuide
  },
  data() {
    return {
      editMode: true,
      schemas: {},
      labels: {},
      formArgs: [],
      componentConfiguration: {},
    }
  },
  computed: {
    componentName: {
      get() {
        return this.node.attrs.componentName;
      },
      set(componentName) {
        this.updateAttrs({ componentName });
      }
    },
    args: {
      get() {
        return this.node.attrs.args;
      },
      set(args) {
        this.updateAttrs({ args });
      }
    }
  },
  mounted() {
    this.schemas['operation-table'] = operationTableSchema;
    this.labels['operation-table'] = operationTableLabels;
    this.schemas['columnar-operation-table'] = columnarOperationTableSchema;
    this.labels['columnar-operation-table'] = columnarOperationTableLabels;
    this.schemas['columnar-operation-guide'] = columnarOperationGuideSchema;
    this.labels['columnar-operation-guide'] = columnarOperationGuideLabels;
    this.formArgs = [...this.args];
    const configNonEmpty = this.formArgs.some((arg, i) => {
      const argType = Object.values(this.schemas[this.componentName])[i].type.name;
      return (argType == 'TEXT' || argType == 'ENUM' || argType == 'FUNCTION') && arg ||
        argType == 'NUMBER' && arg !== undefined || 
        argType == 'ARRAY' && arg.length > 0 && arg.some(a => !!a);
    });
    if (configNonEmpty) {
      this.run();
    }
    this.$forceUpdate();
  },
  methods: {
    onComponentSelect() {
      this.formArgs = [];
      Object.entries(this.schemas[this.componentName]).forEach(([key, schema], i) => {
        if (schema.type.name == 'ARRAY') {
          this.formArgs[i] = [""];
        }
      });
    },
    addElementForArrayParameter(i) {
      Vue.set(this.formArgs, i, [...this.formArgs[i], '']);
    },
    removeElementForArrayParameter(i) {
      if (this.formArgs[i].length > 1) {
        this.formArgs[i].pop();
      }
    },
    edit() {
      this.editMode = true;
    },
    run() {
      this.editMode = false;
      this.componentConfiguration = {};
      Object.entries(this.schemas[this.componentName]).forEach(([key, schema], i) => {
        if (schema.type.name == 'TEXT' || schema.type.name == 'BOOLEAN' || schema.type.name == 'ENUM')
          this.componentConfiguration[key] = this.formArgs[i];
        else if (schema.type.name == 'NUMBER')
          this.componentConfiguration[key] = parseFloat(this.formArgs[i]);
        else if (schema.type.name == 'FUNCTION') {
          try {
            this.componentConfiguration[key] = eval(this.formArgs[i]);
            if (typeof this.componentConfiguration[key] != "function")
              throw "";
          }
          catch (e) {
            this.componentConfiguration[key] = () => {};
          }
        }
        else if (schema.type.name == 'ARRAY') {
          try {
            this.componentConfiguration[key] = [...this.formArgs[i]];
            this.componentConfiguration[key].forEach((element, j) => this.componentConfiguration[key][j] = eval(element));
          }
          catch (e) {
            this.componentConfiguration[key] = [];
          }
        }
      });
      this.args = this.formArgs;
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/style/global";
.container {
  position: relative;
  padding: 0;
}
.form {
  outline: 1px solid $gray;
  background: $light-gray;
}
label {
  margin: 0 10px 0 0;
  padding: 7px;
}
.form-header {
  background: $gray;
  border: 1px solid $dark-gray;

  select {
    background: $gray;
    border: none;
    text-decoration: underline;
    outline: none;
    height: 41px;
    padding: 0 10px;
    cursor: pointer;
    &:hover {
      background: $dark-gray;
    }
    option {
      background: white;
    }
  }
}
.form-body {
  padding: 10px;
}
.form-row {
  padding: 5px;
}
.form-col:first-child {
  width: 20%;
  font-weight: bold;
  text-align: right;
  margin-right: 20px;
}
.form-col:last-child {
  display: flex;
  align-items: center;
  width: 70%;
  > div {
    width: 100%;
  }
}
input {
  border-radius: 0;
  height: 22px;
  color: $half-gray;
  width: 80%;
  display: block;
}
input[type="number"] {
  width: 40px;
}
input[type="checkbox"] {
  width: 20px;
}
input[type="function"], input[type="array"] {
  font-family: $geometric-font;
}
.array-parameter-button {
  background: $main-red;
  color: white;
  padding: 0 5px;
  font-size: 0.8em;
  margin: 3px;
}
.toggle-edit-button {
  position: absolute;
  width: 42px;
  height: 42px;
  right: -1px;
  top: -1px;
  background: white;
  border: 1px solid $gray;
  display: none;
  margin: 0;
  padding: 0;
}
.editor-wrapper:hover .toggle-edit-button {
  display: block;
}
.output {
  min-height: 42px;;
}
.output:hover {
  outline: 1px solid $gray;
}
.output-wrapper:hover .toggle-edit-button {
  display: block;
}

</style>