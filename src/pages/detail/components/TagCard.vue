<template>
  <el-card class="content-card" shadow="never">
    <slot v-if="'基本信息' === tagName">
      <register-info></register-info>
    </slot>
    <slot v-if="'财务表现' === tagName">
      <finance></finance>
    </slot>
    <slot v-if="'融资历史' === tagName">
      <finance-history></finance-history>
    </slot>
    <slot v-if="'公司团队' === tagName">
      <manager></manager>
    </slot>
    <slot v-if="'招聘信息' === tagName">
      <recruitment-list></recruitment-list>
    </slot>
    <slot v-if="'知识产权' === tagName">
      <patent></patent>
    </slot>
  </el-card>
</template>

<script>
import RegisterInfo from "./RegisterInfo"
import Finance from "./Finance"
import FinanceHistory from "./FinanceHistory"
import Manager from "./Manager"
import RecruitmentList from "./RecruitmentList"
import Patent from "./Patent"

export default {
  name: '',
  components: {
    RegisterInfo,
    Finance,
    FinanceHistory,
    Manager,
    RecruitmentList,
    Patent
  },
  // filters: {},
  props: {
    tagList: Array,
    tagIndex: Number,
    tagName: String
  },
  // provide() {
  //   return {}
  // },
  data() {
    return {
      showWhichTag: 0
    }
  },
  // inject: [],
  computed: {},
  // watch: {},
  mounted() {
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
