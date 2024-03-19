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
  Map<roomID, Room>
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

  const getRoomID = () => {
    socket.rooms.forEach((roomID) => {
      if (roomID != socket.id) return socket.id
    });

    return null;
  }


  socket.on("create_room", (data)=> {
    let roomID = generateID();
    let room = new Room();
    room.addUser(data.userID);
    console.log("room %s now has been created by %s", roomID, data.userID);
    roomMap.set(roomID, room);
    socket.join(roomID);
  });

  socket.on("join_room", (data) => {
    console.log("join request received");
    console.log("roomid: %s", data.roomID);
    if (!roomMap.has(data.roomID)) {
        socket.emit("fail", "Join connection failed/n Invalid room ID");
        return false;
    }
    let room = roomMap.get(data.roomID);
    room.users.set(data.userID);
    room.userIDMap.set(socket.id, data.userID);

    console.log("user %s has joined room %s", data.userID, data.roomID);
    socket.join(data.roomID);
    socket.to(data.roomID).emit("update", "User has joined");
    console.log("%i users are in %s room", room.users.size(), data.roomID)

    // send data to the user joined
    let server_data = room.data;
    socket.emit("draw_data", server_data.drawnData);
    socket.emit("image_data", server_data.imageData);
  });
  
  socket.on("leave_room", (data) => {
    let room = roomMap.get(data.roomID);
    room.users.remove(data.userID);
    room.userIDMap.delete(socket.id);
    socket.leave(data.roomID);
  })

  socket.on("action", (command, roomID, data) => {
    console.log("action received");
    console.log("command: %s, data: %s", command, data);
    let room = roomMap.get(roomID);
    console.log("action sent to room: %s", roomID);
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
