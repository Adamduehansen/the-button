import io from "socket.io-client";

require("./index.scss");

const socket = io("http://localhost:3000/");

socket.on("connection", () => {
  console.log("Connected!");
});