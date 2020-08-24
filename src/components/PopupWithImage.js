import Popup from './Popup.js';

// вставляет в попап картинку и атрибут src изображения и подпись к картинке
export default class PopupWithImage extends Popup {
    open({link, name}){
        super.open();
        this._popup.querySelector('.popup__image').src = link;
        this._popup.querySelector('.popup__text').textContent = name;
    }
}