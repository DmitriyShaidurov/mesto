let formElement = document.getElementById('popupProfile');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_aboutMe');
let nameMain = document.querySelector('.profile__title')
let jobMain = document.querySelector('.profile__text')

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameMain.textContent = nameInput.value;
  jobMain.textContent = jobInput.value;
  closePopup();
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
const template = document.querySelector('#elementTemplate').content;
const elements = document.querySelector('.elements');
const nameImage = document.querySelector('.popup__input_type_imageName');
const inputLink = document.querySelector('.popup__input_type_link');
const popupAddButtonSubmit = document.querySelector('#popupAddButtonSubmit')
const elementImage = template.querySelector('.elements__mask-group')
/* const elementPlace = template.querySelector('.elements__place'); */
const elementButton = template.querySelector('.elements__button')
const popupAddImagesButton = document.getElementById('popupAddImagesButton');

function render() {
  initialCards.forEach(renderItem);
}



function renderItem(card) {
  const newItem = template.cloneNode(true);
  const image = newItem.querySelector('.elements__mask-group');
  const elementPlace = newItem.querySelector('.elements__place');
  image.src = card.link;
  image.alt = card.name;
  elementPlace.textContent = card.name;
  image.addEventListener('click', () => openPopupImages(card));
  addListeners(newItem);
  elements.prepend(newItem);
}

render();

function imageHeartChanger(event) {
  event.preventDefault();
  if (event.currentTarget.classList.contains('elements__button_like_active') === false) {
    event.currentTarget.classList.add('elements__button_like_active');
  } else (
    event.currentTarget.classList.remove('elements__button_like_active')
  )
}

function addListeners(el) {
  el.querySelector('.elements__deleteButton').addEventListener("click", handleDelete);
  el.querySelector('.elements__button').addEventListener('click', imageHeartChanger);
}

function handleDelete(event) {
  event.target.closest('.elements__element').remove();
}


function handleCreate(event) {
  event.preventDefault();
  renderItem({
    name: nameImage.value,
    link: inputLink.value
  });
  nameImage.value = '';
  inputLink.value = '';
  closePopupAddButton();
}

popupAddButtonSubmit.addEventListener('click', handleCreate);






/* Далее Popup */

const profileOpenPopupButton = document.getElementById('profileEditButton');
const popupProfile = document.getElementById('popupProfile');
const popupProfileCloseButton = document.getElementById('popupProfileCloseButton');
const popupProfileContainer = document.getElementById('popupProfileContainer');
const profileImagesAddButton = document.getElementById('profileImagesAddButton');
const popupProfileImagesAddButton = document.getElementById('popupProfileImagesAddButton');
const popupProfileImagesCloseButton = document.getElementById('popupProfileImagesCloseButton');
const popupProfileImagesAddButtonContainer = document.getElementById('popupProfileImagesAddButtonContainer');
const popupZoomImage = document.querySelector('.elements__mask-group');
const popupImages = document.querySelector('.popup-images');
const popupImagesCloseButton = document.querySelector('.popup-images__close-button-image');
const popupImagesContainer = document.querySelector('.popup-images__container');
const popupImagesImage = document.querySelector('.popup-images__image');
const popupImagesText = document.querySelector('.popup-images__text');
console.log(popupZoomImage)

function openPopup() {
  nameInput.value = nameMain.textContent;
  jobInput.value = jobMain.textContent;
  popupProfile.classList.add('popup_opened');
}

function openPopupAddButton() {
  popupProfileImagesAddButton.classList.add('popup_opened');
}

function closePopup() {
  popupProfile.classList.remove('popup_opened');
}

function closePopupAddButton() {
  popupProfileImagesAddButton.classList.remove('popup_opened');
}

function openPopupImages(data) {
  popupImagesImage.src = data.link;
  popupImagesText.textContent = data.name;
  popupImagesImage.alt = data.name;
  popupImages.classList.add('popup-images_opened');
}

function closePopupImages() {
  popupImages.classList.remove('popup-images_opened');
  popupImagesImage.src = '';
  popupImagesText.textContent = '';
  popupImagesImage.alt = '';
}



profileOpenPopupButton.addEventListener('click', openPopup);
popupProfileCloseButton.addEventListener('click', closePopup);
profileImagesAddButton.addEventListener('click', openPopupAddButton);
popupProfileImagesCloseButton.addEventListener('click', closePopupAddButton);
/* popupZoomImage.addEventListener('click', openPopupImages); */
popupImagesCloseButton.addEventListener('click', closePopupImages);/*  */

/* popup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closePopup()
  }
}) */





/*
function renderItem(card) {
  elementImage.src = card.link;
  elementImage.alt = card.name;
  elementPlace.textContent = card.name;
  const newItem = template.cloneNode(true);
  addListeners(newItem);
  elements.prepend(newItem);
} */
