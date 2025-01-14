


const formCloseBtn =  document.getElementById('closeBtn');
const form = document.querySelector('form');
const taskName = document.querySelector('form #taskName');
const startTime = document.querySelector('form #startTime');
const endTime = document.querySelector('form #endTime');
const todoList = document.querySelector('#todo');

const todoBtn = document.querySelector('#addToDo');
const addToDoWrapper = document.querySelector('.addToDoWrapper');
const taskWrapper =  document.querySelector('.taskWrapper');
const formBtn =  document.querySelector('.addToDoForm form #formBtn');
const formTitle =  document.querySelector('.addToDoForm .top p');
const setTimeBtn = document.getElementById('setTimeBtn');
const chevron = document.querySelector('#setTimeBtn div');
const timeWrapper = document.querySelector('.timeWrapper');

function onTimeChange(timeInput) {
    var timeSplit = timeInput.split(':'),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = 'pm';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'am';
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = 'pm';
    }
    return hours + ':' + minutes + ' ' + meridian;
  }

function checkList(){
    if( todoList.children.length > 0 ){
        const msg = document.getElementById('msg');
        if (msg) {
            taskWrapper.removeChild(msg);
        }
        lucide.createIcons();
       
    } else {
        const div = document.createElement('div');
        div.setAttribute('id', 'msg');

        const i = document.createElement('i');
        i.setAttribute('data-lucide', 'list-todo');
        div.appendChild(i);

        const p = document.createElement('p');
        p.innerHTML = "Currently no tasks to do.";
        div.appendChild(p);

        taskWrapper.appendChild(div);
        lucide.createIcons();
    }
}

function resetInputs(){
    taskName.value = '';
    startTime.value = '';
    endTime.value = '';
    taskName.style.outlineColor = "transparent";
}

function submitForm(value, id){
    form.onsubmit = (e)=>{
        e.preventDefault();
        if(taskName.value == ""){
            
            if(taskName.value == ""){
                 taskName.style.outlineColor = "red";
            }

        } else {
            taskName.style.outlineColor = "transparent";
            if( value == 'Add task'){
                 createTask(todoList, taskName.value, startTime.value, endTime.value);
            } else if(value == 'Save changes'){
                const todoListId = document.querySelectorAll('#todo li');
                for(let i=0; i < todoListId.length; i++){
                    if(todoListId[i].id == id){
                        const editTaskName = todoListId[i].querySelector('.taskNameTime .todoTask');
                        const editTaskTime = todoListId[i].querySelector('.taskNameTime #taskTime');
                        editTaskName.innerHTML = taskName.value;

                        if(!startTime.value == '' && !endTime.value == ''){
                            editTaskTime.innerHTML = ` ${onTimeChange(startTime.value)} - ${onTimeChange(endTime.value)}`;
                        }
                       
                        break;
                    }
                }
            }

            addToDoWrapper.style.display = 'none';
            checkList();
            resetInputs();
        }
    }
}

let listId = 0;
function createTask(parent, name, start, end){
    const list = document.createElement('li');
    list.id = listId++;
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', 'listcb');
    list.appendChild(input);

    const div = document.createElement('div');
    div.classList.add('taskNameTime')
        const p = document.createElement('p');
        p.classList.add('todoTask');
        p.innerHTML = name;
        div.appendChild(p);

        const p2 = document.createElement('p');
        p2.id = 'taskTime';
        if(!start == '' && !end == ''){
            p2.innerHTML = ` ${onTimeChange(start)} - ${onTimeChange(end)}`;
        }
        div.appendChild(p2);
    list.appendChild(div);

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('id', 'deleteBtn');

    const i = document.createElement('i');
        i.setAttribute('data-lucide', 'trash');
        i.classList.add('lucideIcon');
        deleteBtn.appendChild(i);

    list.appendChild(deleteBtn);


    parent.appendChild(list);

    input.addEventListener('change', ()=>{
        if(p.style.textDecoration == "line-through"){
            p.style.textDecoration = 'none';
            p.style.color = 'black';
            p2.style.color = "gray";

        } else {
            p.style.textDecoration = "line-through";
            p.style.color = "rgb(172, 172, 172)";
            p2.style.color = "rgb(172, 172, 172)";
        }
    });

    deleteBtn.addEventListener('click', ()=>{
        deleteBtn.parentElement.remove();
        checkList();
       
   });

    div.addEventListener('click', ()=>{
        formTitle.innerHTML = 'Edit task';
        addToDoWrapper.style.display = 'flex';
        taskName.value = p.innerHTML;
        startTime.value = start;
        endTime.value = end;
        formBtn.setAttribute('id', list.id);
        submitForm(formBtn.value = 'Save changes', list.id);
    });

}

formCloseBtn.onclick = ()=>{
    addToDoWrapper.style.display = 'none';
    resetInputs();
}

todoBtn.addEventListener('click', ()=>{
    formTitle.innerHTML = 'Add task';
    addToDoWrapper.style.display = 'flex';
    submitForm(formBtn.value = 'Add task', 0);
});

taskName.addEventListener('change', ()=>{
    if(taskName.value == ''){
        taskName.style.outlineColor = "red";
    } else {
        taskName.style.outlineColor = "transparent";
    }
});

setTimeBtn.addEventListener('click', ()=>{
    timeWrapper.style.display =  timeWrapper.style.display == 'flex'? 'none':'flex';
    chevron.style.transform = chevron.style.transform == 'rotate(180deg)'? 'rotate(0deg)': 'rotate(180deg)';
});


checkList();

