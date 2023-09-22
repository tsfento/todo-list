const body = document.body;
const input = document.querySelector('input[type=text]');
const overlay = document.querySelector('.overlay');

function showFloater() {
    body.classList.add('show-floater');
}

function closeFloater() {
    if (body.classList.contains('show-floater')) {
        body.classList.remove('show-floater');
    }
}

input.addEventListener('focusin', showFloater);
overlay.addEventListener('click', closeFloater);

const todoList = document.querySelector('.todo-list');
const doneList = document.querySelector('.done-list');
const todoForm = document.querySelector('.todo-form');
const todoInput = todoForm.querySelector('input[type=text');
const todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];
const doneItems = JSON.parse(localStorage.getItem('doneItems')) || [];

function createTodo(e) {
    e.preventDefault();

    if (!todoInput.value) {
        alert('Please enter some text.');
        return;
    }

    const todoText = todoInput.value;
    todoItems.push(todoText);
    fillTodoList(todoItems);
    storeTodos(todoItems);
    todoForm.reset();
}

function fillTodoList(todoItems = []) {
    const inputHtml = todoItems.map((todo, i) => {
        return `
        <div class="item" data-id=${i}>
            <p class="item-text">${todo}</p>
            <span class="bi bi-x-circle remove-todo"></span>
            <span class="bi bi-check-square-fill complete"></span>
        </div>`;
    }).join('');

    todoList.innerHTML = inputHtml;
}

function fillDoneList(doneItems = []) {
    const inputHtml = doneItems.map((done, i) => {
        return `
        <div class="item" data-id=${i}>
            <p class="item-text">${done}</p>
            <span class="bi bi-x-circle remove-done"></span>
        </div>`;
    }).join('');

    doneList.innerHTML = inputHtml;
}

function completeTodo(e) {
    if (!e.target.matches('.complete')) return;

    const index = e.target.parentNode.dataset.id;
    
    const todoToComplete = todoItems.splice(index, 1);
    doneItems.push(todoToComplete);
    fillDoneList(doneItems);
    fillTodoList(todoItems);
    storeTodos(todoItems);
    storeDones(doneItems);
}

function removeItem(e) {
    if (!e.target.matches('.remove-todo') && !e.target.matches('.remove-done')) return;

    const index = e.target.parentNode.dataset.id;

    if (e.target.matches('.remove-todo')) {
        todoItems.splice(index, 1);
        fillTodoList(todoItems);
        storeTodos(todoItems);
    }

    if (e.target.matches('.remove-done')) {
        doneItems.splice(index, 1);
        fillDoneList(doneItems);
        storeDones(doneItems);
    }
}

function storeTodos(todoItems = []) {
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

function storeDones(doneItems = []) {
    localStorage.setItem('doneItems', JSON.stringify(doneItems));
}

fillTodoList(todoItems);
fillDoneList(doneItems);

todoForm.addEventListener('submit', (e) => {
    createTodo(e);
    closeFloater(e);
});
todoList.addEventListener('click', removeItem);
doneList.addEventListener('click', removeItem);
todoList.addEventListener('click', completeTodo);