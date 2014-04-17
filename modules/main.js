define([
    'modules/token',
    'modules/vec2',
    'modules/world'
], function (
    Token,
    vec2,
    World
) {
    'use strict';
    var
        camera,
        dot,
        dots,
        grid,
        // spot,
        tokens,
        world;
        var
            i,
            length;
        world = World.create();
        tokens = [
            // Token.create({
            //     master: true
            // })
        ];
    return {
        tokens: tokens,
        start: function () {
            setInterval(function update() {
                var
                    a,
                    b,
                    dotWasRepositioned,
                    i,
                    input,
                    length,
                    rho;
                rho = world.dragOn ? world.rho : 0;
                if (tokens.length) {
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
                        tokens[a].update(20, input, world.metre, rho);
                    }
                    if (tokens.length === 1) {
                        tokens[0].update(20, input, world.metre, rho);
                    }
                    if (tokens.length > 1) {
                        tokens[tokens.length - 1].update(20, input, world.metre, rho);
                    }
                }
            }, 20);
        }
    }
});
