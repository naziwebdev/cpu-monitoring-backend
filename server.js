const express = require("express");
const http = require("http");
const os = require("os-utils");
const socketIo = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});


(function () {



})();

app.listen(4001, () => {
  console.log("Server running on port 4001");
});
