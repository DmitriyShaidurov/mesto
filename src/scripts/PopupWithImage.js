

import { Popup } from './Popup.js'
export class PopupWithImage extends Popup {
  open(name, link) {
    const image = this._popup.querySelector('#popupImagesImage')
    const caption = this._popup.querySelector('#popupImagesText')

    image.src = link
    caption.textContent = name
    image.alt = name
    super.open()
  }
}

