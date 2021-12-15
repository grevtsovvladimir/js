/* Переключение панели элментов при нажатии на кнопку плюсик */
const addButtonElements = document.querySelectorAll('.add-btn');
const showMenu = function (evt) {
    const parentElement = evt.target.parentNode;
    const showMenuElement = parentElement.querySelector('.choose-elem');
    showMenuElement.classList.toggle('hidden');
}
addButtonElements.forEach(function (item) {
        return item.addEventListener('click', showMenu)
    }
);

/* Переключение шаблонов */
const changeLayout = function (evt) {
    const newLayout = evt.target.value;
    const layout = document.querySelector('.layout');
    layout.classList.remove('layout--landing');
    layout.classList.remove('layout--blog');
    layout.classList.remove('layout--shop');
    layout.classList.add('layout--' + newLayout)
};
document.querySelector('.grid-select').addEventListener('change', changeLayout);

/* Удаление элементов*/
const deleteButtonHandler = function (evt) {
    const element = evt.target.parentNode;
    const wrapper = element.parentNode;
    const block = wrapper.parentNode;
    element.remove();

    const wrapperButtons = wrapper.querySelectorAll('.element');
    if (wrapperButtons.length === 0) {

        if(block.classList.contains('header')){
            block.classList.add('header--empty');
        }
        if(block.classList.contains('content')){
            block.classList.add('content--empty');
        }

        if(block.classList.contains('footer')){
            block.classList.add('footer--empty');
        }
    }
};

/*Редактирование элементов*/

const editContentHandler = function (evt){
    const editedElement = evt.target;

    let currentValue;

    if (editedElement.tagName ==='IMG'){
        currentValue = editedElement.src;
    }   else     {
        let currentValue = editedElement.textContent;
    }

    const newValue = window.prompt('Введите новое значение!', currentValue);

    if (editedElement.tagName ==='IMG'){
        editedElement.src = newValue;
    } else {
        editedElement.textContent = newValue;
    }

    editedElement.textContent = newValue;



}




/* Добавление элементов */

const chooseButton = document.querySelectorAll('.choose-elem__btn');

const addElement = function (evt) {
    const clickedButton = evt.target; //найдём нажатую кнопку
    const addMenuElement = clickedButton.parentNode;
    addMenuElement.classList.add('hidden');

    const blockType = clickedButton.dataset.type;
    const blockContainer = clickedButton.dataset.container;

    const template = document.querySelector('#' + blockType + '-template').content;
    const clone = template.cloneNode(true);
    const blockElement = clone.querySelector('.element');

    const containerWrapper = document.querySelector('.' + blockContainer + '__elements-wrapper');
    containerWrapper.append(blockElement);

    if (blockContainer.includes('content')) {
        containerWrapper.parentElement.classList.remove('content--empty')
    } else {
        containerWrapper.parentElement.classList.remove(blockContainer + '--empty');
    }


    blockElement.querySelector('.delete-btn').addEventListener('click', deleteButtonHandler);
    blockElement.querySelector('.template-content').addEventListener('dblclick',editContentHandler);
};


chooseButton.forEach(function (item) {
    return item.addEventListener('click', addElement);
});


