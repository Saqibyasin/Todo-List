let todos = [];
let currentFilter = 'all';

const todoInput = document.querySelector('#todo-input');
const addButton = document.querySelector('#add-btn');
const todoList = document.querySelector('#todo-list');
const emptyState = document.querySelector('#empty-state');
const stats  = document.querySelector('#stats');
const clearCompletedButton = document.querySelector('#clear-completed');
const filterBtns = document.querySelectorAll('.filter-btn');

function saveTodos(){
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos(){
    const stored = localStorage.getItem('todos');
    if(stored){
       todos =  JSON.parse(stored);
    }
}


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
saveTodos();
renderTodos();
}




function toggleTodo(id){
todos = todos.map((todo)=>{
 return todo.id === id?
    {...todo,completed:!todo.completed}:todo;
});
saveTodos();
renderTodos();
}

function deleteTodo(id){
todos = todos.filter((todo)=>{
    return todo.id !== id;
        
});
saveTodos();
renderTodos();
}

function clearCompleted(){
    todos = todos.filter((todo)=>{
        return !todo.completed;
    })
    saveTodos();
    renderTodos();
}

function getFilteredTodos(){
    if(currentFilter === "active"){
        return todos.filter((todo)=>{
            return !todo.completed;
        });
    }
    else if(currentFilter === "completed"){
        return todos.filter((todo)=>{
            return todo.completed;
        });
    }
    else{
        return todos;
    }
}

function updateStats(){
    const total = todos.length;
    const completed = todos.filter(todo=>{
        return todo.completed;
    }).length;
    stats.textContent = `${total} task${total !== 1 ? 's' : ''} · ${completed} completed`;
}

function renderTodos(){
    const filteredTodos = getFilteredTodos();
    
        if(filteredTodos.length === 0){
            emptyState.style.display = 'block';
            todoList.style.display = 'none';
        }

        else {
            emptyState.style.display = 'none';
            todoList.style.display = 'flex';
        }

    todoList.innerHTML = '';

    filteredTodos.forEach((todo)=>{
        const li = document.createElement('li');
        li.classList.add('todo-item');
        if(todo.completed) li.classList.add('completed');

        li.innerHTML = `
         <div class="todo-checkbox">
        ${todo.completed ? '✓' : ''}
      </div>
      <span class="todo-text">${todo.text}</span>
      <button class="delete-btn">🗑️</button>
       `;
        li.querySelector('.todo-checkbox').addEventListener('click',()=>{
            toggleTodo(todo.id);
        })
        li.querySelector('.todo-text').addEventListener('click',()=>{
            toggleTodo(todo.id);
        })
        li.querySelector('.delete-btn').addEventListener('click',()=>{
            deleteTodo(todo.id);
        })
        todoList.appendChild(li);
        });
        updateStats(); 
        } 

        filterBtns.forEach((btn)=>{
            btn.addEventListener('click',()=>{
                filterBtns.forEach((b)=>{
                    b.classList.remove('active');
                })
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                renderTodos();

            });
        });
        addButton.addEventListener('click',addTodo);
        todoInput.addEventListener('keypress',(e)=>{
            if(e.key === 'Enter'){
                addTodo();
            }
        });

        clearCompletedButton.addEventListener('click', clearCompleted);
loadTodos();
 renderTodos();





