module.exports = {
  key: 'gateway',
  title: 'gateway-Gapper业务集成',
  route: {
    prefix: '/gapper',
    port: 8001,
  },
  app: {
    login: 'http://gateway.cn/auth',
    getParams: 'http://gateway.cn/user/field',
    sign: 'http://gateway.cn/user/regist',
    info: 'http://gateway.cn/user/info',
    complete: 'http://gateway.cn/user/improve-info',
    redirect: 'http://gateway.cn/judge-login',
    getOrganization: 'http://gateway.cn/group/list',
    getUserTypes: 'http://demo.gapper.in/gateway/api'
  }
}
