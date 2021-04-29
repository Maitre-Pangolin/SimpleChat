let socket = io();

//const chat = document.getElementById("chat");
let chatForm = document.getElementById("chat-form");
const loggingForm = document.getElementById("logging-form");
let input = document.getElementById("input");
const inputUser = document.getElementById("input-username");
const messages = document.getElementById("messages");
const userNameDiv = document.getElementById("username");
let username = "";

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value) {
    socket.emit("chat message", {
      user: username,
      message: input.value,
    });
    input.value = "";
  }
});

loggingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (inputUser.value) {
    loggingForm.style.display = "none";
    console.log(inputUser.value);
    username = inputUser.value;
    userNameDiv.textContent = inputUser.value;
  }
});

socket.on("broadcast message", ({ user, message }) => {
  const newMessage = document.createElement("li");
  newMessage.textContent = user + ":   " + message;
  messages.appendChild(newMessage);
  window.scrollTo(0, document.body.scrollHeight);
});
