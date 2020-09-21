# LAB 1 - Basic Express Web Server

## Introduction

This is the repository of the first web technologies lab. This lab is about creating a basic web server using the 'Express' framework for node.js.  

## Functionnalities

When the index.js is called using **node index.js** or when the user writes **npm start** in his terminal, it will start the web server on his computer. The web server is in localhost and listening to the port 8080.
When connecting to the server without parameters, it grants you with a salute message. When trying to connect to the webserver with one level route (for example: *http://localhost:8080/Pierre*), the server will return '**Hey *parameter*!**' (in this case: *Hey Pierre!*). If the user does not precise **exactly** one or no parameter, the server will return a 404 status with the text message: 'Error 404! Make sure to have exactly 1 parameter in you GET request!'.
You can also use the '/hello' route and add a 'name' parameter in order to be saluted (for example: localhost:8080/hello?name=Pierre).
Special messages appear when using the name "Thomas".


## Installation

To install this project you can:
- Clone the repository on you computer
- Download the zip file and extract it wherever your want on you computer

## Usage Instructions

When the main folder is installed, you can open it in a terminal and use one of the following commands to launch it.
```bash
node index.js
# or
npm start
# or
npm run start
```
A local web server listening to the port 8080 will then be up. It will return '**Hey *parameter*!**' when someone tries to connect to it with a route in the GET method such as: *http://localhost:8080/parameter*. It will also return '**Hello *parameter*!** when conecting to it using '*http://localhost:8080/hello?name=parameter*'. Using the name "Thomas" as the parameter will return special messages. Anything else will return a 404 status with a special page.

## Author

Thomas Rabian ING4 SI Grp3 - Contact: thomas.rabian@edu.ece.fr