// функция закрытия попапа по ESC 
function escHandler (evt) { 
    if (evt.key === 'Escape') {                             // если нажали на клавишу esc     
        popups.forEach((popup) => {                         // проходим по всем попапам 
            if(popup.classList.contains('popup_opened')) {  // если попап содержит модификатор _opened   
                closeAnyPop(popup);                         // закрываем этот попап 
            } 
        });     
    } 
} 
 
// функция закрытия попапов 
function closeAnyPop (elem) {             // elem = необходимый попап. 
    elem.classList.remove('popup_opened');  // удаление/добавление модификатора у нужного попапа. 
    document.removeEventListener('keydown', escHandler); // удаляем слушатель esc 
    elem.removeEventListener('click', popupEventHandler); // удляем слушатели  с попапа   
} 
 
// функция опредеения кликов на попапе 
function popupEventHandler (evt) { 
    if (evt.target.classList.contains('popup')) {    // если клик по оверлею 
         closeAnyPop(evt.target) 
    }   
    if (evt.target.classList.contains('popup__icon-close')) {   // если клик по кнопке закрыть 
        closeAnyPop(evt.target.closest('.popup')); 
    } 
} 
 
// функци добавленя слушателей на попап 
function addPopupCloseListener (elem) { 
    document.addEventListener('keydown', escHandler);   // устанавливаем слушатель esc 
    elem.addEventListener('click', popupEventHandler);  // устанавливаем слушатель кликов 
} 
 
// функция открытия попапов 
export function openAnyPop (elem) {             // elem = необходимый попап.  
    elem.classList.add('popup_opened');  // удаление/добавление модификатора у нужного попапа. 
    addPopupCloseListener (elem);   // установка слушателей закрытия попапов 
    errorClean (elem);    // очистка ошибок формы 
}