require.config({
    paths: {
        'glMatrix': 'libraries/3rd-party/gl-matrix-min',
        'socket.io': 'socket.io/socket.io'
    }
});
require([
    'modules/main'
], function (
    main
) {
    'use strict';
    main.start();
});
