const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const Room = require('./types/Room.js');
const User = require('./types/User.js');

const app = express();
const server = createServer(app);
// for test
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});

// for deployment
//const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "build", "index.html"));
});


/*
  Map<roomId, Room>
*/
const roomMap = new Map();

io.on("connection", (socket) => {

  console.log("new connection made");
  const generateID = () => {

    let id = Math.random().toString(16).slice(2);

    while (roomMap.has(id)) {

      id = Math.random().toString(16).slice(2);

    }

    return id;

  };

  const getRoomId = () => {

    socket.rooms.forEach((roomId) => {

      if (roomId != socket.id) return socket.id

    });

    return null;

  }
  


  socket.on("create_room", (data, sendback)=> {
    
    const roomId = generateID();
    const room = new Room();

    roomMap.set(roomId, room);
    room.joinUser(socket.id, data.userName);
    socket.join(roomId);

    const response = {
      status: 200,
      roomId: roomId
    };

    sendback(response);
    console.log("room %s now has been created by %s", roomId, data.userName);
    
  });

  socket.on("join_room", (data, sendback) => {

    if (!roomMap.has(data.roomId)) {

        socket.emit("fail", "Join connection failed/n Invalid room ID");
        return false;

    }
    
    const room = roomMap.get(data.roomId);
    room.joinUser(socket.id, data.userName);
    socket.join(data.roomId);
    
    socket.to(data.roomId).emit("update", "User has joined");
    console.log("user %s has joined room %s", data.userName, data.roomId);
    console.log("%i users are in %s room", room.userSize, data.roomId)

    // respond user with approval
    const roomId = getRoomId();
    const response = {
      status: 200,
      roomId: roomId
    };

    sendback(response);

    // share user room updates
    const server_data = room.data;
    socket.emit("draw_data", server_data.drawnData);
    socket.emit("image_data", server_data.imageData);
  });
  
  socket.on("leave_room", (data, sendback) => {

    const room = roomMap.get(getRoomId());
    room.userNameMap.delete(socket.id);
    socket.leave(data.roomId);

    // respond user with approval
    const response = {
      status: 200
    };

    sendback(response);
  })

  socket.on("action", (command, roomId, data) => {
    const room = roomMap.get(getRoomId());

    if (!room) return;

    let eventName = "";

    switch (command) {

      case 'draw_add':
        room.addDraw(data);
        eventName = "draw_add";
        break;

      case 'image_add': 
        room.addImage(data);
        eventName = "image_add";
        break;

      case 'image_update':
        room.updateImage(data);
        eventName = "image_update";
        break;

      default:
        return ;
    }

    // Send updates to all clients in the channel
    socket.broadcast.emit(eventName, data);
  })
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
