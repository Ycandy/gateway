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
    .first-level
      span 不同的输入
    .second-level
      .input-title text输入
      el-input
    .second-level
      .input-title select
      el-select(v-model='select')
        el-option(v-for='i in 5' :value='i' :key='i')
    .second-level
      .input-title select
      el-radio-group(v-model='radio')
        el-radio(label='male') 男
        el-radio(label='female') 女
    el-button(type='primary') 提交
</template>

<script>

export default {
  data () {
    return {
      input: '',
      select: '',
      radio: ''
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
