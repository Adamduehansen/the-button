/* global __dirname process */
const path = require("path");
const express = require("express")();
const server = require("http").Server(express);
const io = require("socket.io")(server);

const port = process.env.port || 3000;

// Routes
express.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "wwwroot/index.html"));
});
express.get("/build.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "wwwroot/build.js"));
});

// Socket

/**
 * Handles the "disconnect" event.
 */
const onDisconnect = function() {
  console.log("A user disconnected!");
};

/**
 * Handles the "connection" event.
* @param {any} socket 
 */
const onConnect = function(socket) {
  console.log("A user connected!");
  socket.on("disconnect", onDisconnect);
};

io.on("connection", onConnect);

// Activate server.
server.listen(port, console.log("Listening on port " + port));