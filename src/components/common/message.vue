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
</style>
