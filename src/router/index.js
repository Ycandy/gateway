import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter (baseRouterOption) {
  let router = new Router(Object.assign({}, baseRouterOption, {
    routes: [{
      path: '/', redirect: '/login'
    }, {
      name: 'login',
      path: '/login',
      component: r => require.ensure([], () => r(require('~src/views/Login.vue')), 'login')
    }, {
      name: 'complete',
      path: '/complete',
      component: r => require.ensure([], () => r(require('~src/views/Complete.vue')), 'complete')
    }, {
      name: 'info',
      path: '/info',
      component: r => require.ensure([], () => r(require('~src/views/Info.vue')), 'info')
    }, {
      name: 'sign',
      path: '/sign',
      component: r => require.ensure([], () => r(require('~src/views/Sign.vue')), 'sign')
    }, {
      name: 'reset',
      path: '/reset',
      component: r => require.ensure([], () => r(require('~src/views/Reset.vue')), 'reset')
    }]
  }))
  return router
}
