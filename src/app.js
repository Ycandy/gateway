import '~public/style/index.styl'
import Vue from 'vue'
import axios from 'axios'
import { Loading, Message } from 'gapper-element-ui'
import { app } from '~/config'

export function beforeCreateApp () {
  axios.defaults.timeout = 5000
  axios.defaults.withCredentials = true
  Vue.prototype.$axios = axios

  Vue.prototype.$loading = Loading.service
  Vue.prototype.$message = Message

  Vue.prototype.$gatewayServer = app.gateway
}
