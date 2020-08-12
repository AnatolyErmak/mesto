import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor(selector, formSubmit){
        super(selector);
        this._formSubmit = formSubmit;
    }
    _getInputValues(){
        // берём все инпуты 
        this._inputList = this._popup.querySelectorAll('.popup__field');
        // создаём пустой объект
        this._formValues = {};
        // добавляем в этот объет значения всех полей
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
          });
        // возвращаем объект
        return this._formValues;
    }
    _setEventListeners(){
        super._setEventListeners();
        this._popup.querySelector('form').addEventListener('submit', (evt) =>{
            evt.preventDefault();
            this._formSubmit(this._getInputValues());
            this.close();

        }, {once: true}); 
    }
    close(){
        super.close();
        this._popup.querySelector('form').reset(); // при закртыии сбрасываем форму
    }
}