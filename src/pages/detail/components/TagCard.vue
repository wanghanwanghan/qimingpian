<template>
  <el-card class="content-card" shadow="never">
    <slot v-if="'基本信息' === tagName">
      <register-info></register-info>
    </slot>
    <slot v-if="'财务资产' === tagName">
      <finance></finance>
    </slot>
    <slot v-if="'企业画像' === tagName">
      <register-info></register-info>
    </slot>
    <slot v-if="'融资历史' === tagName">
      <register-info></register-info>
    </slot>
    <slot v-if="'公司团队' === tagName">
      <register-info></register-info>
    </slot>
    <slot v-if="'招聘信息' === tagName">
      <register-info></register-info>
    </slot>
    <slot v-if="'相似项目' === tagName">
      <register-info></register-info>
    </slot>
    <slot v-if="'工商信息' === tagName">
      <register-info></register-info>
    </slot>
    <slot v-if="'企业图谱' === tagName">
      <register-info></register-info>
    </slot>
    <slot v-if="'知识产权' === tagName">
      <register-info></register-info>
    </slot>
  </el-card>
</template>

<script>
import RegisterInfo from "./RegisterInfo"
import Finance from "./Finance";
import comm from "../../../tool/comm"

export default {
  name: '',
  components: {
    RegisterInfo,
    Finance
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
