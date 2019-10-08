// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import {routes} from './routes'
import Comment from "./components/utils/Comment"

Vue.config.productionTip = false

Vue.use(VueRouter)
const router = new VueRouter({routes});

Vue.component('Comment', Comment);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
