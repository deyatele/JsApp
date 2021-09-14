import './css/styles.css';
import { HeaderComponent } from './components/header';
import { NavigationComponent } from './components/navigation';
import { FavoriteComponent } from './components/favorite';
import { CreateComponent } from './components/create';
import { PostsComponent } from './components/posts';
import { LoaderComponent } from './components/loader';
import { Content } from './components/content';

new HeaderComponent('header');
const navigation = new NavigationComponent('navigation');
const loader = new LoaderComponent('loader');
const create = new CreateComponent('create');
const posts = new PostsComponent('posts', { loader });
const favorite = new FavoriteComponent('favorite', { loader });
new Content('content');

navigation.registerTabs([
  { name: 'create', component: create },
  { name: 'posts', component: posts },
  { name: 'favorite', component: favorite },
]);
