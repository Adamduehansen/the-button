import io from "socket.io-client";

require("./index.scss");

const nameInput = document.getElementById("name-input");
const theButton = document.getElementById("the-button");
const numberOfButtonClicksSpan = document.getElementById("number-of-button-clicks");
const whoClickedTheButtonSpan = document.getElementById("who-pressed-the-button");

const socket = io("http://localhost:3000/");

// Add an event listener on the button.
theButton.addEventListener("click", () => {
  whoClickedTheButtonSpan.innerText = "You";
  socket.emit("click", { 
    name: nameInput.value
  });
});


// Handles the "connected" event.
socket.on("connected", data => {
  numberOfButtonClicksSpan.innerText = data.numberOfButtonClicks;
});

socket.on("clicked", data => {
  whoClickedTheButtonSpan.innerText = data.name 
    ? data.name 
    : "Someone";
});

// Handles the "connect_error" event.
socket.on("connect_error", () => {
  console.error("Connection error!");
});