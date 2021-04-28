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

userList = [];

io.on("connection", (socket) => {
  console.log("User connection");

  socket.on("chat message", (msg) => {
    io.emit("broadcast message", msg);
  });
  socket.on("disconnect", () => {
    console.log("User deconnection");
  });
});

server.listen(PORT, () => console.log(`listening on port:${PORT}`));
