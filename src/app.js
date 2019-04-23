// import '~public/style/css/element-theme/index.css'
import '~public/style/index.styl'
import Vue from 'vue'
import axios from 'axios'
// import { Input, Button, Select, OptionGroup, Option, RadioGroup, Radio, , Message, Cascader, DatePicker } from 'element-ui'
import { Loading, Message } from 'element-ui'
import { app } from '~/config'

// Vue.prototype.$ELEMENT = { size: 'medium' }
// Vue.use(Input)
// Vue.use(Button)
// Vue.use(Select)
// Vue.use(OptionGroup)
// Vue.use(Option)
// Vue.use(RadioGroup)
// Vue.use(Radio)
// Vue.use(Cascader)
// Vue.use(DatePicker)

export function beforeCreateApp () {
  axios.defaults.timeout = 5000
  axios.defaults.withCredentials = true
  Vue.prototype.$axios = axios

  Vue.prototype.$loading = Loading.service
  Vue.prototype.$message = Message

  Vue.prototype.$gatewayServer = app.gateway
}
