define([
    'modules/context',
    'modules/vec2'
], function (
    Context,
    vec2
) {
    'use strict';
    var
        prototype;
    prototype = {
        draw: function draw(context, metre) {
            var
                radiusInPixels,
                fillStyle;
            radiusInPixels = this.radius * metre;
            fillStyle = context.createRadialGradient(
                this.position[0],
                this.position[1],
                1,
                this.position[0],
                this.position[1],
                radiusInPixels
            );
            fillStyle.addColorStop(0, 'rgba(0, 255, 255, 0.1)');
            fillStyle.addColorStop(1, 'rgba(0, 255, 255, 0)');
            context.save();
            context.beginPath();
            context.arc(
                this.position[0],
                this.position[1],
                radiusInPixels,
                0,
                Context.TWO_PI,
                true
            );
            context.fillStyle = fillStyle;
            context.fill();
            context.restore();
        }
    };
    return {
        create: function create(x, y, radius) {
            x = x || 0;
            y = y || 0;
            var
                spot;
            spot = Object.create(prototype);
            spot.mass = 1000;
            spot.position = vec2.fromValues(x, y);
            spot.radius = radius || 12;
            return spot;
        }
    };
});
