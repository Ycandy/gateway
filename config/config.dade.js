module.exports = {
  key: 'gateway',
  title: 'gateway-Gapper业务集成',
  route: {
    prefix: '/gapper',
    port: 8001,
  },
  app: {
    login: 'http://atlatl.online/gateway/auth',
    getParams: 'http://atlatl.online/gateway/user/field',
    sign: 'http://atlatl.online/gateway/user/regist',
    info: 'http://atlatl.online/gateway/user/info',
    complete: 'http://atlatl.online/gateway/user/improve-info',
    redirect: 'http://atlatl.online/gateway/judge-login',
    getOrganization: 'http://atlatl.online/gateway/group/list',
    getUserTypes: 'http://atlatl.online/gateway/api'
  }
}
