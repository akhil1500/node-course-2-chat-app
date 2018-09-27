const path =  require('path');
const publicVarable = path.join(__dirname,'../public');
const express = require('express');

console.log(__dirname + '/public');

const port = process.env.PORT || 3000;

var app = express();
app.use(express.static(publicVarable));

app.listen(port, ()=>{
    console.log('server is up on '+ port);
});