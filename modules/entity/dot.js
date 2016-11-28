define([
    'modules/helper/math',
    'modules/helper/vec2'
], function (
    math,
    vec2
) {
    'use strict';
    var
        Dot;
    Dot = {
        create: function create(configuration, cameraPosition) {
            var
                dot,
                temp;
            dot = Object.create(this.prototype);
            temp = vec2.create();
            dot.colour = configuration.colour;
            dot.delta = configuration.delta;
            dot.drawingPosition = vec2.create();
            dot.glimmer = configuration.glimmer;
            dot.position = configuration.position;
            dot.radius = configuration.radius;
            vec2.scale(
                temp,
                cameraPosition,
                dot.delta
            );
            vec2.add(
                dot.drawingPosition,
                dot.position,
                temp
            );
            return dot;
        },
        prototype: {
            update: function update(viewportPosition, bounds, cameraPosition, repositionLimit) {
                var
                    dotWasRepositioned;
                dotWasRepositioned = false;
                if (viewportPosition.isInViewport === false) {
                    if (viewportPosition.outOfViewportMap.top) {
                        if (math.abs(bounds.top) <= repositionLimit) {
                            this.position[1] = bounds.top - cameraPosition[1] * this.delta;
                            dotWasRepositioned = true;
                        }
                    } else {
                        if (viewportPosition.outOfViewportMap.bottom) {
                            if (math.abs(bounds.bottom) <= repositionLimit) {
                                this.position[1] = bounds.bottom - cameraPosition[1] * this.delta;
                                dotWasRepositioned = true;
                            }
                        }
                    }
                    if (viewportPosition.outOfViewportMap.right) {
                        if (math.abs(bounds.right) <= repositionLimit) {
                            this.position[0] = bounds.right - cameraPosition[0] * this.delta;
                            dotWasRepositioned = true;
                        }
                    } else {
                        if (viewportPosition.outOfViewportMap.left) {
                            if (math.abs(bounds.left) <= repositionLimit) {
                                this.position[0] = bounds.left - cameraPosition[0] * this.delta;
                                dotWasRepositioned = true;
                            }
                        }
                    }
                }
                this.updateDrawingPosition(cameraPosition);
                return dotWasRepositioned;
            },
            draw: function draw(context, metre) {
                context.beginPath();
                context.arc(
                    this.drawingPosition[0],
                    this.drawingPosition[1],
                    this.radius * metre,
                    0,
                    math.TWO_PI,
                    true
                );
                context.fillStyle = this.colour;
                context.fill();
            },
            updateDrawingPosition: function updateDrawingPosition(position) {
                var
                    temp;
                temp = vec2.create();
                vec2.scale(
                    temp,
                    position,
                    this.delta
                );
                vec2.add(
                    this.drawingPosition,
                    this.position,
                    temp
                );
            }
        }
    };
    return Dot;
});
