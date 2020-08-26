import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupElement, popupName, popupLink) {
        super(popupElement);
        this._popupName = popupName;
        this._popupLink = popupLink;
    }

    open(data) {
        this._popupName.textContent = data.name
        this._popupLink.src = data.link
        this._popupLink.alt = data.name
        super.open();
    }
}