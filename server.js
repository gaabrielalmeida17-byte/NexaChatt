const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/status", (req, res) => {
  res.json({ app: "NexaChat", status: "online" });
});

io.on("connection", (socket) => {
  socket.emit("system", { text: "Conectado ao NexaChat." });

  socket.on("chat:message", (message) => {
    const clean = String(message || "").trim().slice(0, 1000);
    if (!clean) return;
    io.emit("chat:message", {
      text: clean,
      time: new Date().toISOString()
    });
  });
});

server.listen(PORT, () => {
  console.log(`NexaChat rodando na porta ${PORT}`);
});
