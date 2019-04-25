import Rest from './driver/rest'
import config from '~/config'

const prefix = config.app.gateway
const loginAction = `${prefix}/auth`
const 

export default class Gateway {
  constructor () {
    this.rest = new Rest({ baseURL = prefix })
  }
} 