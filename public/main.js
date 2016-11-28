require
    .config({
        paths: {
            'glMatrix': 'libraries/3rd-party/gl-matrix-min',
            'modules/realtime/sockets': 'modules/noop',
            'Sketch': 'libraries/3rd-party/sketch.min',
            'socket.io': 'socket.io/socket.io'
        },
        packages: [{
            name: 'physicsjs',
            location: 'libraries/3rd-party/physicsjs',
            main: 'physicsjs'
        }]
    })([
        'modules/main'
    ], function (
        main
    ) {
        'use strict';
        // the game starts here!
        main.go();
    });
