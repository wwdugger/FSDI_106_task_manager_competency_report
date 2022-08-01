var regularIcon ='fa-regular fa-star';
var solidIcon = 'fa-solid fa-star';
var isImportant = false;

function toggleImportant() {
    console.log('Icon clicked');

    if(!isImportant) {
      // change to important
      $('#iImportant').removeClass(regularIcon).addClass(solidIcon);
     isImportant = true;
    }
    else {
      //change to non important
     $('#iImportant').removeClass(regularIcon);
     $('#iImportant').addClass(solidIcon);
     isImportant = false;
    }
}

function saveTask() {
  console.log('You saved your task!');

  let title = $("#txtTitle").val();
  let description = $("#txtDescription").val();
  let dueDate = $("#selDueDate").val();
  let color = $("#selColor").val();
  let emoji = $("#selEmoji").val();
  let location = $("#txtLocation").val();  
  let status = $("#selStatus").val();
  let notification = $("#chkNotification").prop("checked");

  let task = new Task(Important, title, dueDate, description, color, emoji, location, status, notification);
  //send task to server
  $.ajax({
    type: "POST",
    url: "https://fsdiapi.azurewebsites.net/api/tasks/",
    data: JSON.stringify(task),
    contentType: "application/json",
    success: function(res) {
      console.log("Server says", res);
    },
    error: function(errorDetails) {
      console.log("Error saving tasks", errorDetails);
    }
  });
  
  displaytask(task);
}

function displayTask(task) {
 let syntax = 
 `<div class="task" style="border: 3px solid ${task.color};"> 
   <i class="fa-regular fa-star"></i>
        
     <div class="info">
        <h5>${task.title}</h5>
        <p>${task.description}</p>
     </div>

     <label class="location">${task.location}</label>

     <label class="date">${task.dueDate}</label>

     <label class="status">${task.status}</label>
  </div>`;

  $("#pendingTasks").append(syntax);
}

function testRequest() {
  console.log("1");
  $.ajax({
    type: "GET",
    url: "https://fsdiapi.azurewebsites.net/",
    success: function(res) {
      console.log("2");
      console.log("Server says", res)
    },
    error: function (errorDetails) {
      console.log("Error", errorDetails);
    }
  })

  console.log("3");
}

function fetchTasks() {
  $.ajax({
    type: "GET",
    url: "https://fsdiapi.azurewebsites.net/api/tasks",
    success: function(res) {
      let tasks = JSON.parse(res);
      for(let i=0; i<tasks.length; i++) {
        let task = tasks[i];
        if(task.name == "Wesley"){
          displayTask(task); 
        }
      }
    },
    error: function(details) {
      console.log("Error retrieving tasks", details);
    }
  });
}

function init() {
    console.log('Task Manager page!'); 

    //assigns events 
    $('#iImportant').click(toggleImportant);  
    $('#btnSave').click(saveTask);        

    //load initial data says what function will do

}

window.onload = init;
