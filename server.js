const http = require("http");
// const app = require("./app/app");
const myApp = require("./app/app");
const socketio = require("socket.io");
const EventEmitter = require("events");
const socketServices = require("./app/socket");

class myEmmiter extends EventEmitter {}
const globalEmmiter = new myEmmiter();

const port = process.env.PORT ?? 30000;

const server = http.createServer(myApp(globalEmmiter));
const io = socketio(server);

io.on("connection", socketServices(globalEmmiter));

// const host = "http://67.43.234.92/"
const host = "http://localhost";
server.listen(port, () => {
  console.log(`Api server is running on: ${host}:${port}`);
});
