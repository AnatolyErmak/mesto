export const editButton = document.querySelector(".profile__edit-btn"); // выбираем кнопкну редактировать в профиле
export const nameInput = document.querySelector(".popup__field_name"); // форма ввода имени в попапе редактирования профиля
export const jobInput = document.querySelector(".popup__field_about"); // форма ввода о себе в попапе редактирования профиля
export const addButton = document.querySelector(".profile__add-btn"); // кнопка добавления карточки в DOM
export const editAvatar = document.querySelector('.profile__img-hover');
export const formElements = {
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__save-btn_inactive',
    inputErrorClass: 'popup__field_error',
    errorClass: 'popup__span-error_active'
};
export const popupImage = document.querySelector('.popup_image'); // попап с картинкой
export const popupLink = document.querySelector('.popup__image-link');
export const popupName = document.querySelector('.popup__text');

export const profilePopupForm = document.querySelector('#profile-form'); //форма

export const profilePopupAddCard = document.querySelector('#card-form');

export const profilePopupAvatar = document.querySelector('#avatar-form');