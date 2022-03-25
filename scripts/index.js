import { Card } from './Card.js'
import { FormValidator, validationConfig } from './FormValidator.js'

const popupAddForm = document.querySelector('#popupAddForm')
const popupEditForm = document.querySelector('#popupEditForm')

const editProfileValidator = new FormValidator(validationConfig, popupEditForm)
const addCardValidator = new FormValidator(validationConfig, popupAddForm)

addCardValidator.enableValidation()
editProfileValidator.enableValidation()

const formElement = document.getElementById('popupProfile');
const nameInput = document.querySelector('#popupName');
const jobInput = document.querySelector('#aboutMe');
const nameMain = document.querySelector('.profile__title')
const jobMain = document.querySelector('.profile__text')

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameMain.textContent = nameInput.value;
  jobMain.textContent = jobInput.value;
  closePopup(popupProfile);
}

formElement.addEventListener('submit', formSubmitHandler);

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

function render() {
  initialCards.forEach(function (data) {
    renderCard(data, elements);
  })
}

export const openPopupImages = (name, link) => {
  popupImagesImage.src = link;
  popupImagesText.textContent = name;
  popupImagesImage.alt = name;

  openPopup(popupImages);
}

const renderCard = (data, container) => {
  const card = new Card(data, '#elementTemplate', openPopupImages)
  const cardElement = card.createCard()
  container.prepend(cardElement);
}

render();

function handleCreate(event) {
  event.preventDefault();
  renderCard({
    name: nameImage.value,
    link: inputLink.value
  }, elements
  )
  nameImage.value = '';
  inputLink.value = '';
  closePopup(popupProfileImages);
}

popupAddButtonSubmit.addEventListener('click', handleCreate);


const profileOpenPopupButton = document.getElementById('profileEditButton');
const popupProfile = document.getElementById('popupProfile');
const popupProfileCloseButton = document.getElementById('popupProfileCloseButton');
const popupProfileContainer = document.getElementById('popupProfileContainer');
const profileImagesAddButton = document.getElementById('profileImagesAddButton');
const popupProfileImages = document.getElementById('popupProfileImages');
const popupProfileImagesCloseButton = document.getElementById('popupProfileImagesCloseButton');
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
    const overlay = document.querySelector('.popup_opened');
    closePopup(overlay);
  }
}

profileOpenPopupButton.addEventListener('click', () => {
  nameInput.value = nameMain.textContent;
  jobInput.value = jobMain.textContent;
  editProfileValidator._disableButton()
  openPopup(popupProfile);
});

popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));
profileImagesAddButton.addEventListener('click', () => {
addCardValidator._disableButton()
openPopup(popupProfileImages)
}
);
popupProfileImagesCloseButton.addEventListener('click', () => closePopup(popupProfileImages));
popupImagesCloseButton.addEventListener('click', () => closePopup(popupImages));
popupProfile.addEventListener('click', closePopupOverlay);
popupImages.addEventListener('click', closePopupOverlay);
popupProfileImages.addEventListener('click', closePopupOverlay);








