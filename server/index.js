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
    
    let roomId = generateID();
    let room = new Room();

    room.addUser(data.userId);
    roomMap.set(roomId, room);
    socket.join(roomId);

    let response = {
      status: 200,
      roomId: roomId
    };

    sendback(response);
    console.log("room %s now has been created by %s", roomId, data.userId);
    
  });

  socket.on("join_room", (data, sendback) => {

    console.log("join request received");
    console.log("roomId: %s", data.roomId);

    if (!roomMap.has(data.roomId)) {

        socket.emit("fail", "Join connection failed/n Invalid room ID");
        return false;

    }
    
    let room = roomMap.get(data.roomId);
    room.users.set(data.userId);
    room.userIdMap.set(socket.id, data.userId);

    socket.join(data.roomId);
    socket.to(data.roomId).emit("update", "User has joined");
    console.log("user %s has joined room %s", data.userId, data.roomId);
    console.log("%i users are in %s room", room.users.size(), data.roomId)

    // respond user with approval
    let response = {
      status: 200,
      roomId: data.roomId
    };

    sendback(response);

    // share user room updates
    let server_data = room.data;
    socket.emit("draw_data", server_data.drawnData);
    socket.emit("image_data", server_data.imageData);
  });
  
  socket.on("leave_room", (data, sendback) => {

    let room = roomMap.get(data.roomId);

    room.users.remove(data.userId);
    room.userIdMap.delete(socket.id);
    socket.leave(data.roomId);

    // respond user with approval
    let response = {
      status: 200
    };

    sendback(response);
  })

  socket.on("action", (command, roomId, data) => {
    console.log("action received");
    console.log("command: %s, data: %s", command, data);
    let room = roomMap.get(roomId);
    console.log("action sent to room: %s", roomId);
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
