define([
    'socket.io'
], function (
    sockets
) {
    'use strict';
    var
        socket;
    // socket = sockets.connect('http://localhost:8001');
    socket = sockets.connect('https://gool.jit.su');
    socket.on('connected to a teapot', function (data) {
        console.log('connected to a teapot indeed', data);
    });
    return socket;
});
