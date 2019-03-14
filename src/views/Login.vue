<template lang="pug">
.login
  .board(:style='{"height" : baseXp * 42 + "px", "width" : baseXp * 80 + "px"}')
    .types(:style='{"height" : baseXp * 20 + "px", "width" : baseXp * 80 + "px"}')
      .account.type(:class='{ "active": active === "account" }'
        @click='active = "account"')
        .icon-png
        span 校外用户
      .card.type(:class='{ "active": active === "card" }'
        @click='active = "card"')
        .icon-png
        span 校内用户
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
      :style='{"height" : baseXp * 39 + "px", "width" : baseXp * 80 + "px"}'
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
      .tip-btn
        .reset-password(@click='goReset') 忘记密码
        .sign(@click='goSign') 注册
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
      },
      baseXp: ''
    }
  },
  mounted () {
    this.baseXp = document.body.clientHeight / 1080 * 10
  },
  methods: {
    goSign () {
      this.$router.push({ name: 'sign', query: { genee_oauth: this.$route.query.genee_oauth } })
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
    position absolute
    top 0
    right 0
    left 0
    bottom 0
    margin auto
    min-width 800px
    min-height 608px
    display flex
    flex-direction column
    justify-content space-between
    .logo
      margin 102px auto 38px
    .types
      box-sizing border-box
      padding 0 20px
      display flex
      justify-content space-around
      align-items center
      min-width 800px
      min-height 200px
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
      margin-top 18px
      padding 0 20%
      min-width 800px
      min-height 390px
      background #fff
      text-align center
      display flex
      flex-direction column
      justify-content center
      align-items center
      .input-group
        width 100%
        // position relative
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
      .tip-btn
        width 100%
        height 50px
        line-height 20px
        .sign, .reset-password
          cursor pointer
          float right
          height 16px
          font-size 12px
          color #6D7F89
          &:hover
            color #5DB8F1
        .sign
          margin-right 18px
      .login-button
        box-sizing border-box
        padding 0 15px
        width 100%
        height 50px
        line-height 50px
        font-size 14px
        border-radius 25px
  .idea
    margin 0 auto
    position absolute
    bottom 42px
    width 100%
    font-size 16px
    color #C6C6C6
</style>
