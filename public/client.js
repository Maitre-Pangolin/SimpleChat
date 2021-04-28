let socket = io();

let chatform = document.getElementById("chat-form");
let input = document.getElementById("input");
const messages = document.getElementById("messages");
let username = "";

chatform.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("broadcast message", (data) => {
  const newMessage = document.createElement("li");
  newMessage.textContent = data;
  messages.appendChild(newMessage);
});
