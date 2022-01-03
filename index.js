const express = require("express")
const { Server } = require("socket.io");
var http = require('http');

const app = express()

var server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chat-socket-io-prince.herokuapp.com/",
    methods: ["GET", "POST"]
  }
});

app.get("/", (req, res) => res.send("Chat BE"))

io.on("connection", (socket) => {
  console.log(socket.id)

  socket.on("joinRoom", room => {
		socket.join(room)
  })

  socket.on("newMessage", ({newMessage, room}) => {
    io.in(room).emit("getLatestMessage", newMessage)
  })

});



server.listen(9000, console.log("App started at port 9000"))
