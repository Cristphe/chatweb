const path = require('path');
const express = require('express');

const app = express();
const server = require('http').Server(app);
const socket = require('socket.io');

const io = socket(server);

const PORT = 3000;

const users = {};
let usersNum = 0;

app.use(express.static(path.join(__dirname, 'publica')));

io.on('connection', (socket) => {
 usersNum += 1;

 socket.on('Usuario-conectado', (nome) => {
    io.emit('broadcast', `Online: ${usersNum}`);
});

socket.on('Mensagem nova', (data) =>{
    io.emit('Mensagem nova', data);
});

socket.on('Está digitando', (nome) => {
    socket.broadcast.emit('Está digitando', nome);
});

socket.on('desconectado', () =>{
    usersNum -= 1;
    io.emit('broadcast', `Online: ${usersNum}`);
    socket.broadcast.emit('usuario desconectado', users[socket.io]);
    delete users[socket.io];
});
});

server.listen(PORT, () => {

});