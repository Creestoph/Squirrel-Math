<template>
    <div class="chapter_name">
        <div ref="content"></div>
        <div
            class="hidden-button"
            :class="{ hidden: isHidden }"
            @click="isHidden = !isHidden"
            :title="
                isHidden
                    ? 'Rozdział będzie domyślnie zwinięty. Kliknij by był domyślnie rozwinięty.'
                    : 'Rozdział będzie domyślnie rozwinięty. Kliknij by był domyślnie zwinięty.'
            "
        >
            <icon style="width: 40px; height: 40px">visibility_off</icon>
        </div>
        <hr />
    </div>
</template>

<script>
export default {
    props: ['node', 'updateAttrs', 'view'],
    computed: {
        isHidden: {
            get() {
                return this.node.attrs.isHidden;
            },
            set(isHidden) {
                this.updateAttrs({ isHidden });
            },
        },
    },
};
</script>

<style scoped lang="scss">
@use '@/style/global';
@use '@/style/colors';

.hidden-button {
    display: none;
    position: absolute;
    left: -50px;
    padding-right: 20px;
    top: -12px;
    cursor: pointer !important;

    color: colors.$gray;
    &.hidden {
        color: black;
        display: inline-block;
    }

    span {
        font-size: 1.2em;
    }

    .chapter_name:hover &,
    &:hover {
        display: inline-block;
    }
}
</style>
