# LAB 1 - Basic Express Web Server

## Introduction

This is the repository of the first web technologies lab. This lab is about creating a basic web server using the 'Express' framework for node.js.  

## Functionnalities

When the index.js is called using **node index.js** or when the user writes **npm start** in his terminal, it will start the web server on his computer. The web server is in localhost and listening to the port 8080. When trying to connect to the webserver with one URL parameter (for example: *http://localhost:8080/Pierre*), the server will return '**Hello *parameter*!**' (in this case: *Hello Pierre!*). If the user does not precise **exactly** one parameter, the server will return a 404 status with the text message: 'Error 404! Make sure to have exactly 1 parameter in you GET request!'. 

## Installation

To install this project you can:
- Clone the repository on you computer
- Download the zip file and extract it wherever your want on you computer

## Usage Instructions

When the main folder is installed, you can open it in a terminal and use one of the following commands to launch it.
```js
node index.js
# or
npm start
# or
npm run start
```
A local web server listening to the port 8080 will then be up. It will return '**Hello *parameter*!**' when someone tries to connect to it with a parameter in the GET method such as: *http://localhost:8080/parameter*.