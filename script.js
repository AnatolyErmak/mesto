const addButton = document.querySelector(".profile__edit-btn");
const popUp = document.querySelector(".popup");
const popupClose = document.querySelector(".popup__close-btn");
// выбираем форму ввода имени в попапе
const nameInput = document.querySelector(".popup__name");
const jobInput = document.querySelector(".popup__about");
// Выберите элементы, куда должны быть вставлены значения полей
const name = document.querySelector(".profile__name");
const job = document.querySelector(".profile__about");

function edit() {
  popUp.classList.add("popup_opened");
}

function close() {
  popUp.classList.remove("popup_opened");
}

addButton.addEventListener("click", edit);
popupClose.addEventListener("click", close);

// Находим форму в DOM
const formElement = document.querySelector("form");
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  // Вставьте новые значения с помощью textContent
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  // Закрываем попап
  close();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);
