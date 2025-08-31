import Home from './components/Home.vue';
import HomeShort from './components/HomeShort.vue';
import Editor from './components/editor/Editor.vue';
import InteractiveTree from './components/InteractiveTree.vue';
import DrzewoHD from './components/DrzewoHD.vue';
import Lesson from './components/lesson/Lesson.vue';

export const routes = [
    { path: '', component: Home },
    { path: '/home-short', component: HomeShort },
    { path: '/editor', component: Editor },
    { path: '/editor/:editSourceFile', name: 'editor', component: Editor },
    { path: '/tree', component: InteractiveTree },
    { path: '/drzewoHD', component: DrzewoHD },
    { path: '/lesson/:sourceFile', name: 'lesson', component: Lesson },
];
