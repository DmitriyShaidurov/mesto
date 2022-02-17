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
const template = document.querySelector('#elementTemplate').content;
const elements = document.querySelector('.elements');
const nameImage = document.querySelector('#imageNameId');
const inputLink = document.querySelector('#imageLink');
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

function openPopupImages(data) {
  popupImagesImage.src = data.link;
  popupImagesText.textContent = data.name;
  popupImagesImage.alt = data.name;
  openPopup(popupImages);
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
  const newCard = createCard({
    name: nameImage.value,
    link: inputLink.value
  });
  nameImage.value = '';
  inputLink.value = '';
  renderCard(elements, newCard)
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
const popupImages = document.querySelector('#popupImages');
const popupImagesCloseButton = document.querySelector('#popupCloseButtonImage');
const popupImagesContainer = document.querySelector('#popupImagesContainer');
const popupImagesImage = document.querySelector('#popupImagesImage');
const popupImagesText = document.querySelector('#popupImagesText');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
}

function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened')
    closePopup(openPopup);
  }
}

function closePopup(popup) {
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








/* const ERRORS = {
  passwordsMismatch: 'Пароли не совпадают'
};

const formSubmit = (event, form) => {
    event.preventDefault();
    if (form.checkValidity()) {
        form.reset();
    }
}

const checkPasswords = (form, passwordRepeatInput) => {
    const passwordInput = form.querySelector('#password');

    if (passwordInput.value === passwordRepeatInput.value) {
        passwordRepeatInput.setCustomValidity('');
    } else {
        passwordRepeatInput.setCustomValidity(ERRORS.passwordsMismatch);
    }
}

const setInputValid = (inputErrorClass, errorMessage, input) => {
    errorMessage.textContent = '';
    input.classList.remove(inputErrorClass);
}

const setInputInvalid = (inputErrorClass, errorMessage, input) => {
    errorMessage.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
}

const checkInputValidity = ({ inputErrorClass }, form, input) => {
    const errorMessage = form.querySelector(`#error-${input.id}`);

    if (input.name === 'passwordRepeat') {
        checkPasswords(form, input);
    }

    if (input.validity.valid) {
        setInputValid(inputErrorClass, errorMessage, input);
    } else {
        setInputInvalid(inputErrorClass, errorMessage, input);
    }
}

const disableButton = (disabledButtonClass, button) => {
    button.setAttribute('disabled', '');
    button.classList.add(disabledButtonClass);
}
const checkButtonValidity = ({ disabledButtonClass }, form, button) => {
    if (form.checkValidity()) {
        button.removeAttribute('disabled');
        button.classList.remove(disabledButtonClass);
    } else {
        disableButton(disabledButtonClass, button);
    }
}

function enableValidation({ formSelector, inputSelector, buttonSelector, ...rest }) {
    const form = document.querySelector(formSelector);

      Сейчас обработчик добавляется только на первую форму
    Если в проекте их несколько, нужно добавить на все
    form.addEventListener('submit', (event) => formSubmit(event, form));
    const inputs = form.querySelectorAll(inputSelector);
    const button = form.querySelector(buttonSelector);

    form.addEventListener('reset', () => {
        disableButton(rest, button);
    });

    checkButtonValidity(rest, form, button);

    inputs.forEach(input => {
        input.addEventListener('input', (event) => {
            checkInputValidity(rest, form, input);
            checkButtonValidity(rest, form, button);
        });
    });
}

enableValidation({
    formSelector: '.form',
    inputSelector: '.input__text',
    buttonSelector: '.input__btn_add',
    disabledButtonClass: 'input__btn_disabled',
    inputErrorClass: 'input__text_type_error',
});





const enableValidation = (options) => {

  const formList = Array.from(document.querySelectorAll(options.formSelector))

  formList.forEach((formElement) => {

      formElement.addEventListener('submit', function (evt) {

          evt.preventDefault()

      })

      setEventListeners(formElement, options);

  })

} */



