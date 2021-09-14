import { Component } from '../core/component';
import { Content } from '../components/content';

export class HeaderComponent extends Component {
  constructor(id) {
    super(id);
  }
  init() {
    if (localStorage.getItem('visited')) {
      this.hide();
    }

    this.$el
      .querySelector('.heder-start')
      .addEventListener('click', buttonHandler.bind(this));
  }
}
const content = new Content('content');
function buttonHandler() {
  localStorage.setItem('visited', JSON.stringify(true));
  this.hide();
  content.show()
}
