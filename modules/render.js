define([
    'modules/collection/dots',
    'modules/collection/tokens',
    'modules/entity/context'
], function (
    dots,
    tokens,
    Context
) {
    'use strict';
    return function (
        camera,
        context,
        grid,
        world
    ) {
        Context.set(context, camera);
        // begin drawing
        dots.draw(context, world.metre);
        grid.draw(context, world.metre, camera.zoom, camera.position);
        tokens.draw(context, world.metre);
        camera.draw(context, world.metre);
        // end drawing
        Context.unset(context);
    };
});
