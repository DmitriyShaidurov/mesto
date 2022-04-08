export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keyup', this._handleEscClose)
  }

  close() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keyup', this._handleEscClose)
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      /* const openPopup = document.querySelector('.popup_opened') */
      this.close()
    }
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close-button-image')

    this._popup.addEventListener('click', (evt) => {
      if (!evt.target.closest('.popup__container') || evt.target === closeButton /* || !evt.target.closest('.popup__container-image') */) {
        this.close()
      }
    })
  }
}

