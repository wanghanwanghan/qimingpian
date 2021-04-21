<template>
  <div>
    <el-table :data="tableData" border>
      <el-table-column
        align="center"
        prop="NAME"
        label="姓名">
      </el-table-column>
      <el-table-column
        align="center"
        prop="POSITION"
        label="职务">
      </el-table-column>
      <el-table-column
        align="center"
        prop="ISFRDB"
        label="是否法人">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from "../../../comm/js/request";

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
      tData: {},
      tableData: []
    }
  },
  // inject: [],
  computed: {},
  // watch: {},
  mounted() {
    this.tData = JSON.parse(localStorage.getItem('ent'))
    this.phone = localStorage.getItem('phone')
    this.auth = localStorage.getItem('auth')
    request.post('api/v1/ts/getMainManagerInfo', {
      'entName': this.tData.company_name,
      'phone': this.phone,
      'pageNo': 1,
      'pageSize': 100
    }, this.auth).then(res => {
      if (res.data.code === 200) {
        this.tableData = res.data.result
      }
    }).catch(err => {
      this.$message.error('查询失败')
    })
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
