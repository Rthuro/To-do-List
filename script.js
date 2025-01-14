
lucide.createIcons();

const formCloseBtn =  document.getElementById('closeBtn');
const form = document.querySelector('form');
const taskName = document.querySelector('form #taskName');
const startTime = document.querySelector('form #startTime');
const endTime = document.querySelector('form #endTime');
const todoList = document.querySelector('#todo');

const todoBtn = document.querySelector('#addToDo');
const addToDoWrapper = document.querySelector('.addToDoWrapper');
const taskWrapper =  document.querySelector('.taskWrapper');
const timeErr =  document.getElementById('setTimeErr');

// const options =  document.querySelector('.optionsCont .options');
// const ellipsisBtn =  document.getElementById('ellipsisBtn');

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

function createTask(parent, name, startTime, endTime){
    const list = document.createElement('li');

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
        p2.innerHTML = ` ${startTime} - ${endTime}`;
        div.appendChild(p2);
    list.appendChild(div);

    const optionCont = document.createElement('div');
        optionCont.classList.add('optionsCont');

        const button = document.createElement('button');
        button.setAttribute('id', 'ellipsisBtn');
        button.classList.add('btn');
            const i = document.createElement('i');
            i.setAttribute('data-lucide', 'ellipsis');
            i.classList.add('lucideIcon');
            button.appendChild(i);
        optionCont.appendChild(button);

        const options = document.createElement('div');
        options.classList.add('options');

        const button1 = document.createElement('button');
            const edit = document.createElement('p');
            edit.innerHTML = 'Edit';
            const i1 = document.createElement('i');
            i1.setAttribute('data-lucide', 'pencil-line');
            i1.classList.add('lucideIcon');
            button1.appendChild(edit);
            button1.appendChild(i1);

        const button2 = document.createElement('button');
        const del = document.createElement('p');
            del.innerHTML = 'Delete';
        const i2 = document.createElement('i');
            i2.setAttribute('data-lucide', 'trash');
            i2.classList.add('lucideIcon');
            button2.appendChild(del);
            button2.appendChild(i2);

        options.appendChild(button1);
        options.appendChild(button2);
        optionCont.appendChild(options);

    list.appendChild(optionCont);


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

    button.addEventListener('click', ()=>{
        options.style.display == "flex"? options.style.display = 'none':options.style.display = 'flex';
    });
}

// ellipsisBtn.addEventListener('click', ()=>{
//     options.style.display == 'flex' ? options.style.display = 'none':options.style.display = 'flex';
// });

formCloseBtn.onclick = ()=>{
    addToDoWrapper.style.display = 'none';
}

form.onsubmit = (e)=>{
    e.preventDefault();
    if(taskName.value == "" || startTime.value == "" || endTime.value == ""){
        let err = [];
        if(taskName.value == ""){
             taskName.style.outlineColor = "red";
        }

        if(startTime.value == ""){
            err.push('set start time');
        }

        if(endTime.value == ""){
            err.push('set end time');
        }
        timeErr.innerHTML = err.toString();

    } else {
        taskName.style.outlineColor = "transparent";
        createTask(todoList, taskName.value, startTime.value, endTime.value);
        addToDoWrapper.style.display = 'none';
        checkList();
    }
   
}
checkList();

todoBtn.addEventListener('click', ()=>{
    addToDoWrapper.style.display = 'flex';
});
