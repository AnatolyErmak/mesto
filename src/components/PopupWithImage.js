import Popup from './Popup.js';

// вставляет в попап картинку и атрибут src изображения и подпись к картинке
export default class PopupWithImage extends Popup {
    open(evt){
        super.open();
        this._popup.querySelector('.popup__image').src = evt.target.src;
        this._popup.querySelector('.popup__text').textContent = evt.target.alt;
    }
}