import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes} from '@/routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    // TODO workaround for MathJax recalc
    if (to.hash) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ selector: to.hash })
        }, 1000)
      })
    } else {
      return { x: 0, y: 0 }
    }
  }
});

export default router
