<template>
    <node-view-wrapper class="whole">
        <div v-show="editMode" class="editor-wrapper">
            <div class="form">
                <div class="form-header">
                    <dropdown
                        class="component-dropdown"
                        :arrow="true"
                        :selectedOption="currentComponentSchema?.name || 'Wybierz komponent...'"
                        @selected="onComponentSelect($event)"
                    >
                        <dropdown-option v-for="component of allComponents" :key="component.id" :value="component.id">
                            {{ component.name }}
                        </dropdown-option>
                    </dropdown>
                </div>
                <div class="form-body" v-if="currentComponentSchema">
                    <div class="description" v-html="currentComponentSchema.description"></div>
                    <template v-if="currentComponentSchema.parameters">
                        <div
                            v-for="(parameterSchema, key, i) in currentComponentSchema.parameters"
                            :key="key"
                            class="parameter-row"
                        >
                            <div class="parameter-label">
                                <comment :text="parameterSchema.hint" :hidden="false">
                                    {{ parameterSchema.label }}
                                    <span class="error" v-if="parameterSchema.required">*</span>
                                </comment>
                            </div>
                            <div class="parameter-value" ref="parameter">
                                <input
                                    v-if="parameterSchema.type.name == 'TEXT'"
                                    :required="parameterSchema.required"
                                    :placeholder="parameterSchema.placeholder"
                                    v-model="formArgs[i]"
                                    @paste.stop
                                    class="with-highlight"
                                />
                                <input
                                    v-if="parameterSchema.type.name == 'NUMBER'"
                                    :required="parameterSchema.required"
                                    :placeholder="parameterSchema.placeholder"
                                    type="number"
                                    v-model="formArgs[i]"
                                    @paste.stop
                                    class="with-highlight"
                                />
                                <input
                                    v-if="parameterSchema.type.name == 'BOOLEAN'"
                                    :required="parameterSchema.required"
                                    type="checkbox"
                                    v-model="formArgs[i]"
                                    class="with-highlight"
                                />
                                <input
                                    v-if="parameterSchema.type.name == 'FUNCTION'"
                                    :required="parameterSchema.required"
                                    :placeholder="parameterSchema.placeholder"
                                    type="function"
                                    v-model="formArgs[i]"
                                    @paste.stop
                                    class="with-highlight"
                                />
                                <div v-if="parameterSchema.type.name == 'ARRAY'">
                                    <div v-for="(_, j) in formArgs[i]" :key="j" class="array-row">
                                        <div
                                            v-if="j === 0"
                                            class="add-row-button"
                                            @click="addElementForArrayParameter(i, -1)"
                                        >
                                            <button tabindex="-1">+</button>
                                        </div>
                                        <input
                                            :required="parameterSchema.required && j == 0"
                                            :placeholder="(j == 0 && parameterSchema.placeholder) || ''"
                                            type="array"
                                            v-model="formArgs[i]![j]"
                                            @paste.stop
                                            @keydown.enter="addElementForArrayParameter(i, j)"
                                            @keydown.backspace="onBackspace(i, j, $event)"
                                            class="with-highlight"
                                        />
                                        <button
                                            @click="removeElementForArrayParameter(i, j)"
                                            class="remove-row-button"
                                            tabindex="-1"
                                        >
                                            ✖
                                        </button>
                                        <div class="add-row-button" @click="addElementForArrayParameter(i, j)">
                                            <button tabindex="-1">+</button>
                                        </div>
                                    </div>
                                </div>
                                <dropdown
                                    v-if="parameterSchema.type.name == 'ENUM'"
                                    :arrow="true"
                                    :selectedOption="(formArgs[i] as string) || 'wybierz...'"
                                    @selected="formArgs[i] = $event"
                                >
                                    <dropdown-option
                                        v-for="(value, j) in parameterSchema.type.values"
                                        :key="j"
                                        :value="value"
                                    >
                                        {{ value }}
                                    </dropdown-option>
                                </dropdown>
                            </div>
                            <div v-if="errors[i]" class="error">{{ errors[i] }}</div>
                        </div>
                    </template>
                </div>
            </div>
            <button @click="saveAndRun()" class="toggle-edit-button" title="uruchom" v-if="currentComponentSchema">
                <icon>play_arrow</icon>
            </button>
        </div>
        <div class="output-wrapper">
            <component
                v-if="!editMode"
                :is="currentComponentSchema?.component"
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
import { computed, nextTick, onMounted, ref, shallowRef } from 'vue';
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';
import {
    BuiltInComponentFormArg,
    builtInComponentFormToInput,
    BuiltInComponentInput,
    ComponentSchema,
} from '@/components/builtin-components/component-api';
import { builtInComponents } from '@/components/builtin-components/components-list';
import Dropdown from '../Dropdown.vue';
import DropdownOption from '../DropdownOption.vue';

const props = defineProps(nodeViewProps);

const editMode = ref(true);
const allComponents = shallowRef<ComponentSchema[]>(builtInComponents);
const currentComponentSchema = shallowRef<ComponentSchema | null>(null);
const formArgs = ref<BuiltInComponentFormArg[]>([]);
const errors = ref<(string | null)[]>([]);
const componentConfiguration = ref<Record<string, BuiltInComponentInput>>({});
const parameter = ref<HTMLDivElement[]>(null!);

const componentId = computed({
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

onMounted(() => {
    formArgs.value = [...args.value];
    if (componentId.value) {
        onComponentSelect(componentId.value);
        if (validate()) {
            run();
        }
    }
});

function onComponentSelect(id: string) {
    componentId.value = id;
    formArgs.value = [];
    errors.value = [];
    currentComponentSchema.value = allComponents.value.find((c) => c.id === componentId.value)!;
    Object.values(currentComponentSchema.value.parameters || {}).forEach((parameter, i) => {
        if (parameter.type.name == 'ARRAY') {
            formArgs.value[i] = [''];
        } else if (parameter.type.name == 'BOOLEAN') {
            formArgs.value[i] = false;
        } else {
            formArgs.value[i] = '';
        }
    });
}

function addElementForArrayParameter(formArgIndex: number, arrayIndex: number) {
    const targetIndex = arrayIndex + 1;
    (formArgs.value[formArgIndex] as string[]).splice(targetIndex, 0, '');
    nextTick(() => (parameter.value[formArgIndex].querySelectorAll('input')[targetIndex] as HTMLInputElement).focus());
}

function onBackspace(formArgIndex: number, arrayIndex: number, event: KeyboardEvent): void {
    const formArray = formArgs.value[formArgIndex] as string[];
    if (formArray.length > 1 && formArray[arrayIndex].length === 0) {
        event.preventDefault();
        removeElementForArrayParameter(formArgIndex, arrayIndex);
        if (arrayIndex > 0) {
            nextTick(() =>
                (
                    parameter.value[formArgIndex].querySelectorAll('input')[
                        Math.max(arrayIndex - 1, 0)
                    ] as HTMLInputElement
                ).focus(),
            );
        }
    }
}

function removeElementForArrayParameter(formArgIndex: number, arrayIndex: number) {
    (formArgs.value[formArgIndex] as string[]).splice(arrayIndex, 1);
}

function edit() {
    editMode.value = true;
}

function saveAndRun() {
    args.value = formArgs.value;
    run();
}

function run() {
    if (!validate()) {
        return;
    }
    editMode.value = false;
    componentConfiguration.value = {};
    Object.entries(currentComponentSchema.value?.parameters || {}).forEach(
        ([key, parameter], i) =>
            (componentConfiguration.value[key] = builtInComponentFormToInput(formArgs.value[i], parameter.type.name)),
    );
}

/**
 * @returns true when form is valid
 */
function validate(): boolean {
    errors.value = Object.values(currentComponentSchema.value?.parameters || {}).map((parameter, i) => {
        if (
            parameter.required &&
            (!formArgs.value[i] || (parameter.type.name == 'ARRAY' && (formArgs.value[i] as string[]).every((x) => !x)))
        ) {
            return 'Pole jest wymagane';
        }
        if (parameter.type.name == 'FUNCTION') {
            try {
                const func = eval(formArgs.value[i] as string);
                if (typeof func != 'function') {
                    throw '';
                }
            } catch (e) {
                return 'Nie jest to poprawna funkcja. Przykład poprawnej funkcji: (a, b) => a + b';
            }
        }
        const input = builtInComponentFormToInput(formArgs.value[i], parameter.type.name);
        if (input !== undefined && parameter.validation) {
            const result = parameter.validation(input);
            if (result) {
                return result;
            }
        }
        return null;
    });
    return errors.value.filter((e) => e).length === 0;
}
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/colors';
@use '@/style/fonts';

.whole {
    position: relative;
    padding: 0;
}
.form {
    outline: 1px solid colors.$gray;
    background: colors.$light-gray;
}

.form-header {
    background: colors.$gray;
    display: flex;

    .component-dropdown {
        height: 41px;
        padding: 0 10px;
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
    border-top: 1px solid colors.$dark-gray;

    .description {
        white-space: pre-wrap;
        &:not(:last-child) {
            margin-bottom: 15px;
        }
    }
}
.parameter-row {
    padding: 5px;
    display: flex;
    flex-flow: row wrap;
    gap: 20px;
    row-gap: 4px;
    align-items: center;

    .parameter-label {
        width: 20%;
        font-weight: bold;
        text-align: right;
    }

    .parameter-value {
        flex: 1;
        > div {
            width: 100%;
        }

        input {
            width: 100%;
            box-sizing: border-box;
            border-radius: 0;
            color: colors.$half-gray;
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

        .array-row {
            display: flex;
            position: relative;

            .remove-row-button {
                width: 25px;
                box-sizing: border-box;
                margin: 0;
                border: 1px solid colors.$dark-red;
                background: colors.$main-red;
                color: white;
                padding: 0 5px;
                font-size: 0.8em;
            }

            .add-row-button {
                position: absolute;
                z-index: 2;
                width: calc(100% - 25px);
                height: 10px;
                bottom: -5px;
                display: flex;
                justify-content: center;
                cursor: pointer;
                opacity: 0;

                &:first-child {
                    top: -5px;
                }

                &:hover {
                    opacity: 1;
                }

                &::before {
                    content: '';
                    position: absolute;
                    width: 100%;
                    bottom: 4px;
                    border-bottom: 3px solid colors.$main-red;
                }

                button {
                    position: absolute;
                    color: white;
                    background: colors.$main-red;
                    padding: 1px 3px 5px 3px;
                    border-radius: 50%;
                    z-index: 2;
                    line-height: 10px;
                    bottom: -4px;
                }
            }
        }
    }

    .error {
        color: colors.$main-red;
    }
}

.toggle-edit-button {
    position: absolute;
    justify-content: center;
    align-items: center;
    width: 41px;
    height: 41px;
    top: -1px;
    background: white;
    border: 1px solid colors.$gray;
    display: none;
    margin: 0;
    padding: 0;
}
.editor-wrapper:hover .toggle-edit-button {
    display: flex;
    right: -1px;
}
.output {
    min-height: 42px;
}
.output-wrapper:hover {
    outline: 1px solid colors.$gray;
}
.output-wrapper:hover .toggle-edit-button {
    display: flex;
    right: -43px;
}
</style>
