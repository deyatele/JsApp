import { Component } from '../core/component';
export class Content extends Component {
  constructor(id) {
    super(id);
  }
  init() {
    if (localStorage.getItem('visited')) {
      this.show();
    }
  }
}
