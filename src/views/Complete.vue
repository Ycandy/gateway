<template lang="pug">
.info
  .page-title
    span 补全用户信息
  .message(ref='message')
    span 你好!&nbsp;&nbsp;您是首次登录,&nbsp;&nbsp;请首先补全信息
    i.el-icon-close(style='cursor: pointer;margin-left: 20px;' @click='closeMessage')
  form.form-board(
    ref='form'
    method='post'
    :action='$config.app.complete')
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
    .first-level
      span 基本信息
    template(v-for='field in basicFields')
      .second-level
        .input-title(:class='{ "required": field.required }') {{ field.name }}
        el-input(v-if='field.type === 0'
          v-model='field.value'
          :name='field.key')
        el-select(v-else-if='field.type === 1'
          v-model='field.value'
          :name='field.key')
          el-option(v-for='option in field.select'
            :key='option'
            :label='option'
            :value='option')
        el-input(v-else-if='field.type === 2'
          type='number'
          v-model='field.value'
          :name='field.key')
      .tips(v-if='field.tips')
        span {{ field.tips }}
    .first-level
      span 自定义字段
    template(v-for='field in extendFields')
      .second-level
        .input-title(:class='{ "required": field.required }') {{ field.name }}
        el-input(v-if='field.type === 0'
          v-model='field.value'
          :name='field.key')
        el-select(v-else-if='field.type === 1'
          v-model='field.value'
          :name='field.key')
          el-option(v-for='option in field.select'
            :key='option'
            :label='option'
            :value='option')
        el-input(v-else-if='field.type === 2'
          type='number'
          v-model='field.value'
          :name='field.key')
      .tips(v-if='field.tips')
        span {{ field.tips }}
    el-button(type='primary' @click='submit') 提交
</template>

<script>
export default {
  data () {
    return {
      basicFields: [],
      extendFields: []
    }
  },
  async mounted () {
    let loading = this.$loading()
    let result = await this.$axios.get(this.$config.app.getParams)
    this.basicFields = result.data.basic
    this.extendFields = result.data.extend
    loading.close()
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
    },
    submit () {
      let check = true
      this.basicFields.forEach(field => {
        if (!this.checkField(field)) check = false
      })
      this.extendFields.forEach(field => {
        if (!this.checkField(field)) check = false
      })

      if (check) {
        this.$refs.form.submit()
      } else {
        this.$message({
          type: 'error',
          message: '提交失败, 请验证是否填写正确'
        })
      }
    },
    checkField (field) {
      // 验证必填
      if (field.required && field.value === '') {
        this.$set(field, 'tips', '请填写字段')
        return false
      }
      // 特殊字段验证
      switch (field.key) {
        // 验证邮箱
        case 'email':
          let emailCheck = !field.value || /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]*\.)+[A-Za-z]{2,14}$/.test(field.value)
          if (!emailCheck) this.$set(field, 'tips', '请输入正确的邮箱')
          return emailCheck
        case 'phone':
          let phoneCheck = !field.value || /^1[34578]\d{9}$/.test(field.value)
          if (!phoneCheck) this.$set(field, 'tips', '请输入正确的手机号码')
          return phoneCheck
      }
      this.$set(field, 'tips', '')
      return true
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
