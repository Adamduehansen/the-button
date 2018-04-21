/* global __dirname process */
const path = require("path");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const port = process.env.port || 3000;

let numberOfButtonClicks = 0;

app.use(express.static(path.resolve(__dirname, "wwwroot")));

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
      name: data.name,
      numberOfButtonClicks
    });
  });
};

io.on("connection", onConnect);

// Activate server.
server.listen(port, console.log("Listening on port " + port));