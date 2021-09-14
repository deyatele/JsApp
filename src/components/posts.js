import { apiService } from '../services/api.service';
import { Component } from './../core/component';
import { TransformServisce } from '../services/transform';
import {renderPost} from '../template/post.template'

export class PostsComponent extends Component {
  constructor(id, { loader }) {
    super(id);
    this.loader = loader;
  }
  init() {
    this.$el.addEventListener('click', buttonHandler.bind(this));
  }

  async onShow() {
    this.loader.show();
    const fbData = await apiService.fetchPosts();
    const posts = TransformServisce.fbObjectToArray(fbData);
    const html = posts.map((post) => renderPost(post, {withButton: true}));
    this.loader.hide();
    this.$el.insertAdjacentHTML('afterbegin', html.join(' '));
  }
  onHide() {
    this.$el.innerHTML = '';
  }
}

function buttonHandler(event) {
  const $el = event.target;
  const title = $el.dataset.title;
  const id = $el.dataset.id;
  if (id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const candidat = favorites.find((p) => p.id === id);
    if (candidat) {
      $el.textContent = 'Сохранить';
      $el.classList.add('button-primary');
      $el.classList.remove('button-danger');
      favorites = favorites.filter((p) => p.id !== id);
    } else {
      $el.textContent = 'Удалить';
      $el.classList.remove('button-primary');
      $el.classList.add('button-danger');
      favorites.push({title,id});
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
