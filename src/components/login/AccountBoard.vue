<template lang="pug">
form.content(ref='form'
  method='post'
  :action='$gateway.loginAction')
  .hidden-group(v-show='false')
    input(name='redirect' :value='$route.query.redirect')
    input(name='from' :value='$route.query.from')
    input(name='genee_oauth' :value='$route.query.genee_oauth')
  el-input.input(
    v-model='form.username'
    name='username'
    placeholder="用户名")
    img(slot="prepend" width='18' height='18' src='public/image/user.png')
  el-input.input(
    type='password'
    v-model='form.password'
    name='password'
    placeholder="密码")
    img(slot="prepend" width='18' height='18' src='public/image/password.png')
  .text-btn-group
    el-button(type='text' @click='goSign') 注册
    el-button(type='text' @click='goReset') 忘记密码
  el-button.login-button(type="primary" @click='login') 登&nbsp;&nbsp;录
</template>

<script>
import { Input, Button } from 'gapper-element-ui'

export default {
  components: {
    [Input.name]: Input,
    [Button.name]: Button
  },
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    goSign () {
      this.$router.push({ name: 'sign', query: { genee_oauth: this.$route.query.genee_oauth } })
    },
    goReset () {
      this.$router.push({ name: 'reset' })
    },
    login () {
      if (!this.form.username || !this.form.password) {
        this.$message({
          type: 'error',
          message: '请输入用户名或密码'
        })
        return
      }
      this.$refs.form.submit()
    }
  }
}
</script>

<style lang="stylus" scoped>
.content
  display flex
  flex-direction column
  justify-content center
  align-items center
  box-sizing border-box
  padding 0 20%
  .input
    margin-top 30px
    color #dddddd
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
  .text-btn-group
    display flex
    justify-content flex-end
    width 100%
    line-height 20px
    .el-button
      cursor pointer
      float right
      height 16px
      font-size 12px
      color #6D7F89
      &:last-child
        margin-left 18px
      &:hover
        color #5DB8F1
  .login-button
    margin-top 30px
    box-sizing border-box
    padding 0 15px
    width 100%
    height 50px
    line-height 50px
    font-size 14px
    border-radius 25px
</style>
