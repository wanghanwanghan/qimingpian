<template>
  <div>
    <el-table :data="tableData" border :header-cell-style="{color:'#006eda'}">
      <el-table-column
        align="center"
        prop="date"
        label="时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="round_level"
        label="轮次">
      </el-table-column>
      <el-table-column
        align="center"
        prop="money"
        label="金额">
      </el-table-column>
      <el-table-column
        align="center"
        prop="investfirms"
        label="投资方">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  // filters: {},
  props: {},
  // provide() {
  //   return {}
  // },
  data() {
    return {
      tData: [],
      tableData: []
    }
  },
  // inject: [],
  computed: {},
  // watch: {},
  mounted() {
    this.tData = JSON.parse(localStorage.getItem('ent'))
    this.tableData = this.tData.financing_process
  },
  // beforeCreate() {
  // },
  // created() {
  // },
  // beforeMount() {
  // },
  // beforeUpdate() {
  // },
  // updated() {
  // },
  // beforeDestroy() {
  // },
  // destroyed() {
  // },
  // activated() {
  // },
  // deactivated() {
  // },
  methods: {}
}
</script>

<style lang="stylus" scoped>

</style>
