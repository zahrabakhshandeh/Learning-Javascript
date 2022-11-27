const addBtn = document.querySelector(".fa-plus-circle");
const filterTasks = document.querySelector(".filter-tasks");
const removeIcon = document.querySelector(".fa-trash-restore-alt");
//************************************************************

addBtn.addEventListener("click", addTask);
list.addEventListener("click", checkRemoveEdit);
filterTasks.addEventListener("click", filter);
removeIcon.addEventListener("click", removeAll);
document.addEventListener("DOMContentLoaded", getLocalTasks);
//*************************************************************

let flag = false;
let beforeEdit, afterEdit;
//***************************************************************

//Add new task to app
function addTask(e){
	const newLi = document.createElement("li");
	newLi.classList.add("item");
	const inputValue = input.value;
	saveLocalTasks(inputValue);
	const newTask =`
		<i class="fa fa-check-circle complete"></i>
		<p class="text">${inputValue}</p>
		<button class="edit" contenteditable="false">toggle edit</button>
		<i class="fa fa-trash-o delete"></i>
	`;
	newLi.innerHTML = newTask;
	list.appendChild(newLi);
	input.value = "";
}

//Add and remove and edit
function checkRemoveEdit(e){
	if(e.target.classList[2] === "delete"){
		const removeT = e.target.parentElement;
		removeLocalTasks(removeT.children[1].textContent);
		removeT.remove();
	}else if(e.target.classList[2] === "complete"){
		e.target.parentElement.classList.toggle("completed");
		e.target.parentElement.children[0].classList.toggle("check-icon");
	}else if(e.target.classList[0] === "edit"){
		toggleEdit(e);
	}
}

//Toggle edit for tasks
function toggleEdit(e){
	if (flag === false){
		e.target.parentElement.children[1].setAttribute("contenteditable", true);
		flag = true;
		beforeEdit = e.target.parentElement.children[1].textContent;
	}else{
		e.target.parentElement.children[1].setAttribute("contenteditable", false);
		afterEdit = e.target.parentElement.children[1].textContent;
		updateLocalStorage();
		flag = false;
	}
}

//Filter completed and unfinished work
function filter(e){
	const taskList = document.querySelectorAll(".item");
	taskList.forEach((task)=>{
		if(e.target.value === "completed" && (!task.classList.contains("completed"))){
			task.style.display = "none";
		}else if(e.target.value === "uncompleted" && task.classList.contains("completed")){
			task.style.display = "none";
		}else{
			task.style.display = "flex";
		}
	});
}

//Remove all tasks from app
function removeAll(e){
	const taskList = document.querySelectorAll(".item");
	taskList.forEach((task)=>{
		removeLocalTasks(task.children[1].textContent);
		task.remove();
	});
}

//Save tasks to local storage
function saveLocalTasks(task){
	let savedTasks = localStorage.getItem("tasks")?
	JSON.parse(localStorage.getItem("tasks"))
	:[];
	savedTasks.push(task);
	localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

//Read all tasks from local storage
function getLocalTasks(){
	let savedTasks = localStorage.getItem("tasks")?
	JSON.parse(localStorage.getItem("tasks"))
	:[];
	savedTasks.forEach((task)=>{
		const newLi = document.createElement("li");
		newLi.classList.add("item");
		const newTask =`
			<i class="fa fa-check-circle complete"></i>
			<p class="text">${task}</p>
			<button class="edit" contenteditable="false">toggle edit</button>
			<i class="fa fa-trash-o delete"></i>
		`;
		newLi.innerHTML = newTask;
		list.appendChild(newLi);
	});

}

//Remove a task from local storage
function removeLocalTasks(task){
	let savedTasks = localStorage.getItem("tasks")?
	JSON.parse(localStorage.getItem("tasks"))
	:[];
	const filterTasks = savedTasks.filter((t)=>t!==task); 
	localStorage.setItem("tasks", JSON.stringify(filterTasks));
}

//Edit a task in local storage
function updateLocalStorage(){
	let savedTasks = localStorage.getItem("tasks")?
	JSON.parse(localStorage.getItem("tasks"))
	:[];
	let tasksList = [];
	savedTasks.forEach((item)=>{
		if(item === beforeEdit){
			tasksList.push(afterEdit);
		}else{
			tasksList.push(item);
		}
	});
	localStorage.setItem("tasks", JSON.stringify(tasksList));
}