define(function () {
    'use strict';
    return function routes(application, logbook) {
        // defining routes
        application.get('*', function getAll(request, response) {
            logbook.info('Sending index.html');
            response.sendfile('./public/index.html');
        });
    };
});
