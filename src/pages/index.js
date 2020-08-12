import '../pages/index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage  from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {editButton, nameInput, jobInput, formElement, addButton, popupAddCard} from '../utils/constants.js';
import {initialCards} from '../utils/initialCards.js';
import {clearErrors, startFormValidation} from '../utils/utils.js';


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
// создаем экземпляр класса Section
  const userCard = new Section ({
// передаём ему объект с данными из полей ввода формы
  items: [formData],
// запускаем функцию создания карточки
  renderer: (data) => {
// создаём экземпляр класса Card с данными формы
  const card = new Card (data, (evt) => imagePopup.open(evt), '#template');
// вставляем карточку в контейнер
  userCard.addItem(card.generateCard());
  }}, '.elements');
// вызываем метод для отрисовки карточек
  userCard.renderItems();
  // закрываем попап
  imagePopup.close();
});

// ловим клик по кнопке добавления карточки

addButton.addEventListener('click', () => {
  clearErrors(popupAddCard);
  addCardPopup.open();
})

// Функция загрузки первоначальных 6 карточек на страницу из исходного массива

const cardList = new Section ({
  items: initialCards,
  renderer: (data) => {
    const card = new Card (data, (evt) => imagePopup.open(evt), '#template');
    cardList.addItem(card.generateCard());
  }}, '.elements'
);

cardList.renderItems();

startFormValidation();







































/* // функция закрузки первых 6 карточке нашего массива

function render () {	
  initialCards.forEach(({link, name}) => {	
     const cardsArray = new Card({link, name}, '#template');	
     elements.append(cardsArray.generateCard()); 	
  });	
}    

// Фунцкия закрытия по оверлэй

const closeByOverlay = (evt, popup) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(popup);
  }
}
  

// Обработчик  формы редактирования профиля
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  name.textContent = nameInput.value; // вставляем имя в профиль из формы ввода.
  job.textContent = jobInput.value; // вставляем профессию в профиль из формы ввода.

  closePopup(popUp); // Закрываем попап
}

// Функция создания добавления нового объекта в массив из формы добавления новой карточки.

function addNewCard(evt) {
  evt.preventDefault(); // отменяем стандартный сабмит для формы.
  const obj = {}; // создаём новый объект
  obj.link = cardUrl.value // записываем в объект ключ link со значением из поля ввода ссылки
  obj.name = cardName.value // записываем в объект ключ name со значением из поля ввода названия
  const originalCard = new Card(obj, '#template') // создать экземляр класса Card
  elements.prepend(originalCard.generateCard()) // вызываем функцию генерации карточки, вставляем данные и выводим на
  closePopup(popupAddCard); // вызываем функцию закрытия формы добавления карточки
  popupAddCard.querySelector('.popup__content').reset()
}

// устанавливаем слушатели и вызываем нужные функции

popUp.addEventListener ('click', function (evt) {    // закрыть основной попап по оверлей
  closeByOverlay(evt, popUp )
})
popupAddCard.addEventListener ('click', function (evt) { // закрыть  попап с карточкой  по оверлей
  closeByOverlay(evt, popupAddCard )
})
popupImage.addEventListener ('click', function (evt) { // закрыть  попап с картинкой  по оверлей
  closeByOverlay(evt, popupImage )
})

formElement.addEventListener("submit", formSubmitHandler); // слушатель события “submit” - «отправка» в форме редактирования профиля.

editButton.addEventListener("click", () => {
  clearErrors(popUp);
  openAnyPopup(popUp);
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}); // ловим клик по кнопке редактирования и открываем popup

popupClose.addEventListener("click", () => closePopup(popUp)); // ловим клик по кнопке закрытия попапа и закрываем его функцией

formCardElement.addEventListener("submit", addNewCard); // навешиваем слушатель события сабмит на форму добавения карточки.

addButton.addEventListener("click", () => {
  clearErrors(popupAddCard);
  openAnyPopup(popupAddCard);
}); // Слушатель клика для кнопки добавить карточку в профиле пользователя.

cardPopupCloseBtn.addEventListener("click", () => closePopup(popupAddCard)); // Слушатель клика для кнопки закрытия попапа редактирования карточки.

popupImageCloseBtn.addEventListener("click", () => closePopup(popupImage)); //  Слушатель клика для закрытия попапа с картинкой по кнопке закрыть.

render ();

startFormValidation(); */

