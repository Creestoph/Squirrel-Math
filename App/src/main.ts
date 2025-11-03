import { createApp } from 'vue';
import App from '@/components/App.vue';
import router from '@/router';
import Comment from '@/components/lesson/Comment.vue';
import Icon from '@/components/Icon.vue';

const app = createApp(App);

app.component('Comment', Comment);
app.component('Icon', Icon);

app.use(router).mount('#app');
