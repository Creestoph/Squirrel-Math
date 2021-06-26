import Vue from 'vue'
import App from '@/components/App.vue'
import router from '@/router/index'
import Comment from "@/components/lesson/Comment.vue"
import Icon from "@/components/Icon.vue"

Vue.component('Comment', Comment);
Vue.component('Icon', Icon);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
