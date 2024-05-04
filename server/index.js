const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const Room = require("./types/Room.js");
const User = require("./types/User.js");

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
  function generateID() {

    let id = Math.random().toString(16).slice(2);

    while (roomMap.has(id)) {

      id = Math.random().toString(16).slice(2);

    }

    return id;

  };

  function getRoomId() {

    var roomId;

    socket.rooms.forEach((id) => {
      if (id != socket.id) {
        roomId = id;
        return ;
      }
    });
    
    return roomId;

  }

  function sendDataArr(eventName, dataArr) {
    dataArr.forEach((data) => {
      socket.emit(eventName, data);
    })
  }
  


  socket.on("create_room", (data, sendback)=> {

    // Create room
    const roomId = generateID();
    const room = new Room();

    roomMap.set(roomId, room);
    console.log("create_room roomId %s, room %s", roomId, roomMap.get(roomId));
    console.log("create room socket id %s", socket.id)
    const response = {
      status: 200,
      roomId: roomId
    };

    sendback(response);
    console.log("room %s now has been created by %s", roomId, data.userName);
    
  });

  socket.on("join_room", (data, sendback) => {

    // Validate room
    if (!roomMap.has(data.roomId)) {

        socket.emit("fail", "Join connection failed/n Invalid room ID");
        return false;

    }
    
    // Add user to room with info (userName)
    const room = roomMap.get(data.roomId);
    room.joinUser(socket.id, data.userName);
    socket.join(data.roomId);
    
    console.log("join_room room socket id %s", socket.id)
    // Broadcast to all users in room
    socket.to(data.roomId).emit("join_user", "User has joined");
    console.log("user %s has joined room %s", data.userName, data.roomId);
    console.log("%i users are in %s room", room.userSize, data.roomId)
    
    // Respond user with approval
    const roomId = getRoomId();
    const response = {
      status: 200,
      roomId: roomId
    };

    sendback(response);

    // Share action (drawings and images) recorded by server
    const server_data = room.data;
    if(server_data.drawData) sendDataArr("draw_add", server_data.drawData);
    if(server_data.imageData) sendDataArr("image_add", server_data.imageData);
  });
  
  socket.on("leave_room", (data, sendback) => {

    console.log("leave_room called");
    const room = roomMap.get(getRoomId());
    room.leave(socket.id);
    socket.leave(data.roomId);

    // respond user with approval
    const response = {
      status: 200
    };

    sendback(response);
  })

  socket.on("action", (command, data) => {
    console.log("action %s", command);
    const roomId = getRoomId();
    console.log("action roomId %s", roomId);
    const room = roomMap.get(roomId);

    if (!room) return;

    let eventName = "";

    switch (command) {

      case "draw_add":
        room.addDraw(data);
        eventName = "draw_add";
        break;

      case "image_add": 
        room.addImage(data);
        eventName = "image_add";
        break;

      case "image_update":
        room.updateImage(data);
        eventName = "image_update";
        break;

      default:
        return ;
    }

    console.log("action received");
    // Send updates to all clients in the channel
    socket.broadcast.emit(eventName, data);
  })
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
