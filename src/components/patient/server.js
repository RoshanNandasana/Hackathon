const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (adjust for production)
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.emit("me", socket.id); // Send the socket ID to the client

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    io.emit("callEnded", { from: socket.id }); // Notify all peers of disconnection
  });

  socket.on("callUser", ({ userToCall, signalData, from }) => {
    console.log(`Call initiated from ${from} to ${userToCall}`);
    io.to(userToCall).emit("callUser", { signal: signalData, from });
  });

  socket.on("answerCall", ({ to, signal }) => {
    console.log(`Call answered to ${to}`);
    io.to(to).emit("callAccepted", signal);
  });

  socket.on("endCall", ({ to }) => {
    console.log(`Call ended for ${to}`);
    io.to(to).emit("callEnded", { from: socket.id });
  });
});

server.listen(4000, () => console.log("Signaling server running on port 4000"));