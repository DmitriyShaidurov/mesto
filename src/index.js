import { Card } from './Card.js'
import { FormValidator, validationConfig } from './FormValidator.js'
import Section from './Section.js'
import { PopupWithImage } from './PopupWithImage.js'
import { PopupWithForm } from './PopupWithForm.js'
import { UserInfo } from './UserInfo.js'

//валидатор при закрытии поправить
const popupAddForm = document.querySelector('#popupAddForm')
const popupEditForm = document.querySelector('#popupEditForm')


const editProfileValidator = new FormValidator(validationConfig, popupEditForm)
const addCardValidator = new FormValidator(validationConfig, popupAddForm)

addCardValidator.enableValidation()
editProfileValidator.enableValidation()

const nameInput = document.querySelector('#popupName');
const jobInput = document.querySelector('#aboutMe');


function handleProfileFormSubmit(item) {
  console.log('item', item)
  const { AboutMe, name } = item
  userInfo.setUserInfo(name, AboutMe)
  editProfilePopup.close()
}


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

function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened')
    closePopup(openPopup);
  }
}

export const elements = document.querySelector('.elements');

function createCard(item) {
  const card = new Card(item, '#elementTemplate', () => {
    imagePopup.open(item.name, item.link)

  })
  return card.createCard()
}

function addCard(item) {
  console.log('data', item)
  const card = createCard(
  {
    name: item['title'],
    link: item.link
  }
  )
  section.addItem(card)
  addCardPopup.close()
}

const profileOpenPopupButton = document.querySelector('#profileEditButton');
const profileImagesAddButton = document.querySelector('#profileImagesAddButton');
const popupImagesCloseButton = document.querySelector('#popupCloseButtonImage');
const popupImages = document.querySelector('#popupImages');


export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
}

profileOpenPopupButton.addEventListener('click', () => {
  const item = userInfo.getUserInfo()
  nameInput.value = item.name;
  jobInput.value = item.job;
  editProfileValidator.disableButton()
  editProfilePopup.open()
});


profileImagesAddButton.addEventListener('click', () => {
addCardValidator.disableButton()

addCardPopup.open()
}
);

popupImagesCloseButton.addEventListener('click', () => closePopup(popupImages));

const section = new Section({ items: initialCards, renderer: createCard}, '.elements')
const imagePopup = new PopupWithImage('#popupImages')
const addCardPopup = new PopupWithForm('#popupProfileImages', addCard)
const editProfilePopup = new PopupWithForm('#popupProfile', handleProfileFormSubmit)


imagePopup.setEventListeners()
addCardPopup.setEventListeners()
editProfilePopup.setEventListeners()

section.renderItems()

const userInfo = new UserInfo({ profileNameSelector: '.profile__title', profileJobSelector: '.profile__text' })




