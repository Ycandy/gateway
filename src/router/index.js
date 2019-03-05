import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const { prefix } = require('~/config').route

export function createRouter (store) {
  let router = new Router({
    mode: 'history',
    base: `${prefix}/`,
    scrollBehavior: () => ({ y: 0 }),
    routes: [{
      name: 'index',
      path: '/',
      component: r => require.ensure([], () => r(require('src/views/Index.vue')), 'index')
    }, {
      name: 'login',
      path: '/login',
      component: r => require.ensure([], () => r(require('src/views/Login.vue')), 'login')
    }, {
      name: 'sign',
      path: '/sign',
      component: r => require.ensure([], () => r(require('src/views/Sign.vue')), 'sign')
    }, {
      name: 'reset',
      path: '/reset',
      component: r => require.ensure([], () => r(require('src/views/Reset.vue')), 'reset')
    }]
  })
  router.beforeEach((to, from, next) => {
    Object.assign(to.params, { store })
    next()
  })
  return router
}
