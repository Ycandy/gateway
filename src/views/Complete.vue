<template lang="pug">
.info
  .page-title
    span 补全用户信息
  .message(ref='message')
    span 你好!&nbsp;&nbsp;您是首次登录,&nbsp;&nbsp;请首先补全信息
    i.el-icon-close(style='cursor: pointer;margin-left: 20px;' @click='closeMessage')
  form.form-board(
    v-if='load'
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
      span 账号信息
    .second-level
      .input-title.required 邮箱
      el-input(
        v-model='basicFields.email.value'
        name='email')
    .tips(v-if='basicFields.email.tips')
      span {{ basicFields.email.tips }}
    .first-level
      span 个人信息
    .second-level
      .input-title.required 姓名
      el-input(v-model='basicFields.name.value' name='name' placeholder='姓名')
    .tips(v-if='basicFields.name.tips')
      span {{ basicFields.name.tips }}
    .second-level
      .input-title 联系电话
      el-input(v-model='basicFields.phone.value' name='phone' placeholder='联系电话')
    .tips(v-if='basicFields.phone.tips')
      span {{ basicFields.phone.tips }}
    .second-level
      .input-title.required 人员类型
      el-select(v-model='basicFields.type.value'
        placeholder='用户类型')
        el-option(
          value='student'
          label='学生'
        )
        el-option(
          value='teacher'
          label='教师'
        )
        el-option(
          value='other'
          label='校外用户'
        )
      input(type='hidden' v-model='basicFields.type.value' name='type')
    .tips(v-if='basicFields.type.tips')
      span {{ basicFields.type.tips }}
    .second-level
      .input-title 学工号
      el-input(v-model='basicFields.ref_no.value' name='ref_no' placeholder='学工号')
    .tips(v-if='basicFields.ref_no.tips')
      span {{ basicFields.ref_no.tips }}
    .second-level
      .input-title 所属分组
      el-cascader(
        ref='cascader'
        v-model='basicFields.group.path'
        name='group'
        placeholder='所属分组'
        :options='organization'
        :props='cascaderProps'
        clearable
        filterable
        change-on-select
        @change='changeGroup')
      input(type='hidden' name='group' v-model='basicFields.group.value')
    .tips(v-if='basicFields.group.tips') {{ basicFields.group.tips }}
    .first-level
      span 其他信息
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
    .button-line
      el-button(type='primary' @click='submit' class='submit') 提交
</template>

<script>
export default {
  data () {
    return {
      basicFields: {},
      extendFields: [],
      cascaderProps: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      load: false
    }
  },
  async mounted () {
    let loading = this.$loading()
    let organizationResult = await this.$axios.get(this.$config.app.getOrganization)
    this.organization = this.parseOrganization(organizationResult.data)
    let paramsResult = await this.$axios.get(this.$config.app.getParams)
    let basicFields = {}
    paramsResult.data.basic.forEach(item => {
      if (item.key === 'group') {
        let path = []
        if (item.value) {
          let cur = organizationResult.data.find(group => group.id === item.value)
          path = [cur.id]
          while (cur.parent_id) {
            cur = organizationResult.data.find(group => group.id === cur.parent_id)
            path.splice(0, 0, cur.id)
          }
        }
        item.path = path
      }
      Reflect.set(basicFields, item.key, item)
    })
    this.basicFields = basicFields
    this.extendFields = paramsResult.data.extend
    this.load = true
    loading.close()
  },
  methods: {
    parseOrganization (organization) {
      let parent = {}
      organization.forEach(item => {
        if (!Reflect.has(parent, item.parent_id)) {
          Reflect.set(parent, item.parent_id, {})
        }
        Reflect.set(parent[item.parent_id], item.id, item)
      })

      let key = Object.values(parent.null)[0].id
      return this.pushOrganizationChildren(key, parent)
    },
    pushOrganizationChildren (key, parent) {
      let result = Object.values(parent[key])
      result.forEach(item => {
        if (Reflect.has(parent, item.id)) {
          item.children = this.pushOrganizationChildren(item.id, parent)
        }
      })
      return result
    },
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
    changeGroup (value) {
      this.basicFields.group.value = value[value.length - 1]
    },
    submit () {
      let check = true
      Object.values(this.basicFields).forEach(field => {
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
