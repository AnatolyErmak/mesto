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
const popupAddCard = document.querySelector(".popup-addcard"); // блок попап добавления карточки в DOM
const cardPopupCloseBtn = document.querySelector(".popup-addcard__close-btn"); // кнопка закрытия попапа добавления карточкив DOM
const cardName = document.querySelector(".popup-addcard__field_name"); // поле имени картинки попапа добавление карточки в DOM
const cardUrl = document.querySelector(".popup-addcard__field_about"); // поле добавления ссылки на картинкинку ПДК в DOM
const cardSaveBtn = document.querySelector(".popup-addcard__save-btn"); // кнопки сохранения карточки ПДК в DOM
const formCardElement = document.querySelector(".popup-addcard__content"); // ПДК в DOM
const popupImage = document.querySelector(".popup-image"); // попап с картинкой
const popupImageCloseBtn = document.querySelector(".popup-image__close-btn"); // закрытие попапа с картинкой

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

// функция открытия и закрытия Попапов

function togglePopup(elem) {
  elem.classList.toggle("popup_opened");
}

// функция создания новой карточки

function addElement(item) {
  const template = document.querySelector("#template").content; // находим в DOM шаблон с карточкой.
  const elementsItem = template.cloneNode(true); // клонируем шаблон карточки
  const cardDeleteBtn = elementsItem.querySelector(".element__trash"); // Находим кнопку удаления
  const likeBtn = elementsItem.querySelector(".element__action"); // Находим кнопку лайк.
  const cardImg = elementsItem.querySelector(".element__image"); // выбрали картинку
  const cardTitle = elementsItem.querySelector(".element__title"); // выбрали текст картинки

  cardImg.src = item.link; // Добавляем ссылку на картинку из массива
  cardTitle.textContent = item.name; // Добавляем заголовок из массива

  cardImg.addEventListener("click", function () {
    togglePopup(popupImage); // открываем попап с картинкой.
    popupImage.querySelector(".popup-image__image").src = item.link; // добавляем URL картинки
    popupImage.querySelector(".popup-image__text").textContent = item.name; // добавляем заголовок
  });

  cardDeleteBtn.addEventListener("click", function (evt) {
    // Добавляем кнопке удаления слушатель с функцией удаления карточки
    evt.target.parentElement.remove();
  });

  likeBtn.addEventListener("click", function (evt) {
    // Добавляем кнопке лайк слушатель с функцией постановки лайка
    evt.target.classList.toggle("element__action_active");
  });

  elements.prepend(elementsItem); // выводим на страницу новую карточку


};

initialCards.forEach(addElement);

// Обработчик  формы редактирования профиля
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.                                                
  
  name.textContent = nameInput.value; // вставляем имя в профиль из формы ввода.
  job.textContent = jobInput.value; // вставляем профессию в профиль из формы ввода.
  
  togglePopup(popUp); // Закрываем попап
};

// Функция создания добавления нового объекта в массив из формы добавления новой карточки.

function userAddElemnt (evt) {
  evt.preventDefault();   // отменяем стандартный сабмит для формы.
  const newCardData = {};  // создём новый объект
  newCardData.name = cardName.value; // Записываем в имя объекта название из поля ввода имени в форме
  newCardData.link = cardUrl.value; // Записываем ссылку в объект из поля вводы ссылки в форме
  initialCards.push(newCardData); // вставляем объект в конец массива с карточками
  addElement(initialCards[initialCards.length -1]); // вызываем функцию создания карточки и вставляем данные из последнего объекта массива.
  togglePopup(popupAddCard); // вызываем функцию закрытия формы добавления карточки
};

formElement.addEventListener('submit', formSubmitHandler); // слушатель события “submit” - «отправка» в форме редактирования профиля.

editButton.addEventListener('click', () => togglePopup(popUp)); // ловим клик по кнопке редактирования и открываем popup

popupClose.addEventListener('click', () => togglePopup(popUp)); // ловим клик по кнопке закрытия попапа и закрываем его функцией     

formCardElement.addEventListener('submit', userAddElemnt); // навешиваем слушатель события сабмит на форму добавения карточки.
 
addButton.addEventListener('click', () => togglePopup(popupAddCard)); // Слушатель клика для кнопки добавить карточку в профиле пользователя.

cardPopupCloseBtn.addEventListener('click', () => togglePopup(popupAddCard)); // Слушатель кника для кнопки закрытия попапа редактирования карточки.

popupImageCloseBtn.addEventListener('click',  () => togglePopup(popupImage)); //  Слушатель клика для закрытия попапа с картинкой по кнопке закрыть.
