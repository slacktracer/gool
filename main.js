'use strict';
var
    r;
    r = require('requirejs');
r.config({
    //Pass the top-level main.js/index.js require
    //function to r so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require,
    paths: {
        'glMatrix': 'public/libraries/3rd-party/gl-matrix-min',
        'socket.io': 'socket.io/socket.io'
    }
});
r([
    './routes',
    './settings/cookies',
    './settings/server',
    './sockets',
    'log',
    'lokapala',
    'modules/main'
], function (
    routes,
    cookies,
    settings,
    sockets,
    Log,
    lokapala,
    main
) {
    var
        logbook,
        server;
    logbook = new Log('info');
    settings.cookies = cookies;
    server = lokapala(settings);
    routes(server.application, logbook);
    sockets(server.sockets, logbook);
    server.listen(settings.port, function onListening() {
        logbook.info(
            'Listening on port %d in %s mode. GO! GO! GO!',
            this.address().port,
            server.application.settings.env
        );
    });
    main.start();
});
