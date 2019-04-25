import Axios from 'axios'

export default class Rest {
  constructor ({ baseURL = '', headers = {} }) {
    this.axios = Axios.create({
      baseURL: baseURL,
      timeout: 20000,
      withCredentials: true,
      headers
    })
  }
  fetch ({ resource = '', params = {} }) {
    return this.axios.get(resource, { params }).then(r => Promise.resolve(r.data))
  }
  get ({ resource = '', params = {} }) {
    return this.axios.get(resource, { params }).then(r => r.data)
  }
  post ({ resource = '', params = {} }) {
    return this.axios.post(resource, params).then(r => Promise.resolve(r.data))
  }
  patch ({ resource = '', params = {} }) {
    return this.axios.patch(resource, params).then(r => Promise.resolve(r.data))
  }
  put ({ resource = '', params = {} }) {
    return this.axios.put(resource, params).then(r => Promise.resolve(r.data))
  }
  delete ({ resource = '', params = {} }) {
    return this.axios.delete(resource, params).then(r => Promise.resolve(r.data))
  }
}
