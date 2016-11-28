define([
    'modules/collection/dots',
    'modules/collection/tokens',
    'modules/helper/environment',
    'modules/helper/vec2',
    'modules/singleton/simulation',
    'modules/singleton/zones'
], function (
    dots,
    tokens,
    environment,
    vec2,
    simulation,
    zones
) {
    'use strict';
    return function (
        camera,
        context,
        world
    ) {
        if (environment.client) {
            dots.update(camera.viewportPosition.bind(camera), camera.getBounds.bind(camera), camera.position, world.metre);
            simulation.step(Date.now());
            tokens.update(context.keys, context.dt, world.rho, world.mu, world.gravityAcceleration);
            context.container.className = zones.getByPosition(vec2.length(camera.position) /  world.metre).name;
            camera.update(context.keys);
        }
    };
});
