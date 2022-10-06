let todoItems = [];

function renderTodo(todo) {
    const todoUL = document.querySelector('.ul');
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if(todo.deleted) {
        item.remove();
        return
    }

    const isChecked = todo.checked ? 'done': '';
    
    const todolist = document.createElement("li");
    todolist.setAttribute('class', `todo-item ${isChecked}`);
    todolist.setAttribute('data-key', todo.id)
    todolist.innerHTML = `
        <input type="checkbox" class="inputCheckbox" id="${todo.id}"/>
        <label for="${todo.id}" class="tick js-tick"></label>
        <span>${todo.todoText}</span>
        <button class="delete-todo js-delete-todo">
        <svg><use href="#delete-icon"</use></svg>
        </button>
    `;
    // If the item already exists in the DOM
    if (item){
        todoUL.replaceChild(todolist, item)
    } else{
        todoUL.append(todolist);
    }
}

function addTodo(text) {
    const todo = {
        todoText,
        checked: false,
        id: Date.now(),
    };
    todoItems.push(todo);
    renderTodo(todo);
    // console.log(todoItems);
};

const addBtn = document.querySelector('.addBtn');
addBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const todoInput = document.querySelector('.todoInput');

    todoText = todoInput.value.trim();
    if (todoText !== ''){
        addTodo(todoText);
        todoInput.value = '';
        todoInput.focus();
    }
});

function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;
    renderTodo(todoItems[index]);
} 

function deletTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    const todo = {
        deleted: true,
        ...todoItems[index]
    };
    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderTodo(todo)
}

const todoUL = document.querySelector('.ul');
todoUL.addEventListener('click', (e)=>{
    if (e.target.classList.contains('js-tick')){
        const itemKey = e.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }

    if (e.target.classList.contains('js-delete-todo')){
        const itemKey = e.target.parentElement.dataset.key;
        deletTodo(itemKey);
    }
})

// const check = document.querySelector(`#${todo.id}`);
// check.addEventListener('click', (e)=>{

// })
