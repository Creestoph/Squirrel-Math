import { createApp } from 'vue';
import App from '@/components/App.vue';
import router from '@/router';
import Comment from '@/components/lesson/Comment.vue';
import Icon from '@/components/Icon.vue';
import './style/reset.scss';
import '@/components/utils/latex-utils/setup.ts';

const app = createApp(App);

app.component('Comment', Comment);
app.component('Icon', Icon);

app.use(router).mount('#app');
