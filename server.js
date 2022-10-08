const http = require("http");
const app = require("./app/app");
const socketio = require("socket.io");
const socketServices = require('./app/socket')

const port = process.env.PORT ?? 30000;

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", socketServices);

// const host = "http://67.43.234.92/"
const host = "http://localhost";
server.listen(port, () => {
  console.log(`Api server is running on: ${host}:${port}`);
});
