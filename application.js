'use strict';
define([
    './settings/cookies',
    'client-sessions',
    'compression',
    'errorhandler',
    'express',
    'static-favicon'
], function (
    cookies,
    clientSessions,
    compression,
    errorHandler,
    express,
    staticFavicon
) {
    var
        application;
    application = express()
        .use(compression())
        .use(staticFavicon('./public/images/gear.png'))
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
