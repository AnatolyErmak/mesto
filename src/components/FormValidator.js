export default class FormValidator {
    constructor(data, form) {

        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(data.inputSelector)) // массив инпутов
        this._submitButton = this._form.querySelector(data.submitButtonSelector) // кнопка сабмит
        this._inactiveButtonClass = data.inactiveButtonClass // модификатор неактив кнопки
        this._inputErrorClass = data.inputErrorClass // модификатор ввода ошибки
        this._errorClass = data.errorClass // модификатор спана с ошибкой
    }

    // функция показа ошибки валидации

    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`) // выбираем спан элемнент куда выводим ошибку
        inputElement.classList.add(this._inputErrorClass) // добавляем полюю ввода модификатор со стилем ошибки	
        errorElement.textContent = errorMessage // выводим сообщение об ошибке в спан элемент 
        errorElement.classList.add(this._errorClass) // Добавлем спану модификатор со стилем ошибки
    }

    // функция скрытия ошибки 

    _hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`) // выбираем спан элемнент куда выводим ошибку
        inputElement.classList.remove(this._inputErrorClass) // удаляем у поля ввода модификатор со стилем ошибки
        errorElement.classList.remove(this._errorClass) // удаляем у спана модификатор со стилем ошибки
        errorElement.textContent = '' // убираем текст ошибки	
    }

    // функция проверяет корректность введеных данных 

    _checkInputValidity(formElement, inputElement) {
        if (!inputElement.validity.valid) { // если поле ввода не валидно
            this._showInputError(formElement, inputElement, inputElement.validationMessage); // вызываем фукцию показа ошибки 
        } else {
            this._hideInputError(formElement, inputElement); // вызываем функцию скрытия ошибки
        };
    }


    // функция возвращает информацию о наличии ошибки валидации

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => { // проходимы все поля ввода до первого невалидного
            return !inputElement.validity.valid // возвращаем невалидный элемент
        })
    }

    // функция включает и выключает кнопку отправить

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) { // если есть невалидный импут 
            buttonElement.classList.add(this._inactiveButtonClass) // добавляем кнопке сабмит модификатор "неактивна" 
            buttonElement.disabled = true // добавляем кнопке атрибут disabled 
        } else { // если все поля валидны
            buttonElement.classList.remove(this._inactiveButtonClass) // удаляем модификатор
            buttonElement.disabled = false // убираем атрибут disabled
        }
    }

    // функция устанавливает слушатели инпута на формы 

    _setFormEventListeners(formElement) {
        this._inputList.forEach((inputElement) => { // проходим по массиву инпутов
            inputElement.addEventListener('input', () => { // каждому добавляем слушатель ввода
                this._checkInputValidity(formElement, inputElement); // функцию проверки игпутов и вывода ошибки 
                this._toggleButtonState(this._inputList, this._submitButton); // выключение кнопки
            });
        });
    }
    // сброс ошибкок
    formErrorsReset() {
        this._inputList.forEach((input) => input.classList.remove(this._inputErrorClass));
        const errors = Array.from(this._form.querySelectorAll('.popup__span-error'));
        errors.forEach((error) => {
            error.classList.remove(this._inputErrorClass);
            error.textContent = '';
        });
        if (this._form.classList.contains('popup__content-profile')) {
            this._submitButton.classList.remove(this._inactiveButtonClass); // удаляем модификатор
            this._submitButton.disabled = false;
            return;
        }
        this._toggleButtonState(this._inputList, this._submitButton);
    }


    // функция запускающая процесс валидации

    enableValidation() {
        this._setFormEventListeners(this._form);
    }

}