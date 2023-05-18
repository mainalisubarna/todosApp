let todos = [];
const todoForm = document.getElementById('todoForm');
const todoList = document.querySelector("#todosList");
todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const todoValue = document.getElementById('form1').value;
    const todosItems = {
        id: Date.now(),
        value: todoValue,
        completed: false
    }
    todos.push(todosItems);
    todoForm.reset();
    displayTodos();
})

const displayTodos = () => {
    todosList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2';
        const div = document.createElement("div");
        div.className = 'd-flex align-items-center';
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.classList.add('form-check-input', 'me-2');
        checkbox.addEventListener('change', (event) => {
            event.preventDefault();
            todo.completed = event.target.checked;
            displayTodos();
        })
        div.append(checkbox);
        const span = document.createElement('span');
        span.innerText = todo.value;
        span.classList.add('ms-2');
        span.style.textDecoration = todo.completed ? 'line-through' : 'none';
        div.append(span);
        li.append(div);
        const divSec = document.createElement('div');
        divSec.className = 'float-right';
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-outline-primary btn-sm';
        deleteButton.href = '#';
        deleteButton.addEventListener('click', (event) => {
            event.preventDefault();
            todos = todos.filter((value) => {
                return value.id !== todo.id;
            })
            displayTodos();
        })
        const i = document.createElement('i');
        i.className = 'fas fa-times text-primary';
        deleteButton.append(i);
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-outline-primary btn-sm mx-1';
        editButton.href = '#';
        editButton.setAttribute("data-mdb-toggle", "modal");
        editButton.setAttribute("data-mdb-target", "#editModal");
        editButton.addEventListener('click',()=>{
            const newInput = document.getElementById('form2');
            newInput.value = todo.value;
            const todoIdField = document.getElementById('form3');
            todoIdField.value = todo.id;
        })
        const ii = document.createElement('i');
        ii.className = 'fas fa-pencil text-danger';
        editButton.append(ii);
        divSec.append(editButton);
        divSec.append(deleteButton);
        li.append(divSec);
        todosList.append(li);
    });
}


const editHandler = ()=>{
    const newInput = document.getElementById('form2').value;
    const todoId = document.getElementById('form3').value;
    todos = todos.map((item)=>{
        if(item.id === Number(todoId)){
            return {
                id:item.id,
                value : newInput,
                completed : item.completed
            }
        }else{
           return item;
        }
    })
    displayTodos();
    document.getElementById('btn-close').click();
}