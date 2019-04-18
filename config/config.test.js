module.exports = {
  key: 'gateway',
  title: 'gateway-Gapper业务集成',
  route: {
    prefix: '/gapper',
    port: 8001,
  },
  app: {
    login: 'http://test.gapper.in/gateway/auth',
    getParams: 'http://test.gapper.in/gateway/user/field',
    sign: 'http://test.gapper.in/gateway/user/regist',
    info: 'http://test.gapper.in/gateway/user/info',
    complete: 'http://test.gapper.in/gateway/user/improve-info',
    redirect: 'http://test.gapper.in/gateway/judge-login',
    getOrganization: 'http://test.gapper.in/gateway/group/list',
    getUserTypes: 'http://test.gapper.in/gateway/api'
  }
}
