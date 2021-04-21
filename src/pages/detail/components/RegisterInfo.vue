<template>
  <div>
    <table class="table-wrapper" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td class="td-title">企业名称</td>
        <td class="td-content">{{ tData.company_name || '-' }}</td>
        <td class="td-title">英文名称</td>
        <td class="td-content">{{ tData.business_information.com_english_name || '-' }}</td>
        <td class="td-title">法人名称</td>
        <td class="td-content">{{ tData.business_information.legal_user || '-' }}</td>
        <td class="td-title">企业状态</td>
        <td class="td-content">{{ tData.business_information.manage_status || '-' }}</td>
      </tr>
      <tr>
        <td class="td-title">企业分类</td>
        <td class="td-content">{{ tData.business_information.company_type || '-' }}</td>
        <td class="td-title">业务分类</td>
        <td class="td-content">{{ tData.business_information.company_cate || '-' }}</td>
        <td class="td-title">注册资金</td>
        <td class="td-content">{{ tData.business_information.capital || '-' }}</td>
        <td class="td-title">实缴资金</td>
        <td class="td-content">{{ tData.business_information.real_capital || '-' }}</td>
      </tr>
      <tr>
        <td class="td-title">注册时间</td>
        <td class="td-content">{{ tData.business_information.create_time || '-' }}</td>
        <td class="td-title">核准日期</td>
        <td class="td-content">{{ tData.business_information.approval_date || '-' }}</td>
        <td class="td-title">营业期限</td>
        <td class="td-content">{{ tData.business_information.operation_period || '-' }}</td>
        <td class="td-title">注册地址</td>
        <td class="td-content">{{ tData.business_information.com_reg_address || '-' }}</td>
      </tr>
      <tr>
        <td class="td-title">组织机构代码</td>
        <td class="td-content">{{ tData.business_information.organization_code || '-' }}</td>
        <td class="td-title">纳税人识别号</td>
        <td class="td-content">{{ tData.business_information.taxpayer_identification_number || '-' }}</td>
        <td class="td-title">统一代码</td>
        <td class="td-content" colspan="3">{{ tData.business_information.social_credit_code || '-' }}</td>
      </tr>
      <tr>
        <td class="td-title">业务范围</td>
        <td class="td-content" colspan="7">{{ tData.business_information.com_jyfw || '-' }}</td>
      </tr>
      <tr>
        <td class="td-title">业务标签</td>
        <td class="td-content" colspan="7">{{ tData.company_tags || '-' }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import comm from "../../../tool/comm";

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
      tData: {}
    }
  },
  // inject: [],
  computed: {},
  // watch: {},
  mounted() {
    this.tData = JSON.parse(localStorage.getItem('ent'))
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
.table-wrapper {
  width 100%
  text-align center
  border-right: 1px solid #EBEEF5
  border-bottom: 1px solid #EBEEF5
}

.table-wrapper td {
  padding 8px
  border-left: 1px solid #EBEEF5
  border-top: 1px solid #EBEEF5
}

.table-wrapper .td-content {
  background-color white
}

.table-wrapper .td-title {
  width 110px
}
</style>
