module.exports = {
  key: 'gateway',
  title: 'gateway-Gapper业务集成',
  route: {
    prefix: '/gapper',
    port: 8001,
  },
  app: {
    login: 'http://gateway.cn/gateway/auth',
    getParams: 'http://gateway.cn/gateway/user/field',
    sign: 'http://gateway.cn/gateway/user/regist',
    info: 'http://gateway.cn/gateway/user/info',
    complete: 'http://gateway.cn/gateway/user/improve-info',
    redirect: 'http://gateway.cn/gateway/judge-login',
    getOrganization: 'http://gateway.cn/gateway/group/list'
  }
}
