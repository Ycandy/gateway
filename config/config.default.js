module.exports = {
  key: 'gateway',
  title: 'gateway-Gapper业务集成',
  route: {
    prefix: '/gateway',
    port: 8001,
  },
  app: {
    login: 'http://demo.gapper.in/gateway/auth'
  }
}
