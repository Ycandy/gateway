<template lang="pug">
.info
  .page-title
    span 补全用户信息
  .message(ref='message')
    span 你好!&nbsp;&nbsp;您是首次登录,&nbsp;&nbsp;请首先补全信息
    i.el-icon-close(style='cursor: pointer;margin-left: 20px;' @click='closeMessage')
  .form-board
    .first-level
      span 基本信息
    .second-level
      .input-title.required 用户名
      el-input(v-model='username')
    .tips 请使用真实邮箱注册,&nbsp;&nbsp;防止忘记密码无法找回
    .second-level
      .input-title.required 密码
      el-input(v-model='password')
    .tips 8-24个字符,&nbsp;&nbsp;必须包含数字和大小写字母
    .second-level
      .input-title.required 确认密码
      el-input(v-model='confirmPassword')
    .tips
    .first-level 自定义字段
    .second-level
      .input-title.required 姓名
      el-input(v-model='name')
    .tips
    .second-level
      .input-title.required 联系电话
      el-input(v-model='phone')
    .tips
    .second-level
      .input-title.required 人员类型
      el-select(v-model='type')
    .tips
    .second-level
      .input-title 学工号
      el-input(v-model='idCard')
    .tips
    .second-level
      .input-title.required 组织机构
      el-select(v-model='group')
    .tips
    .second-level
      .input-title.required 课题组
      el-select(v-model='type')
    .tips
    el-button(type='primary') 提交
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: '',
      sex: 'man',
      type: '',
      idCard: '',
      group: '',
      researchGroup: ''
    }
  },
  methods: {
    closeMessage () {
      this.closeMessageAnimate()
    },
    closeMessageAnimate () {
      setTimeout(() => {
        let $message = this.$refs.message
        let height = $message.clientHeight
        if (height > 0) {
          height -= 1
          $message.style.height = height + 'px'
          this.closeMessageAnimate()
        }
      }, 10)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
