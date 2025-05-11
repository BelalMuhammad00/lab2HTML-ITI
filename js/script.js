var addBtn= document.querySelector(".add-project-btn");
var count =0;
var progress  = document.querySelector('[data-type="progress"]');


window.addEventListener('load', () => {


const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

for (let i = 0; i < savedTasks.length; i++) {
  const task = savedTasks[i];
  const column = document.querySelector(`[data-type="${task.column}"]`);

  if (column && column.getAttribute("data-type") !== "remove") {
    column.innerHTML += `<li draggable="true" ondragstart="dragstartHandler(event)" id="${task.id}">${task.text}</li>`;
  }
}

});

addBtn.addEventListener('click',function(e){
e.preventDefault();
let value = document.querySelector('#textVal').value;
if(value){
  count++;
  progress.innerHTML+=`<li draggable="true" ondragstart="dragstartHandler(event)" id="${value+count}">${value}</li>`
   saveTasks();
}

})


function dragstartHandler(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function dragoverHandler(ev) {
  ev.preventDefault();
}

function dropHandler(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  
   saveTasks();
};

function saveTasks() {
let allLists = document.querySelectorAll('[data-type]');
let tasks = [];

for (let i = 0; i < allLists.length; i++) {
  let list = allLists[i];
  let column = list.getAttribute("data-type");
  let items = list.querySelectorAll("li");

  for (let j = 0; j < items.length; j++) {
    let item = items[j];
    tasks.push({
      id: item.id,
      text: item.textContent,
      column: column
    });
  }
}

localStorage.setItem("tasks", JSON.stringify(tasks));
}
