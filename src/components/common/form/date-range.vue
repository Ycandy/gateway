<template lang="pug">
.date-range
  el-date-picker.date-range__editor(
    v-model='startDateValue'
    type="date"
    placeholder="开始日期"
    value-format='yyyy-MM-dd'
    editable
    @change='changeStartDate'
  )
  span.date-range__separator 至
  el-date-picker.date-range__editor(
    v-model='endDateValue'
    type="date"
    placeholder="结束时间"
    value-format='yyyy-MM-dd'
    editable
    @change='changeEndDate'
  )
</template>

<script>
import { DatePicker } from 'gapper-element-ui'

export default {
  components: {
    [DatePicker.name]: DatePicker
  },
  props: {
    startDate: String,
    endDate: String
  },
  data () {
    return {
      startDateValue: '',
      endDateValue: ''
    }
  },
  methods: {
    changeStartDate (value) {
      this.$emit('changeStartDate', value)
    },
    changeEndDate (value) {
      this.$emit('changeEndDate', value)
    }
  },
  watch: {
    startDate: {
      handler: function (to, from) {
        this.startDateValue = this.startDate
      },
      immediate: true
    },
    endDate: {
      handler: function (to, from) {
        this.endDateValue = this.endDate
      },
      immediate: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.date-range
  width 100%
  height 100%
  & &__editor
    width 45%
  &__separator
    display inline-block
    box-sizing border-box
    padding 0 10px
    width 10%
    text-align center
</style>
