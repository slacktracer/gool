define([
    'modules/vec2'
], function (
    vec2
) {
    'use strict';
    var prototype = {
        get direction() {
            return vec2.fromValues(
                Math.cos(this.displacement),
                Math.sin(this.displacement)
            );
        },
        get intesity() {
            var
                startingColorHue,
                endingColorHue;
            startingColorHue = 60;
            endingColorHue = 10;
            return {
                hue: Math.abs((((100 / this.capacity) * this.power) * (startingColorHue - endingColorHue) / 100).toFixed() - startingColorHue),
                opacity: 0.4
            };
        },
        draw: function draw(context, position, radius) {
            var
                radiusPlusHalfRadius,
                doubleRadius;
            radiusPlusHalfRadius = radius + (radius / 2);
            doubleRadius = radius * 2;
            context.save();
            context.beginPath();
            context.translate(position[0], position[1]);
            context.rotate(this.displacement);
            context.moveTo(radiusPlusHalfRadius * Context.cos(Context.TWO_PI * 0.25), radiusPlusHalfRadius * Context.sin(Context.TWO_PI * 0.25));
            context.arc(
                0,
                0,
                radiusPlusHalfRadius,
                Context.TWO_PI * 0.25,
                Context.TWO_PI * 0.75,
                false
            );
            context.lineTo(doubleRadius * Context.cos(Context.TWO_PI * 0.5), doubleRadius * Context.sin(Context.TWO_PI * 0.5));
            context.closePath();
            context.lineWidth = 2;
            context.fillStyle = 'hsla(' + this.intesity.hue + ', 100%, 50%, ' + this.intesity.opacity + ')';
            context.fill();
            context.restore();
        },
        update: function update(input, timeStep) {
            if (!this.brain) {
                // this.processInput(input, timeStep);
            } else {
                if (this.power < 100) this.powerUp(timeStep);
                if (this.power > 140) this.powerDown(timeStep);
                if (this.displacement > Context.TWO_PI * 0.8) this.rotateClockwise(timeStep);
                if (this.displacement > Context.TWO_PI * 0.2) this.rotateAntiClockwise(timeStep);
            }
        },
        processInput: function processInput(input, timeStep) {
            if (input.up) {
                this.powerUp(timeStep);
            }
            if (input.right) {
                this.rotateAntiClockwise(timeStep);
            }
            if (input.down) {
                this.powerDown(timeStep);
            }
            if (input.left) {
                this.rotateClockwise(timeStep);
            }
        },
        powerDown: function powerDown(timeStep) {
            if (this.power > 0) {
                this.power -= this.powerPerSecond * timeStep;
                if (this.power < 0) {
                    this.power = 0;
                }
            }
        },
        powerUp: function powerUp(timeStep) {
            if (this.power < this.capacity) {
                this.power += this.powerPerSecond * timeStep;
                if (this.power > this.capacity) {
                    this.power = this.capacity;
                }
            }
        },
        rotateClockwise: function rotateClockwise(timeStep) {
            this.displacement -= this.radiansPerSecond * timeStep;
        },
        rotateAntiClockwise: function rotateAntiClockwise(timeStep) {
            this.displacement += this.radiansPerSecond * timeStep;
        }
    };
    return {
        create: function create(configuration) {
            configuration = configuration || {};
            var
                engine;
            engine = Object.create(prototype);
            // configurable properties defaults
            engine.brain = configuration.brain || false;
            engine.capacity = configuration.capacity || 200;
            engine.displacement = configuration.displacement || 0;
            engine.powerPerSecond = configuration.powerPerSecond || 50;
            engine.radiansPerSecond = configuration.radiansPerSecond || Math.PI / 2;
            // internal properties
            engine.power = 0;
            return engine;
        }
    };
});
