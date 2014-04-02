define([
    'modules/context',
    'modules/focus',
    'modules/vec2'
], function (
    Context,
    Focus,
    vec2
) {
    'use strict';
    var
        prototype;
    prototype = {
        update: function update() {
            if (this.whomToFollow) {
                vec2.lerp(
                    this.position,
                    this.position,
                    this.whomToFollow.position,
                    0.05
                );
                if (this.focus) {
                    this.focus.update();
                }
            }
        },
        draw: function draw(context, metre) {
            if (this.focus) {
                this.focus.draw(context, metre, this.whomToFollow.position);
            }
        },
        randomViewportPosition: function randomViewportPosition() {
            return vec2.fromValues(
                Context.random(0, this.viewport[0]),
                Context.random(0, this.viewport[1])
            );
        },
        worldPositionFromViewportPosition: function worldPositionFromViewportPosition(viewportPosition) {
            var
                temp;
            temp = vec2.create();
            vec2.scale(
                temp,
                this.viewport,
                1 / 2
            );
            vec2.subtract(
                temp,
                this.position,
                temp
            );
            vec2.add(
                temp,
                viewportPosition,
                temp
            );
            vec2.scale(
                temp,
                temp,
                1 / this.zoom
            );
            return temp;
        },
        viewportPosition: function viewportPosition(position, radius, type) {
            radius = radius || 0;
            var
                viewportBounds,
                response;
            viewportBounds = {
                top: this.position[1] - this.viewport[1] / 2 / this.zoom - radius,
                right: this.position[0] + this.viewport[0] / 2 / this.zoom + radius,
                bottom: this.position[1] + this.viewport[1] / 2 / this.zoom + radius,
                left: this.position[0] - this.viewport[0] / 2 / this.zoom - radius
            };
            response = {
                isInViewport: true,
                outOfViewportMap: {
                    top: false,
                    right: false,
                    bottom: false,
                    left: false
                }
            };
            if (position[1] < viewportBounds.top) {
                if (type === 'trueOrFalseOnly') {
                    return false;
                }
                response.isInViewport = false;
                response.outOfViewportMap.top = true;
            }
            if (position[0] > viewportBounds.right) {
                if (type === 'trueOrFalseOnly') {
                    return false;
                }
                response.isInViewport = false;
                response.outOfViewportMap.right = true;
            }
            if (position[1] > viewportBounds.bottom) {
                if (type === 'trueOrFalseOnly') {
                    return false;
                }
                response.isInViewport = false;
                response.outOfViewportMap.bottom = true;
            }
            if (position[0] < viewportBounds.left) {
                if (type === 'trueOrFalseOnly') {
                    return false;
                }
                response.isInViewport = false;
                response.outOfViewportMap.left = true;
            }
            if (type === 'trueOrFalseOnly') {
                return true;
            }
            return response;
        },
        getBounds: function getBounds(specificBound) {
            switch (specificBound) {
            case 'top':
                return this.position[1] + this.viewport[1] / 2 / this.zoom;
            case 'right':
                return this.position[0] - this.viewport[0] / 2 / this.zoom;
            case 'bottom':
                return this.position[1] - this.viewport[1] / 2 / this.zoom;
            case 'left':
                return this.position[0] + this.viewport[0] / 2 / this.zoom;
            default:
                return {
                    top: this.position[1] + this.viewport[1] / 2 / this.zoom,
                    right: this.position[0] - this.viewport[0] / 2 / this.zoom,
                    bottom: this.position[1] - this.viewport[1] / 2 / this.zoom,
                    left: this.position[0] + this.viewport[0] / 2 / this.zoom
                };
            }
        },
        resize: function resize(width, height) {
            vec2.set(this.viewport, width, height);
        }
    };
    return {
        create: function create(width, height, xPosition, yPosition, whomToFollow, drawFocus) {
            var camera = Object.create(prototype);
            xPosition = xPosition || 0;
            yPosition = yPosition || 0;
            camera.viewport = vec2.fromValues(width, height);
            camera.position = vec2.fromValues(xPosition, yPosition);
            camera.whomToFollow = whomToFollow;
            camera.focus = (drawFocus === true) ? Focus.create() : false;
            camera.minZoom = 0.8;
            camera.maxZoom = 1.1;
            camera.zoom = camera.minZoom;
            return camera;
        }
    };
});
