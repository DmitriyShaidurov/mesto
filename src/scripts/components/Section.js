export default class Section {
  constructor({items, renderer}, container) {
    this._container = container
    this._items = items
    this._renderer = renderer
  }

  renderItems(items) {
    this._items.forEach((item) => {
      /* this._container */items.prepend(this._renderer(item))
    }
    );
  }

  addItem(element) {
    this._container.prepend(element)
  }
}
