export class Card {
  constructor(data, cardTemplateSelector, handleCardClick) {
    this._template = document.querySelector(cardTemplateSelector).content;
    this._name = data.name
    this._link = data.link
    this._handleCardClick = handleCardClick
  }

  _imageHeartChanger = () => {
    console.log('12321')
    this._likeButton.classList.toggle('elements__button_like_active');
  }

  _handleDelete(event) {
    event.target.closest('.elements__element').remove();
  }

  _setEventListeners() {
    const deleteButton = this._newElement.querySelector('.elements__deleteButton');
    deleteButton.addEventListener("click", this._handleDelete);
    this._likeButton.addEventListener('click', this._imageHeartChanger);
    this._image.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  createCard() {
    this._newElement = this._template.cloneNode(true);
    this._image = this._newElement.querySelector('.elements__mask-group');
    const elementPlace = this._newElement.querySelector('.elements__place');
    this._likeButton = this._newElement.querySelector('.elements__button');

    this._image.src = this._link;
    this._image.alt = this._name;
    elementPlace.textContent = this._name;

    this._setEventListeners()
    return this._newElement;
  }
}
