module.exports = {
  key: 'gateway',
  title: 'gateway-Gapper业务集成',
  route: {
    prefix: '/gapper',
    port: 8001,
  },
  // app: {
  //   login: 'http://demo.gapper.in/gateway/auth',
  //   getParams: 'http://demo.gapper.in/gateway/user/field',
  //   sign: 'http://demo.gapper.in/gateway/user/regist',
  //   info: 'http://demo.gapper.in/gateway/user/info',
  //   complete: 'http://demo.gapper.in/gateway/user/improve-info',
  //   redirect: 'http://demo.gapper.in/gateway/judge-login',
  //   getOrganization: 'http://demo.gapper.in/gateway/group/list'
  // }
  app: {
    login: 'http://gateway.cn/auth',
    getParams: 'http://gateway.cn/user/field',
    sign: 'http://gateway.cn/user/regist',
    info: 'http://gateway.cn/user/info',
    complete: 'http://gateway.cn/user/improve-info',
    redirect: 'http://gateway.cn/judge-login',
    getOrganization: 'http://gateway.cn/group/list'
  }
}
