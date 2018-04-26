import * as io from "socket.io-client";

require("./index.scss");

const nameInput = <HTMLInputElement> document.getElementById("name-input");
const theButton = document.getElementById("the-button");
const numberOfButtonClicksSpan = document.getElementById("number-of-button-clicks");
const whoClickedTheButtonSpan = document.getElementById("who-pressed-the-button");
const connectionRefused = document.getElementById("connection-refused");

const socket = new io("http://localhost:3000/");

// Add an event listener on the button.
theButton.addEventListener("click", () => {
  whoClickedTheButtonSpan.innerText = "You";
  numberOfButtonClicksSpan.innerText = (parseInt(numberOfButtonClicksSpan.innerText) + 1).toString();
  socket.emit("click", { 
    name: nameInput.value,
    date: new Date(Date.now())
  });
});

// Handles the "connected" event.
socket.on("connected", (data: any[]) => {
  numberOfButtonClicksSpan.innerText = data.length.toString();
  if (data.length === 0) return;
  whoClickedTheButtonSpan.innerText = data[data.length - 1].name;
});

// Handles the "clicked" event.
socket.on("clicked", (data: any[]) => {
  whoClickedTheButtonSpan.innerText = data[data.length - 1].name;
  numberOfButtonClicksSpan.innerText = data.length.toString();

  // Simulate button click.
  theButton.classList.add("pressed");
  const releaseButtonWait = setInterval(() => {
    theButton.classList.remove("pressed");
    clearInterval(releaseButtonWait);
  }, 200);
});

// Handles the "connect_error" event.
socket.on("connect_error", () => {
  connectionRefused.classList.remove("hidden");
  theButton.setAttribute("disabled", "disabled");
});

socket.on("reconnect", () => {
  connectionRefused.classList.add("hidden");
  theButton.removeAttribute("disabled");
});