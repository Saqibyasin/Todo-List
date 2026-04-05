let todos = [];
let currentFilter = 'all';

const todoInput = document.getElementById('#todo-input');
const addButton = document.getElementById('#add-button');
const todoList = document.getElementById('#todo-list');
const emptyState = document.getElementById('#empty-state');
const stats  = document.getElementById('#stats');
const clearCompletedButton = document.getElementById('#clear-completed');
const filterBtns = document.querySelectorAll('.filter-btn');


function generateId(){
    return Date.now().toString();
}

function addTodo(){
    const text = todoInput.value.trim();
    if(!text){
        todoInput.focus();
         return;
    }
    const todo = {
        id: generateId(),
        text,
        completed: false
    };

todos.push(todo);
todoInput.value = '';
renderTodos();
}

function updateStats(){
    const total = todos.length;
    const completed = todos.filter(todo=>{
        return todo.completed;
    }).length;
    stats.textContent = `${total} task${total !== 1 ? 's' : ''} · ${completed} completed`;
}


function toggleTodo(id){
todos = todos.map((todo)=>{
 return todo.id === id?
    {...todo,completed:!todo.completed}:todo;
});
renderTodos();
}

function deleteTodo(id){
todos = todos.filter((todo)=>{
    return todo.id != id;
        
});
renderTodos();
}

function clearCompleted(){
    todos = todos.filter((todo)=>{
        return !todo.completed;
    })
}
