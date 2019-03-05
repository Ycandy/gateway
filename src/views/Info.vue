<template lang="pug">
.info
  .message(style='margin-top: 30px;') 等待审核,&nbsp;&nbsp;若管理员超过&nbsp;1&nbsp;天还未激活你的账号,&nbsp;&nbsp;请及时联系管理员为你激活账号
  .form-board
    .first-level
      span 个人信息
    .second-level
      .input-title.required 用户名
      .input-title 张三
    .second-level
      .input-title.required 姓名
      .input-title 张三
    .second-level
      .input-title.required 联系电话
      .input-title 张三
    .second-level
      .input-title 性别
      .input-title 张三
    .second-level
      .input-title 人员类型
      .input-title 张三
    .second-level
      .input-title 学工号
      .input-title 张三
    .second-level
      .input-title 组织机构
      .input-title 张三
    .second-level
      .input-title 课题组
      .input-title 张三
    .bottom
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
.bottom
  margin-bottom 40px
</style>
