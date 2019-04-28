<template lang="pug">
.info
  .title
    span 补全用户信息
  message(:message='$route.query.message || ""')
  .form
    .form__fieldset
      .form__fieldset__title 账号信息
      .form__fieldset__btn
        el-button(type='primary' @click='logout') 登出
      .form__field
        .form__field__name.form__field__name--required
          span 邮箱
        .form__field__text
          el-input(v-model='form.email' name='email' disabled)
        .form__field__tip(v-if='tips.email') {{ tips.email }}
    .form__fieldset
      .form__fieldset__title 个人信息
      .form__field
        .form__field__name.form__field__name--required
          span 姓名
        .form__field__text
          el-input(v-model='form.name' name='name' placeholder='姓名' disabled)
        .form__field__tip(v-if='tips.name') {{ tips.name }}
      .form__field
        .form__field__name
          span 联系电话
        .form__field__text
          el-input(v-model='form.phone' name='phone' placeholder='联系电话')
        .form__field__tip(v-if='tips.phone') {{ tips.phone }}
      .form__field
        .form__field__name.form__field__name--required
          span 用户类型12312313123
        .form__field__text
          el-input(v-model='form.type' name='type' placeholder='用户类型' disabled)
        .form__field__tip(v-if='tips.type') {{ tips.type }}
      .form__field
        .form__field__name
          span 学工号
        .form__field__text
          el-input(v-model='form.ref_no' name='ref_no' placeholder='学工号')
        .form__field__tip(v-if='tips.ref_no') {{ tips.ref_no }}
      .form__field
        .form__field__name
          span 组织机构
        .form__field__text
          el-cascader(
            :value='cascaderInitValue.organization'
            placeholder='组织机构'
            :options='organization'
            :props='groupCascaderProps'
            clearable
            filterable
            change-on-select
            @change='changeOrganization')
          input(type='hidden' name='organization' v-model='form.organization')
      .form__field
        .form__field__name
          span 课题组
        .form__field__text
          el-cascader(
            :value='cascaderInitValue.researchGroup'
            :placeholder='form.organization && researchGroup.length === 0 ? "该组织机构下暂无课题组" : "课题组"'
            :options='researchGroup'
            :props='groupCascaderProps'
            clearable
            filterable
            change-on-select
            :disabled='researchGroup.length === 0'
            @click.native='clickResearchGroup'
            @change='changeResearchGroup')
          input(type='hidden' name='researchGroup' v-model='form.researchGroup')
      .form__field
        .form__field__name
          span 楼宇
        .form__field__text
          el-cascader(
            :value='cascaderInitValue.building'
            placeholder='楼宇'
            :options='building'
            :props='groupCascaderProps'
            clearable
            filterable
            change-on-select
            @change='changeBuilding')
          input(type='hidden' name='building' v-model='form.building')    
      .form__field
        .form__field__name
          span 房间
        .form__field__text
          el-cascader(
            :value='cascaderInitValue.room'
            :placeholder='form.building && room.length === 0 ? "该楼宇下暂无房间" : "房间"'
            :options='room'
            :props='groupCascaderProps'
            clearable
            filterable
            change-on-select
            :disabled='room.length === 0'
            @click.native='clickRoom'
            @change='changeRoom')
          input(type='hidden' name='room' v-model='form.room')    
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
    .form__btn-group
      el-button.submit-btn(type='primary' @click='submit') 提交
</template>

<script>
import { Input, Cascader, DatePicker, Button } from 'gapper-element-ui'
import Message from '~src/components/common/message.vue'
import DateRange from '~src/components/common/form/date-range'
import { parseTree } from '~src/utils/parse-tree'
import Validator from '~src/utils/validator'

const validator = new Validator()

const parseForm = paramsData => {
  let form = {}
  paramsData.basic.forEach(item => {
    switch (item.key) {
      case 'type':
        Reflect.set(form, item.key, item.value.name.split('/').pop())
        break
      default:
        Reflect.set(form, item.key, item.value)
    }
  })
  return form
}

// TODO 针对后台传的字段
// 1. 出现空对象的情况修正为空字符串
// 2. 出现选择课题组但是没有组织机构的情况，清除选择的课题组
// 3. 楼宇和房间的情况类比情况2
const reviseForm = form => {
  let result = Object.assign({}, form)
  Object.keys(result).forEach(key => {
    let valueType = typeof Reflect.get(result, key)
    if (valueType !== 'string' && valueType !== 'number') {
      Reflect.set(result, key, '')
    }
  })
  if (!form.organization && form.researchGroup) {
    form.researchGroup = ''
  }
  if (!form.building && form.room) {
    form.room = ''
  }
  return result
}

const findCascaderPath = (value, data, rootIds) => {
  let result = [value]
  let current = data.find(item => item.id === value.parent_id)
  while (current && !rootIds.includes(value.id)) {
    result.push(current)
    current = data.find(item => item.id === current.parent_id)
  }
  return result.reverse().map(item => item.id)
}

export default {
  components: {
    [DatePicker.name]: DatePicker,
    [Input.name]: Input,
    [Cascader.name]: Cascader,
    [Button.name]: Button,
    Message,
    DateRange
  },
  async asyncData ({ vue }) {
    let loading = vue.$loading()

    let organizationData = await vue.$gateway.getGroup({ type: 'organization' })
    let organization = parseTree(organizationData || [])
    let researchGroup = []
    let buildingData = await vue.$gateway.getGroup({ type: 'building' })
    let building = parseTree(buildingData || [])
    let room = []
    let paramsData = await vue.$gateway.getUserField()
    let form = reviseForm(parseForm(paramsData))

    // 将组织机构类的值处理成为符合级联选择器指定的值
    let cascaderInitValue = {
      organization: [],
      researchGroup: [],
      building: [],
      room: []
    }

    form.organization = '2446'
    form.researchGroup = '2606'

    // 查询当前的组织机构和课题组, 如果当前选中的组织机构和课题组不存在, 则清空组织机构和课题组
    let curOrganization = organizationData.find(item => item.id === form.organization)
    if (curOrganization) {
      cascaderInitValue.organization = findCascaderPath(
        curOrganization,
        organizationData,
        organization.map(item => item.id)
      )
      // 根据选定的组织机构, 去寻找课题组, 如果该组织机构下没有对应的课题组, 清空课题组
      researchGroup = await vue.$gateway.getGroup({ type: 'researchGroup', id: form.organization }) || []
      if (researchGroup.find(item => item.id === form.researchGroup)) {
        cascaderInitValue.researchGroup = [form.researchGroup]
      } else {
        form.researchGroup = ''
      }
    } else {
      form.organization = ''
      form.researchGroup = ''
    }

    // 楼宇和房间的处理方式, 同组织机构和课题组
    let curBuilding = buildingData.find(item => item.id === form.building)
    if (curBuilding) {
      cascaderInitValue.building = findCascaderPath(
        curBuilding,
        buildingData,
        building.map(item => item.id)
      )

      room = await vue.$gateway.getGroup({ type: 'room', id: form.building }) || []
      if (room.find(item => item.id === form.room)) {
        cascaderInitValue.room = [form.room]
      } else {
        form.room = ''
      }
    } else {
      form.building = ''
      form.room = ''
    }

    loading.close()
    return {
      organization,
      building,
      extendParams: paramsData.extend,
      form,
      cascaderInitValue,
      researchGroup,
      room
    }
  },
  data () {
    return {
      groupCascaderProps: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      tips: {}
    }
  },
  methods: {
    logout () {
      window.location.href = this.$gateway.logoutUrl
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
      this.tips.phone = validator.validate([
        { value: form.phone, type: 'phone', message: '请输入正确的手机号' }
      ])
      if (form.validStartDate && form.validEndDate) {
        this.tips.validDate = validator.validate([
          { value: [form.validStartDate, form.validEndDate], type: 'greaterThan', message: '有效开始时间不能晚于有效结束时间' }
        ])
      }

      let check = Object.values(this.tips).filter(item => !!item).length === 0
      if (check) {
        loading.close()
        await this.$gateway.setUser(form)
        window.location.href = document.referrer
      } else {
        this.$message({
          type: 'error',
          message: '提交失败, 请验证是否填写正确'
        })
        loading.close()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.info >>> .el-input__prefix
  padding-left 0
</style>
