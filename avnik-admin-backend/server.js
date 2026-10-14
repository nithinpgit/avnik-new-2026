const express = require("express");
// const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const path = require('path');
const cors = require("cors");
var nodemailer = require('nodemailer');
var fs = require('fs');
const app = express();

const allowedOrigins = [
  "http://admin.avnik.com",
  "https://admin.avnik.com",
  "http://localhost:8081",
  "http://localhost:8000",
  "http://localhost:3000",
  "http://localhost:3002",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3002",
  "https://meet.avnik.com",
  "https://api.avnik.com",
  "http://api.avnik.com"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.raw({ extended: true }));
// app.use(express.static(__dirname + '../uploads'));
// return console.log(__dirname+ '/app/uploads/user/badge-icon.svg');
app.use('/images', express.static(__dirname+ '/app/uploads'));


//database
const db = require("./app/models");
const Role = db.role;

// Laravel migrations own the shared MySQL schema in Docker; skip Sequelize sync there.
if (process.env.SKIP_DB_SYNC !== 'true') {
  db.sequelize.sync({ force: false }).then(() => {
    console.log('Drop and Resync Db');
    // initial();
  });
} else {
  console.log('Skipping Sequelize sync (Laravel manages database schema)');
}


// simple route
app.get("/", (req, res) => {
  // res.sendFile(__dirname + '/public');
  res.json({ message: "Welcome to Avnik application." });
  // res.json({ message: "Welcome to Ankit's application." });
});


// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/category.routes')(app);
//require('./app/routes/service.routes')(app);
require('./app/routes/emailTemplates.routes')(app);
require('./app/routes/notifications.routes')(app);
require('./app/routes/chat.routes')(app);
require('./app/routes/emailTemplates.routes')(app);

// Socket setup end

// set port, listen for requests
const PORT = process.env.PORT || 8081;
var server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

const options = { 
  cors: corsOptions,
  allowEIO3: true,
  transports: ['websocket', 'polling']
};

const io = new Server(server, options);
app.set("io", io);
// app.use(express.static("public"));

app.use(function(req, res, next) {
  req.io = io;
  next();
});
let onlineUsers = [];
let onlineRooms = [];
const addNewRoom = (roomId, socketId) => {
  !onlineRooms.some((rooms) => rooms.roomId === roomId) &&
  onlineRooms.push({ roomId, socketId });
};
const removeRoom = (socketId) => {
  onlineRooms = onlineRooms.filter((rooms) => rooms.socketId !== socketId);
};
const getRoom = (roomId) => {
  return onlineRooms.find((rooms) => rooms.roomId === roomId);
};
const addNewUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId == userId);
};

io.on("connection", (socket) => {
  console.log('✓ New user connected:', socket.id);
  
  // User identification
  socket.on("userIdentification", (data) => {
    console.log('User identified:', data.userId, 'Socket ID:', socket.id);
    addNewUser(data.userId, socket.id);
  });
  
  // Join chat room
  socket.on("joinChatRoomAVF", (data) => {
    console.log('User joining room:', data.roomId, 'UserId:', data.userId);
    socket.join(data.roomId);
    addNewRoom(data.roomId, socket.id);
  });

  // Send message to all in room
  socket.on("sendToAllAVF", (data) => {
    console.log('Message broadcast:', data);
    io.emit("onReceiveSendToAllAVF", data);
  });

  // Conversation update broadcast
  socket.on("sendConversationAllAVF", (data) => {
    console.log('Conversation update:', data);
    io.emit("getConversationAllAVF", data);
  });

  // User typing indicator
  socket.on("userTypingAVF", (data) => {
    console.log('User typing:', data);
    io.emit("userTypingAVF", data);
  });

  // Room online users
  socket.on("getRoomUsersAVF", (roomId) => {
    console.log('Getting room users for:', roomId);
    const room = getRoom(roomId);
    if (room) {
      io.emit("roomUsersOnlineAVF", onlineUsers.length);
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    removeRoom(socket.id);
    console.log('✗ User disconnected:', socket.id);
  });
});
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "owner"
  });

  Role.create({
    id: 3,
    name: "admin"
  });

  Role.create({
    id: 4,
    name: "public_servant"
  });

  Role.create({
    id: 5,
    name: "sub_admin"
  });

  // ["user", "admin", "owner", "public_servant", "sub_admin"];
}

// initial();

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
     auth: {
          user: 'ankit.enacteservices@gmail.com',
          pass: 'Ankit@123',
       },
  secure: true,
  });
