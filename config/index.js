module.exports = {
  key: 'gateway',
  title: 'gateway-Gapper业务集成',
  route: {
    // prefix: '/gapper',
    prefix: '',
    port: 8001,
  },
  app: {
    gateway: 'http://test.gapper.in/gateway'
  }
}