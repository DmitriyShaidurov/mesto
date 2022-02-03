const formElement = document.getElementById('popupProfile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_aboutMe');
const nameMain = document.querySelector('.profile__title')
const jobMain = document.querySelector('.profile__text')

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
const elementButton = template.querySelector('.elements__button')
const popupAddImagesButton = document.getElementById('popupAddImagesButton');

function render() {
  initialCards.forEach(function (element) {
    const newCard = createCard(element);
    renderCard(elements, newCard);
  })
}

function createCard(card) {
  const newElement = template.cloneNode(true);
  const image = newElement.querySelector('.elements__mask-group');
  const elementPlace = newElement.querySelector('.elements__place');
  image.src = card.link;
  image.alt = card.name;
  elementPlace.textContent = card.name;
  image.addEventListener('click', () => openPopupImages(card));
  addListeners(newElement);
  return newElement;
}

function renderCard(container, newElement) {
  container.prepend(newElement);
}

render();

function imageHeartChanger(event) {
  event.currentTarget.classList.toggle('elements__button_like_active');
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

function openPopup() {
  nameInput.value = nameMain.textContent;
  jobInput.value = jobMain.textContent;
  popupProfile.classList.add('popup_opened');
}

function openPopupAddButton() {
  popupProfileImagesAddButton.classList.add('popup_opened');
}

function closePopup(popup) {

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
popupImagesCloseButton.addEventListener('click', closePopupImages);

/* popup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closePopup()
  }
}) */

