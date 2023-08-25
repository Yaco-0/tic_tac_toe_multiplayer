const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');
const { log } = require('console');

app.use(cors());
const server = http.createServer(app);

const rooms = [];

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3001",
        methods:["GET","POST"]
    }
});

io.on("connection",(socket)=>{
    rooms.push(socket.id);
    
    socket.on("join-room",(data)=>{
        socket.join(data);
        console.log(data); 
    })

    socket.on("player-click",(data)=>{
        
        console.log(data);
        socket.to(data.roomId).emit("get-player-click",data.gameState)
    })

    socket.on("game-over",(winner)=>{
        socket.emit("game-end",winner);
    })

})

server.listen(8000,()=>{
    console.log("Server is running");
})

