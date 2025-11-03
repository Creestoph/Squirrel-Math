<template>
    <node-view-wrapper class="container">
        <div v-show="editMode" class="editor-wrapper">
            <div class="form">
                <div class="form-header">
                    <label for="type-select">Komponent</label>
                    <select v-model="componentName" id="type-select" @change="onComponentSelect()">
                        <option value="" disabled>Wybierz komponent...</option>
                        <template v-if="componentName == 'other'">
                            <option v-for="(component, name) in allComponents" :key="name" :value="name">
                                {{ component.name }}
                            </option>
                        </template>
                        <template v-if="componentName != 'other'">
                            <option v-for="(component, name) in availableComponents" :key="name" :value="name">
                                {{ component.name }}
                            </option>
                        </template>
                    </select>
                </div>
                <div class="form-body" v-if="componentName">
                    <div v-if="!productionMode || componentName != 'other'">
                        <div
                            v-for="(parameterSchema, parameterName, i) in allComponents[componentName].schema"
                            :key="i"
                            class="form-row"
                        >
                            <div class="form-col">
                                {{ allComponents[componentName].labels[parameterName] }}
                            </div>
                            <div class="form-col">
                                <input
                                    v-if="parameterSchema.type.name == 'TEXT'"
                                    :required="parameterSchema.required"
                                    v-model="formArgs[i]"
                                    @paste.stop
                                />
                                <input
                                    v-if="parameterSchema.type.name == 'NUMBER'"
                                    :required="parameterSchema.required"
                                    type="number"
                                    v-model="formArgs[i]"
                                    @paste.stop
                                />
                                <input
                                    v-if="parameterSchema.type.name == 'BOOLEAN'"
                                    :required="parameterSchema.required"
                                    type="checkbox"
                                    v-model="formArgs[i]"
                                />
                                <input
                                    v-if="parameterSchema.type.name == 'FUNCTION'"
                                    :required="parameterSchema.required"
                                    type="function"
                                    v-model="formArgs[i]"
                                    @paste.stop
                                />
                                <div v-if="parameterSchema.type.name == 'ARRAY'">
                                    <input
                                        v-for="(arg, j) in formArgs[i]"
                                        :key="j"
                                        :required="parameterSchema.required && j == 0"
                                        type="array"
                                        v-model="formArgs[i][j]"
                                        @paste.stop
                                    />
                                    <button @click="addElementForArrayParameter(i)" class="array-parameter-button">
                                        + element
                                    </button>
                                    <button @click="removeElementForArrayParameter(i)" class="array-parameter-button">
                                        - element
                                    </button>
                                </div>
                                <select
                                    v-if="parameterSchema.type.name == 'ENUM'"
                                    :required="parameterSchema.required"
                                    v-model="formArgs[i]"
                                >
                                    <option v-for="(value, j) in parameterSchema.type.values" :key="j" :value="value">
                                        {{ value }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div v-if="productionMode && componentName == 'other'">
                        <comment text="Leniwi programiści.">
                            Ten komponent podlega edycji tylko przez administrację Squirrel-Math.
                        </comment>
                    </div>
                </div>
            </div>
            <button @click="saveAndRun()" class="toggle-edit-button" title="uruchom">
                <icon>play_arrow</icon>
            </button>
        </div>
        <div class="output-wrapper">
            <component
                v-if="!editMode"
                :is="getComponent()"
                v-bind="componentConfiguration"
                :class="{ output: true }"
            ></component>
            <button v-show="!editMode" @click="edit()" class="toggle-edit-button" title="edytuj">
                <icon>edit</icon>
            </button>
        </div>
    </node-view-wrapper>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
import { BuiltInComponent, builtInComponents, getBuiltInComponentByName } from '@/components/utils/build-in-components';

const props = defineProps(nodeViewProps);

const editMode = ref(true);
const allComponents = ref<Record<string, BuiltInComponent>>({});
const availableComponents = ref<Record<string, BuiltInComponent>>({});
const formArgs = ref<(boolean | string | string[])[]>([]);
const componentConfiguration = ref<Record<string, Function | boolean | number | string | string[]>>({});

const componentName = computed({
    get() {
        return props.node.attrs.componentName;
    },
    set(componentName) {
        props.updateAttributes({ componentName });
    },
});

const args = computed({
    get() {
        return props.node.attrs.args;
    },
    set(args) {
        props.updateAttributes({ args });
    },
});

const productionMode = computed(() => false); // TODO automate this

onBeforeMount(() => {
    allComponents.value = builtInComponents;
    for (let key in allComponents.value) {
        if (!productionMode.value || key != 'other') {
            availableComponents.value[key] = allComponents.value[key];
        }
    }
});

onMounted(() => {
    formArgs.value = [...args.value];
    const configNonEmpty = formArgs.value.some((arg, i) => {
        const argType = Object.values(allComponents.value[componentName.value].schema)[i].type.name;
        return (
            ((argType == 'TEXT' || argType == 'ENUM' || argType == 'FUNCTION') && arg) ||
            (argType == 'NUMBER' && arg !== undefined) ||
            (argType == 'ARRAY' && (arg as string[]).length > 0 && (arg as string[]).some((a) => !!a))
        );
    });
    if (configNonEmpty) {
        run();
    }
});

function onComponentSelect() {
    formArgs.value = [];
    Object.values(allComponents.value[componentName.value].schema).forEach((schema, i) => {
        if (schema.type.name == 'ARRAY') {
            formArgs.value[i] = [''];
        }
        if (schema.type.name == 'BOOLEAN') {
            formArgs.value[i] = false;
        }
    });
}

function addElementForArrayParameter(i: number) {
    formArgs.value[i] = [...(formArgs.value[i] as string[]), ''];
}

function removeElementForArrayParameter(i: number) {
    const arrayArg = formArgs.value[i] as string[];
    if (arrayArg.length > 1) {
        arrayArg.pop();
    }
}

function edit() {
    editMode.value = true;
}

function saveAndRun() {
    args.value = formArgs.value;
    run();
}

function run() {
    editMode.value = false;
    componentConfiguration.value = {};
    Object.entries(allComponents.value[componentName.value].schema).forEach(([key, schema], i) => {
        if (schema.type.name == 'TEXT' || schema.type.name == 'BOOLEAN' || schema.type.name == 'ENUM') {
            componentConfiguration.value[key] = formArgs.value[i];
        } else if (schema.type.name == 'NUMBER') {
            componentConfiguration.value[key] = parseFloat(formArgs.value[i] as string);
        } else if (schema.type.name == 'FUNCTION') {
            try {
                componentConfiguration.value[key] = eval(formArgs.value[i] as string);
                if (typeof componentConfiguration.value[key] != 'function') {
                    throw '';
                }
            } catch (e) {
                componentConfiguration.value[key] = () => {};
            }
        } else if (schema.type.name == 'ARRAY') {
            try {
                const arrayArgs = [...(formArgs.value[i] as string[])];
                componentConfiguration.value[key] = arrayArgs;
                arrayArgs.forEach((element, j) => (arrayArgs[j] = eval(element)));
            } catch (e) {
                componentConfiguration.value[key] = [];
            }
        }
    });
}

function getComponent() {
    const isDev = componentName.value == 'other';
    return getBuiltInComponentByName(isDev ? componentConfiguration.value.name : componentName.value, isDev);
}
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/colors';
@use '@/style/fonts';

.container {
    position: relative;
    padding: 0;
}
.form {
    outline: 1px solid colors.$gray;
    background: colors.$light-gray;
}
label {
    margin: 0 10px 0 0;
    padding: 7px;
}
.form-header {
    background: colors.$gray;
    border: 1px solid colors.$dark-gray;

    select {
        background: colors.$gray;
        border: none;
        text-decoration: underline;
        outline: none;
        height: 41px;
        padding: 0 10px;
        cursor: pointer;
        &:hover {
            background: colors.$dark-gray;
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
    color: colors.$half-gray;
    width: 80%;
    display: block;
}
input[type='number'] {
    width: 40px;
}
input[type='checkbox'] {
    width: 20px;
}
input[type='function'],
input[type='array'] {
    font-family: fonts.$geometric-font;
}
.array-parameter-button {
    background: colors.$main-red;
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
    border: 1px solid colors.$gray;
    display: none;
    margin: 0;
    padding: 0;
}
.editor-wrapper:hover .toggle-edit-button {
    display: block;
}
.output {
    min-height: 42px;
}
.output-wrapper:hover {
    outline: 1px solid colors.$gray;
}
.output-wrapper:hover .toggle-edit-button {
    display: block;
}
</style>
