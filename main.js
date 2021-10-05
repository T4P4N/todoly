class Todo {
    constructor(id, msg, is_done) {
        this.msg = msg
        this.is_done = is_done
        this.id = id
    }
}

let toDos = localStorage.getItem('my-todos') ? JSON.parse(localStorage.getItem('my-todos')) : [];
let id = 0;
var btnsbt = document.getElementById('btn-sbt');
btnsbt.addEventListener('click', addTodo);

// get user input from form!
var msg = document.getElementById('msg-input');

// get container
var todoContainer = document.querySelector('.container');

loadDom()

todoContainer.addEventListener('click', 
    function(e){
        if(e.target.id == 'btn-x')
        {
            removeTodo(e)
        }
        else(e.target.id == 'btn-c')
        {
            markDone(e)
        }
});

function loadDom(e){
    toDos.forEach((i) => {
        limaker(i.msg, i.is_done)
      });    
}
  
function addTodo(e) {
    e.preventDefault();
    // console.log('Clicked');
    message = msg.value;
    let is_done = false;
    id++;
    console.log(id);
    let td = new Todo(id, message, is_done);
    toDos.push(td);
    // Store obj in toDos array & set todos array as value in lc strg.
    localStorage.setItem('my-todos', JSON.stringify(toDos))
    limaker(message, is_done); 
}

function limaker(message, is_done){
    // add todo to dom
    var li = document.createElement('li');
    li.className = 'todo-item animate__animated animate__fadeInDown';
    if (is_done == true){
        var strk = document.createElement('strike')
        strk.appendChild(document.createTextNode(message))
        li.appendChild(strk)
        var btn = document.createElement('span')
        btn.textContent = 'X';
        btn.setAttribute('id', 'btn-x');
        li.appendChild(btn);
        todoContainer.appendChild(li);
        // clear msg-input
        msg.value = '';

    }
    else {
        li.appendChild(document.createTextNode(message));
        var btn = document.createElement('span');
        btn.textContent = 'X';
        btn.setAttribute('id', 'btn-x');
        var btnchk = document.createElement('span');
        btnchk.textContent = '✔';
        btnchk.setAttribute('id', 'btn-c');
        li.appendChild(btn);
        li.appendChild(btnchk);
        
        todoContainer.appendChild(li);
        // clear msg-input
        msg.value = '';

    }
}

function removeTodo(e) {
    e.preventDefault();
    // Remove ELement from DOM
    if(e.target.id == 'btn-x'){
        var li = e.target.parentElement;
        li.className = "todo-item animate__animated animate__fadeOutDown"
        setTimeout(() => {todoContainer.removeChild(li);console.log("done!")}, 600);

    }
    //Remove Obj from array using the splice method!
    var msg1 = li.firstChild.textContent
    toDos.forEach(
        function(toDo, index) {
            if(toDo.msg === msg1 ) {
                toDos.splice(index, 1)
            }});
    localStorage.setItem('my-todos', JSON.stringify(toDos))
}

// Mark a element as if clicked on check
function markDone(e) {
    e.preventDefault();
    if (e.target.id == 'btn-c'){
        var li = e.target.parentElement;
        var msg1 = li.firstChild.textContent
        li.textContent = ""
        
        // creating a new element with strike thorugh tag in it
        var strk = document.createElement('strike')
        strk.appendChild(document.createTextNode(msg1))
        li.className = "todo-item animate__animated animate__headShake"
        li.appendChild(strk)
        
        var btn = document.createElement('span')
        btn.textContent = 'X';
        btn.setAttribute('id', 'btn-x');
        li.appendChild(btn);
        // mark is_done = true
        toDos.forEach(
            function(toDo, index) {
                if(toDo.msg == msg1 ) {
                    toDos[index].is_done=true;
                    localStorage.setItem('my-todos', JSON.stringify(toDos))
                }});   
    }
}
