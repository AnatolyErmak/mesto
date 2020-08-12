import {popupImage, spanError, formInput,  forms, formElement} from './constants.js';
import FormValidator from '../components/FormValidator.js';

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
 
  if (element === formElement) { // если элемент равен папапу 
    button.disabled = false; // делаем кнопку активной  
    button.classList.remove("popup__save-btn_inactive"); // убираем статус неактивной 
  } 
}

// Функция находящая формы и запускающая валидацию

export function startFormValidation() {
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