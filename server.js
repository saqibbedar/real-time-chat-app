import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io"; 

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(5000, () => console.log("Server started on http://localhost:5000"));