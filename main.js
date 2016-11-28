'use strict';
require('requirejs')
    .config({
        nodeRequire: require,
        paths: {
            'glMatrix': 'libraries/3rd-party/gl-matrix-min',
            'modules/realtime/socket': 'modules/noop',
            'Sketch': 'libraries/3rd-party/sketch'
        },
        packages: [{
            name: 'physicsjs',
            location: 'libraries/3rd-party/physicsjs',
            main: 'physicsjs'
        }]
    })([
        //'./memwatcher',
        './server',
        'modules/main'
    ], function (
        //memwatcher,
        server,
        main
    ) {
        // the game starts here!
        main.go();
    });
