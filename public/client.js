let socket = io();

//const chat = document.getElementById("chat");

const loggingForm = document.getElementById("logging-form");
const inputUser = document.getElementById("input-username");
const userNameDiv = document.getElementById("username");
let username = "";

let input = document.getElementById("input");
const chatForm = document.getElementById("chat-form");
const messages = document.getElementById("messages");

const userCount = document.getElementById("userCount");
const userList = document.getElementById("userList");

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value) {
    socket.emit("post message", {
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
    username = inputUser.value;
    userNameDiv.textContent = inputUser.value;
    socket.emit("user logging", username);
  }
});

socket.on("broadcast message", ({ user, message }) => {
  console.log("im");
  const newMessage = document.createElement("li");
  newMessage.textContent = user + ":   " + message;
  newMessage.className = "other-message";
  messages.appendChild(newMessage);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("logging update", (users) => {
  userCount.textContent = `Connected users: ${users.length}`;
  userList.innerHTML = null;
  users.forEach((user) => {
    const newUser = document.createElement("li");
    newUser.textContent = user;
    userList.appendChild(newUser);
  });
});
