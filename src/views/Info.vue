<template lang="pug">
.info
  .message(style='margin-top: 30px;') {{ message[status] }}
  .form
    .form__fieldset 个人信息
      .form__field
        .form__field__name 用户名
        .form__field__text {{ info.email }}
      .form__field
        .form__field__name 姓名
        .form__field__text {{ info.name }}
      .form__field
        .form__field__name 联系电话
        .form__field__text {{ info.phone }}
      .form__field
        .form__field__name 人员类型
        .form__field__text {{ info.type.name }}
      .form__field
        .form__field__name 学工号
        .form__field__text {{ info.ref_no }}
      .form__field
        .form__field__name 分组
        .form__field__text {{ info.group }}
      .form__field
        .form__field__name 有效时间
        .form__field__text.flex
          span {{ info.validStartDate || '-' }}
          span.separator 至
          span {{ info.validEndDate || '-' }}
  .bottom
</template>

<script>
export default {
  async asyncData ({ vue, component }) {
    let loading = vue.$loading()
    let data = await vue.$gateway.getUserInfo()
    // 返回结果的status有三个值
    // status_register 待审核
    // status_register_deny 被拒绝
    // status_normal 通过
    if (data.status === 'status_normal') {
      // 审核通过则跳转
      // window.location.href = document.referrer
      vue.$router.push({ name: 'complete', query: { genee_oauth: vue.$route.query.genee_oauth } })
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
  }
}
</script>

<style lang="stylus" scoped>
.bottom
  margin-bottom 40px
.flex
  display flex
  .separator
    padding 0 10px
</style>
