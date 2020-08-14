import '../pages/index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage  from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {editButton, nameInput, jobInput, formElement, addButton, popupAddCard} from '../utils/constants.js';
import {initialCards} from '../utils/initialCards.js';
import {clearErrors, startFormValidation} from '../utils/utils.js';

// Отдельная функция  создания элемента карточки

function createElementsCard(data){
  const card = new Card (data, (evt) => imagePopup.open(evt), '#template');
  cardList.addItem(card.generateCard());
}

// Функция загрузки первоначальных 6 карточек на страницу из исходного массива

const cardList = new Section ({
  items: initialCards,
  renderer: (data) => {
    createElementsCard(data)
  }}, '.elements');

//создаем экземпляр UserInfo 
const userInfo = new UserInfo( {name: '.profile__name', job: '.profile__about'});

// создаем экземпляр попапа для редактировать профиль

const profilePopup = new PopupWithForm('.popup', (formData) => {
//Записываем данные на страницу
  userInfo.setUserInfo(formData); 
});

// ловим клик по кнопке редактиварония профиля

editButton.addEventListener('click', () => {
  // очищаем ошибки
  clearErrors(formElement);
  // получаем объект с данными пользователя со страницы
  const userData = userInfo.getUserInfo();
  // записываем данные в форму попапа
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  // отрокем попап
  profilePopup.open();
})

// создаём экземпляр класса попапа с картинкой

const imagePopup = new PopupWithImage('.popup_image');

// создаём экземпляр попапа для добавления карточки

const addCardPopup = new PopupWithForm ('.popup_card', (formData) => {
  createElementsCard(formData);
  // закрываем попап
  imagePopup.close();
});

// ловим клик по кнопке добавления карточки

addButton.addEventListener('click', () => {
  clearErrors(popupAddCard);
  addCardPopup.open();
})

cardList.renderItems();

startFormValidation();