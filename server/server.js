const path =  require('path');
const http = require('http');
const publicVarable = path.join(__dirname,'../public');
const express = require('express');
const socketIO =  require('socket.io');


console.log(__dirname + '/public');

var app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);    /// creating server with http
var io = socketIO(server);

app.use(express.static(publicVarable));

io.on('connection',(socket)=>{    // listeening for an event and providing calll back funciton
     console.log('new user connected..');


     socket.on('disconnect',()=>{
        console.log('user was disconnected..');
     })
})

server.listen(port,() =>{   //can use app.server also
    console.log(`server is up on ${port}`);
});