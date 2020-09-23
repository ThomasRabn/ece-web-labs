const express = require('express');

const app = express();
const port = 8080;

// We launch the server and make it listen to the given port (here 8080)
app.listen(port, (err) => {
    if (err) throw err;
    console.log("Server listening the port " + port);
})

// We specifiy that the handles.js is required  
require('./handles')(app);