import { Card } from './Card.js'
import { FormValidator, validationConfig } from './FormValidator.js'

const popupAddForm = document.querySelector('#popupAddForm')
const popupEditForm = document.querySelector('#popupEditForm')

const editProfileValidator = new FormValidator(validationConfig, popupEditForm)
const addCardValidator = new FormValidator(validationConfig, popupAddForm)

addCardValidator.enableValidation()
editProfileValidator.enableValidation()

const formElement = document.querySelector('#popupProfile');
const nameInput = document.querySelector('#popupName');
const jobInput = document.querySelector('#aboutMe');
const nameMain = document.querySelector('.profile__title')
const jobMain = document.querySelector('.profile__text')

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameMain.textContent = nameInput.value;
  jobMain.textContent = jobInput.value;
  closePopup(popupProfile);
}

popupEditForm.addEventListener('submit', handleProfileFormSubmit);

const initialCards = [
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

function  openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
}

function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened')
    closePopup(openPopup);
  }
}

const elements = document.querySelector('.elements');
const nameImage = document.querySelector('#imageNameId');
const inputLink = document.querySelector('#imageLink');
const popupAddButtonSubmit = document.querySelector('#popupAddButtonSubmit')

export const openPopupImages = (name, link) => {
  popupImagesImage.src = link;
  popupImagesText.textContent = name;
  popupImagesImage.alt = name;

  openPopup(popupImages);
}

initialCards.forEach((item) => {
  elements.prepend(createCard(item))
}
)

function createCard(item) {
  const card = new Card(item, '#elementTemplate', openPopupImages)
  return card.createCard()
}

function addCard() {
  const item = {
    name: nameImage.value,
    link: inputLink.value
  }
  elements.prepend(createCard(item))
  nameImage.value = '';
  inputLink.value = '';
  closePopup(popupProfileImages);
}

popupAddForm.addEventListener('submit', addCard);

const profileOpenPopupButton = document.querySelector('#profileEditButton');
const popupProfile = document.querySelector('#popupProfile');
const popupProfileCloseButton = document.querySelector('#popupProfileCloseButton');
const popupProfileContainer = document.querySelector('#popupProfileContainer');
const profileImagesAddButton = document.querySelector('#profileImagesAddButton');
const popupProfileImages = document.querySelector('#popupProfileImages');
const popupProfileImagesCloseButton = document.querySelector('#popupProfileImagesCloseButton');
const popupZoomImage = document.querySelector('.elements__mask-group');
const popupImagesCloseButton = document.querySelector('#popupCloseButtonImage');
const popupImagesContainer = document.querySelector('#popupImagesContainer');
const popupImagesImage = document.querySelector('#popupImagesImage');
const popupImagesText = document.querySelector('#popupImagesText');
const popupImages = document.querySelector('#popupImages');


export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
}

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

profileOpenPopupButton.addEventListener('click', () => {
  nameInput.value = nameMain.textContent;
  jobInput.value = jobMain.textContent;
  editProfileValidator.disableButton()
  openPopup(popupProfile);
});

popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));
profileImagesAddButton.addEventListener('click', () => {
addCardValidator.disableButton()
openPopup(popupProfileImages)
}
);
popupProfileImagesCloseButton.addEventListener('click', () => closePopup(popupProfileImages));
popupImagesCloseButton.addEventListener('click', () => closePopup(popupImages));
popupProfile.addEventListener('mousedown', closePopupOverlay);
popupImages.addEventListener('mousedown', closePopupOverlay);
popupProfileImages.addEventListener('mousedown', closePopupOverlay);








