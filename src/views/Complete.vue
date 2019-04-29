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
    :action='completeAction')
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
        name='email'
        )
    .tips(v-if='basicFields.email.tips')
      span {{ basicFields.email.tips }}
    .first-level
      span 个人信息
    .second-level
      .input-title.required 姓名
      el-input(v-model='basicFields.name.value' name='name' placeholder='姓名' disabled)
    .tips(v-if='basicFields.name.tips')
      span {{ basicFields.name.tips }}
    .second-level
      .input-title 联系电话
      el-input(v-model='basicFields.phone.value' name='phone' placeholder='联系电话')
    .tips(v-if='basicFields.phone.tips')
      span {{ basicFields.phone.tips }}
    .second-level
      .input-title.required 用户类型
      el-input(v-model='basicFields.type.value.name' name='type' placeholder='用户类型' disabled)
    .tips(v-if='basicFields.type.tips')
      span {{ basicFields.type.tips }}
    .second-level
      .input-title 学工号
      el-input(v-model='basicFields.ref_no.value' name='ref_no' placeholder='学工号')
    .tips(v-if='basicFields.ref_no.tips')
      span {{ basicFields.ref_no.tips }}
    .second-level
      .input-title 组织机构
      el-cascader(
        v-model='cascader.organization'
        name='organization'
        placeholder='组织机构'
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
        :placeholder='cascader.organization.length !== 0 && researchGroup.length === 0 ? "该组织机构下暂无课题组" : "课题组"'
        :options='researchGroup'
        :props='cascaderProps'
        clearable
        filterable
        change-on-select
        :disabled='researchGroup.length === 0'
        @click.native='clickResearchGroup')
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
        :placeholder='cascader.building.length !== 0 && room.length === 0 ? "该楼宇下暂无房间" : "房间"'
        :options='room'
        :props='cascaderProps'
        clearable
        filterable
        change-on-select
        :disabled='room.length === 0'
        @click.native='clickRoom')
      input(type='hidden' name='room' v-model='form.room')    
    .second-level
      .input-title 有效时间
      el-date-picker(
        style='width: 45%;'
        v-model='basicFields.validStartDate.value'
        name='validStartDate'
        type="date"
        placeholder="开始日期"
        value-format='yyyy-MM-dd'
        disabled
      )
      span.date-separator 至
      el-date-picker(
        style='width: 45%;'
        v-model='basicFields.validEndDate.value'
        name='validEndDate'
        type="date"
        placeholder="结束时间"
        value-format='yyyy-MM-dd'
        disabled
      )
    .first-level
      span 其他信息
    template(v-for='field in extendFields')
      .second-level
        .input-title(:class='{ "required": field.required }') {{ field.name }}
        el-input(v-if='field.type === 0'
          v-model='field.value'
          :name='field.key')
        template(v-else-if='field.type === 1')
          el-select(
            v-model='field.value'
            :name='field.key')
            el-option(v-for='option in field.select'
              :key='option'
              :label='option'
              :value='option')
          input(type='hidden' v-model='field.value' :name='field.key')
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
import { Input, Cascader, DatePicker, Button } from 'gapper-element-ui'

export default {
  components: {
    [DatePicker.name]: DatePicker,
    [Input.name]: Input,
    [Cascader.name]: Cascader,
    [Button.name]: Button
  },
  data () {
    return {
      completeAction: `${this.gatewayServer}/user/improve-info`,
      basicFields: {},
      extendFields: [],
      cascaderProps: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      form: {
        organization: '',
        researchGroup: '',
        building: '',
        room: ''
      },
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
      types: [],
      userTypes: [],
      load: false
    }
  },
  async mounted () {
    let loading = this.$loading()
    let result = {}
    let organizationResult = await this.$axios.get(`${this.$gatewayServer}/group/list?type=organization`)
    Reflect.set(result, 'organization', organizationResult)
    this.organization = this.parseCascader(organizationResult.data || [])
    let buildingResult = await this.$axios.get(`${this.$gatewayServer}/group/list?type=building`)
    Reflect.set(result, 'building', buildingResult)
    this.building = this.parseCascader(buildingResult.data || [])
    let paramsResult = await this.$axios.get(`${this.$gatewayServer}/user/field`)
    let basicFields = {}
    paramsResult.data.basic.forEach(item => {
      if (['organization', 'building'].includes(item.key)) {
        let path = []
        if (item.value) {
          let cur = result[item.key].data.find(group => group.id === item.value)
          if (cur) {
            path = [cur.id]
            while (cur && cur.parent_id) {
              cur = result[item.key].data.find(group => group.id === cur.parent_id)
              if (cur) path.splice(0, 0, cur.id)
            }
          }
        }
        item.path = path
        Reflect.set(this.cascader, item.key, path)
        if (item.key === 'organization') this.changeOrganization(path)
        if (item.key === 'building') this.changeBuilding(path)
      } else if (['researchGroup', 'room'].includes(item.key)) {
        if (item.value) Reflect.set(this.cascader, item.key, [item.value])
      }
      Reflect.set(basicFields, item.key, item)
    })
    this.basicFields = basicFields
    this.userTypes = this.basicFields.type.key.split('/')
    this.extendFields = paramsResult.data.extend
    this.load = true
    loading.close()
  },
  methods: {
    parseCascader (building) {
      let parentKeys = []
      let listObj = {}
      building.forEach(item => {
        parentKeys.indexOf(item.parent_id) >= 0 || parentKeys.push(item.parent_id)
        Reflect.set(listObj, item.id, Object.assign({ children: [] }, item))
      })
      let arr = []
      Object.keys(listObj).map(key => {
        let item = listObj[key]
        if (parentKeys.indexOf(item.id) < 0) {
          delete item.children
        }
        if (Object.keys(listObj).indexOf(item.parent_id) >= 0) {
          listObj[item.parent_id].children.push(item)
        } else {
          arr.push(item)
        }
      })

      return arr
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
    async changeOrganization (value) {
      let loading = this.$loading()
      this.cascader.researchGroup = []
      let organization = value[value.length - 1]
      let researchGroupResult =
        await this.$axios.get(`${this.$gatewayServer}/group/list?type=researchGroup&id=${organization}`)
      this.researchGroup = researchGroupResult.data || []
      loading.close()
    },
    clickResearchGroup () {
      if (this.cascader.organization.length === 0) {
        this.$message({
          type: 'warning',
          message: '请先选择组织机构'
        })
      }
    },
    clickRoom () {
      if (this.cascader.building.length === 0) {
        this.$message({
          type: 'warning',
          message: '请先选择楼宇'
        })
      }
    },
    async changeBuilding (value) {
      let loading = this.$loading()
      this.cascader.room = []
      let building = value[value.length - 1]
      let roomResult =
        await this.$axios.get(`${this.$gatewayServer}/group/list?type=room&id=${building}`)
      this.room = roomResult.data || []
      loading.close()
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
      if (field.required && !field.value && field.value !== 0) {
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
