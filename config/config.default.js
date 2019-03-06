module.exports = {
  key: 'gateway',
  title: 'gateway-Gapper业务集成',
  route: {
    prefix: '/gateway',
    port: 8001,
  },
  app: {
    login: 'http://demo.gapper.in/gateway/auth',
    getParams: 'http://demo.gapper.in/gateway/getParams',
    sign: 'http://demo.gapper.in/gateway/sign',
    info: 'http://demo.gapper.in/gateway/user/get-info',
    complete: 'http://demo.gapper.in/gateway/user/improve-info',
    redirect: 'http://demo.gapper.in/gateway/judge-login'
  }
}
