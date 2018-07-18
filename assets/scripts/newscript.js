var tasks = [];
//Task structure
function Task(name) {
    this.name = name;
    this.done = false;
}
//Add new task
function addNewTask(name) {
    var t = new Task(name);
    if(!name) {
        alert("Nie możesz stworzyć pustego zadania");
    }
    else {        
        tasks.push(t);
        saveTasks();
    }
}

//Remove task
function removeTask(index) {
    tasks.splice(index,1);
    saveTasks();
    listTasks();
}

//ChangeStatus
function changeStatus(index) {
    var task = tasks[index];
    if (task.done == false)
 {
    task.done = true;
 }    
 else {
    task.done = false;
 }    
    saveTasks();
}

//Get task
function getTask(index) {
    return tasks[index];
}

//save data to local storage
function saveTasks() {
    var str = JSON.stringify(tasks);
    localStorage.setItem("tasks", str);
}

//get data from local storage
function loadTasks() {
    var str = localStorage.getItem("tasks");
    tasks = JSON.parse(str);
    if (!tasks) {
        tasks = [];
    }
}

loadTasks();
listTasks();

//List tasks
function listTasks() {
    var html = "";
    for(var i in tasks) {
        var task = tasks[i];
        var name = task.name;
        var done = task.done;
        var checked = "checked";
        if (done == true) {
            html += `<div class="single_task ${checked}" id=${i}>
            <p class="task_name">${name}</p>
            <a class='close_btn'><svg alt="x" width="20" height="50" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm416 56v324c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V140c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12zm-272 68c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208z"></path></svg></a>
            </div>`;
        }else {
            html += `<div class="single_task" id=${i}>
            <p class="task_name">${name}</p>
            <a class='close_btn'><svg alt="x" width="20" height="50" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm416 56v324c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V140c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12zm-272 68c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208z"></path></svg></a>
            </div>`;
        }  
        $(".task_list").html(html);
    }
}

$(".task_list").on('click','.task_name', function() {
    $(this).closest(".single_task").toggleClass("checked");
    var index = $(this).closest(".single_task").attr("id");
    changeStatus(index);
});


$(".btn").click(function(event) {
    event.preventDefault();
    var name = $(".new_task_header").val();
    addNewTask(name);
    listTasks();    
    $(".new_task_header").val("");
});


$(".task_list").on('click','.close_btn',function(){
    var index = $(this).closest(".single_task").attr('id');
    $(this).closest(".single_task").hide(300,function() {
        removeTask(index);
    })    
});