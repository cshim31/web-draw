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
  const generateRoomID = () => {
    let id = Math.random().toString(16).slice(2);
    while (roomMap.has(id)) {
      id = Math.random().toString(16).slice(2);
    }
    return id;
  };

  socket.on("create_room", (data)=> {
    let roomID = generateRoomID();
    let room = new Room();
    room.addUser(data.userID);
    console.log("room %s now has been created", roomID);
    roomMap.set(roomID, room);
    socket.join(roomID);
  });

  socket.on("join_room", (data) => {
    if (!roomMap.has(data.roomID)) {
        socket.emit("fail", "Join connection failed/n Invalid room ID");
        return false;
    }
    let users = roomMap.get(data.roomID).users;
    // ended here 01/16/2024
    users.set(data.userID);
    console.log("user %s has joined room %s", data.userID, data.roomID);
    socket.join(data.roomID);
    socket.to(data.roomID).emit("update", "User has joined");
    console.log("%i users are in %s room", roomMap.get(data.roomID).users.size(), data.roomID)
  });
  
  socket.on("leave_room", (data) => {
    let users = roomMap.get(data.roomID).users;
    users.remove(data.userID);
    socket.leave(data.roomID);
  })

  socket.on("action", (data) => {
    console.log("action received");
    let room = roomMap.get(data.roomID);
    //room.updateDraw(data.action);
    //socket.to(data.roomID).emit("action", data.action);
    console.log("action sent to %s", data.roomID);
  })
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});