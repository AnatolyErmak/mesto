export const editButton = document.querySelector(".profile__edit-btn"); // выбираем кнопкну редактировать в профиле
export const nameInput = document.querySelector(".popup__field_name"); // форма ввода имени в попапе редактирования профиля
export const jobInput = document.querySelector(".popup__field_about"); // форма ввода о себе в попапе редактирования профиля
export const formElement = document.querySelector(".popup__content"); // находим форму редактирования профиля в DOM
export const addButton = document.querySelector(".profile__add-btn"); // кнопка добавления карточки в DOM
export const popupAddCard = document.querySelector(".popup_card"); // блок попап добавления карточки в DOM
export const popupImage = document.querySelector(".popup_image"); // попап с картинкой
export const formInput = Array.from(document.querySelectorAll('.popup__field')); // массив всех инпутов
export const spanError = Array.from(document.querySelectorAll('.popup__span-error')); // создаём массив спанов с ошибкой
export const forms = Array.from(document.querySelectorAll('.popup__content')); // массив форм