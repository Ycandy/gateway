<template lang="pug">
.complete
  .board
    .title 补全用户信息
    .message
      span 你好!&nbsp;&nbsp;您是首次登录,&nbsp;&nbsp;请首先补全信息&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      i.el-icon-close
    .form
      .fieldset 账号信息
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
      .fieldset 个人信息
      .input-group
        .name.required 姓名
        el-input.fill-fill(v-model='name')
      .input-group
        .name.required 联系电话
        el-input.fill-fill(v-model='phone')
      .input-group
        .name 性别
        .fill-fill
          el-radio(v-model="sex" label="man") 男
          el-radio(v-model="sex" label="woman") 女
      .input-group
        .name.required 人员类型
        el-select.fill-fill(v-model='type')
      .input-group
        .name 学工号
        el-input.fill-fill(v-model='idCard')
      .fieldset 课题组信息
      .input-group
        .name.required 组织机构
        el-select.fill-fill(v-model='group')
      .input-group
        .name.required 课题组
        el-select.fill-fill(v-model='type')
      el-button(style='width: 100px' type='primary') 提交
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
  }
}
</script>

<style lang="stylus" scoped>
.complete
  width 100%
  height 100%
  .board
    display flex
    flex-direction column
    box-sizing border-box
    margin 0 auto
    padding 30px 0
    width 600px
    height 100%
    text-align center
    .title
      font-size 16px
      margin-bottom 20px
    .message
      width 100%
      height 30px
      line-height 30px
      font-size 12px
      color #CC6561
      background #FFF6DB
    .form
      box-sizing border-box
      padding 24px 60px
      width 100%
      font-size 14px
      background #FFFFFF
      text-align center
      .fieldset
        margin-bottom 20px
        font-weight bold
        text-align left
      .input-group
        display flex
        flex-wrap wrap
        height 60px
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
          font-size 12px
          color #CC6561
          padding-left 120px
.required:after
  content '*'
  color #CC6561
  padding-left 6px
</style>
