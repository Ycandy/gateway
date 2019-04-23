module.exports = {
  key: 'gateway',
  title: 'gateway-Gapper业务集成',
  route: {
    prefix: '/gapper',
    port: 8001,
  },
  app: {
    gateway: 'http://test.gapper.in/gateway'
    // login: 'http://acms.hainanu.edu.cn/gateway/auth',
    // getParams: 'http://acms.hainanu.edu.cn/gateway/user/field',
    // sign: 'http://acms.hainanu.edu.cn/gateway/user/regist',
    // info: 'http://acms.hainanu.edu.cn/gateway/user/info',
    // complete: 'http://acms.hainanu.edu.cn/gateway/user/improve-info',
    // redirect: 'http://acms.hainanu.edu.cn/gateway/judge-login',
    // getOrganization: 'http://acms.hainanu.edu.cn/gateway/group/list',
    // getUserTypes: 'http://acms.hainanu.edu.cn/gateway/api'
  }
}