<template>
    <div class="dialog">
        <div class="dialog-header">
            Wczytaj wersję roboczą
            <button @click="close()">✖</button>
        </div>
        <div class="dialog-body">
            <div class="list-header">
                <div>
                    <span class="draft-name"><b>Tytuł</b></span>
                    <span class="draft-date"><b>Data utworzenia</b></span>
                    <span class="draft-date"><b>Data modyfikacji</b></span>
                </div>
                <span style="width: 90px"></span>
            </div>
            <div v-if="availableDrafts.length > 0" class="list">
                <div v-for="(draft, i) in availableDrafts" class="line" :key="i">
                    <div class="draft" @click="load(draft)">
                        <span class="draft-name">
                            {{ (draft.name || 'Bez tytułu') + (draft.fromAutosave ? ' (autosave)' : '') }}
                        </span>
                        <span class="draft-date">
                            {{ draft.created.toLocaleDateString() }}
                        </span>
                        <span class="draft-date">
                            {{
                                draft.lastModified.toLocaleDateString() + ' ' + draft.lastModified.toLocaleTimeString()
                            }}
                        </span>
                    </div>
                    <button @click="deleteDraft(draft)">usuń</button>
                </div>
            </div>
            <div v-else class="no-data">Brak zapisanych wersji roboczych</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { DraftPreview, LocalStorageSaver } from './LocalStorageManager';

const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'load', draft: DraftPreview): void;
}>();
const availableDrafts = ref<DraftPreview[]>([]);

onMounted(() => (availableDrafts.value = draftsList()));

function close() {
    emit('close');
}

function load(draft: DraftPreview) {
    emit('load', draft);
}

function deleteDraft(draft: DraftPreview) {
    LocalStorageSaver.deleteDraft(draft);
    availableDrafts.value = draftsList();
}

function draftsList(): DraftPreview[] {
    return LocalStorageSaver.draftsList().sort((d1, d2) => {
        const d1AutoSave = d1.fromAutosave ? 1 : 0;
        const d2AutoSave = d2.fromAutosave ? 1 : 0;
        return d1.name == d2.name ? d1AutoSave - d2AutoSave : d2.lastModified.getTime() - d1.lastModified.getTime();
    });
}
</script>

<style scoped lang="scss">
@use '@/style/colors';
@use '@/style/fonts';
@use '@/style/dialog';

.dialog-body {
    padding: 10px;

    .list-header {
        display: flex;
        margin-left: 10px;
        padding: 5px 10px;

        > div {
            flex: 1;
        }
    }

    .list {
        height: 390px;
        overflow-y: auto;

        .line {
            display: flex;

            .draft {
                flex: 1;
                margin: 10px 10px 10px 5px;
                padding: 5px 10px;
                background: colors.$light-gray;
                cursor: pointer;
                &:hover {
                    background: colors.$gray;
                }
            }

            button {
                background: colors.$main-red;
                padding: 5px 10px;
                margin: 10px 5px;
                color: white;
                &:hover {
                    background: colors.$dark-red;
                }
            }
        }
    }

    .draft-name {
        display: inline-block;
        width: 35%;
    }

    .draft-date {
        display: inline-block;
        width: 32%;
    }

    .no-data {
        width: 500px;
        line-height: 300px;
        text-align: center;
        color: colors.$dark-gray;
    }
}
</style>
