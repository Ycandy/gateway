<template lang="pug">
.info
  .message(style='margin-top: 30px;') {{ message[status] }}
  .form-board
    .first-level
      span 个人信息
      el-button(type='primary' style='float: right' @click='logout') 登出
    .second-level
      .input-title 用户名
      .input-title.last {{ info.email }}
    .second-level
      .input-title 姓名
      .input-title.last {{ info.name }}
    .second-level
      .input-title 联系电话
      .input-title.last {{ info.phone }}
    .second-level
      .input-title 人员类型
      .input-title.last {{ info.type.name }}
    .second-level
      .input-title 学工号
      .input-title.last {{ info.ref_no }}
    .second-level
      .input-title 分组
      .input-title.last {{ info.group }}
    .second-level
      .input-title 有效时间
      .input-title.last(style='display: flex;')
        div {{ info.validStartDate || '-' }}
        span.date-separator 至
        div {{ info.validEndDate || '-' }}
    .bottom
</template>

<script>
import { Button } from 'gapper-element-ui'

export default {
  components: {
    [Button.name]: Button
  },
  async asyncData ({ vue, component }) {
    let loading = vue.$loading()
    let { data } = await vue.$axios.get(`${vue.$gatewayServer}/user/info`)
    // 返回结果的status有三个值
    // status_register 待审核
    // status_register_deny 被拒绝
    // status_normal 通过
    if (data.status === 'status_normal') {
      // 审核通过则跳转
      // window.location.href = document.referrer
      // vue.$router.push({ name: 'complete', query: { genee_oauth: vue.$route.query.genee_oauth } })
      window.location.href = `${vue.$gatewayServer}/judge-login?genee_oauth=${vue.$route.query.genee_oauth}`
      return
    }
    let status = data.status
    let info = data
    delete info.status
    loading.close()
    return {
      status,
      info
    }
  },
  data () {
    return {
      message: {
        'status_register': '等待审核,  若管理员超过 1 天还未激活您的账号,  请及时联系管理员为您激活账号',
        'status_register_deny': '很抱歉, 您的审核已被管理员拒绝'
      }
    }
  },
  methods: {
    logout () {
      window.location.href = `${this.$gatewayServer}/logout`
    }
  }
}
</script>

<style lang="stylus" scoped>
.bottom
  margin-bottom 40px
.last
  flex 1
  text-align left
</style>
