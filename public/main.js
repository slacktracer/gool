require.config({
    paths: {
        'glMatrix': 'libraries/3rd-party/gl-matrix-min',
        'socket.io': 'socket.io/socket.io'
    }
});
require([
    'modules/events',
    'modules/main'
], function (
    events,
    main
) {
    'use strict';
    main.start();
});
