import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor(selector, formSubmit){
        super(selector);
        this._formSubmit = formSubmit;
        this._submitButton = this._popup.querySelector('.popup__button');
        this._defaultButtonText = this._submitButton.textContent;
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
    setEventListeners(){
        super.setEventListeners(); // наследуем метод из Popup.js
        this._popup.querySelector('form').addEventListener('submit', (evt) => this._handleSubmitForm(evt));
    }

    // функция обработки отправки формы

    _handleSubmitForm(evt){ 
        evt.preventDefault(); // отменяем привычное 
        this._formSubmit(this._getInputValues()); // отправляем данные с импутов
    }

    setLoadingButtonText() {
        this._submitButton.textContent = 'Загрузка...';
    }

    setDefaultButtonText() {
        this._submitButton.textContent = this._defaultButtonText;
    }

    close(){
        super.close();
        this._popup.querySelector('form').reset(); // при закртыии сбрасываем форму
    }
}