<template>
  <div>
    <table
      class="operation_table center"
      @mouseout="reset()"
    >
      <tr>
        <th /><th
          v-for="(i,n) in 10"
          :key="n"
          :class="{'selected': loperand == n}"
        >
          {{ n }}
        </th>
      </tr>
      <tr
        v-for="(i,n) in 10"
        :key="n"
      >
        <th :class="{'selected': roperand == n}">
          {{ n }}
        </th>  
        <td 
          v-for="(j,m) in 10" 
          :key="m" 
          :class="{'selected': (loperand == m || roperand == n), 'selected_strong': (loperand == m && roperand == n)}" 
          @mouseover="set(m, n)"
        >
          {{ f(m, n) }}
        </td>
      </tr>
    </table>
    <p
      style="text-align: center"
      class="math"
    >
      {{ print(loperand.toString(), roperand.toString(), f(loperand, roperand).toString()) }}
    </p> 
  </div>
</template>

<script>
    export default {
        name: "OperationTable",
        props: ['defaultLoperand', 'defaultRoperand', 'f', 'print'],
        data() {
            return {
                loperand: null,
                roperand: null,
            }
        },
        created(){
            this.reset();
        },
        methods: {
            set(lop, rop){
                this.loperand = lop;
                this.roperand = rop;
            },
            reset(){
              this.loperand = this.defaultLoperand;
              this.roperand = this.defaultRoperand;
            }
        }
    }
</script>

<style scoped lang="scss">
    .selected {
        background: #F0E0E0;
    }
    .selected_strong {
        background: #CC4444 !important;
    }
</style>
