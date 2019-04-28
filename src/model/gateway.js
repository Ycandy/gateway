// import querystring from 'querystring'
import Rest from './driver/rest'
import Rpc from './driver/rpc'
import config from '~/config'

const baseURL = config.app.gateway
const loginAction = `${baseURL}/auth`
const completeAction = `${baseURL}/user/improve-info`
const logoutUrl = `${baseURL}/logout`

export default class Gateway {
  constructor () {
    this.rest = new Rest({ baseURL })
    this.rpc = new Rpc({ baseURL: `${baseURL}/api` })
    this.loginAction = loginAction
    this.completeAction = completeAction
    this.logoutUrl = logoutUrl
  }
  async getGroup (params) {
    let data = await this.rest.get({ resource: '/group/list', params })
    return data
  }
  async getUserInfo () {
    let data = await this.rest.get({ resource: '/user/info' })
    return data
  }
  async setUser (params) {
    let data = await this.rest.put({ resource: '/user', params })
    return data
  }
  async getUserField () {
    let data = await this.rest.get({ resource: '/user/field' })
    return data
  }
  async signup (params) {
    let data = await this.rest.post({
      resource: '/user/regist',
      params
    })
    return data
  }
  async getUserType () {
    let data = await this.rpc.rpc({ method: 'user/type/list' })
    return data
  }
}
