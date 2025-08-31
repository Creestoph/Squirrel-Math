import Home from './components/Home';
import HomeShort from './components/HomeShort';
import Editor from './components/editor/Editor';
import InteractiveTree from './components/InteractiveTree';
import DrzewoHD from './components/DrzewoHD';
import Lesson from './components/lesson/Lesson';

export const routes = [
    { path: '', component: Home },
    { path: '/home-short', component: HomeShort },
    { path: '/editor', component: Editor },
    { path: '/editor/:editSourceFile', name: 'editor', component: Editor },
    { path: '/tree', component: InteractiveTree },
    { path: '/drzewoHD', component: DrzewoHD },
    { path: '/lesson/:sourceFile', name: 'lesson', component: Lesson },
];
