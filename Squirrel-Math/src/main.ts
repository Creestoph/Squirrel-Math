// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/components/App.vue'
import router from '@/router/index'
import Comment from "@/components/lesson/Comment.vue"

Vue.component('Comment', Comment);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
