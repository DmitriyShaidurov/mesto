import { popupImagesImage, popupImagesText, openPopup, popupImages, closePopupEscape } from './utils.js'
import { Card } from './Card.js'

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
/* const template = document.querySelector('#elementTemplate').content; */
const elements = document.querySelector('.elements');
const nameImage = document.querySelector('#imageNameId');
const inputLink = document.querySelector('#imageLink');
const popupAddButtonSubmit = document.querySelector('#popupAddButtonSubmit')
/* const elementImage = template.querySelector('.elements__mask-group')
const elementButton = template.querySelector('.elements__button')
const popupAddImagesButton = document.getElementById('popupAddImagesButton'); */

function render() {
  initialCards.forEach(function (data) {
    renderCard(data, elements);
  })
}


/* 1 function createCard(card) {
  const newElement = template.cloneNode(true);
  const image = newElement.querySelector('.elements__mask-group');
  const elementPlace = newElement.querySelector('.elements__place');
  image.src = card.link;
  image.alt = card.name;
  elementPlace.textContent = card.name;
  image.addEventListener('click', () => openPopupImages(card));
  addListeners(newElement);
  return newElement;
} */

/* 6 function openPopupImages(data) {
  popupImagesImage.src = data.link;
  popupImagesText.textContent = data.name;
  popupImagesImage.alt = data.name;
  openPopup(popupImages);
} */

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

/* 8 function imageHeartChanger(event) {
  event.currentTarget.classList.toggle('elements__button_like_active');
} */

/* 2 function addListeners(el) {
  el.querySelector('.elements__deleteButton').addEventListener("click", handleDelete);
  el.querySelector('.elements__button').addEventListener('click', imageHeartChanger);
} */

/* function handleDelete(event) {
  event.target.closest('.elements__element').remove();
} */

function handleCreate(event) {
  event.preventDefault();
  /* const newCard =  */renderCard({
    name: nameImage.value,
    link: inputLink.value
  }, elements
  )
  nameImage.value = '';
  inputLink.value = '';
  closePopup(popupProfileImages);
  disableButton('popup__button_disabled', popupAddButtonSubmit);
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
/* const popupImages = document.querySelector('#popupImages'); */
const popupImagesCloseButton = document.querySelector('#popupCloseButtonImage');
const popupImagesContainer = document.querySelector('#popupImagesContainer');
/* const popupImagesImage = document.querySelector('#popupImagesImage'); */
/* const popupImagesText = document.querySelector('#popupImagesText'); */

/* function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
}

function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened')
    closePopup(openPopup);
  }
} */

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
  openPopup(popupProfile);
});

popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));
profileImagesAddButton.addEventListener('click', () => openPopup(popupProfileImages));
popupProfileImagesCloseButton.addEventListener('click', () => closePopup(popupProfileImages));
popupImagesCloseButton.addEventListener('click', () => closePopup(popupImages));
popupProfile.addEventListener('click', closePopupOverlay);
popupImages.addEventListener('click', closePopupOverlay);
popupProfileImages.addEventListener('click', closePopupOverlay);







