define([
    'modules/main'
], function (
    main
) {
    'use strict';
    return function sockets(handler, logbook) {
        // defining sockets' behavior
        handler.sockets.on('connection', function (socket) {
            var
                length;
            main.tokens[socket.id] = true;
            length = Object.keys(main.tokens).length;
            socket.emit('connected to a teapot', {
                id: socket.id,
                players: main.tokens
            });
            socket.broadcast.emit('new', socket.id);
            socket.on('input', function (input) {
                // socket.broadcast.emit('input', input);
                main.tokens[input.id] = {};
                main.tokens[input.id] = input;
                // handler.sockets.emit('input', input);
            });
            socket.on('disconnect', function () {
                handler.sockets.emit('user disconnected', socket.id);
            });
            setInterval(function () {
                // console.log(main.tokens)
                handler.sockets.emit('input', main.tokens);
            }, 20);
        });
    };
});
