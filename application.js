'use strict';
define([
    './settings/cookies',
    'client-sessions',
    'errorhandler',
    'express'
], function (
    cookies,
    clientSessions,
    errorHandler,
    express
) {
    var
        application;
    application = express()
        .use(express.static('./public'))
        .use('/libraries', express.static('./libraries'))
        .use('/modules', express.static('./modules'))
        .use(clientSessions(cookies));
    // error handling
    if (application.get('env') === 'development') {
        application.use(errorHandler({
            dump: true,
            stack: true
        }));
    } else {
        application.use(errorHandler());
    }
    return application;
});
