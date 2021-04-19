<template>
  <div>
    <div class="finance-wrapper">
      <div class="finance-btn" v-if="showBtn">
        <el-button type="warning" round @click="getData">您共有 5 次免费查看机会，还剩 {{ lookCount }} 次</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import comm from "../../../tool/comm";
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
      lookCount: 0,
      showBtn: true
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
        console.log(123)
        localStorage.setItem('lookCount', this.lookCount)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.finance-wrapper {
  text-align center
}
</style>
