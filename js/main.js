// The root URL for the RESTful services
var rootURL = "http://localhost/Tasks/api/tasks";

var currentTask;



// Retrieve task list when application starts 
findAllNew();


// Retrieve task list when application starts 
findAllDone();

// Nothing to delete in initial application state
$('#btnDelete').hide();

// Nothing to mark as done in initial application state
$('#btnDone').hide();


$('#priority').css('background', 'green');

// Register listeners
$('#btnSearch').click(function() {
	search($('#searchKey').val());
	return false;
});


$('#priority').change(function(){
	if($('#priority').val()=="Low") 
    $(this).css('background', 'green');


	if($('#priority').val()=="Medium") 
    $(this).css('background', 'yellow');


	if($('#priority').val()=="High") 
    $(this).css('background', 'orange');

	if($('#priority').val()=="Critical") 
    $(this).css('background', 'red');

});

$('#priority').focus(function(){
	if($('#priority').val()=="Low") 
    $(this).css('background', 'green');


	if($('#priority').val()=="Medium") 
    $(this).css('background', 'yellow');


	if($('#priority').val()=="High") 
    $(this).css('background', 'orange');

	if($('#priority').val()=="Critical") 
    $(this).css('background', 'red');

});




// Trigger search when pressing 'Return' on search key input field
$('#searchKey').keypress(function(e){
	if(e.which == 13) {
		search($('#searchKey').val());
		e.preventDefault();
		return false;
    }
});

$('#btnAdd').click(function() {
	newTask();
	$('#btnDone').hide();
	return false;
});

$('#btnSave').click(function() {	
	if ($('#taskId').val() == '0'){
	    addTask();
		}
	else		
		updateTask();
	return false;	});


$('#btnSearchById').click(function() {	

findByIdSearch($('#searchKey').val());
	return false;

});
		
	
$('#btnDelete').click(function() {
	if (confirm('Do you really want to remove this Task?'))
	deleteTask();
	return false;
});

$('#btnDone').click(function() {
	if (confirm('Do you really want to mark this task as done?'))
	updateTask(2);
	return false;
});




$('#taskListNew a').live('click', function() {
	findById($(this).data('identity'));
	$('#btnDone').show();
});

$('#taskListDone a').live('click', function() {
	findById($(this).data('identity'));
	$('#btnDone').hide();
});




function search(searchKey) {
	if (searchKey == '') 
		findAllNew();
	else
		findByName(searchKey);
}

function newTask() {
	$('#btnDelete').hide();
	currentTask = {};
	renderDetails(currentTask); // Display empty form
	$('#taskId').val(0);
	$('#status').val("New");
	$('#btnDone').hide();

	}

	
function findAllNew() {
	console.log('findAll');
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json", // data type of response
		success: renderList
	});
}

function findAllDone() {
	console.log('findAll');
	$.ajax({
		type: 'GET',
		url: rootURL+'/task/done',
		dataType: "json", // data type of response
		success: renderList2
	});
}


function findByName(searchKey) {
	console.log('findByName: ' + searchKey);
	$.ajax({
		type: 'GET',
		url: rootURL + '/search/' + searchKey,
		dataType: "json",
		success: renderList
	});
}

function findById(id) {
	console.log('findById: ' + id);
	$.ajax({
		type: 'GET',
		url: rootURL + '/' + id,
		dataType: "json",
		success: function(data){
			$('#btnDelete').show();
			console.log('findById success: ' + data.id);
			currentTask = data;
			renderDetails(currentTask);
		}
	});
}

function addTask() {
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: rootURL,
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
		alert('Task created successfully');
			$('#btnDelete').show();
			$('#btnDone').show();
			$('#taskId').val(data.id);
		 
			findAllNew();
			findAllDone();
			
			
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('It was not possible to insert Task');
		}
	});
}

function updateTask(status) {
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: rootURL + '/' + $('#taskId').val(),
		dataType: "json",
		data: formToJSON(status),
		success: function(data, textStatus, jqXHR){
			alert('Task updated successfully');
			findAllNew();
			findAllDone();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('It was not possible to update the Task');
		}
	});
}


function deleteTask() {
	$.ajax({
		type: 'DELETE',
		url: rootURL + '/' + $('#taskId').val(),
		success: function(data, textStatus, jqXHR){
			alert('Task deleted successfully');
			findAllNew();
			findAllDone();
			newTask();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('delete Task error');
		}
	});
}

function renderList(data) {

	$('#taskListNew li').remove();
	
	// JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
	var list = data == null ? [] : (data.task instanceof Array ? data.task : [data.task]);
	
	 for(var i = 0; i<list.length; i++) {
      
	if(list[i].priority=="Low") 
     $('#taskListNew').append('<li><a href="#" data-identity="' + list[i].id + '"  style="background:green">'+list[i].name+'</a></li>');
	
	if(list[i].priority=="Medium") 
     $('#taskListNew').append('<li><a href="#" data-identity="' + list[i].id + '"  style="background:yellow">'+list[i].name+'</a></li>');
	
	if(list[i].priority=="High") 
     $('#taskListNew').append('<li><a href="#" data-identity="' + list[i].id + '"  style="background:orange">'+list[i].name+'</a></li>');
	
	if(list[i].priority=="Critical") 
     $('#taskListNew').append('<li><a href="#" data-identity="' + list[i].id + '"  style="background:red">'+list[i].name+'</a></li>');
	
	
	
	
	
	
	}
}



function renderList2(data) {

	$('#taskListDone li').remove();
	
	// JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
	var list = data == null ? [] : (data.task instanceof Array ? data.task : [data.task]);
	
	 for(var i = 0; i<list.length; i++) {
   	
     
	if(list[i].priority=="Low") 
     $('#taskListDone').append('<li><a href="#" data-identity="' + list[i].id + '"  style="background:green">'+list[i].name+'</a></li>');
	
	
	if(list[i].priority=="Medium") 
	     $('#taskListDone').append('<li><a href="#" data-identity="' + list[i].id + '"  style="background:yellow">'+list[i].name+'</a></li>');
		
	
if(list[i].priority=="High") 
	     $('#taskListDone').append('<li><a href="#" data-identity="' + list[i].id + '"  style="background:orange">'+list[i].name+'</a></li>');
		
		
	if(list[i].priority=="Critical") 
	     $('#taskListDone').append('<li><a href="#" data-identity="' + list[i].id + '"  style="background:red">'+list[i].name+'</a></li>');
		
    }
}



function renderDetails(task) {
	
	$('#taskId').val(task.id);
	$('#name').val(task.name);
	$('#description').val(task.description);
	$('#priority').val(task.priority);
	$('#status').val(task.status);
	$('#username').val(task.username);
   
 	if($('#priority').val()=="Low") 
    $('#priority').css('background', 'green');


	if($('#priority').val()=="Medium") 
    $('#priority').css('background', 'yellow');


	if($('#priority').val()=="High") 
    $('#priority').css('background', 'orange');

	if($('#priority').val()=="Critical") 
    $('#priority').css('background', 'red');
	
	
}

// Helper function to serialize all the form fields into a JSON string
function formToJSON(status) {
	
	if(status==2)$('#status').val("Done");
	
	

	return JSON.stringify({
		"id": $('#taskId').val(), 
		"name": $('#name').val(), 
		"description": $('#description').val(),
		"priority": $('#priority').val(),
		"status": $('#status').val(),
		"username": $('#username').val()
		
		});	
}
