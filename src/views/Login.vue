<template lang="pug">
.login
  .board(:style='boardStyle')
    tab(v-model='active' :options='loginTypes')
    component.fill(:is='currentBoard')
  .idea Research Gets Easier
</template>

<script>
import basePxMixin from '~src/mixins/base-px'
import { Button, Input } from 'gapper-element-ui'
import Tab from '~src/components/login/tab.vue'
const AccountBoard = r => require.ensure([], () => r(require('~src/components/login/account-board')), 'account-board')

export default {
  components: {
    [Input.name]: Input,
    [Button.name]: Button,
    Tab,
    AccountBoard
  },
  mixins: [basePxMixin],
  data () {
    return {
      loginAction: `${this.$gatewayServer}/auth`,
      active: 'account',
      loginTypes: [
        {
          key: 'account',
          name: '校外用户',
          img: 'public/image/account.png',
          activeImg: 'public/image/account-active.png',
          activeColor: '#5DB8F1'
        },
        {
          key: 'card',
          name: '校内用户',
          img: 'public/image/card.png',
          activeImg: 'public/image/card-active.png',
          activeColor: '#F8D280'
        }
        // {
        //   name: '校内用户',
        //   img: 'public/image/weixin.png',
        //   activeImg: 'public/image/weixin-active.png',
        //   activeColor: '#8ED2A9'
        // },
        // {
        //   name: '校内用户',
        //   img: 'public/image/weibo.png',
        //   activeImg: 'public/image/weibo-active.png',
        //   activeColor: '#F4C58F'
        // },
        // {
        //   name: '校内用户',
        //   img: 'public/image/qq.png',
        //   activeImg: 'public/image/qq-active.png',
        //   activeColor: '#E67D6D'
        // }
      ],
      form: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    currentBoard () {
      switch (this.active) {
        case 'account':
          return 'account-board'
        default:
          return ''
      }
    },
    boardStyle () {
      return {
        'width': this.basePx * 800 + 'px',
        'height': this.basePx * 600 + 'px'
      }
    }
  },
  mounted () {
    if (this.$route.query.password_error) {
      this.$message({
        type: 'error',
        message: '用户名或密码错误'
      })
    }
  },
  methods: {
    goSign () {
      this.$router.push({ name: 'sign', query: { genee_oauth: this.$route.query.genee_oauth } })
    },
    goReset () {
      this.$router.push({ name: 'reset' })
    },
    login () {
      if (!this.form.username || !this.form.password) {
        this.$message({
          type: 'error',
          message: '请输入用户名或密码'
        })
        return
      }
      this.$refs.form.submit()
    }
  }
}
</script>

<style lang="stylus" scoped>
.login
  position relative
  display flex
  justify-content center
  align-items center
  width 100%
  height 100%
  overflow auto
  .board
    display flex
    flex-direction column
    justify-content space-between
    .fill
      flex 1
  .idea
    margin 0 auto
    position absolute
    bottom 42px
    font-size 16px
    color #C6C6C6
</style>
