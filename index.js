const express = require("express");
const http = require("http");
const { runInNewContext } = require("vm");
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + "/public"));

app.get("*", (req, res) => {
  res.status(404).send("Nothing to see here buddy");
});

let userList = [];

io.on("connection", (socket) => {
  console.log("User connection");

  socket.emit("logging update", userList);

  socket.on("post message", (msg) => {
    socket.broadcast.emit("broadcast message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User deconnection");
    userList = userList.filter((e) => e != socket.username);
    io.emit("logging update", userList);
  });

  socket.on("user logging", (username) => {
    socket.username = username;
    userList.push(username);
    io.emit("logging update", userList);
  });
});

server.listen(PORT, () => console.log(`listening on port:${PORT}`));
