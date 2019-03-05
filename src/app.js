import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import { Button, Select } from 'element-ui'

const store = createStore()

const router = createRouter(store)
sync(store, router)

router.beforeResolve((to, from, next) => {
  const matched = router.getMatchedComponents(to)

  Promise.all(matched.map(c => {
    if (c.asyncData) {
      return c.asyncData({ store, route: to })
    }
  })).then(() => {
    next()
  }).catch(next)
})

Vue.use(Button)
Vue.use(Select)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
