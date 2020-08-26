import Popup from './Popup.js';

export default class PopupDelete extends Popup {
  constructor(popupSelector, delConfirm) {
    super(popupSelector);
    this._delConfirm = delConfirm;
    this._submitEvent = evt => {
      evt.preventDefault();
      this._delConfirm(this._card, this._cardClass);
    };
  }
  setCard(card, cardClass) {
    this._card = card;
    this._cardClass = cardClass;
  }

  setEventListeners() {
    this._popup.addEventListener('submit', this._submitEvent);
  }
}