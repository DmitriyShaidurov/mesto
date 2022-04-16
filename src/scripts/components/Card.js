export class Card {
  constructor(data, cardTemplateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._template = document.querySelector(cardTemplateSelector).content;
    this._name = data.name
    this._link = data.link
    this._likes = data.likes
    this._id = data.id
    this._userId = data.userId
    this._ownerId = data.ownerId

    this._handleCardClick = handleCardClick
    this._handleDeleteClick = handleDeleteClick
    this._handleLikeClick = handleLikeClick
  }

  _discolorLike = () => {
    this._likeButton.classList.remove('elements__button_like_active');
  }

  _fillLike = () => {
    this._likeButton.classList.add('elements__button_like_active');
  }



  _setEventListeners() {

    const card = this._newElement.querySelector('.elements__element')
    this._deleteButton = this._newElement.querySelector('.elements__deleteButton');
    this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this._id, card));
    this._likeButton.addEventListener('click', () => this._handleLikeClick(this._id, this._likeCounter));
    this._image.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  isLiked() {

    const userHasLikedCard = this._likes.find(user => user._id === this._userId)
    return userHasLikedCard
  }


  setLikes(newLikes, like) {

    this._likes = newLikes
    like.textContent = this._likes.length


    if (this.isLiked()) {
      this._fillLike()
    } else {
      this._discolorLike()
    }
  }


  createCard() {

    this._newElement = this._template.cloneNode(true);
    this._image = this._newElement.querySelector('.elements__mask-group');
    const elementPlace = this._newElement.querySelector('.elements__place');
    this._likeButton = this._newElement.querySelector('.elements__button');

    this._image.src = this._link;
    this._image.alt = this._name;
    elementPlace.textContent = this._name;
    this._likeCounter = this._newElement.querySelector('.elements__likes')

    this._setEventListeners()
    this.setLikes(this._likes, this._likeCounter)

    if (this._ownerId !== this._userId) {
      this._deleteButton.style.display = 'none'
    }

    if (this.isLiked()) {
      this._fillLike()
    }
      return this._newElement;
  }

  deleteCard(cards) {
    cards.remove();
    cards = null
  }


}
