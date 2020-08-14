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

    // функция вешает слушатели
    _setEventListeners(){
        super._setEventListeners(); // наследуем метод из Popup.js
        this._submit = this._handleSubmitForm.bind(this); // забиндил контекст
        this._popup.querySelector('form').addEventListener('submit', this._submit); // добавил колбэк
    }

    // функция обработки отправки формы

    _handleSubmitForm(evt){ 
        evt.preventDefault(); // отменяем привычное 
        this._formSubmit(this._getInputValues()); // отправляем данные с импутов
        this.close(); // закрываем форму при sumbit
    }

    close(){
        super.close();
        this._popup.querySelector('form').reset(); // при закртыии сбрасываем форму
        this._popup.querySelector('form').removeEventListener('submit', this._submit); // удаляем слушатель
    }
}