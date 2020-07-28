import {popupImage,} from './index.js'; // импорт перемнной попапа
import {openAnyPopup} from './utils.js' // импорт функции для открытия попапа

export class Card {
  constructor(data, selector) {
    this._selector = selector;
    this._link = data.link;
    this._name = data.name;
    this._element = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
    this._image = this._element.querySelector('.element__image');
  }

// просмотр картинки в попапе

_showCardImage(evt) {
  document.querySelector('.popup__image').src = evt.target.src; // add url image
  document.querySelector('.popup__text').textContent = evt.target.alt; // add title
  openAnyPopup(popupImage);
}

// функция отметки лайка 

_toggleLike(evt) {
  evt.target.classList.toggle('element__action_active') // добавить или удалить модификатор
}

// Функция удаления карточки 

_cardDelete(evt) {
  evt.target.closest('.element').remove()
}

// обработчик кликов на  картинку, лайк  и удаление

_cardClickHandler(evt) {

  if (evt.target.classList.contains('element__action')) {
    this._toggleLike(evt);
    
  }

  if (evt.target.classList.contains('element__image')) {
    this._showCardImage(evt);
    
  }

  if (evt.target.classList.contains('element__trash')){
    this._cardDelete(evt);
    
  }
}

// установить слушатель на карточку 

_setCardEventListeners(){
  this._element.addEventListener('click', (evt) => this._cardClickHandler(evt))
}

// наполним карточку 

generateCard() {
  this._setCardEventListeners(); // ставим слушатели

  this._image.src = this._link; // вставляем картинку
  this._image.alt = this._name; // ставим атрибут alt
  
  this._element.querySelector('.element__title').textContent = this._name; // получаем название

  return this._element // возвращаем готовую карточку
}
}






