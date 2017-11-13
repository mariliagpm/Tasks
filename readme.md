# PDVS Application (PHP Version) #

This application provides an example of:
1. Building a complete RESTful API in PHP using the Slim framework.
2. Consuming these services using jQuery

You will need a Apache server, mysql installed.
You will also need the Slim Framework to run the app

Download wampserver:
http://www.wampserver.com/en/ 

Download & Install -  Slim Framework:
The easiest way to start working with Slim is to create a project using Slim-Skeeton as a base by running this bash command:
$ php composer.phar create-project slim/slim-skeleton [my-app-name]
Slim Framework webpage - https://www.slimframework.com/

Set Up:
1. Create a MySQL database name "dashboard".
2. Execute cellar.sql to create and populate the "task" table:

	mysql cellar -uroot < dashboard.sql

3. Deploy the webapp included in this repository.
4. Open api/index.php. In the getConnection() function at the bottom of the page, make sure the connection parameters match your database configuration. 
5. Open js/main.js and make sure the rootURL variable matches your deployment configuration. (check your rootUrl)
6. Access the application in your browser. For example: http://localhost/Tasks/index.html.