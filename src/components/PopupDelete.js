import Popup from './Popup.js';

export default class PopupDelete extends Popup {
  constructor(popupSelector, Confirm) {
    super(popupSelector);
    this._Confirm = Confirm;
    this._submitEvent = evt => {
      evt.preventDefault();
      this._Confirm(this._card, this._cardClass);
    };
    this._popup.addEventListener('submit', this._submitEvent);
  }
  setCard(card, cardClass) {
    this._card = card;
    this._cardClass = cardClass;
  }
}