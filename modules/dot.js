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
        update: function update(viewportPosition, bounds, cameraPosition, repositionLimit) {
            var
                dotWasRepositioned;
            dotWasRepositioned = false;
            if (viewportPosition.isInViewport === false) {
                if (viewportPosition.outOfViewportMap.top) {
                    if (Context.abs(bounds.top) <= repositionLimit) {
                        this.position[1] = bounds.top - cameraPosition[1] * this.delta;
                        dotWasRepositioned = true;
                    }
                } else {
                    if (viewportPosition.outOfViewportMap.bottom) {
                        if (Context.abs(bounds.bottom) <= repositionLimit) {
                            this.position[1] = bounds.bottom - cameraPosition[1] * this.delta;
                            dotWasRepositioned = true;
                        }
                    }
                }
                if (viewportPosition.outOfViewportMap.right) {
                    if (Context.abs(bounds.right) <= repositionLimit) {
                        this.position[0] = bounds.right - cameraPosition[0] * this.delta;
                        dotWasRepositioned = true;
                    }
                } else {
                    if (viewportPosition.outOfViewportMap.left) {
                        if (Context.abs(bounds.left) <= repositionLimit) {
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
                Context.TWO_PI,
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
    };
    return {
        create: function create(configuration, cameraPosition) {
            var
                dot,
                temp;
            dot = Object.create(prototype);
            temp = vec2.create();
            dot.colour = configuration.colour;
            dot.delta = configuration.delta;
            dot.glimmer = configuration.glimmer;
            dot.position = configuration.position;
            dot.radius = configuration.radius;
            dot.drawingPosition = vec2.create();
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
        }
    };
});
