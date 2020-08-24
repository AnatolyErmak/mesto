// создаём класс который отвечает за отрисовку элементов на странице

export default class Section {
    // renderer — это функция ,которая отвечает за создание и отрисовку данных на странице
    // containerSelector - селектор контейнера, в который нужно добавлять созданные элементы
    constructor( {renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);                                 
    }
    // Содержит публичный метод, который отвечает за отрисовку всех элементов
    renderItems(renderedItems){
        renderedItems.reverse().forEach(item => this._renderer(item));   
    }

    // метод, который принимает DOM-элемент и добавляет его в контейнер.
    addItem(element) {
        this._container.prepend(element);
    }
}