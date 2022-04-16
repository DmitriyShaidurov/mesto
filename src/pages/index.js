import { Card } from '../scripts/components/Card.js'
import { FormValidator } from '../scripts/components/FormValidator.js'
import Section from '../scripts/components/Section.js'
import { PopupWithImage } from '../scripts/components/PopupWithImage.js'
import { PopupWithForm } from '../scripts/components/PopupWithForm.js'
import { UserInfo } from '../scripts/components/UserInfo.js'
import '../pages/index.css';
import {
  popupAddForm,
  popupEditForm,
  nameInput,
  jobInput,
  initialCards,
  elements,
  profileOpenPopupButton,
  profileImagesAddButton,
  validationConfig,
  profileOpenPopupAvatarButton,
  popupEditAvatarForm,
  nameAvatar
} from '../scripts/const/constants.js'

import { api } from '../scripts/components/Api.js'

let userId;


/* function loading(status, popupForm, text) {
  if(status) {
    popupForm.queryselector('.popup__button').textContent = text;
  } else {
    popupForm.queryselector('.popup__button').textContent = text
  }
} */


/* const popupImages = document.querySelector('#popupProfileImages') */



/* api.getCards()
  .then(cardList => {
    cardList.forEach(data => {
      const card = createCard(
        {
          name: data.name,
          link: data.link,
          likes: data.likes,
          id: data._id,
          userId: userId,
          ownerId: data.owner._id
        }
      )
      section.addItem(card)
    });
  })
  .catch(err => console.log(err)) */

function loader({ form, fetcher, loadingText }) {
  const submitButton = form.querySelector('.popup__button')
  const initialText = submitButton.value
  submitButton.value = loadingText
  fetcher()
    .finally(() => {
      submitButton.value = initialText
    })

}

function handleProfileFormSubmit(item) {
  const { AboutMe, name } = item

  loader({
    form: popupEditForm,
    fetcher: () =>
      api.editProfile(name, AboutMe)
        .then(() => {
          userInfo.setUserInfo({ title: name, job: AboutMe })
          editProfilePopup.close()
        })
        .catch(err => console.log(err))
    ,
    loadingText: 'Сохранение...'
  })
}

function addCard(item) {

  /* loading(true, popupImages, 'Создание....') */

  loader({
    form: popupAddForm,
    fetcher: () =>
      api.addNewCard(item['title'], item.link)
        .then(res => {
          const card = createCard(
            {
              name: res.name,
              link: res.link,
              likes: res.likes,
              id: res._id,
              userId: userId,
              ownerId: res.owner._id
            })
          section.addItem(card)
          addCardPopup.close()
        })
        .catch(err => console.log(err))
    ,
    loadingText: 'Создание...'
  })

}

const editProfileAvatarPopup = new PopupWithForm('#popupEditAvatar', (item) => {
  loader({
    form: popupEditAvatarForm,
    fetcher: () =>
      api.editAvatar(item.link)
        .then(({ avatar }) => {
          userInfo.setUserInfo({ avatar })
          editProfileAvatarPopup.close()
        })
        .catch(err => console.log(err))
    ,
    loadingText: 'Сохранение...'
  })

})

function createCard(item) {
  const card = new Card(item,
    '#elementTemplate',
    () => { imagePopup.open(item.name, item.link, item.likes, item._id, userId, item.ownerId) },
    (id, cards) => {
      confirmPopup.open()
      confirmPopup.changeSubmitHandler(() => {
        api.deleteCard(id)
          .then(() => {
            card.deleteCard(cards)
            confirmPopup.close()
          })
          .catch(err => console.log(err))
      })
    },
    (id, like) => {
      if (card.isLiked()) {
        api.deleteLike(id)
          .then(res => {
            card.setLikes(res.likes, like)
          })
          .catch(err => console.log(err))
      }
      else {
        api.addLike(id, like)
          .then(res => {

            card.setLikes(res.likes, like)
          })
          .catch(err => console.log(err))
      }
    }
  )
  return card.createCard()
}



/* api.getProfile()
  .then(res => {
    userInfo.setUserInfo({ title: res.name, job: res.about, avatar: res.avatar })
    userId = res._id
  })
  .catch(err => console.log(err)) */



const editProfileValidator = new FormValidator(validationConfig, popupEditForm)
const addCardValidator = new FormValidator(validationConfig, popupAddForm)
const editProfileAvatarValidator = new FormValidator(validationConfig, popupEditAvatarForm)

addCardValidator.enableValidation()
editProfileValidator.enableValidation()
editProfileAvatarValidator.enableValidation()

profileOpenPopupButton.addEventListener('click', () => {
  editProfileValidator.resetValidation()
  const item = userInfo.getUserInfo()
  nameInput.value = item.name;
  jobInput.value = item.job;
  editProfilePopup.open()
});


profileOpenPopupAvatarButton.addEventListener('click', () => {
  editProfileAvatarValidator.resetValidation()
  const item = userInfo.getUserInfo()
  nameAvatar.value = item.avatar
  editProfileAvatarPopup.open()
})


profileImagesAddButton.addEventListener('click', () => {
  addCardValidator.resetValidation()
  addCardPopup.open()
}
);

const section = new Section({ items: [], renderer: createCard }, elements)/* initialCards */
const imagePopup = new PopupWithImage('#popupImages')
const addCardPopup = new PopupWithForm('#popupProfileImages', addCard)
const editProfilePopup = new PopupWithForm('#popupProfile', handleProfileFormSubmit)


const confirmPopup = new PopupWithForm('#popup_type_delete-confirm')



editProfileAvatarPopup.setEventListeners()



imagePopup.setEventListeners()
addCardPopup.setEventListeners()
editProfilePopup.setEventListeners()
confirmPopup.setEventListeners()

const userInfo = new UserInfo({ profileNameSelector: '.profile__title', profileJobSelector: '.profile__text', profileAvatarSelector: '.profile__logo' })


Promise.all([api.getProfile(), api.getCards()])
  .then(([res, cards]) => {
    userInfo.setUserInfo({ title: res.name, job: res.about, avatar: res.avatar })
    userId = res._id
    cards.forEach(data => {
      const card = createCard(
        {
          name: data.name,
          link: data.link,
          likes: data.likes,
          id: data._id,
          userId: userId,
          ownerId: data.owner._id
        }
      )
      section.addItem(card)
    });
  })
  .catch(err => console.log(err))
