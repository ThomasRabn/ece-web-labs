const express = require('express');


const app = express();
const port = 8080;

app.listen(port, (err) => {
    if (err) throw err;
    console.log("Server listening the port " + port);
})

require('./handles')(app);