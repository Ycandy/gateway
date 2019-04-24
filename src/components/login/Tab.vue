<template lang="pug">
.tabs.content
  .tabs__item(v-for='option in options' :key='option.key'
    @click='clickTab(option)')
    .tabs__item__img-container
      img(:src='active === option.key ? option.activeImg : option.img ')
    span(:style='active === option.key ? { "color": option.activeColor } : {}') {{ option.name }}
</template>

<script>
export default {
  props: {
    options: Array,
    value: Number | String
  },
  data () {
    return {
      active: this.value || undefined
    }
  },
  methods: {
    clickTab (option) {
      this.active = option.key
      this.$emit('input', option.key)
      this.$emit('click', option)
    }
  }
}
</script>

<style lang="stylus" scoped>
.tabs
  display flex
  justify-content space-around
  align-items center
  box-sizing border-box
  margin-bottom 2%
  width 100%
  height 25%
  &__item
    cursor pointer
    width 68px
    height 100px
    text-align center
    font-size 14px
    color #999999
    &__img-container
      margin-bottom 12px
      width 68px
      height 68px
      img
        width 100%
        height 100%
</style>
