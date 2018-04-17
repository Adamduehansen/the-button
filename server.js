/* global __dirname process */
const path = require("path");
const express = require("express")();
const server = require("http").Server(express);
const io = require("socket.io")(server);

const port = process.env.port || 3000;

let numberOfButtonClicks = 0;

// Routes
express.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "wwwroot/index.html"));
});
express.get("/build.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "wwwroot/build.js"));
});

/**
 * Handles the "disconnect" event.
 */
const onDisconnect = function() {

};

/**
 * Handles the "connection" event.
* @param {any} socket 
 */
const onConnect = function(socket) {
  socket.emit("connected", { numberOfButtonClicks });
  socket.on("disconnect", onDisconnect);
  socket.on("click", data => {
    numberOfButtonClicks += 1;
    socket.broadcast.emit("clicked", { 
      name: data.name
    });
  });
};

io.on("connection", onConnect);

// Activate server.
server.listen(port, console.log("Listening on port " + port));