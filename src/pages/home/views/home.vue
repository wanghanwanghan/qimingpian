<template>
  <div class="body-wrapper">
    <div class="nav-wrapper">
      <img class="img-wrapper" src="http://api.meirixindong.com/Static/Image/Image/xdzd_logo_big.jpeg"/>
    </div>
    <div class="header-wrapper">
      <div class="one-row">
        <el-input placeholder="全局搜索，查询条件空格相隔" @keyup.enter.native="search" v-model="cond.keyword" clearable
                  class="input-with-select keyword-input">
          <el-button class="keyword-btn" slot="append" @click="search">搜索</el-button>
        </el-input>
      </div>
      <div class="one-row">
        <div class="one-row-left">业务标签</div>
        <div class="one-row-right">
          <div :class="{oneTag:true,onTagClickClass:tag1CurrentIndex === index}" v-for="(item,index) of tag1list"
               @click="tag1click($event,index)">{{ item }}
          </div>
        </div>
      </div>
      <div class="one-row">
        <div class="one-row-left">添加标签</div>
        <div class="one-row-right">
          <el-input style="width: 30%;margin-left: 8px" placeholder="请输入业务标签名称" v-model="labelInput"
                    class="input-with-select">
            <el-button slot="append" icon="el-icon-plus" @click="addLabel"></el-button>
          </el-input>
        </div>
      </div>
      <div class="one-row">
        <div class="one-row-left">融资轮次</div>
        <div class="one-row-right">
          <div :class="{oneTag:true,onTagClickClass:tag2CurrentIndex === index}" v-for="(item,index) of tag2list"
               @click="tag2click($event,index)">{{ item }}
          </div>
        </div>
      </div>
      <div class="one-row">
        <div class="one-row-left">成立时间</div>
        <div class="one-row-right">
          <div :class="{oneTag:true,onTagClickClass:tag3CurrentIndex === index}" v-for="(item,index) of tag3list"
               @click="tag3click($event,index)">{{ item }}
          </div>
        </div>
      </div>
      <div class="one-row">
        <div class="one-row-left">国家地区</div>
        <div class="one-row-right">
          <div :class="{oneTag:true,onTagClickClass:tag4CurrentIndex === index}" v-for="(item,index) of tag4list"
               @click="tag4click($event,index)">{{ item }}
          </div>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <el-table :data="tableData" border @row-click="rowClick" height="600"
                :header-cell-style="{color:'#006eda'}">
        <el-table-column
          align="center"
          prop="company_name"
          label="企业名称">
        </el-table-column>
        <el-table-column
          align="center"
          label="产品"
          width="550">
          <template slot-scope="scope">
            <el-table :show-header="true" :data="scope.row.enterprise_business" border
                      :header-cell-style="{color:'#006eda'}">
              <el-table-column
                align="center"
                prop="name"
                label="名称">
              </el-table-column>
              <el-table-column
                align="center"
                prop="tag"
                label="标签">
              </el-table-column>
              <el-table-column
                align="center"
                prop="desc"
                label="描述">
              </el-table-column>
              <el-table-column
                align="center"
                prop="create_time"
                label="时间">
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="business_information.company_cate"
          label="行业领域"
          :formatter="col_formatter">
        </el-table-column>
        <el-table-column
          align="center"
          prop="company_region[0].province"
          label="地区"
          width="65"
          :formatter="col_formatter">
        </el-table-column>
        <el-table-column
          align="center"
          prop="financing_process[0].round_level"
          label="投资轮次"
          :formatter="col_formatter">
        </el-table-column>
        <el-table-column
          align="center"
          prop="financing_process[0].date"
          label="投资时间"
          :formatter="col_formatter">
        </el-table-column>
        <el-table-column
          align="center"
          prop="financing_process[0].money"
          label="投资金额"
          :formatter="col_formatter">
        </el-table-column>
        <el-table-column
          align="center"
          prop="financing_process[0].investfirms"
          label="投资方"
          :formatter="col_formatter">
        </el-table-column>
      </el-table>
    </div>
    <div class="footer-wrapper">
      <div class="total-count">共 {{ cond.total }} 条</div>
      <el-pagination
        layout="prev, pager, next"
        :total="cond.total"
        @current-change="pageChange">
      </el-pagination>
    </div>
    <div class="login-wrapper">
      <el-dialog
        title="登录"
        :visible.sync="dvShow"
        width="30%"
        center>
        <el-form :label-position="labelPosition" label-width="80px" :model="form">
          <el-form-item label="手机号">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="form.vCode"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dvShow = false">取 消</el-button>
          <el-button type="primary" @click="getCode">获取验证码</el-button>
          <el-button type="primary" @click="login">登录</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import request from "../../../comm/js/request"

export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      labelInput: '',
      labelPosition: 'right',
      form: {
        phone: '',
        vCode: '',
      },
      dvShow: false,
      cond: {
        keyword: '',
        tag: '不限',
        financing: '不限',
        time: '不限',
        province: '不限',
        page: 1,
        total: 0
      },
      tag1CurrentIndex: 0,
      tag1list: [
        '不限', '企业服务', '医疗健康', '生活服务', '人工智能', '大数据', '区块链', '教育培训', '文娱传媒', '金融', '电子商务', 'VR/AR',
        '旅游户外', '餐饮业', '房产家居', '汽车交通', '体育健身', '食品饮料', '物联网', '硬件', '游戏', '生产制造', '物流运输', '农业',
        '批发零售', '先进制造', '社交社区', '工具软件', '服装纺织', '建筑', '开采', '能源电力', '消费升级', '新基建', '硬科技'
      ],
      tag2CurrentIndex: 0,
      tag2list: [
        '不限', '天使轮', 'A轮', 'B轮', 'C轮', '战略融资'
      ],
      tag2TempList: [
        '不限', '种子轮', '天使轮', 'Pre-A轮', 'A轮', 'A+轮', 'Pre-B轮', 'B轮', 'B+轮', 'C轮', 'C+轮', 'D轮', 'Pro-IPO轮',
        '战略融资', '并购', '战略合并'
      ],
      tag3CurrentIndex: 0,
      tag3list: [
        '不限', '1-3年', '3-5年', '5年以上'
      ],
      tag4CurrentIndex: 0,
      tag4list: [
        '不限', '北京', '上海', '重庆', '天津', '广东', '江苏', '山东', '浙江', '河南', '四川', '湖北', '河北', '湖南', '福建',
        '安徽', '辽宁', '陕西', '江西', '广西', '云南', '黑龙江', '内蒙古', '吉林', '山西', '贵州', '新疆', '甘肃', '海南',
        '宁夏', '青海', '西藏', '香港', '澳门', '台湾'
      ],
      tableData: []
    }
  },
  mounted() {
    let tmp = localStorage.getItem('userLabels');
    if (tmp !== null && tmp.length > 1) {
      let tmp = JSON.parse(localStorage.getItem('userLabels'))
      this.tag1list.push(...tmp)
    }
    this.getData()
    let home_show = localStorage.getItem('home_show')
    if (home_show !== '123') {
      this.$alert('点击筛选列表后查看项目财务表现', '提示', {
        confirmButtonText: '确定',
      })
      localStorage.setItem('home_show', '123')
    }
  },
  methods: {
    col_formatter(row, column, cellValue, index) {
      if (cellValue === undefined) {
        return '--'
      }
      return cellValue
    },
    tag1click(e, index) {
      this.tag1CurrentIndex = index
      this.cond.tag = e.target.innerText
      this.cond.page = 1
      this.getData()
    },
    tag2click(e, index) {
      this.tag2CurrentIndex = index
      this.cond.financing = e.target.innerText
      this.cond.page = 1
      this.getData()
    },
    tag3click(e, index) {
      this.tag3CurrentIndex = index
      this.cond.time = e.target.innerText
      this.cond.page = 1
      this.getData()
    },
    tag4click(e, index) {
      this.tag4CurrentIndex = index
      this.cond.province = e.target.innerText
      this.cond.page = 1
      this.getData()
    },
    getData() {
      request.post('api/v1/hy/getData', this.cond, '').then(res => {
        if (res.data.result === null) {
          this.cond.total = 0
        } else {
          this.cond.total = res.data.paging.total
        }
        this.tableData = this.handleTableData(res.data.result)
        // this.$message({
        //   message: '查询成功',
        //   type: 'success'
        // })
      }).catch(err => {
        this.$message.error('查询失败')
        this.tableData = []
      })
    },
    handleTableData(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].financing_process !== undefined && data[i].financing_process.length > 0) {
          data[i].financing_process = data[i].financing_process.reverse()
        }
      }
      return data
    },
    pageChange(index) {
      this.cond.page = index
      this.getData()
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    rowClick(row, column, event) {
      if (localStorage.getItem('auth') === null || localStorage.getItem('auth') === '') {
        this.dvShow = true
      } else {
        let str = JSON.stringify(row)
        this.$router.push({
          path: '/detail',
          query: {str}
        })
      }
    },
    getCode() {
      request.post('api/v1/comm/create/sms/verifyCode', {
        'phone': this.form.phone,
        'type': 'reg'
      }, '').then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '发送成功',
            type: 'success'
          })
        } else {
          this.$message.error('发送失败')
        }
      }).catch(err => {
        this.$message.error('发送失败')
      })
    },
    login() {
      request.post('api/v1/user/reg', {
        'company': '火眼推广20210420',
        'phone': this.form.phone,
        'vCode': this.form.vCode
      }, '').then(res => {
        if (res.data.msg === '手机号已经注册过了' || res.data.code === 200) {
          //登陆
          request.post('api/v1/user/login', {
            'phone': this.form.phone,
            'vCode': this.form.vCode
          }, '').then(res => {
            if (res.data.code === 200) {
              localStorage.setItem('phone', this.form.phone)
              localStorage.setItem('auth', res.data.result.newToken)
              this.dvShow = false
              this.$router.push('/')
            } else {
              this.$message.error('登录失败')
            }
          }).catch(err => {
            this.$message.error('登录失败')
          })
        } else {
          this.$message.error('失败')
        }
      }).catch(err => {
        this.$message.error('失败')
      })
    },
    search() {
      this.cond.page = 1
      this.getData()
    },
    addLabel() {
      this.labelInput = this.labelInput.trim()
      if (this.labelInput.length > 0) {
        this.tag1list.push(this.labelInput)
        if (localStorage.getItem('userLabels').length < 1) {
          //第一次添加
          localStorage.setItem('userLabels', JSON.stringify([this.labelInput]))
        } else {
          //第n次添加
          let tmp = JSON.parse(localStorage.getItem('userLabels'))
          tmp.push(this.labelInput)
          localStorage.setItem('userLabels', JSON.stringify(tmp))
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.onTagClickClass {
  background-color #006eda
  color #fff
}

.body-wrapper {
  font-size 12px
  margin 0 auto
  width 1300px
  border-left 1px solid #EBEEF5
  border-right 1px solid #EBEEF5
  border-bottom 1px solid #EBEEF5
  position absolute
  top 0
  bottom 0
  left 0
  right 0

  .login-wrapper {
  }

  .nav-wrapper {
    position fixed
    width 1300px
    height 80px
    z-index 999
    background-color white
    box-shadow: 0px 3px 5px #EBEEF5

    .img-wrapper {
      width 200px
      height 80px
    }
  }

  .header-wrapper {
    margin-top 100px

    .one-row {
      display flex
      padding-left 25px
      margin-bottom 25px

      .keyword-input {
        width 50%
        margin 0 auto
      }

      .keyword-btn {
        background-color #006eda
        color #fff
      }

      .one-row-left {
        width 5%
        margin-top 10px
        color #006eda
      }

      .one-row-right {
        width 95%

        .oneTag {
          cursor pointer
          padding-top 3px
          margin 8px
          height 0
          float left
          width 6%
          padding-bottom 1.5%
          border 1px solid #EBEEF5
          text-align center
          border-radius 10px
        }
      }
    }
  }

  .content-wrapper {

  }

  .footer-wrapper {
    text-align right

    .total-count {
      margin-top 8px
      margin-right 16px
      margin-bottom 3px
    }
  }
}
</style>
