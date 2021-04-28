<template>
  <div>
    <el-table :data="tableData" border :header-cell-style="{color:'#006eda'}">
      <el-table-column
        align="center"
        prop="Title"
        label="岗位">
      </el-table-column>
      <el-table-column
        align="center"
        prop="Salary"
        label="薪资范围(元)">
      </el-table-column>
      <el-table-column
        align="center"
        prop="PublishDate"
        label="发布日期">
      </el-table-column>
      <el-table-column
        align="center"
        prop="Experience"
        label="工作经验">
      </el-table-column>
      <el-table-column
        align="center"
        prop="Education"
        label="学历要求">
      </el-table-column>
      <el-table-column
        align="center"
        prop="ProvinceDesc"
        label="办公地点">
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <div class="total-count">共 {{ queryZp.total }} 条</div>
      <el-pagination
        layout="prev, pager, next"
        :total="queryZp.total"
        :hide-on-single-page="true"
        @current-change="zpPageChange">
      </el-pagination>
    </div>
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
      queryZp: {
        page: 1,
        total: 0
      },
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
    this.getZpData()
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
  methods: {
    getZpData() {
      request.post('api/v1/qcc/getRecruitmentList', {
        'entName': this.tData.company_name,
        'phone': this.phone,
        'page': this.queryZp.page,
        'pageSize': 10
      }, this.auth).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.result
          this.queryZp.total = res.data.paging.total
        }
      }).catch(err => {
        this.$message.error('查询失败')
      })
    },
    zpPageChange(index) {
      this.queryZp.page = index
      this.getZpData()
    }
  }
}
</script>

<style lang="stylus" scoped>
.pagination-wrapper {
  text-align right

  .total-count {
    margin-top 8px
    margin-right 16px
    margin-bottom 3px
  }
}
</style>
