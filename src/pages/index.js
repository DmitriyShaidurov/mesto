import { Card } from '../scripts/components/Card.js'
import { FormValidator} from '../scripts/components/FormValidator.js'
import Section from '../scripts/components/Section.js'
import { PopupWithImage } from '../scripts/components/PopupWithImage.js'
import { PopupWithForm } from '../scripts/components/PopupWithForm.js'
import { UserInfo } from '../scripts/components/UserInfo.js'
import '../pages/index.css';
import { popupAddForm,
  popupEditForm,
  nameInput,
  jobInput,
  initialCards,
  elements,
  profileOpenPopupButton,
  profileImagesAddButton,
  validationConfig
} from '../scripts/const/constants.js'

const editProfileValidator = new FormValidator(validationConfig, popupEditForm)
const addCardValidator = new FormValidator(validationConfig, popupAddForm)

addCardValidator.enableValidation()
editProfileValidator.enableValidation()

function handleProfileFormSubmit(item) {
  console.log('item', item)
  const { AboutMe, name } = item
  userInfo.setUserInfo(name, AboutMe)
  editProfilePopup.close()
}

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

profileOpenPopupButton.addEventListener('click', () => {
  const item = userInfo.getUserInfo()
  nameInput.value = item.name;
  jobInput.value = item.job;
  editProfileValidator.resetValidation()
  editProfilePopup.open()
});

profileImagesAddButton.addEventListener('click', () => {
addCardValidator.resetValidation()
addCardPopup.open()
}
);

const section = new Section({ items: initialCards, renderer: createCard}, elements)
const imagePopup = new PopupWithImage('#popupImages')
const addCardPopup = new PopupWithForm('#popupProfileImages', addCard)
const editProfilePopup = new PopupWithForm('#popupProfile', handleProfileFormSubmit)


imagePopup.setEventListeners()
addCardPopup.setEventListeners()
editProfilePopup.setEventListeners()

section.renderItems()

const userInfo = new UserInfo({ profileNameSelector: '.profile__title', profileJobSelector: '.profile__text' })




