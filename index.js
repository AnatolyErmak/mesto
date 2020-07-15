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
const popupImage = document.querySelector(".popup_image"); // попап с картинкой
const popupImageCloseBtn = document.querySelector("#popupImageCloseBtn"); // закрытие попапа с картинкой
const template = document.querySelector("#template").content; // находим в DOM шаблон с карточкой.
const popups = Array.from(document.querySelectorAll(".popup")); // массив всех попапов для закрытия по еск

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

function open(elem) {
  addPopupCloseListener(elem);
  clearErrors(elem);
  elem.classList.add("popup_opened");

};


// Функция закрытия по оверлэй метод forEach

popups.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target === popup) {
      open(popup);
    }
  });
});


// функция создания новой карточки

function addElement(link, name) {
  const elementsItem = template.cloneNode(true); // клонируем шаблон карточки
  const cardDeleteBtn = elementsItem.querySelector(".element__trash"); // Находим кнопку удаления
  const likeBtn = elementsItem.querySelector(".element__action"); // Находим кнопку лайк.
  const cardImg = elementsItem.querySelector(".element__image"); // выбрали картинку
  const cardTitle = elementsItem.querySelector(".element__title"); // выбрали текст картинки

  cardImg.src = link; // Добавляем ссылку на картинку из массива
  cardImg.alt = name; // Добавляем картинке атрибут ALT
  cardTitle.textContent = name; // Добавляем заголовок из массива

  cardImg.addEventListener("click", function () {
    open(popupImage); // открываем попап с картинкой.
    popupImage.querySelector(".popup__image").src = link; // добавляем URL картинки
    popupImage.querySelector(".popup__text").textContent = name; // добавляем заголовок
  });

  cardDeleteBtn.addEventListener("click", function (evt) {
    // Добавляем кнопке удаления слушатель с функцией удаления карточки
    evt.target.closest(".element").remove();
  });

  likeBtn.addEventListener("click", function (evt) {
    // Добавляем кнопке лайк слушатель с функцией постановки лайка
    evt.target.classList.toggle("element__action_active");
  });

  return elementsItem;
}

function show() {
  initialCards.forEach(({ link, name }) =>
    elements.append(addElement(link, name))
  );
}


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
  elements.prepend(addElement(cardUrl.value, cardName.value)); // принименяем функцию addElemnt к значениям которые записал пользователь
  closepops(popupAddCard); // вызываем функцию закрытия формы добавления карточки
  popupAddCard.querySelector('.popup__content').reset()
}

formElement.addEventListener("submit", formSubmitHandler); // слушатель события “submit” - «отправка» в форме редактирования профиля.

editButton.addEventListener("click", () => {
  clearErrors(popUp);
  open(popUp);
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}); // ловим клик по кнопке редактирования и открываем popup

popupClose.addEventListener("click", () => closepops(popUp)); // ловим клик по кнопке закрытия попапа и закрываем его функцией

formCardElement.addEventListener("submit", userAddElemnt); // навешиваем слушатель события сабмит на форму добавения карточки.

addButton.addEventListener("click", () => {
  clearErrors(popupAddCard);
  open(popupAddCard);
}); // Слушатель клика для кнопки добавить карточку в профиле пользователя.

cardPopupCloseBtn.addEventListener("click", () => closepops(popupAddCard)); // Слушатель клика для кнопки закрытия попапа редактирования карточки.

popupImageCloseBtn.addEventListener("click", () => closepops(popupImage)); //  Слушатель клика для закрытия попапа с картинкой по кнопке закрыть.

show();

