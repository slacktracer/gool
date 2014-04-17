'use strict';
module.exports = function sockets(handler, logbook) {
    // defining sockets' behavior
    var
        tokens;
    tokens = require('./modules/token');
    handler.sockets.on('connection', function (socket) {
        var
            length;
        tokens[socket.id] = true;
        length = Object.keys(tokens).length;
        socket.emit('connected to a teapot', {
            id: socket.id,
            players: tokens
        });
        socket.broadcast.emit('new', socket.id);
        socket.on('input', function (input) {
            // socket.broadcast.emit('input', input);
            tokens[input.id] = {};
            tokens[input.id] = input;
            // handler.sockets.emit('input', input);
        });
        socket.on('disconnect', function () {
            handler.sockets.emit('user disconnected', socket.id);
        });
        setInterval(function () {
            console.log(tokens)
            handler.sockets.emit('input', tokens);
        }, 30);
    });
};
