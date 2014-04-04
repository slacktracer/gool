define([
    'modules/context',
    'modules/engine',
    'modules/socket',
    'modules/vec2'
], function (
    Context,
    Engine,
    socket,
    vec2
) {
    'use strict';
    var
        prototype;
    prototype = {
        get area() {
            // return this.radius * this.radius * PI;
            return this.radius * 2 * 10;
        },
        get velocityDirection() {
            return vec2.normalize(vec2.create(), this.velocity);
        },
        update: function update(dt, input, metre, rho) {
            var
                timeStep;
            if (this.master) {
                if (input.up || input.right || input.down || input.left) {
                    input.id = this.id;
                    socket.emit('input', input);
                }
            }
            // if (this.slave) {
                input = this.input || {};
                this.input = null;
            // }
            timeStep = dt / 1000;
            this.engine.update(input, timeStep);
            this.applyForce(this.calculateDragForce(rho));
            this.applyForce(vec2.scale(
                vec2.create(),
                this.engine.direction,
                this.engine.power
            ));
            this.advancePhysics(timeStep, metre);
        },
        advancePhysics: function advancePhysics(timeStep, metre) {
            var
                temp;
            temp = vec2.create();
            vec2.scale(
                temp,
                this.previous_acceleration,
                0.5 * timeStep * timeStep
            );
            vec2.scaleAndAdd(
                temp,
                temp,
                this.velocity,
                metre * timeStep
            );
            vec2.add(
                this.position,
                this.position,
                temp
            );
            vec2.copy(
                this.previous_acceleration,
                this.current_acceleration
            );
            vec2.scale(
                this.current_acceleration,
                this.force,
                1 / this.mass
            );
            vec2.add(
                temp,
                this.previous_acceleration,
                this.current_acceleration
            );
            vec2.scale(
                this.average_acceleration,
                temp,
                1 / 2 * timeStep
            );
            vec2.add(
                this.velocity,
                this.velocity,
                this.average_acceleration
            );
            vec2.set(
                this.force,
                0,
                0
            );
        },
        applyForce: function applyForce(forceToApply) {
            vec2.add(
                this.force,
                this.force,
                forceToApply
            );
        },
        calculateDragForce: function calculateDragForce(rho) {
            var
                dragForce;
            dragForce = vec2.fromValues(0, 0);
            if (rho === 0) {
                return dragForce;
            }
            vec2.scale(
                dragForce,
                this.velocityDirection,
                // dragMagnitude
                -0.5 * rho * this.dragCoefficient * this.area * vec2.squaredLength(this.velocity)
            );
            return dragForce;
        },
        draw: function draw(context, metre) {
            context.save();
            context.beginPath();
            context.translate(this.position[0], this.position[1]);
            context.rotate(this.angularDisplacement);
            context.arc(
                0,
                0,
                this.radius * metre,
                0,
                Context.TWO_PI,
                true
            );
            if (this.colliding) {
                context.fillStyle = 'hsla(0, 50%, 50%, 0.6)';
                this.colliding = false;
            } else {
                context.fillStyle = this.colour;
            }
            context.fill();
            context.restore();
            this.engine.draw(context, this.position, this.radius * metre);
        }
    };
    return {
        all: {},
        create: function create(configuration) {
            configuration = configuration || {};
            var
                token;
            token = Object.create(prototype);
            // configurable properties defaults
            token.angularDisplacement = configuration.angularDisplacement || 0;
            token.engine = configuration.engine ? Engine.create(configuration.engine) : Engine.create();
            token.mass = configuration.mass || 20;
            token.master = configuration.master;
            token.position = configuration.position || vec2.fromValues(0, 0);
            token.radius = configuration.radius || 1;
            token.slave = configuration.slave;
            // internal properties
            token.average_acceleration = vec2.create();
            token.current_acceleration = vec2.create();
            token.id = configuration.id;
            token.previous_acceleration = vec2.fromValues(0, 0);
            // non-configurable properties (yet)
            token.colour = 'hsla(194, 80%, 40%, 0.6)';
            token.dragCoefficient = 0.47;
            token.force = vec2.fromValues(0, 0); // the sum of forces applied over the token at any given time
            token.velocity = vec2.fromValues(0, 0);
            // token.it = configuration.it || false;
            return token;
        }
    };
});
