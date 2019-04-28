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
      component: r => require.ensure([], () => r(require('~src/views/login.vue')), 'login')
    }, {
      name: 'sign',
      path: '/sign',
      component: r => require.ensure([], () => r(require('~src/views/sign.vue')), 'sign')
    }, {
      name: 'info',
      path: '/info',
      component: r => require.ensure([], () => r(require('~src/views/info.vue')), 'info')
    }, {
      name: 'complete',
      path: '/complete',
      component: r => require.ensure([], () => r(require('~src/views/complete.vue')), 'complete')
    }, {
      name: 'missing-params',
      path: '/missing-params',
      component: r => require.ensure([], () => r(require('~src/views/missing-params.vue')), 'missing-params')
    }, {
      name: 'reset',
      path: '/reset',
      component: r => require.ensure([], () => r(require('~src/views/reset.vue')), 'reset')
    }]
  }))
  return router
}
