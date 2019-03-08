<template lang="pug">
.info
  .page-title
    span 注册
  .form-board
    .first-level
      span 基本信息
    .second-level
      .input-title.required 姓名
      el-input(v-model='form.name' name='name' placeholder='姓名')
    .tips(v-if='tips.name')
      span {{ tips.name }}
    .second-level
      .input-title.required 邮箱
      el-input(v-model='form.email' name='email' placeholder='邮箱')
    .tips(v-if='tips.email')
      span {{ tips.email }}
    .second-level
      .input-title.required 用户类型
      el-select(v-model='form.type'
        name='type'
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
    .tips(v-if='tips.type')
      span {{ tips.type }}
    .second-level
      .input-title.required 密码
      el-input(v-model='form.password'
        type='password'
        name='password'
        placeholder='密码')
    .tips(v-if='tips.password')
      span {{ tips.password }}
    .second-level
      .input-title.required 请重复密码
      el-input(v-model='form.repassword'
        type='password'
        name='repassword'
        placeholder='请重复密码')
    .tips(v-if='tips.repassword')
      span {{ tips.repassword }}
    .second-level
      .input-title.required 组织机构
      el-cascader(
        ref='cascader'
        v-model='form.organization'
        name='organization'
        placeholder='组织机构'
        :options='organization'
        :props='cascaderProps'
        :show-all-levels='false')
      .tips(v-if='tips.lab') {{ tips.lab }}
    .button-line
      el-button(type='primary' @click='submit') 提交
</template>

<script>

export default {
  data () {
    return {
      organization: [],
      cascaderProps: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      form: {
        name: '',
        email: '',
        type: '',
        password: '',
        repassword: '',
        organization: []
      },
      tips: {
        name: '',
        email: '',
        type: '',
        password: '',
        repassword: ''
      }
    }
  },
  async mounted () {
    let loading = this.$loading()
    let result = await this.$axios.get(this.$config.app.getOrganization)
    this.organization = this.parseOrganization(result.data)
    loading.close()
  },
  methods: {
    async handleItemChange (path) {
      let item = { children: this.organization }
      path.forEach(index => {
        item = item.children[index]
      })
      if (item.children.length === 0) {
        let result = await this.$axios.get(`${this.$config.app.getOrganization}/${item.id}`)
        this.$set(item, 'children', this.parseOrganization(result.data))
      }
    },
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
    submit () {
      let check = true

      let form = this.form
      let tips = this.tips

      if (!form.name) {
        tips.name = '请输入姓名'
        check = false
      } else {
        tips.name = ''
      }

      if (!form.email) {
        tips.email = '请输入邮箱'
        check = false
      } else if (!/^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]*\.)+[A-Za-z]{2,14}$/.test(form.email)) {
        tips.email = '请输入正确的邮箱格式'
        check = false
      } else {
        tips.email = ''
      }

      if (!form.type) {
        tips.type = '请选择用户类型'
        check = false
      } else {
        tips.type = ''
      }

      if (!form.password) {
        tips.password = '请输入密码'
        check = false
      } else {
        tips.password = ''
      }

      if (!form.repassword) {
        tips.repassword = '请输入密码'
        check = false
      } else if (form.password !== form.repassword) {
        tips.repassword = '两次输入的密码不一致'
        check = false
      } else {
        tips.repassword = ''
      }

      if (check) {
        this.$axios.post(this.$config.app.sign, form)
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
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
