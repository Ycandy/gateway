<template lang="pug">
.login
  el-button.sign(type="primary") 注册
  .board
    .logo
      span GAPPER
    .types
      .account.type
        .circle
        span 账号密码
      .id-card.type
        .circle
        span 一卡通
      .wechat.type
        .circle
        span 微信
      .weibo.type
        .circle
        span 微博
      .qq.type
        .circle
        span QQ
    .form
      .title 账号密码登录
      el-input.input(
        v-model='username'
        placeholder="用户名"
      )
        i.icon.el-icon-service(slot="prepend")
      el-input.input(
        v-model='password'
        placeholder="密码"
      )
        i.icon.el-icon-service(slot="prepend")
      el-button.login-button(type="primary") 登&nbsp;&nbsp;录
  .idea Research Gets Easier
</template>

<script>

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.login
  display flex
  flex-direction column
  position relative
  width 100%
  height 100%
  .sign
    position absolute
    top 20px
    right 40px
    padding 0 20px
    width 80px
    height 26px
    line-height 26px
    font-size 12px
    border-radius 12px
  .board
    flex 1
    display flex
    flex-direction column
    margin 0 auto
    width 600px
    .logo
      margin-top 100px
      color #5db8f1
      font-size 28px
      text-align center
    .types
      box-sizing border-box
      padding 0 20px
      display flex
      justify-content space-around
      align-items center
      margin-top 20px
      width 100%
      height 150px
      background #fff
      .type
        width 80px
        height 100px
        text-align center
        font-size 12px
        color #aaa
        .circle
          margin-bottom 8px
          width 80px
          height 80px
          border-radius 40px
      .account .circle
        border 1px solid #5db8f1
      .id-card .circle
        border 1px solid #5db8f1
      .wechat .circle
        border 1px solid #5db8f1
      .weibo .circle
        border 1px solid #5db8f1
      .qq .circle
        border 1px solid #5db8f1
    .form
      box-sizing border-box
      padding 30px 150px
      margin-top 20px
      width 100%
      height 300px
      background #fff
      text-align center
      .title
        color #5db8f1
      .input.el-input
        padding-right 10px
        margin-top 25px
        color #ddd
        & >>> .el-input-group__prepend
          padding 0
          padding-right 10px
          background-color transparent
          border 0
          color #ddd
          font-size 16px
        & >>> input
          border 0
          border-bottom 1px solid #ddd
          border-radius 0
      .login-button
        box-sizing border-box
        margin-top 30px
        padding 0 20px
        width 280px
        height 30px
        line-height 30px
        font-size 14px
        border-radius 15px
  .idea
    width 100%
    height 80px
    line-height 80px
    font-weight bold
    color #ccc
    text-align center
</style>
