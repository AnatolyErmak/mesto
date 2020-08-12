// создаём класс, который отвечает за открытие и закрытие попапа
export default class Popup {
    // Принимает в конструктор единственный параметр — селектор попапа
    constructor(selector){
    // находим в DOM селектор
        this._popup = document.querySelector(selector);
    }
    // метод открытия попапа
    open() {
        this._popup.classList.add('popup_opened');
        this._setEventListeners();
    }
    // метод закрытия попапа
    close(){
        this._popup.classList.remove('popup_opened');
    }
    // метод, который содержит логику закрытия попапа клавишей Esc.
    _handleEscClose(evt){
        if (evt.key === "Escape"){
            this.close();
        }
    }
    // метод, который добавляет слушатель клика иконке закрытия попапа
    _setEventListeners(){
        this._popup.addEventListener('click', (evt) => {
            if (evt.target === this._popup){
                this.close();
            }
            if (evt.target.classList.contains('popup__close-btn')){
                this.close();
            }
        });
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    }
}