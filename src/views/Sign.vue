<template lang="pug">
.info
  .page-title
    span 注册
  .form-board
    .first-level
      span 账户信息
    .second-level
      .input-title.required 邮箱
      el-input(v-model='form.email' name='email' placeholder='邮箱')
    .tips(v-if='tips.email')
      span {{ tips.email }}
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
    .first-level
      span 个人信息
    .second-level
      .input-title.required 姓名
      el-input(v-model='form.name' name='name' placeholder='姓名')
    .tips(v-if='tips.name')
      span {{ tips.name }}
    .second-level
      .input-title 联系电话
      el-input(v-model='form.phone' name='phone' placeholder='联系电话')
    .tips(v-if='tips.phone')
      span {{ tips.phone }}
    .second-level
      .input-title.required 人员类型
      el-select(v-model='form.type'
        name='type'
        placeholder='用户类型')
        el-option-group(v-for='category in userTypes' :key='category.label'
          :value='category.label'
          :label='category.label')
          el-option(v-for='option in category.options'
            :key='option.value'
            :label='option.label'
            :value='option.value')
    .tips(v-if='tips.type')
      span {{ tips.type }}
    .second-level
      .input-title 学工号
      el-input(v-model='form.card' name='card' placeholder='学工号')
    .tips(v-if='tips.card')
      span {{ tips.card }}
    .second-level
      .input-title 组织机构
      el-cascader(
        v-model='cascader.organization'
        name='organization'
        placeholder='所属分组'
        :options='organization'
        :props='cascaderProps'
        clearable
        filterable
        change-on-select
        @change='changeOrganization')
      input(type='hidden' name='organization' v-model='form.organization')
    .second-level
      .input-title 课题组
      el-cascader(
        v-model='cascader.researchGroup'
        name='researchGroup'
        placeholder='课题组'
        :options='researchGroup'
        :props='cascaderProps'
        clearable
        filterable
        change-on-select)
      input(type='hidden' name='researchGroup' v-model='form.researchGroup')
    .second-level
      .input-title 楼宇
      el-cascader(
        v-model='cascader.building'
        name='building'
        placeholder='楼宇'
        :options='building'
        :props='cascaderProps'
        clearable
        filterable
        change-on-select
        @change='changeBuilding')
      input(type='hidden' name='building' v-model='form.building')
    .second-level
      .input-title 房间
      el-cascader(
        v-model='cascader.room'
        name='room'
        placeholder='房间'
        :options='room'
        :props='cascaderProps'
        clearable
        filterable
        change-on-select)
      input(type='hidden' name='room' v-model='form.room')
    .second-level
      .input-title 有效时间
      el-date-picker(
        style='width: 45%;'
        v-model='form.validStartDate'
        name='validStartDate'
        type="date"
        placeholder="开始日期"
        value-format='yyyy-MM-dd'
        editable
      )
      span.date-separator 至
      el-date-picker(
        style='width: 45%;'
        v-model='form.validEndDate'
        name='validEndDate'
        type="date"
        placeholder="结束时间"
        value-format='yyyy-MM-dd'
        editable
      )
    .button-line
      el-button(type='primary' @click='submit') 提交
</template>

<script>
export default {
  data () {
    return {
      organization: [],
      researchGroup: [],
      building: [],
      room: [],
      cascader: {
        organization: [],
        researchGroup: [],
        building: [],
        room: []
      },
      cascaderProps: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      form: {
        email: '',
        password: '',
        repassword: '',
        name: '',
        phone: '',
        type: '',
        card: '',
        validStartDate: '',
        validEndDate: ''
      },
      userTypes: [{
        label: '学生',
        options: [{
          value: 'undergraduate',
          label: '本科生'
        }, {
          value: 'postgraduate',
          label: '硕士研究生'
        }, {
          value: 'doctoralCandidate',
          label: '博士研究生'
        }]
      }, {
        label: '教师',
        options: [{
          value: 'PI',
          label: '课题负责人'
        }, {
          value: 'researchAssistant',
          label: '科研助理'
        }, {
          value: 'researchConservator',
          label: 'PI助理/实验室管理员'
        }]
      }, {
        label: '其他',
        options: [{
          value: 'technician',
          label: '技术员'
        }, {
          value: 'postdoctor',
          label: '博士后'
        }, {
          value: 'other',
          label: '其他'
        }]
      }],
      tips: {
        email: '',
        password: '',
        repassword: '',
        name: '',
        phone: '',
        type: '',
        card: ''
      }
    }
  },
  async mounted () {
    let loading = this.$loading()
    let organizationResult = await this.$axios.get(`${this.$config.app.getOrganization}?type=organization`)
    this.organization = this.parseOrganization(organizationResult.data || [])
    let buildingResult = await this.$axios.get(`${this.$config.app.getOrganization}?type=building`)
    this.building = this.parseOrganization(buildingResult.data || [])
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

      let keys = Object.keys(parent).map(item => Number(item))
      let minKey = Math.min(...keys)
      return Object.values(parent[minKey]).map(item => {
        return {
          id: item.id,
          name: item.name,
          children: this.pushOrganizationChildren(item.id, parent)
        }
      })
    },
    pushOrganizationChildren (key, parent) {
      if (!parent[key]) return
      let result = Object.values(parent[key])
      result.forEach(item => {
        if (Reflect.has(parent, item.id)) {
          item.children = this.pushOrganizationChildren(item.id, parent)
        }
      })
      return result
    },
    async changeOrganization (value) {
      let loading = this.$loading()
      this.cascader.researchGroup = []
      let organization = value[value.length - 1]
      let researchGroupResult =
        await this.$axios.get(`${this.$config.app.getOrganization}?type=researchGroup&id=${organization}`)
      this.researchGroup = researchGroupResult.data || []
      loading.close()
    },
    async changeBuilding (value) {
      let loading = this.$loading()
      this.cascader.room = []
      let building = value[value.length - 1]
      let roomResult =
        await this.$axios.get(`${this.$config.app.getOrganization}?type=room&id=${building}`)
      this.room = roomResult.data || []
      loading.close()
    },
    submit () {
      let check = true

      let form = this.form
      let tips = this.tips

      if (!form.email) {
        tips.email = '请输入邮箱'
        check = false
      } else if (!/^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]*\.)+[A-Za-z]{2,14}$/.test(form.email)) {
        tips.email = '请输入正确的邮箱格式'
        check = false
      } else {
        tips.email = ''
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

      if (!form.name) {
        tips.name = '请输入姓名'
        check = false
      } else {
        tips.name = ''
      }

      if (form.phone && !/^1(3|4|5|7|8)\d{9}$/.test(form.phone)) {
        tips.phone = '请输入正确的手机号'
        check = false
      } else {
        tips.phone = ''
      }

      if (!form.type) {
        tips.type = '请选择用户类型'
        check = false
      } else {
        tips.type = ''
      }

      if (form.validStartDate && !form.validEndDate) {
        tips.type = '请填写有效结束时间'
        check = false
      } else if (!form.validStartDate && form.validEndDate) {
        tips.type = '请填写有效开始时间'
        check = false
      } else if (form.validStartDate && form.validEndDate && form.validStartDate > form.validEndDate) {
        tips.type = '有效开始时间不能晚于有效结束时间'
        check = false
      } else {
        tips.type = ''
      }

      let group = Object.values(this.cascader).filter(item => item.length > 0).map(item => item[item.length - 1])
      form.group = group

      if (check) {
        this.$axios.post(this.$config.app.sign, form)
          .then(res => {
            this.$router.push({ name: 'info', query: { genee_oauth: this.$route.query.genee_oauth } })
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
