const express = require('express');

const app = express();
const port = 8080;

app.listen(port, (err) => {
    if (err) throw err;
    console.log("Server listening the port " + port);
})

app.get('/:urlID', function(req, res){
    res.send('Hello ' + req.params.urlID +'!\n');
});

app.get('/', function(req, res){
    res.send('Welcome! This website will salute you with a special message depending on the first argument of your GET request (example: localhost:8080/Peter)');
});

app.use(function (req,res,next){
	res.status(404).send('Error 404! Make sure to have exactly 1 parameter in you GET request!\n');
});
