'use strict';
define([
    './application',
    './settings/main',
    'http'
], function (
    application,
    settings,
    http
) {
    var
        server;
    server = http
        .createServer(application)
        .listen(settings.port)
        .on('listening', function () {
            var
                environment,
                port;
            environment = application.settings.env;
            port = this.address().port;
            console.log('Listening on port %d in %s mode. GAME ON!', port, environment);
        });
    return server;
});
