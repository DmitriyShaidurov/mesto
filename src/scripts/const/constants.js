export const popupAddForm = document.querySelector('#popupAddForm')
export const popupEditForm = document.querySelector('#popupEditForm')
export const nameInput = document.querySelector('#popupName');
export const jobInput = document.querySelector('#aboutMe');
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
export const elements = document.querySelector('.elements');
export const profileOpenPopupButton = document.querySelector('#profileEditButton');
export const profileImagesAddButton = document.querySelector('#profileImagesAddButton');
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  inputErrorClassSpan: 'popup__span_visibility',
  disableButtonClass: 'popup__button_disabled'
}
