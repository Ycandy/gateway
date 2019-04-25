module.exports = {
  key: 'gateway',
  title: 'gateway-Gapper业务集成',
  route: {
    prefix: '/gapper',
    port: 8001,
  },
  app: {
    gateway: 'http://test.gapper.in/gateway'
  }
}