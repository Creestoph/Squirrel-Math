
import Home from './components/Home'
import Editor from './components/Editor'
import Tree from './components/content/Tree'
import Dodawanie from './components/content/lessons/Dodawanie'

export const routes = [
  { path: '', component: Home },
  { path: '/editor', component: Editor },
  { path: '/dodawanie', component: Dodawanie },
  { path: '/tree', component: Tree }
];
