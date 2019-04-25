// import querystring from 'querystring'
import Rest from './driver/rest'
import Rpc from './driver/rpc'
import config from '~/config'

const baseURL = config.app.gateway
const loginAction = `${baseURL}/auth`

export default class Gateway {
  constructor () {
    this.rest = new Rest({ baseURL })
    this.rpc = new Rpc({ baseURL: `${baseURL}/api` })
    this.loginAction = loginAction
  }
  async getGroup (params) {
    let data = await this.rest.get({ resource: '/group/list', params })
    return data
  }
  async getUserType () {
    let data = await this.rpc.rpc({ resource: 'user/type/list' })
    return data
  }
}
