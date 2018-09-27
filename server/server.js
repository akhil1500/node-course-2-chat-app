const path =  require('path');
const http = require('http');
const publicVarable = path.join(__dirname,'../public');
const express = require('express');
const socketIO =  require('socket.io');


console.log(__dirname + '/public');

var app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicVarable));

io.on('connection',(socket) =>{
    console.log('user was connected..');
    

    socket.on('createMessage',(message)=>{
       console.log('create Message',message);
        
        io.emit('newMessage',{
            from: message.from,
            text: message.text,
            createAt:new Date().getTime()
        })

    });
    





    // Event that i want to listen to is newEmail
    

    socket.on('disconnect',()=>{
        console.log('User was disconnected from servers');
    });

});

server.listen(port, ()=>{
    console.log('server is up on '+ port);
});  