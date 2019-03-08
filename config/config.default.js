module.exports = {
  key: 'gateway',
  title: 'gateway-Gapper业务集成',
  route: {
    prefix: '/gapper',
    port: 8001,
  },
  app: {
    login: 'http://demo.gapper.in/gateway/auth',
    getParams: 'http://demo.gapper.in/gateway/user/field',
    sign: 'http://demo.gapper.in/gateway/user/sign',
    info: 'http://demo.gapper.in/gateway/user/info',
    complete: 'http://demo.gapper.in/gateway/user/improve-info',
    redirect: 'http://demo.gapper.in/gateway/judge-login',
    getOrganization: 'http://demo.gapper.in/gateway/group/list'
  }
}
