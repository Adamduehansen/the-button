import io from "socket.io-client";

require("./index.scss");

const nameInput = document.querySelector(".name-input");
const theButton = document.querySelector(".the-button");

// Add an event listener on the button.
theButton.addEventListener("click", () => {
  nameInput.focus(); // Set focus back to name input on click.
});

const socket = io("http://localhost:3000/");

socket.on("connection", () => {
  console.log("Connected!");
});

socket.on("connect_error", () => {
  console.log("Ouch!");
});
