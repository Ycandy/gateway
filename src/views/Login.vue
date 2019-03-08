<template lang="pug">
.login
  .board
    img.logo(width='175' height='38' src='public/image/gapper.png')
    .types
      .account.type(:class='{ "active": active === "account" }'
        @click='active = "account"')
        .icon-png
        span 账号密码
      .card.type(:class='{ "active": active === "card" }'
        @click='active = "card"')
        .icon-png
        span 一卡通
      //- .wechat.type(:class='{ "active": active === "wechat" }')
      //-   .icon-png
      //-   span 微信
      //- .weibo.type(:class='{ "active": active === "weibo" }')
      //-   .icon-png
      //-   span 微博
      //- .qq.type(:class='{ "active": active === "qq" }')
      //-   .icon-png
      //-   span QQ
    form.form(v-if='active === "account"'
      ref='form'
      method='post'
      :action='$config.app.login')
      .input-group(v-show='false')
        input(
          name='redirect'
          :value='$route.query.redirect')
        input(
          name='from'
          :value='$route.query.from')
        input(
          name='genee_oauth'
          :value='$route.query.genee_oauth')
      .input-group
        el-input.input(
          v-model='form.username'
          name='username'
          placeholder="用户名")
          img(slot="prepend" width='18' height='18' src='public/image/user.png')
      .input-group
        el-input.input(
          type='password'
          v-model='form.password'
          name='password'
          placeholder="密码")
          img(slot="prepend" width='18' height='18' src='public/image/password.png')
        .sign(@click='goSign') 注册
        .reset-password(@click='goReset') 忘记密码
      el-button.login-button(type="primary" @click='login') 登&nbsp;&nbsp;录
  .idea Research Gets Easier
</template>

<script>
export default {
  data () {
    return {
      active: 'account',
      form: {
        username: '',
        password: ''
      }
    }
  },
  mounted () {
  },
  methods: {
    goSign () {
      this.$router.push({ name: 'sign' })
    },
    goReset () {
      this.$router.push({ name: 'reset' })
    },
    login () {
      this.$refs.form.submit()
    }
  }
}
</script>

<style lang="stylus" scoped>
.login
  position relative
  width 100%
  height 100%
  text-align center
  .board
    margin 0 auto
    width 600px
    .logo
      margin 102px auto 38px
    .types
      box-sizing border-box
      padding 0 20px
      display flex
      justify-content space-around
      align-items center
      width 100%
      height 150px
      background #fff
      .type
        cursor pointer
        width 68px
        height 90px
        text-align center
        font-size 14px
        color #999999
        .icon-png
          margin-bottom 12px
          width 68px
          height 68px
      .account
        .icon-png
          background-image url('../../public/image/account.png')
          background-size contain
        &.active, &:hover
          color #5DB8F1
          .icon-png
            background-image url('../../public/image/account-active.png')
      .card
        .icon-png
          background-image url('../../public/image/card.png')
          background-size contain
        &.active, &:hover
          color #F8D280
          .icon-png
            background-image url('../../public/image/card-active.png')
      .wechat
        .icon-png
          background-image url('../../public/image/weixin.png')
          background-size contain
        &.active, &:hover
          color #8ED2A9
          .icon-png
            background-image url('../../public/image/weixin-active.png')
      .weibo
        .icon-png
          background-image url('../../public/image/weibo.png')
          background-size contain
        &.active, &:hover
          color #F4C58F
          .icon-png
            background-image url('../../public/image/weibo-active.png')
      .qq
        .icon-png
          background-image url('../../public/image/qq.png')
          background-size contain
        &.active, &:hover
          color #E67D6D
          .icon-png
            background-image url('../../public/image/qq-active.png')
    .form
      position relative
      box-sizing border-box
      margin-top 12px
      padding 35px 156px 0
      width 100%
      height 292px
      background #fff
      text-align center
      .input-group
        position relative
        .input.el-input
          margin-top 30px
          padding-right 8px
          color #ddd
          & >>> .el-input-group__prepend
            padding 0
            padding-right 20px
            background-color transparent
            border 0
            color #ddd
            font-size 12px
          & >>> input
            border 0
            border-bottom 1px solid #ddd
            border-radius 0
            font-size 12px
            color #6D7F89
        .sign
          cursor pointer
          position absolute
          right 60px
          bottom -24px
          width 24px
          height 16px
          font-size 12px
          color #6D7F89
          &:hover
            color #5DB8F1
        .reset-password
          cursor pointer
          position absolute
          right 0
          bottom -24px
          width 50px
          height 16px
          font-size 12px
          color #6D7F89
          &:hover
            color #5DB8F1
      .login-button
        box-sizing border-box
        margin-top 46px
        padding 0 15px
        width 288px
        height 38px
        line-height 38px
        font-size 14px
        border-radius 19px
  .idea
    margin-left -110px
    position absolute
    left 50%
    bottom 35px
    width 220px
    font-size 16px
    color #C6C6C6
</style>
