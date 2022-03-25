export const popupImagesImage = document.querySelector('#popupImagesImage');
export const popupImagesText = document.querySelector('#popupImagesText');
export const popupImages = document.querySelector('#popupImages');//openModalWindow
import { closePopup } from "./index.js";

export function  openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
}

export function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened')
    closePopup(openPopup);
  }
}


