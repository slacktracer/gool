define([
    'modules/collection/dots',
    'modules/collection/tokens',
    'modules/entity/camera',
    'modules/entity/context',
    'modules/entity/grid',
    'modules/entity/token',
    'modules/entity/world',
    'modules/helper/environment',
    'modules/update',
    'modules/render',
    'modules/singleton/hooks',
    'modules/singleton/zones'
], function (
    dots,
    tokens,
    Camera,
    Context,
    Grid,
    Token,
    World,
    environment,
    update,
    render,
    hooks,
    zones
) {
    'use strict';
    var
        camera,
        context,
        grid,
        token,
        world;
    world = World.create();
    if (environment.client) {
        context = Context.create('main');
        hooks.install(context);
        token = Token.create({
            master: true,
            mass: 20
        });
        tokens.push(token);
        camera = Camera.create(context.width, context.height, 0, 0, false, token);
        grid = Grid.create(
            'fixed size',
            15,
            0.2,
            {
                width: zones.getByName('dangerZone').length * world.metre,
                height: zones.getByName('dangerZone').length * world.metre
            }
        );
        dots.cookBatch(
            40,
            camera.worldPositionFromViewportPosition.bind(camera),
            camera.randomViewportPosition.bind(camera),
            camera.position,
            world.metre
        );
    }
    return {
        go: function () {
            var
                fixedTimeStep = 20;
            if (environment.client) {
                context.setup = function () {
                };
                context.update = function () {
                    update(
                        camera,
                        context,
                        world
                    );
                };
                context.draw = function () {
                    render(
                        camera,
                        context,
                        grid,
                        world
                    );
                };
                context.start();
            } else {
                setInterval(function () {
                    update(
                        camera,
                        context,
                        world
                    );
                }, fixedTimeStep);
            }
        }
    };
});
