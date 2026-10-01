const socket = io();
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const status = document.getElementById("status");
const dot = document.getElementById("dot");
const welcome = document.getElementById("welcome");

socket.on("connect", () => {
  status.textContent = "online";
  dot.classList.add("online");
});

socket.on("disconnect", () => {
  status.textContent = "desconectado";
  dot.classList.remove("online");
});

socket.on("system", (data) => addSystem(data.text));

socket.on("chat:message", (data) => {
  welcome.style.display = "none";
  const el = document.createElement("div");
  el.className = "bubble";
  el.textContent = data.text;
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text || !socket.connected) return;
  socket.emit("chat:message", text);
  input.value = "";
  input.focus();
});

function addSystem(text) {
  const el = document.createElement("div");
  el.className = "system";
  el.textContent = text;
  messages.appendChild(el);
}
