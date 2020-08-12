//import {popupImage} from '../utils/constants.js';  // импорт перемнной попапа
//import {openAnyPopup} from '../utils/utils.js'; // импорт функции для открытия попапа

export default class  Card {
  constructor( data ,handleCardClick , selector) {
    
    
    this._link = data.link; 
    this._name = data.name;
    this._handleCardClick = handleCardClick;
    this._selector = selector;
  }


  _getCardTemplate() {
    const elementsItem = document.
    querySelector(this._selector).
    content.
    querySelector('.element').
    cloneNode(true);
    this._element = elementsItem;
    return this._element;
  }


// функция отметки лайка 

_toggleLike(evt) {
  evt.target.classList.toggle('element__action_active'); // добавить или удалить модификатор
}

// Функция удаления карточки 

_cardDelete(evt) {
  evt.target.closest('.element').remove();
  this._element.removeEventListener('click', this._cardHandler)
}

// обработчик кликов на  картинку, лайк  и удаление

_cardClickHandler(evt) {

  if (evt.target.classList.contains('element__action')) {
    this._toggleLike(evt);
    
  }

  if (evt.target.classList.contains('element__image')) {
    this._handleCardClick(evt);
    
  }

  if (evt.target.classList.contains('element__trash')){
    this._cardDelete(evt);
    
  }
}

// установить слушатель на карточку 

_setCardEventListeners(){
  this._cardHandler = this._cardClickHandler.bind(this);
  this._element.addEventListener('click', this._cardHandler);
}

// наполним карточку 

generateCard() {
  this._getCardTemplate();      // получаем разметку
  this._setCardEventListeners(); // ставим слушатели

  this._image = this._element.querySelector('.element__image');
  this._image.src = this._link; // вставляем картинку
  this._image.alt = this._name; // ставим атрибут alt
  this._element.querySelector('.element__title').textContent = this._name; // получаем название
  

  return this._element; // возвращаем готовую карточку
}
}






