<template>
  <div ref="main" />
</template>

<script>
import {Display_table} from "../../utils/columnar_operation_table/display_table.js"
    export default {
        name: "ColumnarOperationTable",
        props: ['operation', 'numbers'],
        data(){
            return {
                display_table: null
            };
        },
        mounted(){
            this.display_table = Display_table.create_from_table(this.operation, this.numbers);
            this.display_table.print(this.$refs.main);
            // MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        }
    }
</script>

<style scoped lang="scss">

</style>
