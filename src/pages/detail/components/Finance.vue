<template>
  <div>
    <div class="finance-wrapper">
      <div class="search-wrapper" v-show="!showBtn">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <el-input placeholder="模糊搜索企业名称" @keyup.enter.native="search" class="el-btn" v-model="input"
                          clearable></el-input>
                <el-button type="primary" @click="search">搜索</el-button>
              </div>
              <div v-for="(item,index) of entList" :key="input" class="text item ent-list-wrapper">
                <div class="ent-list-item">{{ item.Name }}</div>
                <div class="diff-btn" @click="addDiff(item.Name)">加入对比</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>对比列表</span>
                <el-button type="primary" @click="drowPic">生成财务图</el-button>
              </div>
              <div v-for="(item,index) of diffList" :key="index" class="text item ent-list-wrapper">
                <div class="ent-list-item">{{ item }}</div>
                <div class="undiff-btn" @click="unDiff(item)">移出对比列表</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="finance-btn" v-show="showBtn">
        <el-button type="warning" round @click="getData">您共有 5 次免费查看机会，还剩 {{ lookCount }} 次</el-button>
      </div>
      <div class="VENDINC-ec-wrapper" v-show="!showBtn">
        <div class="VENDINC-ec-pic" ref="VENDINC"></div>
      </div>
      <div class="PROGRO-ec-wrapper" v-show="!showBtn">
        <div class="PROGRO-ec-pic" ref="PROGRO"></div>
      </div>
      <div class="ASSGRO-ec-wrapper" v-show="!showBtn">
        <div class="ASSGRO-ec-pic" ref="ASSGRO"></div>
      </div>
    </div>
  </div>
</template>
<script>
import request from "../../../comm/js/request";
import * as ec from "echarts"

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
      colorList: [
        '#5470c6',
        '#91cc75',
        '#ee6666',
        '#73c0de',
        '#3ba272',
        '#fc8452',
        '#9a60b4',
        '#ea7ccc',
        '#fac858'
      ],
      colorIndex: 0,
      tData: {},
      fData: {},
      lookCount: 0,
      phone: '',
      auth: '',
      showBtn: true,
      input: '',
      entList: [],
      diffList: []
    }
  },
  // inject: [],
  computed: {},
  // watch: {},
  mounted() {
    this.tData = JSON.parse(localStorage.getItem('ent'))
    this.lookCount = localStorage.getItem('lookCount')
    if (this.lookCount === null || this.lookCount === '') {
      localStorage.setItem('lookCount', 5)
      this.lookCount = 5
    }
    this.phone = localStorage.getItem('phone')
    this.auth = localStorage.getItem('auth')
    this.diffList.push(this.tData.company_name)
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
    getData() {
      if (this.lookCount <= 0) {
        this.$message.error('没有查询次数了')
      } else {
        this.lookCount--
        localStorage.setItem('lookCount', this.lookCount)
        //拿财务数据
        request.post('api/v1/lx/getFinanceTemp', {
          'entName': this.tData.company_name,
          'phone': this.phone,
          'pay': 1,
        }, this.auth).then(res => {
          if (res.data.code === 200) {
            this.fData = res.data.result
            this.showBtn = !this.showBtn
            this.handlerPData(this.fData)
            this.handlerVData(this.fData)
            this.handlerAData(this.fData)
          }
          this.$message({
            message: '查询成功',
            type: 'success'
          });
        }).catch(err => {
          this.$message.error('查询失败')
        });
      }
    },
    handlerPData(data) {
      let PROGRO_dom = this.$refs.PROGRO
      let PROGRO_ec = ec.init(PROGRO_dom)
      let PROGRO_op = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            //dataView: {show: true, readOnly: false},
            //magicType: {show: true, type: ['line', 'bar']},
            //restore: {show: true},
            //saveAsImage: {show: true}
          }
        },
        legend: {
          data: ['利润总额', '同比']
        },
        xAxis: [
          {
            type: 'category',
            data: ['2017', '2018', '2019'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '利润总额',
            min: null,
            max: null,
            interval: null,
            axisLabel: {
              formatter: '{value} 万元'
            }
          },
          {
            type: 'value',
            name: '同比',
            min: null,
            max: null,
            interval: null,
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: '利润总额',
            type: 'bar',
            data: []
          },
          {
            name: '同比',
            type: 'line',
            yAxisIndex: 1,
            data: []
          }
        ]
      }
      let legend = []
      let series = []
      this.colorIndex = 0
      for (let key in data) {
        legend.push(key + '利润总额')
        legend.push(key + '同比')
        let yearData = []
        let yearDataYoy = []
        for (let i = 2017; i <= 2019; i++) {
          yearData.push(data[key][i]['PROGRO'])
          yearDataYoy.push(data[key][i]['PROGRO_yoy'])
        }
        let objData = {
          name: key + '利润总额',
          type: 'bar',
          data: yearData,
          itemStyle: {
            color: this.colorList[this.colorIndex]
          }
        }
        let objYoy = {
          name: key + '同比',
          type: 'line',
          yAxisIndex: 1,
          data: yearDataYoy,
          smooth: true,
          color: this.colorList[this.colorIndex],
          lineStyle: {
            color: this.colorList[this.colorIndex]
          }
        }
        this.colorIndex++
        series.push(objData)
        series.push(objYoy)
      }
      PROGRO_op.legend.data = legend
      PROGRO_op.yAxis.name = '利润总额'
      PROGRO_op.series = series
      PROGRO_ec.setOption(PROGRO_op, true)
    },
    handlerVData(data) {
      let VENDINC_dom = this.$refs.VENDINC
      let VENDINC_ec = ec.init(VENDINC_dom)
      let VENDINC_op = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            //dataView: {show: true, readOnly: false},
            //magicType: {show: true, type: ['line', 'bar']},
            //restore: {show: true},
            //saveAsImage: {show: true}
          }
        },
        legend: {
          data: ['营业总收入', '同比']
        },
        xAxis: [
          {
            type: 'category',
            data: ['2017', '2018', '2019'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '营业总收入',
            min: null,
            max: null,
            interval: null,
            axisLabel: {
              formatter: '{value} 万元'
            }
          },
          {
            type: 'value',
            name: '同比',
            min: null,
            max: null,
            interval: null,
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: '营业总收入',
            type: 'bar',
            data: []
          },
          {
            name: '同比',
            type: 'line',
            yAxisIndex: 1,
            data: []
          }
        ]
      }
      let legend = []
      let series = []
      this.colorIndex = 0
      for (let key in data) {
        legend.push(key + '营业总收入')
        legend.push(key + '同比')
        let yearData = []
        let yearDataYoy = []
        for (let i = 2017; i <= 2019; i++) {
          yearData.push(data[key][i]['VENDINC'])
          yearDataYoy.push(data[key][i]['VENDINC_yoy'])
        }
        let objData = {
          name: key + '营业总收入',
          type: 'bar',
          data: yearData,
          itemStyle: {
            color: this.colorList[this.colorIndex]
          }
        }
        let objYoy = {
          name: key + '同比',
          type: 'line',
          yAxisIndex: 1,
          data: yearDataYoy,
          smooth: true,
          color: this.colorList[this.colorIndex],
          lineStyle: {
            color: this.colorList[this.colorIndex]
          }
        }
        this.colorIndex++
        series.push(objData)
        series.push(objYoy)
      }
      VENDINC_op.legend.data = legend
      VENDINC_op.yAxis.name = '营业总收入'
      VENDINC_op.series = series
      VENDINC_ec.setOption(VENDINC_op, true)
    },
    handlerAData(data) {
      let ASSGRO_dom = this.$refs.ASSGRO
      let ASSGRO_ec = ec.init(ASSGRO_dom)
      let ASSGRO_op = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            //dataView: {show: true, readOnly: false},
            //magicType: {show: true, type: ['line', 'bar']},
            //restore: {show: true},
            //saveAsImage: {show: true}
          }
        },
        legend: {
          data: ['资产总额', '同比']
        },
        xAxis: [
          {
            type: 'category',
            data: ['2017', '2018', '2019'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '资产总额',
            min: null,
            max: null,
            interval: null,
            axisLabel: {
              formatter: '{value} 万元'
            }
          },
          {
            type: 'value',
            name: '同比',
            min: null,
            max: null,
            interval: null,
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: '资产总额',
            type: 'bar',
            data: []
          },
          {
            name: '同比',
            type: 'line',
            yAxisIndex: 1,
            data: []
          }
        ]
      }
      let legend = []
      let series = []
      this.colorIndex = 0
      for (let key in data) {
        legend.push(key + '资产总额')
        legend.push(key + '同比')
        let yearData = []
        let yearDataYoy = []
        for (let i = 2017; i <= 2019; i++) {
          yearData.push(data[key][i]['ASSGRO'])
          yearDataYoy.push(data[key][i]['ASSGRO_yoy'])
        }
        let objData = {
          name: key + '资产总额',
          type: 'bar',
          data: yearData,
          itemStyle: {
            color: this.colorList[this.colorIndex]
          }
        }
        let objYoy = {
          name: key + '同比',
          type: 'line',
          yAxisIndex: 1,
          data: yearDataYoy,
          smooth: true,
          color: this.colorList[this.colorIndex],
          lineStyle: {
            color: this.colorList[this.colorIndex]
          }
        }
        this.colorIndex++
        series.push(objData)
        series.push(objYoy)
      }
      ASSGRO_op.legend.data = legend
      ASSGRO_op.yAxis.name = '资产总额'
      ASSGRO_op.series = series
      ASSGRO_ec.setOption(ASSGRO_op, true)
    },
    search() {
      request.post('api/v1/qcc/getEntList', {
        'entName': this.input,
        'phone': this.phone,
        'page': 1,
        'pageSize': 15
      }, this.auth).then(res => {
        if (res.data.code === 200) {
          this.entList = res.data.result
        }
      }).catch(err => {
        this.$message.error('查询失败')
      })
    },
    drowPic() {
      if (this.lookCount <= 0) {
        this.$message.error('没有查询次数了')
        return
      }
      if (this.diffList.length > 5) {
        this.$message.error('最多选5家企业')
        return
      }
      if (this.diffList.length < 1) {
        this.$message.error('至少选1家企业')
        return
      }
      request.post('api/v1/lx/getFinanceTemp', {
        'entName': this.diffList.join(),
        'phone': this.phone,
        'pay': 1,
      }, this.auth).then(res => {
        if (res.data.code === 200) {
          this.handlerPData(res.data.result)
          this.handlerAData(res.data.result)
          this.handlerVData(res.data.result)
        }
        this.$message({
          message: '查询成功',
          type: 'success'
        });
      }).catch(err => {
        this.$message.error('查询失败')
      });


    },
    addDiff(ent) {
      let num = this.diffList.indexOf(ent)
      if (num === -1) {
        this.diffList.push(ent)
      }
    },
    unDiff(ent) {
      let num = this.diffList.indexOf(ent)
      if (num !== -1) {
        this.diffList.splice(num, 1)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.finance-wrapper {
  text-align center

  .search-wrapper {
    .el-btn {
      width 30%
    }

    .ent-list-wrapper {
      display flex
      justify-content space-between
      padding-left 50px
      padding-right 50px

      .ent-list-item {
        margin 5px 0
      }

      .diff-btn {
        color #4c84ff
        cursor pointer
      }

      .undiff-btn {
        color red
        cursor pointer
      }
    }
  }

  .PROGRO-ec-wrapper {
    .PROGRO-ec-pic {
      margin-top 20px
      width 1258px
      height 700px
    }
  }

  .VENDINC-ec-wrapper {
    .VENDINC-ec-pic {
      width 1258px
      height 700px
    }
  }

  .ASSGRO-ec-wrapper {
    .ASSGRO-ec-pic {
      width 1258px
      height 700px
    }
  }
}
</style>
