'use strict';
module.exports = function routes(application, logbook) {
    // defining routes
    application.get('*', function getAll(request, response) {
        response.sendfile('./public/index.html');
    });
};
