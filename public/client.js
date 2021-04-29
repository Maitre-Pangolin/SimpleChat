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

    const newMessage = document.createElement("li");
    const content = document.createElement("p");
    content.textContent = input.value;
    newMessage.className = "self-message";
    newMessage.appendChild(content);
    messages.appendChild(newMessage);
    input.value = "";
    messages.scrollTo(0, messages.scrollHeight);
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
  const newMessage = document.createElement("li");
  const sender = document.createElement("strong");
  const content = document.createElement("p");
  sender.textContent = user;
  content.textContent = message;
  newMessage.className = "other-message";
  newMessage.appendChild(sender);
  newMessage.appendChild(content);
  messages.appendChild(newMessage);
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
