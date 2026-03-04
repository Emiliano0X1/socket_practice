const express = require('express')
const { Server } = require('socket.io')
const { createServer } = require('http')
const path = require('path')

const app = express()
const server = createServer(app)
const io = new Server(server)

const port = 3000

const users = new Map();
const takenNicknames = new Set();

app.use(express.static(path.join(__dirname, '../frontend')))

io.on("connection", (socket) => {
    console.log("Socket conectado:", socket.id);

    socket.on("join", (nickname, cb) => {
        const clean = (nickname || "").toString().trim();

    if (!clean) {
        return cb?.({ ok: false, error: "Nickname vacío." });
    }
    if (takenNicknames.has(clean)) {
        return cb?.({ ok: false, error: "Ese nickname ya está en uso." });
    }
    // Si ya tenía un nickname, liberarlo
    const old = users.get(socket.id);
    if (old) takenNicknames.delete(old);

    users.set(socket.id, clean);
    takenNicknames.add(clean);

    console.log(`${clean} se conectó (${socket.id})`);
    io.emit("system", { message: `${clean} se conectó` });

    cb?.({ ok: true, nickname: clean });
});

  // Mensajes
socket.on("chat_message", (text) => {
    const nickname = users.get(socket.id);
    if (!nickname) {
      // No ha hecho join todavía
        socket.emit("system", { message: "Primero elige un nickname (join)." });
        return;
    }

    const msg = (text || "").toString().trim();
    if (!msg) return;

    io.emit("chat_message", {
        nickname,
        text: msg,
        timestamp: Date.now(),
    });
});

  // Desconexión
socket.on("disconnect", () => {
        const nickname = users.get(socket.id);
        if (nickname) {
            console.log(`${nickname} se desconectó (${socket.id})`);
            io.emit("system", { message: `${nickname} se desconectó` });

            users.delete(socket.id);
            takenNicknames.delete(nickname);
        } else {
            console.log(`Socket desconectado sin nickname: ${socket.id}`);
        }
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})