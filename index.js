const express = require("express");
const http = require("http");
const { runInNewContext } = require("vm");
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
//const io = require("socket.io")(server);

app.get("/", (req, res) => {
  res.send("Homepage right here");
});

server.listen(PORT, () => console.log(`listening on port:${PORT}`));
