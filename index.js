import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

const editButton = document.querySelector(".profile__edit-btn"); // выбираем кнопкну редактировать в профиле
const popUp = document.querySelector(".popup"); // выбираем блок попап для редактирования профиля
const popupClose = document.querySelector(".popup__close-btn"); // кнопка закрытия формы редактирования профиля
const nameInput = document.querySelector(".popup__field_name"); // форма ввода имени в попапе редактирования профиля
const jobInput = document.querySelector(".popup__field_about"); // форма ввода о себе в попапе редактирования профиля
const name = document.querySelector(".profile__name"); // выбор имени в профиле
const job = document.querySelector(".profile__about"); // Выбор профессии в профиле
const formElement = document.querySelector(".popup__content"); // находим форму редактирования профиля в DOM
const elements = document.querySelector(".elements"); // находим в DOM блок element
const addButton = document.querySelector(".profile__add-btn"); // кнопка добавления карточки в DOM
const popupAddCard = document.querySelector(".popup_card"); // блок попап добавления карточки в DOM
const cardPopupCloseBtn = document.querySelector("#cardPopupCloseBtn"); // кнопка закрытия попапа добавления карточкив DOM
const cardName = document.querySelector("#cardName"); // поле имени картинки попапа добавление карточки в DOM
const cardUrl = document.querySelector("#cardUrl"); // поле добавления ссылки на картинкинку ПДК в DOM
const formCardElement = document.querySelector("#formCardElement"); // ПДК в DOM
export const popupImage = document.querySelector(".popup_image"); // попап с картинкой
const popupImageCloseBtn = document.querySelector("#popupImageCloseBtn"); // закрытие попапа с картинкой
const popups = Array.from(document.querySelectorAll(".popup")); // массив всех попапов для закрытия по еск
const forms = Array.from(document.querySelectorAll('.popup__content')); // массив форм

// первоначальный массив, который должен загружаться на страницу

 const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// функция закрузки первых 6 карточке нашего массива

function render () {	
  initialCards.forEach(({link, name}) => {	
     const cardsArray = new Card({link, name}, '#template');	
     elements.append(cardsArray.generateCard()); 	
  });	
}    

// Функция закрытия по эскейп метод find

function escapeclose (evt) {
  if (evt.key === "Escape") {
    const popup = popups.find(function (popup) {
      return popup.classList.contains("popup_opened");
    });
    closepops(popup);
  }
};

// Функция закртия попапов
function closepops(elem) {
  elem.classList.remove("popup_opened");
  document.removeEventListener("keydown", escapeclose);
  elem.removeEventListener('click' , popupEventHandler);
};

// функция определения кликов на попапе
function popupEventHandler (evt) { 
  if (evt.target.classList.contains('popup')) {    // если клик по оверлею 
    closepops(evt.target) 
  }   
  if (evt.target.classList.contains('popup__close-btn')) {   // если клик по кнопке закрыть 
    closepops(evt.target.closest('.popup')); 
  } 
} 

// функция добавления слушателей на попап

function addPopupCloseListener (elem) { 
  document.addEventListener('keydown', escapeclose);   // устанавливаем слушатель esc 
  elem.addEventListener('click', popupEventHandler);  // устанавливаем слушатель кликов 
} 

// функция открытия попапов 

export function openAnyPopup(elem) {  // необходимый попап
  addPopupCloseListener(elem); // установка слушателей закрытия попапов
  clearErrors(elem);  // очистка ошибок формы
  elem.classList.add("popup_opened"); // удаление/добавление модификатора у нужного попапа
}

// Функция находящая формы и запускающая валидацию

function startFormValidation() {
  forms.forEach((form) => {
    const originalValid = new FormValidator({  // создаем экзмпляр класса валидации
     formSelector: '.popup__content',
     inputSelector: '.popup__field',
     submitButtonSelector: '.popup__save-btn',
     inactiveButtonClass: 'popup__save-btn_inactive',
     inputErrorClass: 'popup__field_error',
     errorClass: 'popup__span-error_active'
     }, form)

     originalValid.enableValidation() //вызываем в экземпляре метод с запуском процесса валидации
  })
}
  
// Функция закрытия по оверлэй метод forEach

popups.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target === popup) {
      openAnyPopup(popup);
    }
  });
});

// Обработчик  формы редактирования профиля
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  name.textContent = nameInput.value; // вставляем имя в профиль из формы ввода.
  job.textContent = jobInput.value; // вставляем профессию в профиль из формы ввода.

  closepops(popUp); // Закрываем попап
}

// Функция создания добавления нового объекта в массив из формы добавления новой карточки.

function userAddElemnt(evt) {
  evt.preventDefault(); // отменяем стандартный сабмит для формы.
  const obj = {}; // создаём новый объект
  obj.link = cardUrl.value // записываем в объект ключ link со значением из поля ввода ссылки
  obj.name = cardName.value // записываем в объект ключ name со значением из поля ввода названия
  const originalCard = new Card(obj, '#template') // создать экземляр класса Card
  elements.prepend(originalCard.generateCard()) // вызываем функцию генерации карточки, вставляем данные и выводим на
  closepops(popupAddCard); // вызываем функцию закрытия формы добавления карточки
  popupAddCard.querySelector('.popup__content').reset()
}

// Функция удаления ошибок для попапов

function clearErrors(element) {
  if (element === popupImage) {  // если выбран попап с картинкой код останавливается
      return 
    }
  const inputlist = element.querySelectorAll(".popup__field"); // выбираем все импуты
  const spanlist = element.querySelectorAll(".popup__span-error"); // выбираем все спаны
  const button = element.querySelector(".popup__save-btn");
  inputlist.forEach((input) => input.classList.remove("popup__field_error")); // проходим методом forEach каждый импут и удаляем модификатор ошибки
  spanlist.forEach((span) => {
    span.classList.remove("popup__span-error_active");
    span.textContent = "";
  }); // проходим методом forEach каждый спан и удаляем модификатор ошибки
  button.disabled = true;  // дизэйблим кнопку
  button.classList.add("popup__save-btn_inactive"); // делаем кнопну неактивной

  if (element === popUp) { // если элемент равен папапу
    button.disabled = false; // делаем кнопку активной 
    button.classList.remove("popup__save-btn_inactive"); // убираем статус неактивной
  }
}


// устанавливаем слушатели и вызываем нужные функции


formElement.addEventListener("submit", formSubmitHandler); // слушатель события “submit” - «отправка» в форме редактирования профиля.

editButton.addEventListener("click", () => {
  clearErrors(popUp);
  openAnyPopup(popUp);
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}); // ловим клик по кнопке редактирования и открываем popup

popupClose.addEventListener("click", () => closepops(popUp)); // ловим клик по кнопке закрытия попапа и закрываем его функцией

formCardElement.addEventListener("submit", userAddElemnt); // навешиваем слушатель события сабмит на форму добавения карточки.

addButton.addEventListener("click", () => {
  clearErrors(popupAddCard);
  openAnyPopup(popupAddCard);
}); // Слушатель клика для кнопки добавить карточку в профиле пользователя.

cardPopupCloseBtn.addEventListener("click", () => closepops(popupAddCard)); // Слушатель клика для кнопки закрытия попапа редактирования карточки.

popupImageCloseBtn.addEventListener("click", () => closepops(popupImage)); //  Слушатель клика для закрытия попапа с картинкой по кнопке закрыть.

render ();

startFormValidation();

