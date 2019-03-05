<template lang="pug">
.complete
  .title 补全用户信息
  .board
    .message(ref='message')
      span 你好!&nbsp;&nbsp;您是首次登录,&nbsp;&nbsp;请首先补全信息
      i.el-icon-close(style='cursor: pointer;margin-left: 20px;' @click='closeMessage')
    .form
      .fieldset 基本信息
      .input-group
        .name.required 用户名
        el-input.fill-fill(v-model='username')
        .tips 请使用真实邮箱注册,&nbsp;&nbsp;防止忘记密码无法找回
      .input-group
        .name.required 密码
        el-input.fill-fill(v-model='password')
        .tips 8-24个字符,&nbsp;&nbsp;必须包含数字和大小写字母
      .input-group
        .name.required 确认密码
        el-input.fill-fill(v-model='confirmPassword')
        .tips
      .fieldset 自定义字段
      .input-group
        .name.required 姓名
        el-input.fill-fill(v-model='name')
        .tips
      .input-group
        .name.required 联系电话
        el-input.fill-fill(v-model='phone')
        .tips
      .input-group
        .name.required 人员类型
        el-select.fill-fill(v-model='type')
        .tips
      .input-group
        .name 学工号
        el-input.fill-fill(v-model='idCard')
        .tips
      .input-group
        .name.required 组织机构
        el-select.fill-fill(v-model='group')
        .tips
      .input-group
        .name.required 课题组
        el-select.fill-fill(v-model='type')
        .tips
      el-button(style='margin: 35px 0 30px;width: 100px;' type='primary') 提交
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
.complete
  display flex
  flex-direction column
  width 100%
  height 100%
  .title
    padding 30px 0 20px
    font-size 20px
    color #333333
    text-align center
  .board
    flex 1
    display flex
    flex-direction column
    box-sizing border-box
    margin 0 auto
    width 600px
    height 100%
    text-align center
    .message
      width 100%
      height 36px
      line-height 36px
      font-size 12px
      color #CC6561
      background #FFF6DB
      border-radius 3px
    .form
      box-sizing border-box
      padding 0 56px
      width 100%
      font-size 14px
      background #FFFFFF
      text-align center
      .fieldset
        padding 22px 0 30px
        font-weight bold
        text-align left
      .input-group
        display flex
        flex-wrap wrap
        text-align left
        .name
          width 100px
          height 28px
          line-height 28px
          font-size 12px
        .fill-fill
          flex 1
        .tips
          width 100%
          padding 8px 0 14px
          font-size 12px
          color #CC6561
          padding-left 120px
.required:after
  content '*'
  color #CC6561
  padding-left 6px
</style>
