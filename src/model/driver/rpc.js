import Axios from 'axios'

export default class Rpc {
  constructor ({ baseURL = '', headers = {} }) {
    this.passenger = Axios.create({
      baseURL,
      timeout: 5000,
      headers: Object.assign({ 'X-Requested-With': 'XMLHttpRequest' }, headers)
    })
    return this
  }
  rpc ({ method, params = {} }) {
    return this.passenger.post('', {
      'jsonrpc': '2.0',
      method,
      'id': 1,
      'params': Object.keys(params).map(key => Reflect.get(params, key))
    }).then(r => Promise.resolve(r.data.result))
  }
}
