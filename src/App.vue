<template lang="pug">
#app
  router-view
</template>

<script>
export default {
}
</script>

<style lang="stylus">
@import '../public/style/index.styl'

body
  overflow auto
#app
  width 100%
  height 100%
  background-image url('../public/image/background.png')
  background-size cover
</style>
