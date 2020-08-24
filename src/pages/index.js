import '../pages/index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';
import PopupDelete from '../components/PopupDelete.js';
import {
  editButton,
  nameInput,
  jobInput,
  addButton,
  editAvatar
} from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js'
import UserInfo from '../components/UserInfo.js';

// хранитель данных пользователя
let profileInfo;

// создаём экземпляр класса UserINfo

const userInfo = new UserInfo({name: '.profile__name',job: '.profile__about',avatar: '.profile__avatar'});

// создаём экземпляр класса API

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '13de1ca2-8912-41c4-9088-2a3599664c41',
    'Content-Type': 'application/json'
  }
});

// создаем экземпляр попапа для редактировать профиль

const profilePopup = new PopupWithForm('.popup', (formData) => {
  profilePopup.setLoadingButtonText();
  //Записываем данные на страницу
  api.setUserInfo(formData) // отправляем данные о профиле на сервер
    .then(data => userInfo.setUserInfo(data))
    .then(() => profilePopup.close())
    .catch((err) => {
      profilePopup.setDefaultButtonText();
      console.log(err)
    })
});
profilePopup.setEventListeners();

// создаём экземпляр попапа для редактирования аватара

const avatarPopup = new PopupWithForm('.popup__avatar', (formData) => {
  avatarPopup.setLoadingButtonText();
  api.setUserAvatar(formData)
      .then((data) => {
          userInfo.setUserAvatar(data);
      })
      .then(() => avatarPopup.close())
      .catch((err) => {
          avatarPopup.setDefaultButtonText();
          console.log(err)
      })
});


// слушатель на редактирование аватара

avatarPopup.setEventListeners();
editAvatar.addEventListener('click', () => {
    editAvatarValidation.formErrorsReset();
    avatarPopup.setDefaultButtonText();
    avatarPopup.open();
})

// создаём экземпляр класса попапа удаления карточки

const deleteCardPopup = new PopupDelete('.popup_delete', (data, card) => {
  api.deleteCard(data._id)
  .then(() => {
  card.cardDelete();
  })
  .then(() => deleteCardPopup.close())
  .catch(err => console.log(err))
}); 
  deleteCardPopup.setEventListeners();

//создаём экземпляр класса Section для отрисовки элементов.
const sectionRender= new Section({
  //запускаем функцию создния карточки 
  renderer: (data) => {
  //создаём экземпляр класса Card с данными из формы   
  const card = new Card(data,
      () => imagePopup.open(data),
      '#template',
      () => api.putLike(data._id),
      () => api.deleteLike(data._id),
      () => {
          deleteCardPopup.setCard(data, card);
          deleteCardPopup.open();
      },
      profileInfo);
  //Вставляем карточку в контейнер
  sectionRender.addItem(card.generateCard());
}}, '.elements');

// Ловим клик по кнопке редактирования профиля   
editButton.addEventListener('click', () => {
  profilePopup.setDefaultButtonText();
  //очищаем ошибки валидации в форме
  profileValidation.formErrorsReset();
  //записываем данные в форму попапа
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
  //открываем попап
  profilePopup.open();
}); 


// создаём экземпляр класса попапа с картинкой
const imagePopup = new PopupWithImage('.popup_image');
imagePopup.setEventListeners();

// создаём экземпляр попапа для добавленя картоки
const addCardPopup = new PopupWithForm('.popup_card', (formData) => {
  // получаем данные через API и отрисовываем карточку
  addCardPopup.setLoadingButtonText();
  api.postNewCard(formData)
      .then((data) => sectionRender.renderItems([data]))
      .then (() => addCardPopup.close())
      .catch((err) => {
          addCardPopup.setDefaultButtonText();
          console.log(err)
      });
      
});
addCardPopup.setEventListeners();

// ловим клик по кнопке добавления карточки
addButton.addEventListener('click', () => {
  addCardPopup.setDefaultButtonText();
  //очищаем ошибки в форме
  addCardValidation.formErrorsReset();
  //открываем попап
  addCardPopup.open();
});

// создаем экземпляры класса для валидации и вызываем методы для запуска валидации на формах.
const profileValidation = new FormValidator({              
  formSelector: '#profile-form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__field_error', 
  errorClass: 'popup__span-error_active' 
});
profileValidation.enableValidation();

const addCardValidation = new FormValidator({              
  formSelector: '#card-form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__field_error',
  errorClass: 'popup__span-error_active'
});
addCardValidation.enableValidation();

const editAvatarValidation = new FormValidator({              
  formSelector: '.popup__avatar',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__field_error',
  errorClass: 'popup__span-error_active'
});
editAvatarValidation.enableValidation();

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then((value) => {
        profileInfo = value[0];
        userInfo.setUserInfo(value[0]);
        userInfo.setUserAvatar(value[0]);
        sectionRender.renderItems(value[1]);
    })
    .catch(err => console.log(err));