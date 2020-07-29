import {popupImage, popUp, popups} from './constants.js'

// функция открытия попапов 

export function openAnyPopup(elem) {  // необходимый попап
    addPopupCloseListener(elem); // установка слушателей закрытия попапов
    clearErrors(elem);  // очистка ошибок формы
    elem.classList.add("popup_opened"); // удаление/добавление модификатора у нужного попапа
  }

// функция добавления слушателей на попап

function addPopupCloseListener (elem) { 
  document.addEventListener('keydown', escapeСlose);   // устанавливаем слушатель esc 
} 

// Функция закрытия по эскейп метод find

function escapeСlose (evt) {
  if (evt.key === "Escape") {
    const popup = popups.find(function (popup) {
      return popup.classList.contains("popup_opened");
    });
    closePopup(popup);
  }
}

// Функция закрытия попапов
export function closePopup (elem) {
  elem.classList.remove("popup_opened");
  document.removeEventListener("keydown", escapeСlose); 
}


// Функция удаления ошибок для попапов

export function clearErrors(element) {
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