  function showInputError ({inputErrorClass, errorClass}, formElement, inputElement, errorMessage) { 
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);       // выбираем спан элемнент куда выводим ошибку 
    inputElement.classList.add(inputErrorClass);                                   // добавляем полюю ввода модификатор со стилем ошибки 
    errorElement.textContent = errorMessage;                                           // выводим сообщение об ошибке в спан элемент 
    errorElement.classList.add(errorClass);                                        // Добавлем спану модификатор со стилем ошибки 
};
 
// функция для скрытия ошибки валидации 
 
function hideInputError ({inputErrorClass, errorClass}, formElement, inputElement) { 
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);        // выбираем спан элемнент куда выводим ошибку 
    inputElement.classList.remove(inputErrorClass);                                 // удаляем у поля ввода модификатор со стилем ошибки 
    errorElement.classList.remove(errorClass);                                      // удаляем у спана модификатор со стилем ошибки 
    errorElement.textContent = '';                                                      // убираем текст ошибки 
}; 
 
// функция проверяет корректность введеных данных 
 

function checkInputValidity ({inputErrorClass, errorClass}, formElement, inputElement) { 
    if(!inputElement.validity.valid) {                                                        // если поле ввода не валидно 
        showInputError({inputErrorClass, errorClass}, formElement, inputElement, inputElement.validationMessage);       // выводим функцию показа ошибки 
    } else {                                                                                  // если валидно 
        hideInputError({inputErrorClass, errorClass}, formElement, inputElement);                                       // выводим функцию спрятать ошибку 
    }; 
}; 
 
// функция возвращает информацию о наличии ошибки валидации 
 
function hasInvalidInput (inputList) { 
    return inputList.some((inputElement) => {                                               // проходим все ипуты до первого невалидного 
        return !inputElement.validity.valid;                                                // и возвращаем его 
    }); 
}; 
 
// функция включает и выключает кнопку отправить 
 
function toggleButtonState ({inactiveButtonClass}, inputList, buttonElement) { 
    if (hasInvalidInput(inputList)) {                                             // если есть невалидный импут 
        buttonElement.classList.add(inactiveButtonClass);                         // добавляем кнопке сабмит модификатор "неактивна" 
        buttonElement.disabled = true;                                            // добавляем кнопке атрибут disabled 
    } else {                                                                      // если все импуты валидны  
        buttonElement.classList.remove(inactiveButtonClass);                      // удаляем модификатор 
        buttonElement.disabled = false;                                           // убираем атрибут   
    }; 
} 
 
// функция устанавливает слушатели инпута на формы 
 
function setFormEventListeners ({submitButtonSelector, inputSelector, ...rest}, formElement) { 
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));        // создаём массив инпутов 
    const buttonElement = formElement.querySelector(submitButtonSelector);            // находим кнопку  сабмит 
 
    toggleButtonState(rest, inputList, buttonElement);                               // выключаем кнопку 
 
    inputList.forEach((inputElement) => {                                            // проходим по массиву инпутов 
        inputElement.addEventListener('input', function () {                         // каждому добавляем слушатель ввода 
            checkInputValidity (rest, formElement, inputElement);                    // функцию проверки игпутов и вывода ошибки  
            toggleButtonState (rest, inputList, buttonElement);                      // выключение кнопки 
        }); 
    }); 
}; 
 
// функция запускающая процесс валидации 
 
function enableValidation ({formSelector, ...rest}) { 
    
    const formList = Array.from(document.querySelectorAll(formSelector));          // получаем массив форм 
     
    formList.forEach((form) => {                                                   // каждой форме выполняем функцию навешивания слушателей 
        setFormEventListeners(rest, form); 
    }); 
 
}; 
 
// включаем валидацию вызовом функции 
 
enableValidation ({ 
    formSelector: '.popup__content', 
    inputSelector: '.popup__field', 
    submitButtonSelector: '.popup__save-btn', 
    inactiveButtonClass: 'popup__save-btn_inactive', 
    inputErrorClass: 'popup__field_error', 
    errorClass: 'popup__span-error_active' 
}); 


