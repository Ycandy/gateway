<template lang="pug">
.index
  .page-title
    span 注册
  .form-board
    .first-level
      span 账户信息
    .second-level
      .input-title 用户名
      el-input
    .second-level
      .input-title 密码
      el-input
    .second-level
      .input-title 确认密码
      el-input
</template>

<script>

export default {
}
</script>

<style lang="stylus" scoped>
.index
  width 100%
  height 100%
  display flex
  flex-direction column
  justify-content flex-start
  align-items center
.form-board
  width 50%
  margin-bottom 20px
  background-color #fff
</style>
