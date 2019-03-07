<template lang="pug">
.info
  .page-title
    span 注册
  .form-board
    .first-level
      span 基本信息
    template(v-for='field in basicFields')
      .second-level
        .input-title(:class='{ "required": field.required }') {{ field.name }}
        el-input(v-if='field.key === "password" || field.key === "repassword"'
          type='password'
          v-model='field.value'
          :name='field.key')
        el-input(v-else-if='field.type === 0'
          v-model='field.value'
          :name='field.key')
        el-select(v-else-if='field.type === 1'
          v-model='field.value'
          :name='field.key')
          el-option(v-for='option,dex in field.select'
            :key='dex'
            :label='option'
            :value='dex')
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
      basicFields: []
    }
  },
  async mounted () {
    let loading = this.$loading()
    let result = await this.$axios.get(this.$config.app.getParams)
    this.basicFields = result.data.basic
    loading.close()
  },
  methods: {
    submit () {
      let params = {}
      let check = true
      this.basicFields.forEach(field => {
        if (!this.checkField(field)) check = false
        params[field.key] = field.value
      })

      if (check) {
        this.$axios.post(this.$config.app.sign, params)
          .then(res => {
            this.$router.push({ name: 'info' })
          })
          .catch(err => {
            if (err.response.body === 'email already esists') {
              this.$message({
                type: 'error',
                message: '邮箱已经存在'
              })
            }
          })
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
        case 'repassword':
          let passwordField = this.basicFields.find(field => field.key === 'password')
          if (field.value !== passwordField.value) {
            this.$set(field, 'tips', '两次密码输入不一致')
            return false
          }
          return true
      }
      this.$set(field, 'tips', '')
      return true
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
