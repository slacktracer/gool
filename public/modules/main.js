define([
    'modules/camera',
    'modules/context',
    'modules/dot',
    'modules/grid',
    // 'modules/spot',
    'modules/token',
    'modules/vec2',
    'modules/world'
], function (
    Camera,
    Context,
    Dot,
    Grid,
    // Spot,
    Token,
    vec2,
    World
) {
    'use strict';
    var
        camera,
        context,
        dot,
        dots,
        grid,
        // spot,
        tokens,
        world;
    context = Context.create('main');
    context.setup = function setup() {
        var
            i,
            length;
        world = World.create();
        // spot = Spot.create();
        grid = Grid.create(
            'fixed size',
            15,
            0.2,
            {
                width: world.getZoneByName('dangerZone').length * world.metre,
                height: world.getZoneByName('dangerZone').length * world.metre
            }
        );
        tokens = [
            Token.create({
                master: true
            })
        ];
        camera = Camera.create(context.width, context.height, 0, 0, tokens[0], false);
        dots = [];
        for (i = 0, length = world.dots.howMany; i < length; i += 1) {
            dot = Context.random(world.dots.planes)();
            dot.position = camera.worldPositionFromViewportPosition(camera.randomViewportPosition());
            dot.colour = world.getZoneByPosition(vec2.length(dot.position) / world.metre).dotColour(dot.glimmer);
            dots.push(Dot.create(dot, camera.position));
        }
    };
    context.update = function update() {
        var
            a,
            b,
            dotWasRepositioned,
            i,
            input,
            length,
            rho;
        input = {
            up: context.keys.UP,
            right: context.keys.RIGHT,
            down: context.keys.DOWN,
            left: context.keys.LEFT
        };
        rho = world.dragOn ? world.rho : 0;
        camera.update();
        context.container.className = world.getZoneByPosition(vec2.length(camera.position) /  world.metre).name;
        for (i = 0, length = dots.length; i < length; i += 1) {
            dotWasRepositioned = dots[i].update(
                camera.viewportPosition(dots[i].drawingPosition, dots[i].radius),
                camera.getBounds(),
                camera.position,
                world.getZoneByName('dangerZone').length * world.metre
            );
            if (dotWasRepositioned) {
                dots[i].colour = world.getZoneByPosition(vec2.length(dots[i].drawingPosition) / world.metre).dotColour(dots[i].glimmer);
            }
        }
        for (a = 0; a < tokens.length - 1; a += 1) {
            for (b = a + 1; b < tokens.length; b += 1) {
                if (
                    vec2.distance(tokens[a].position, tokens[b].position ) /
                    world.metre < tokens[a].radius + tokens[b].radius
                ) {
                    tokens[a].colliding = true;
                    tokens[b].colliding = true;
                    if (tokens[a].master && !tokens[b].master) {
                        tokens[b].velocity = vec2.fromValues(0, 0);
                    }
                    if (tokens[b].master && !tokens[a].master) {
                        tokens[a].velocity = vec2.fromValues(0, 0);
                    }
                }
            }
            tokens[a].update(context.dt, input, world.metre, rho);
        }
        if (tokens.length === 1) {
            tokens[0].update(context.dt, input, world.metre, rho);
        }
        if (tokens.length > 1) {
            tokens[tokens.length - 1].update(context.dt, input, world.metre, rho);
        }
    };
    context.draw = function draw() {
        var
            i,
            length;
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.translate(
            context.width / 2 - camera.position[0] * camera.zoom,
            context.height / 2 - camera.position[1] * camera.zoom
        );
        context.scale(camera.zoom, camera.zoom);
        for (i = 0, length = dots.length; i < length; i += 1) {
            dots[i].draw(context, world.metre);
        }
        grid.draw(context, world.metre, camera.zoom, camera.position);
        for (i = 0, length = tokens.length; i < length; i += 1) {
            if (camera.viewportPosition(tokens[i].position, tokens[i].radius * world.metre, 'trueOrFalseOnly')) {
                tokens[i].draw(context, world.metre);
            }
        }
        camera.draw(context, world.metre);
        context.restore();
    };
    context.resize = function resize() {
        camera.resize(context.width, context.height);
    };
    return context;
});
