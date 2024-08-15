const express = require("express");
const http = require("http");
const os = require("os-utils");
const cors = require('cors')
const socketIo = require("socket.io");
const {updateCpuUsage} = require("./utils/cpu");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, PUT, POST, DELETE",
  credentials: true,
  allowedHeaders:
    "Content-Type, Authorization, Content-Length, X-Requested-With",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
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
        updateCpuUsage(
          Math.round(usage * 100),
          cpuUsageHistory,
          cpuUsageMaxLength
        );
      });

      socket.emit("cpu", cpuUsageHistory);
    }, interval);
  });
})();

server.listen(4003, () => {
  console.log("Server running on port 4003");
});
