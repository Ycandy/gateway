<template lang="pug">
.index
  .page-title
    span 找回密码
  .form-board
    .first-level
      span 请输入您需要找回登录密码账户的邮箱
    .second-level
      .input-title 账户邮箱
      el-input(v-model='mail')
    .second-level
      .input-title 验证码
      el-input(style='width: 200px' v-model='inputCode')
      .id-code(@click='createCode') {{ checkCode }}
      span.error-log(v-if='show') {{ tip }}
    el-button(type='primary' @click='submit') 提交
</template>

<script>

export default {
  data () {
    return {
      mail: '',
      inputCode: '',
      checkCode: '',
      tip: '',
      show: false
    }
  },
  mounted () {
    this.createCode()
  },
  methods: {
    createCode () {
      let codeChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      let i = 4
      this.checkCode = ''
      while (i > 0) {
        // 获取随机验证码下标
        var charNum = Math.floor(Math.random() * 62)
        this.checkCode += codeChars[charNum]
        i--
      }
    },
    submit () {
      this.tip = ''
      this.show = false
      if (!this.inputCode) {
        this.tip = '请输入验证码'
        this.show = true
        return false
      }
      if (this.inputCode.toUpperCase() !== this.checkCode.toUpperCase()) {
        this.tip = '输入验证码错误'
        this.show = true
        this.createCode()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.id-code
  width 100px
  height 30px
  margin 8px 20px
.id-code
  font-family Arial
  font-style italic
  letter-spacing 4px
  font-weight bolder
  background-color grey
  color #ffffff
  cursor pointer
  font-size 14px
  line-height 30px
  text-align center
.el-button
  margin-top 20px
</style>
