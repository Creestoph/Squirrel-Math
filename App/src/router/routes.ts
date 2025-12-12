import Home from './../components/Home.vue';
import Editor from './../components/editor/Editor.vue';
import DrzewoHD from './../components/DrzewoHD.vue';
import Lesson from './../components/lesson/Lesson.vue';

export const routes = [
    { path: '', component: Home, meta: { title: 'Squirrel-Math' } },
    { path: '/drzewoHD', component: DrzewoHD },
    { path: '/editor/:editSourceFile?', component: Editor },
    { path: '/lesson/:sourceFile', name: 'lesson', component: Lesson, meta: { title: 'Squirrel-Math' } },
];
