import querystring from 'querystring'
import Rest from './driver/rest'
import config from '~/config'

const prefix = config.app.gateway
const loginAction = `${prefix}/auth`
const GROUP_LIST_API = `${this.$$gatewayServer}/group/list`

export default class Gateway {
  constructor () {
    this.rest = new Rest({ baseURL: prefix })
    this.loginAction = loginAction
  }
  async getGroup (params) {
    let result = await this.$gateway.get(GROUP_LIST_API, params) 
  }
}
