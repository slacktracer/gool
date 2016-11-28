define([
    'socket.io'
], function (
    socket_io
) {
    'use strict';
    var
        socket;
    socket = socket_io.connect();
    return socket;
});
