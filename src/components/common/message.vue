<template lang="pug">
.message(ref='message')
  span {{ message }}
  i.message__icon.el-icon-close(v-if='closable' style='' @click='close')
</template>

<script>
export default {
  props: {
    message: String,
    closable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    close () {
      this.closeAnimate()
    },
    closeAnimate () {
      setTimeout(() => {
        let $message = this.$refs.message
        let height = $message.clientHeight
        if (height > 0) {
          height -= 1
          $message.style.height = height + 'px'
          this.closeAnimate()
        }
      }, 10)
    }
  }
}
</script>

<style lang="stylus" scoped>
.message
  width 50%
  height 36px
  min-width 800px
  line-height 36px
  font-size 14px
  color #CC6561
  background #FFF6DB
  border-radius 3px
  text-align center
  margin 0 auto
  overflow hidden
  &__icon
    cursor pointer
    margin-left 20px
</style>
