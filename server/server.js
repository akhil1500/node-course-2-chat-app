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
    
    //  socket.on('newMessage',function(nMessage){  //listening to the newMessage
    //     console.log('welcome ',nMessage);
    // });
    
    // socket.emit('newMessage',{
    //     from:'someone',
    //     text:'sometext'
    // });


    socket.on('createMessage',function(message){
        console.log('createMessage',message);
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt:new Date().getTime()
        });
    });


    //  socket.emit('newEmail',{   //creating  custom event newEmail
    //     from: 'example@mail.com',
    //     text: 'sometext',
    //     createAt: new Date().getTime()
    //  });

    //  socket.on('createEmail',(newMail)=>{
    //      console.log('createEmail',newMail);
    //  })

     socket.on('disconnect',()=>{   //listening for disconnect event..
        console.log('user was disconnected..');
     })
})

server.listen(port,() =>{   //can use app.server also
    console.log(`server is up on ${port}`);
});