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
      el-cascader(v-model='userTypes' placeholder="选择任意级分组" :options="types" filterable change-on-select style="width: 100%")
    .tips(v-if="tips.userType")
      span {{ tips.userType}}
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
import { DatePicker, Input, Cascader, Button } from 'gapper-element-ui'

export default {
  components: {
    [DatePicker.name]: DatePicker,
    [Input.name]: Input,
    [Cascader.name]: Cascader,
    [Button.name]: Button
  },
  async asyncData ({ vue, component }) {
    let loading = vue.$loading()
    let organizationResult = await vue.$axios.get(`${vue.$gatewayServer}/group/list?type=organization`)
    let organization = component.methods.parseCascader(organizationResult.data || [])
    let buildingResult = await vue.$axios.get(`${vue.$gatewayServer}/group/list?type=building`)
    let building = component.methods.parseCascader(buildingResult.data || [])
    let userTypeResult = await vue.$axios.post(`${vue.$gatewayServer}/api`, { 'jsonrpc': '2.0', 'method': 'user/type/list', 'params': [], 'id': '1' })
    let userTypes = component.methods.fetcnUserTypes(userTypeResult.data || [])
    loading.close()
    return {
      organization,
      building,
      types: userTypes
    }
  },
  data () {
    return {
      researchGroup: [],
      room: [],
      cascader: {
        organization: [],
        researchGroup: [],
        building: [],
        room: []
      },
      userTypes: [],
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
        organization: '',
        researchGroup: '',
        building: '',
        room: '',
        validStartDate: '',
        validEndDate: ''
      },
      tips: {
        email: '',
        password: '',
        repassword: '',
        name: '',
        phone: '',
        userType: '',
        type: '',
        card: ''
      }
    }
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
    async changeOrganization (value) {
      let loading = this.$loading()
      this.cascader.researchGroup = []
      let organization = value[value.length - 1]
      let researchGroupResult = await this.$axios.get(`${this.$gatewayServer}/group/list?type=researchGroup&id=${organization}`)
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
    async changeBuilding (value) {
      let loading = this.$loading()
      this.cascader.room = []
      let building = value[value.length - 1]
      let roomResult = await this.$axios.get(`${this.$gatewayServer}/group/list?type=room&id=${building}`)
      this.room = roomResult.data || []
      loading.close()
    },
    clickRoom () {
      if (this.cascader.building.length === 0) {
        this.$message({
          type: 'warning',
          message: '请先选择楼宇'
        })
      }
    },
    fetcnUserTypes (data) {
      let types = {}
      let arr = []
      data.result.map(item => {
        types[item.key] = item
      })
      Object.keys(types).map(key => {
        let parentKey = types[key].parent_key
        types[key].value = types[key].key
        types[key].label = types[key].name
        if (!parentKey) {
          arr.push(types[key])
        } else {
          if (types[key].parent_key) {
            if (!types[parentKey].children) {
              types[parentKey].children = []
              types[parentKey].children.push(types[key])
            } else {
              types[parentKey].children.push(types[key])
            }
          }
        }
      })
      return arr
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

      // if (!form.card) {
      //   tips.card = '请输入学工号'
      //   check = false
      // } else {
      //   tips.card = ''
      // }

      if (form.phone && !/^1(3|4|5|7|8)\d{9}$/.test(form.phone)) {
        tips.phone = '请输入正确的手机号'
        check = false
      } else {
        tips.phone = ''
      }

      if (this.userTypes.length <= 0) {
        tips.userType = '请选择用户类型'
        check = false
      } else {
        tips.userType = ''
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
      form.type = this.userTypes[this.userTypes.length - 1]
      let group = Object.values(this.cascader).filter(item => item.length > 0).map(item => item[item.length - 1])
      form.group = group

      if (check) {
        this.$axios.post(`${this.$gatewayServer}/user/regist`, form)
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
