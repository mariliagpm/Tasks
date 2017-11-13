<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/tasks', 'getNewTasks');
$app->get('/tasks/:id',	'getTask');
$app->get('/tasks/task/done',	'getDoneTasks');
$app->get('/tasks/search/:query', 'findByName');
$app->post('/tasks', 'addTask');
$app->put('/tasks/:id', 'updateTask');
$app->delete('/tasks/:id',	'deleteTask');

$app->run();

function getNewTasks() {
	$sql = "select * FROM task where status='New' ORDER BY name";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$tasks = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo '{"task": ' . json_encode($tasks) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getDoneTasks() {
	$sql = "select * FROM task where status='Done' ORDER BY name";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$tasks = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo '{"task": ' . json_encode($tasks) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getTask($id) {
	$sql = "SELECT * FROM task WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$task = $stmt->fetchObject();  
		$db = null;
		echo json_encode($task); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addTask() {
	
		 $request = Slim::getInstance()->request();
	$task = json_decode($request->getBody());
       $query  ="INSERT INTO `task`(`name`,`description`,`priority`,`status`, `username`) VALUES (:name,:description,:priority,:status,:username)";
 try{
	
       	$db = getConnection();
		$stmt = $db->prepare($query);
		$stmt->bindParam("description", $task->description);
		$stmt->bindParam("name", $task->name);
		$stmt->bindParam("priority", $task->priority);
		$stmt->bindParam("status", $task->status);
		$stmt->bindParam("username", $task->username);
     	$stmt->execute();
		$task->id = $db->lastInsertId();
		$db = null;
		echo json_encode($task);
		}
 
 catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateTask($id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$task = json_decode($body);
	$sql = "UPDATE task SET  name=:name , description=:description,priority=:priority,status=:status,username=:username WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("description", $task->description);
		$stmt->bindParam("name", $task->name);
		$stmt->bindParam("priority", $task->priority);
		$stmt->bindParam("status", $task->status);
		$stmt->bindParam("username", $task->username);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}


function deleteTask($id) {
	$sql = "DELETE FROM task WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function findByName($query) {
	$sql = "SELECT * FROM task WHERE UPPER(name) LIKE :query  and status='New' ORDER BY name";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$query = "%".$query."%";  
		$stmt->bindParam("query", $query);
		$stmt->execute();
		$tasks = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo '{"task": ' . json_encode($tasks) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="root";
	$dbpass="";
	$dbname="dashboard";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>