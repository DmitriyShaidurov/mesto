let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input-name');
let jobInput = formElement.querySelector('.popup__input-job');
let nameMain = document.querySelector('.profile__title')
let jobMain = document.querySelector('.profile__text')



function formSubmitHandler(evt) {
  evt.preventDefault();
  nameMain.textContent = nameInput.value;
  jobMain.textContent = jobInput.value;
  closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);

/* Далее Popup */


let profileOpenPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup')
let popupCloseButton = document.querySelector('.popup__close-button')
let popupContainer = document.querySelector('.popup__container')


function openPopup(event) {
  event.preventDefault();
  popup.classList.add('popup_opened');
}

profileOpenPopupButton.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
}

popupCloseButton.addEventListener('click', closePopup);

/* popup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closePopup()
  }
}) */


/* Лайк */


let imageHearts = document.querySelectorAll('.elements__button-image');

for (let i = 0; i < imageHearts.length; i++) {
  imageHearts[i].addEventListener('click', imageHeartChanger)
}

function imageHeartChanger(event) {
  event.preventDefault();
  if (event.currentTarget.getAttribute('src') === './images/heart_dark.svg') {
    event.currentTarget.setAttribute('src', './images/heart.svg');
  } else (
    event.currentTarget.setAttribute('src', './images/heart_dark.svg')
  )
}

















