<template>
  <div>
    <div class="title-zl">专利</div>
    <el-table :data="tableData" border>
      <el-table-column
        align="center"
        prop="Title"
        label="标题">
      </el-table-column>
      <el-table-column
        align="center"
        prop="ApplicationNumber"
        label="申请号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="ApplicationDate"
        label="申请日期">
      </el-table-column>
      <el-table-column
        align="center"
        prop="PublicationNumber"
        label="公开(公告)号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="PublicationDate"
        label="公开(公告)日">
      </el-table-column>
      <el-table-column
        align="center"
        prop="InventorStringList"
        label="发明人">
      </el-table-column>
    </el-table>
    <div class="title-rz">软著</div>
    <el-table :data="tableData2" border>
      <el-table-column
        align="center"
        prop="Name"
        label="名称">
      </el-table-column>
      <el-table-column
        align="center"
        prop="ShortName"
        label="软件简称">
      </el-table-column>
      <el-table-column
        align="center"
        prop="RegisterNo"
        label="登记号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="Owner"
        label="归属">
      </el-table-column>
      <el-table-column
        align="center"
        prop="RegisterAperDate"
        label="登记批准日期">
      </el-table-column>
      <el-table-column
        align="center"
        prop="VersionNo"
        label="版本号">
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
      tableData: [],
      tableData2: []//软著
    }
  },
  // inject: [],
  computed: {},
  // watch: {},
  mounted() {
    this.tData = JSON.parse(localStorage.getItem('ent'))
    this.phone = localStorage.getItem('phone')
    this.auth = localStorage.getItem('auth')
    request.post('api/v1/qcc/getPatentV4Search', {
      'entName': this.tData.company_name,
      'phone': this.phone,
      'page': 1,
      'pageSize': 100
    }, this.auth).then(res => {
      if (res.data.code === 200) {
        res.data.result.forEach(ele => {
          ele.InventorStringList = ele.InventorStringList.join()
          ele.ApplicationDate = ele.ApplicationDate.slice(0, 10)
          ele.PublicationDate = ele.PublicationDate.slice(0, 10)
        })
        this.tableData = res.data.result
      }
    }).catch(err => {
      this.$message.error('查询失败')
    })
    request.post('api/v1/qcc/getSearchSoftwareCr', {
      'entName': this.tData.company_name,
      'phone': this.phone,
      'page': 1,
      'pageSize': 100
    }, this.auth).then(res => {
      if (res.data.code === 200) {
        res.data.result.forEach(ele => {
          ele.RegisterAperDate = ele.RegisterAperDate.slice(0, 10)
        })
        this.tableData2 = res.data.result
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
.title-zl {
  width 100%
  text-align center
  font-size 20px
  font-weight 800
}

.title-rz {
  width 100%
  text-align center
  font-size 20px
  font-weight 800
  margin-top 20px
}
</style>
