<template lang="pug">
.info
  .title 注册
  .form
    .form__fieldset 账户信息
      .form__field
        .form__field__name.form__field__name--required
          span 邮箱
        .form__field__text
          el-input(v-model='form.email' name='email' placeholder='邮箱')
        .form__field__tip(v-if='tips.email') {{ tips.email }}
      .form__field
        .form__field__name.form__field__name--required
          span 密码
        .form__field__text
          el-input(type='password' v-model='form.password'
            name='password'
            placeholder='密码')
        .form__field__tip(v-if='tips.password') {{ tips.password }}
      .form__field
        .form__field__name.form__field__name--required
          span 请重复密码
        .form__field__text
          el-input(type='password' v-model='form.repassword'
            name='repassword'
            placeholder='请重复密码')
        .form__field__tip(v-if='tips.repassword') {{ tips.repassword }}
    .form__fieldset 个人信息
      .form__field
        .form__field__name.form__field__name--required
          span 姓名
        .form__field__text
          el-input(v-model='form.name' name='name' placeholder='姓名')
        .form__field__tip(v-if='tips.name') {{ tips.name }}
      .form__field
        .form__field__name.form__field__name--required
          span 联系电话
        .form__field__text
          el-input(v-model='form.phone' name='phone' placeholder='联系电话')
        .form__field__tip(v-if='tips.phone') {{ tips.phone }}
      .form__field
        .form__field__name.form__field__name--required
          span 人员类型
        .form__field__text
          el-cascader(placeholder="选择任意级分组"
            :options="userTypes" :props='typeCascaderProps' 
            filterable
            change-on-select
            @change='changeUserType')
        .form__field__tip(v-if="tips.userType") {{ tips.userType }}
      .form__field
        .form__field__name
          span 学工号
        .form__field__text
          el-input(v-model='form.card' name='card' placeholder='学工号')
        .form__field__tip(v-if='tips.card') {{ tips.card }}
      .form__field
        .form__field__name
          span 组织机构
        .form__field__text
          el-cascader(
            placeholder='所属分组'
            :options='organization' :props='groupCascaderProps'
            clearable
            filterable
            change-on-select
            @change='changeOrganization')
      .form__field
        .form__field__name
          span 课题组
        .form__field__text
          el-cascader(
            :placeholder='form.organization && researchGroup.length === 0 ? "该组织机构下暂无课题组" : "课题组"'
            :options='researchGroup' :props='groupCascaderProps'
            :disabled='researchGroup.length === 0'
            clearable
            filterable
            change-on-select
            @click.native='clickResearchGroup'
            @change='changeResearchGroup')
      .form__field
        .form__field__name
          span 楼宇
        .form__field__text
          el-cascader(
            placeholder='楼宇'
            :options='building' :props='groupCascaderProps'
            clearable
            filterable
            change-on-select
            @change='changeBuilding')
      .form__field
        .form__field__name
          span 房间
        .form__field__text
          el-cascader(
            :placeholder='form.building && room.length === 0 ? "该楼宇下暂无房间" : "房间"'
            :options='room' :props='groupCascaderProps'
            :disabled='room.length === 0'
            clearable
            filterable
            change-on-select
            @click.native='clickRoom'
            @change='changeRoom')
      .form__field
        .form__field__name
          span 有效时间
        .form__field__text
          date-range(
            :startDate='form.validStartDate'
            :endDate='form.validEndDate'
            @changeStartDate='changeStartDate'
            @changeEndDate='changeEndDate'
          )
        .form__field__tip(v-if='tips.validDate') {{ tips.validDate }}
    .form__btn-group
      el-button(type='primary' @click='submit') 提交
</template>

<script>
import { Input, Cascader, Button } from 'gapper-element-ui'
import { parseTree } from '~src/utils/parse-tree'
import Validator from '~src/utils/validator'
import DateRange from '~src/components/common/form/date-range'

const validator = new Validator()

export default {
  components: {
    [Input.name]: Input,
    [Cascader.name]: Cascader,
    [Button.name]: Button,
    DateRange
  },
  async asyncData ({ vue }) {
    let loading = vue.$loading()
    let organizationData = await vue.$gateway.getGroup({ type: 'organization' })
    let organization = parseTree(organizationData || [])
    let buildingData = await vue.$gateway.getGroup({ type: 'building' })
    let building = parseTree(buildingData || [])
    let userTypeData = await vue.$gateway.getUserType()
    let userTypes = parseTree(userTypeData || [], { id: 'key', parent_id: 'parent_key' })
    loading.close()
    return {
      organization,
      building,
      userTypes
    }
  },
  data () {
    return {
      researchGroup: [],
      room: [],
      typeCascaderProps: {
        value: 'key',
        label: 'name',
        children: 'children'
      },
      groupCascaderProps: {
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
        userType: '',
        card: '',
        organization: '',
        researchGroup: '',
        building: '',
        room: '',
        validStartDate: '',
        validEndDate: ''
      },
      tips: {}
    }
  },
  methods: {
    changeUserType (value) {
      this.form.userType = value[value.length - 1]
    },
    async changeOrganization (value) {
      let loading = this.$loading()
      this.form.organization = value[value.length - 1]
      this.form.researchGroup = ''
      let researchGroupData = await this.$gateway.getGroup({ type: 'researchGroup', id: this.form.organization })
      this.researchGroup = researchGroupData || []
      loading.close()
    },
    clickResearchGroup () {
      if (!this.form.organization) {
        this.$message({
          type: 'warning',
          message: '请先选择组织机构'
        })
      }
    },
    changeResearchGroup (value) {
      this.form.researchGroup = value[value.length - 1]
    },
    async changeBuilding (value) {
      let loading = this.$loading()
      this.form.building = value[value.length - 1]
      this.form.room = ''
      let roomData = await this.$gateway.getGroup({ type: 'room', id: this.form.building })
      this.room = roomData || []
      loading.close()
    },
    clickRoom () {
      if (!this.form.building) {
        this.$message({
          type: 'warning',
          message: '请先选择楼宇'
        })
      }
    },
    changeRoom (value) {
      this.form.room = value[value.length - 1]
    },
    changeStartDate (value) {
      this.form.validStartDate = value
    },
    changeEndDate (value) {
      this.form.validEndDate = value
    },
    async submit () {
      let loading = this.$loading()

      let form = Object.assign({}, this.form)
      this.tips = {}
      this.tips.email = validator.validate([
        { value: form.email, type: 'required', message: '请输入邮箱' },
        { value: form.email, type: 'email', message: '请输入正确的邮箱格式' }
      ])
      this.tips.password = validator.validate([
        { value: form.password, type: 'required', message: '请输入密码' }
      ])
      this.tips.repassword = validator.validate([
        { value: form.repassword, type: 'required', message: '请输入密码' },
        { value: form.repassword, type: 'equal', message: '两次输入的密码不一致' }
      ])
      this.tips.name = validator.validate([
        { value: form.name, type: 'required', message: '请输入姓名' }
      ])
      this.tips.card = validator.validate([
        { value: form.card, type: 'required', message: '请输入学工号' }
      ])
      this.tips.phone = validator.validate([
        { value: form.phone, type: 'phone', message: '请输入正确的手机号' }
      ])
      this.tips.userType = validator.validate([
        { value: form.userType, type: 'required', message: '请选择用户类型' }
      ])
      if (form.validStartDate && form.validEndDate) {
        this.tips.validDate = validator.validate([
          // { value: form.validStartDate, type: 'required', message: '请填写有效开始时间' },
          // { value: form.validEndDate, type: 'required', message: '请填写有效结束时间' },
          { value: [form.validStartDate, form.validEndDate], type: 'greaterThan', message: '有效开始时间不能晚于有效结束时间' }
        ])
      }

      let check = Object.values(this.tips).filter(item => !!item).length === 0
      if (check) {
        try {
          await this.$gateway.signup(this.parseForm(form))
          loading.close()
          this.$router.push({ name: 'info', query: { genee_oauth: this.$route.query.genee_oauth } })
        } catch (err) {
          if (err.response.body === 'email already esists') {
            this.$message({
              type: 'error',
              message: '邮箱已经存在'
            })
          } else {
            this.$message({
              type: 'error',
              message: '注册失败'
            })
          }
          loading.close()
        }
      } else {
        this.$message({
          type: 'error',
          message: '提交失败, 请验证是否填写正确'
        })
        loading.close()
      }
    },
    parseForm (form) {
      let result = Object.assign({}, form)
      result.type = result.userType
      delete result.userType
      return result
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
