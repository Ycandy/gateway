import '~public/style/index.styl'
import Vue from 'vue'
import Gateway from './model/gateway'
import { Loading, Message } from 'gapper-element-ui'

export function beforeCreateApp () {
  axios.defaults.timeout = 5000
  axios.defaults.withCredentials = true
  Vue.prototype.$axios = axios

  Vue.prototype.$loading = Loading.service
  Vue.prototype.$message = Message

  Vue.prototype.$gateway = new Gateway()
}
