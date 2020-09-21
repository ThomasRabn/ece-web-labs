const express = require('express');

const app = express();
const port = 8080;

app.listen(port, (err) => {
    if (err) throw err;
    console.log("Server listening the port " + port);
})

app.get('/hello', function(req, res){
    if (req.query.name == "Thomas") {
        res.send("Hello Thomas! That's a nice name you got there!\n");
    } else if(Object.keys(req.query).length === 0) {
        res.send("Hello uuuuh... Nobody? Make sure to add a 'name' parameter to your query!");
    } else {
        res.send('Hello ' + req.query.name +'!\n');
    }
});

app.get('/:urlID', function(req, res){
    if (req.params.urlID == "Thomas") {
        res.send("Hey Thomas! That's a nice name you got there!\n");
    } else {
        res.send('Hey ' + req.params.urlID +'!\n');
    }
});


app.get('/', function(req, res){
    res.send('Welcome! This website will salute you with a special message depending on the route of your GET request (example: localhost:8080/Peter) or if you add some query parameters with the ID "name" when using the /hello route (example: localhost:8080/hello?name=Jean). \n Special messages can be shown using the name "Thomas".');
});

app.use(function (req,res,next){
	res.status(404).send('Error 404! Make sure to have exactly 1 parameter in you GET request!\n');
});
