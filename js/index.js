import {editButton, popUp, popupClose, nameInput, jobInput, name, job, formElement, elements,
  addButton, popupAddCard, cardPopupCloseBtn, cardName, cardUrl, formCardElement, popupImage, popupImageCloseBtn,
  popups, forms} from './constants.js'
import {initialCards} from './initialCards.js'
import {openAnyPopup, closePopup, clearErrors} from './utils.js'
import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

// функция закрузки первых 6 карточке нашего массива

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

startFormValidation();

