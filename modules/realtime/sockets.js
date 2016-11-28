define([
    '../../server',
    'socket.io'
], function (
    server,
    socket_io
) {
    'use strict';
    var
        socket_io_manager,
        sockets;
    socket_io_manager = socket_io.listen(server);
    socket_io_manager.enable('browser client minification');
    socket_io_manager.enable('browser client etag');
    socket_io_manager.enable('browser client gzip');
    socket_io_manager.set('transports', ['websocket']);
    socket_io_manager.set('log level', 2);
    sockets = socket_io_manager.sockets;
    return sockets;
});
