export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._containerSelector = document.querySelector(containerSelector)
    this._items = items
    this._renderer = renderer
  }

  renderItems() {
    this._items.forEach((item) => {
      this._containerSelector.prepend(this._renderer(item))
    }
    );
  }

  addItem(element) {
    this._containerSelector.prepend(element)
  }
}
