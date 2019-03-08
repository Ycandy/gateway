<template lang="pug">
.info
  .message(style='margin-top: 30px;') {{ message[status] }}
  .form-board
    .first-level
      span 个人信息
    .second-level
      .input-title 姓名
      .input-title {{ info.name }}
    .second-level
      .input-title 邮箱
      .input-title {{ info.email }}
    .second-level
      .input-title 用户类型
      .input-title {{ type[info.type] }}
    .second-level
      .input-title 组织机构
      .input-title {{ info.organization }}
    .bottom
</template>

<script>
export default {
  data () {
    return {
      info: {},
      type: {
        'student': '学生',
        'teacher': '教师',
        'other': '校外用户'
      },
      status: '',
      message: {
        'status_register': '等待审核,  若管理员超过 1 天还未激活您的账号,  请及时联系管理员为您激活账号',
        'status_register_deny': '很抱歉, 您的审核已被管理员拒绝'
      }
    }
  },
  async mounted () {
    let loading = this.$loading()
    let { data } = await this.$axios.get(this.$config.app.info)
    // 返回结果的status有三个值
    // status_register 待审核
    // status_register_deny 被拒绝
    // status_normal 通过
    if (data.status === 'status_normal') {
      // 审核通过则跳转
      window.location.href = this.$config.app.redirect
    }
    this.status = data.status
    this.info = data
    delete this.info.status
    loading.close()
  }
}
</script>

<style lang="stylus" scoped>
.bottom
  margin-bottom 40px
</style>
