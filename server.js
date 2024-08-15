const express = require("express");
const http = require("http");
const os = require("os-utils");
const socketIo = require("socket.io");
const { updateUpuUsage } = require("./utils/cpu");

const app = express();

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

const cpuUsageHistory = [];
const cpuUsageMaxLength = 10;
const interval = 1000;

(function () {
  io.on("connection", (socket) => {
    for (let i = 0; i < cpuUsageMaxLength; i++) {
      cpuUsageHistory[i] = [i, 0];
    }

    setInterval(() => {
      os.cpuUsage((usage) => {
        updateUpuUsage(
          Math.round(usage * 100),
          cpuUsageHistory,
          cpuUsageMaxLength
        );
      });

      socket.emit("cpu", cpuUsageHistory);
    }, interval);
  });
})();

app.listen(4003, () => {
  console.log("Server running on port 4003");
});
