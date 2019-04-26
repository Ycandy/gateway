<template lang="pug">
.info
  .title
    span 补全用户信息
  message(:message='"您好!  您是首次登陆, 请先补全信息"')
  form.form(ref='form' method='post' :action='$gateway.completeAction')
    .hidden-group(v-show='false')
      input(name='redirect' :value='$route.query.redirect')
      input(name='from' :value='$route.query.from')
      input(name='genee_oauth' :value='$route.query.genee_oauth')
    .form__fieldset 账号信息
      .form__field
        .form__field__name.form__field__name--required 邮箱
        .form__field__text
          el-input(v-model='form.email' name='email' disabled)
        .form__field__tip(v-if='tips.email') {{ tips.email }}
    .form__fieldset 个人信息
      .form__field
        .form__field__name.form__field__name--required 姓名
        .form__field__text
          el-input(v-model='form.name' name='name' placeholder='姓名' disabled)
        .form__field__tip(v-if='tips.name') {{ tips.name }}
      .form__field
        .form__field__name 联系电话
        .form__field__text
          el-input(v-model='form.phone' name='phone' placeholder='联系电话')
        .form__field__tip(v-if='tips.phone') {{ tips.phone }}
      .form__field
        .form__field__name.form__field__name--required 用户类型
        .form__field__text
          el-input(v-model='form.type' name='type' placeholder='用户类型' disabled)
        .form__field__tip(v-if='tips.type') {{ tips.type }}
      .form__field
        .form__field__name 学工号
        .form__field__text
          el-input(v-model='form.ref_no' name='ref_no' placeholder='学工号')
        .form__field__tip(v-if='tips.ref_no') {{ tips.ref_no }}
      .form__field
        .form__field__name 组织机构
        .form__field__text
          el-cascader(
            placeholder='组织机构'
            :options='organization'
            :props='groupCascaderProps'
            clearable
            filterable
            change-on-select
            @change='changeOrganization')
          input(type='hidden' name='organization' v-model='form.organization')
      .form__field
        .form__field__name 课题组
        .form__field__text
          el-cascader(
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
        .form__field__name 楼宇
        .form__field__text
          el-cascader(
            placeholder='楼宇'
            :options='building'
            :props='groupCascaderProps'
            clearable
            filterable
            change-on-select
            @change='changeBuilding')
          input(type='hidden' name='building' v-model='form.building')    
      .form__field
        .form__field__name 房间
        .form__field__text
          el-cascader(
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
        .form__field__name 有效时间
        .form__field__text
          date-range(
            :startDate='form.validStartDate'
            :endDate='form.validEndDate'
            @changeStartDate='changeStartDate'
            @changeEndDate='changeEndDate'
          )
    .form__fieldset 其他信息
    //- template(v-for='field in extendFields')
    //-   .second-level
    //-     .input-title(:class='{ "required": field.required }') {{ field.name }}
    //-     el-input(v-if='field.type === 0'
    //-       v-model='field.value'
    //-       :name='field.key')
    //-     template(v-else-if='field.type === 1')
    //-       el-select(
    //-         v-model='field.value'
    //-         :name='field.key')
    //-         el-option(v-for='option in field.select'
    //-           :key='option'
    //-           :label='option'
    //-           :value='option')
    //-       input(type='hidden' v-model='field.value' :name='field.key')
    //-     el-input(v-else-if='field.type === 2'
    //-       type='number'
    //-       v-model='field.value'
    //-       :name='field.key')
    //-   .tips(v-if='field.tips')
    //-     span {{ field.tips }}
    .form__btn-group
      el-button.submit-btn(type='primary' @click='submit') 提交
</template>

<script>
import { Input, Cascader, DatePicker, Button } from 'gapper-element-ui'
import Message from '~src/components/common/message.vue'
import DateRange from '~src/components/common/form/date-range'
import { parseTree } from '~src/utils/parse-tree'

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
    let buildingData = await vue.$gateway.getGroup({ type: 'building' })
    let building = parseTree(buildingData || [])
    let paramsData = await vue.$gateway.getUserField()

    loading.close()
    return {
      organization,
      building,
      paramsData
    }
  },
  data () {
    return {
      researchGroup: [],
      room: [],
      groupCascaderProps: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      basicFormParams: [
        'email',
        'name',
        'phone',
        'type',
        'ref_no',
        'organization',
        'researchGroup',
        'building',
        'room',
        'validStartDate',
        'validEndDate'
      ],
      form: {
      },
      tips: {}
    }
  },
  async mounted () {
    this.parseForm()
    // let loading = this.$loading()
    // let result = {}
    // let basicFields = {}
    // paramsData.basic.forEach(item => {
    //   if (['organization', 'building'].includes(item.key)) {
    //     let path = []
    //     if (item.value) {
    //       console.log(item.value)
    //       let cur = result[item.key].data.find(group => group.id === item.value)
    //       if (cur) {
    //         path = [cur.id]
    //         while (cur && cur.parent_id) {
    //           cur = result[item.key].data.find(group => group.id === cur.parent_id)
    //           if (cur) path.splice(0, 0, cur.id)
    //         }
    //       }
    //     }
    //     item.path = path
    //     Reflect.set(this.cascader, item.key, path)
    //     if (item.key === 'organization') this.changeOrganization(path)
    //     if (item.key === 'building') this.changeBuilding(path)
    //   } else if (['researchGroup', 'room'].includes(item.key)) {
    //     if (item.value) Reflect.set(this.cascader, item.key, [item.value])
    //   }
    //   Reflect.set(basicFields, item.key, item)
    // })
    // this.basicFields = basicFields
    // this.userTypes = this.basicFields.type.key.split('/')
    // this.extendFields = paramsData.extend
    // this.load = true
    // loading.close()
  },
  methods: {
    parseForm () {
      let form = {}
      this.paramsData.basic.filter(item => {
        if (this.basicFormParams.includes(item.key)) {
          Reflect.set(form, item.key, item.value)
        }
      })
      console.log(form)
    },
    changeOrganization () {},
    clickResearchGroup () {},
    changeResearchGroup () {},
    changeBuilding () {},
    clickRoom () {},
    changeRoom () {},
    changeStartDate () {},
    changeEndDate () {},
    submit () {}
  }
}
</script>

<style lang="stylus" scoped>
</style>
