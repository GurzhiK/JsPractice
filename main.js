const addtaskbtn = document.getElementById('btn_int');
const taskintput = document.getElementById('inp_text');
const todos = document.querySelector('.todo');

let tasks;

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemsElems = [];

function Task(description){
    this.description = description;
    this.complited = false;
}

const crtamplate = (task, index) => {
    return `
    <div class="todo-item ${task.complited ? 'checked' : ''}">
        <div class="description">${task.description}</div>
        <div class="buttons">
            <input  onclick = "completeTask(${index})" class="btn-complete" type="checkbox" ${task.complited ? 'checked' :''}>
            <button onclick = "deleteTask(${index})" class="btn-delete">Удалить</button>
        </div>
    </div>
</div>  
`
}

const filterTasks = () =>{
    const activeTasks = tasks.length && tasks.filter(item => item.complited == false);
    const complitedTasks = tasks.length && tasks.filter(item=> item.complited == true);
    tasks =  [...activeTasks,...complitedTasks];
}

const fillHtmlList = () => {
    todos.innerHTML ="";
    if(tasks.length > 0){
        filterTasks();
        tasks.forEach((item, index)=> {
            todos.innerHTML += crtamplate(item, index); 
        });
        todoItemsElems = document.querySelectorAll('.todo-item');
    }
}

fillHtmlList();

const udatelocal = () =>{
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


const completeTask = index => {
    tasks[index].complited = ! tasks[index].complited;
    if(tasks[index].complited){
        todoItemsElems[index].classList.add('checked');
    }
    else{
            todoItemsElems[index].classList.remove('checked');
    }
    udatelocal();
    fillHtmlList();
}


addtaskbtn.addEventListener('click', () =>{
    tasks.push(new Task(taskintput.value));
    udatelocal();
    fillHtmlList();
    taskintput.value='';
})

const deleteTask = index =>{
    todoItemsElems[index].classList.add('delition');
    setTimeout(()=>{
        tasks.splice(index,1);
        udatelocal();
        fillHtmlList();
    },500)
}
