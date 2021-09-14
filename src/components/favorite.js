import { Component } from './../core/component';
import { apiService } from './../services/api.service';
import { renderPost } from '../template/post.template';
export class FavoriteComponent extends Component {
  constructor(id, { loader }) {
    super(id);
    this.loader = loader;
  }

  init() {
    this.$el.addEventListener('click', linkClickHendler.bind(this));
  }

  onShow() {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    const html = renderList(favorites);
    this.$el.insertAdjacentHTML('afterbegin', html);
  }
  onHide() {
    this.$el.innerHTML = '';
  }
}

async function linkClickHendler(event) {
  event.preventDefault();
  if (event.target.classList.contains('js-link')) {
    const postId = event.target.dataset.id;
    this.$el.innerHTML = '';
    this.loader.show();
    const post = await apiService.fetchPostById(postId);
    this.loader.hide();
    this.$el.insertAdjacentHTML(
      'afterbegin',
      renderPost(post, { withButton: false })
    );
  } else if (event.target.classList.contains('prew')) {
    this.onHide();
    this.onShow();
  }
}

function renderList(list = []) {
  if (list && list.length) {
    let count = 1;
    return `
        <ul>
            ${list
              .map((i) => {
                return `<li><a href="#" class="js-link" data-id="${i.id}">${count++}. ${i.title}</a></li>`;
              })
              .join(' ')}
        </ul>
    `;
  }
  return `<p class="center">Избранных записей нет</p>`;
}
