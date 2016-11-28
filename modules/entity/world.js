define(function () {
    'use strict';
    var
        World;
    World = {
        create: function create(configuration) {
            var
                world;
            configuration = configuration || {};
            world = Object.create(this.prototype);
            world.dragOn = configuration.dragOn || true;
            world.gravityAcceleration = configuration.gravityAcceleration || 9.80665;
            world.metre = configuration.metre || 40;
            world.mu = configuration.mu || 0.05;
            world.rho = configuration.rho || 1.22;
            return world;
        },
        prototype: {}
    };
    return World;
});
