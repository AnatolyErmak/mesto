import {addPopupCloseListener, clearErrors} from './index.js'

// функция открытия попапов 

export function openAnyPopup(elem) {  // необходимый попап
    addPopupCloseListener(elem); // установка слушателей закрытия попапов
    clearErrors(elem);  // очистка ошибок формы
    elem.classList.add("popup_opened"); // удаление/добавление модификатора у нужного попапа
  }

