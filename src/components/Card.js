export default class  Card {
  constructor( data ,handleCardClick , selector, putLike, deleteLike, deleteCard , userInfo) {

    this._link = data.link; 
    this._name = data.name;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner;

    this._handleCardClick = handleCardClick;
    this._selector = selector;
    this._putLike = putLike;
    this._deleteLike = deleteLike;
    this._deleteCard = deleteCard;
    this._userInfo = userInfo;
  }

// получаем карточку из шаблона
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
  if (evt.target.classList.contains('element__action_active')) {
      this._deleteLike(this._id)
        .then((res) => {
          evt.target.classList.remove('element__action_active');
          this._element.querySelector('.element__like-counter').textContent = res.likes.length;
        })
        .catch(err => console.log(err))        
      return;
  }
  this._putLike(this._id)
      .then((res) => {
        evt.target.classList.add('element__action_active'); // добавляем модификатор
        this._element.querySelector('.element__like-counter').textContent = res.likes.length;
      })
      .catch(err => console.log(err)) 
}

// Функция удаления карточки 

cardDelete() {
  this._element.remove(); // удаляем карточку
  this._element.removeEventListener('click', this._cardHandler) // удаляем слушатели
}

// обработчик кликов на  картинку, лайк  и удаление

_cardClickHandler(evt) {

  if (evt.target.classList.contains('element__action')) { // стоит лайк
    this._toggleLike(evt);
  }

  if (evt.target.classList.contains('element__image')) { // попап с картинкой
    this._handleCardClick({link : this._link, name: this._name});
  }

  if (evt.target.classList.contains('element__trash')){ // удаление
    this.openDeletePopup();
  }
}

// установить слушатель на карточку 

_setCardEventListeners(){
  this._cardHandler = this._cardClickHandler.bind(this);
  this._element.addEventListener('click', this._cardHandler);
}

// проверим отправителя карточки и спрячем корзину
_checkCardOwner () {
  if (this._userInfo._id === this._owner._id) { 
    return
  } else {
    this._element.querySelector('.element__trash').classList.add('element__trash_hidden');
  }
}

// добавляем модификатор и собственном лайке

_checkLikeOwner() {
  if (this._likes.find(data => data._id === this._userInfo._id)) {
    this._element.querySelector('.element__action').classList.add('element__action_active')
  }
}

openDeletePopup () {
    this._deleteCard();
}
// наполним карточку 

generateCard() {
  this._getCardTemplate();      // получаем разметку
  this._setCardEventListeners(); // ставим слушатели
  
  this._element.querySelector('.element__image').src = this._link; // вставляем картинку
  this._element.querySelector('.element__image').alt = this._name; // ставим атрибут alt
  this._element.querySelector('.element__title').textContent = this._name; // получаем название
  this._element.querySelector('.element__like-counter').textContent = this._likes.length; // счётчик лайков
  this._element.dataset.owner = this._owner._id; 
  this._element.id = this._id; // устанавливаем id
  this._checkCardOwner();
  this._checkLikeOwner();
  return this._element; // возвращаем готовую карточку
}
}






