define([
    'modules/entity/engine',
    'modules/helper/math',
    'modules/helper/vec2',
    'modules/singleton/physics',
    'modules/singleton/simulation'
], function (
    Engine,
    math,
    vec2,
    physics,
    simulation
) {
    'use strict';
    var
        Token;
    Token = {
        create: function create(configuration) {
            var
                token;
            configuration = configuration || {};
            token = Object.create(this.prototype);
            // configurable properties defaults
            token.angularDisplacement = configuration.angularDisplacement || 0;
            token.engine = configuration.engine ? Engine.create(configuration.engine) : Engine.create();
            token.mass = configuration.mass || 2;
            token.master = configuration.master;
            token.position = configuration.position || vec2.fromValues(0, 0);
            token.radius = configuration.radius || 1.2;
            // internal properties
            token.id = configuration.id || 0;
            token.input = {};
            token.Token = true;
            // non-configurable properties (yet)
            token.collidingStyle = 'hsla(0, 50%, 50%, 0.6)';
            token.colour = 'hsla(194, 80%, 40%, 0.6)';
            // token.colour = 'hsla(194, 80%, 40%, 0.4)';
            token.dragCoefficient = 0.47;
            token.force = vec2.fromValues(0, 0); // the sum of forces applied over the token at any given time
            token.velocity = vec2.fromValues(0, 0);
            token.body = physics.body('circle', {
                x: token.position[0],
                y: token.position[1],
                mass: token.mass,
                // radius: token.radius * 40,
                radius: token.radius * 40,
                restitution: 0.8
            });
            simulation.add(token.body);
            return token;
        },
        prototype: {
            get area() {
                return this.radius * 50 * 2 * this.height;
            },
            get height() {
                return this.radius / 2;
            },
            get state() {
                return {
                    angularDisplacement: this.angularDisplacement,
                    engine: this.engine.state,
                    id: this.id,
                    mass: this.mass,
                    position: [
                        this.position[0],
                        this.position[1]
                    ],
                    radius: this.radius,
                    velocity: [
                        this.velocity[0],
                        this.velocity[1]
                    ]
                };
            },
            get velocityDirection() {
                return this.body.state.vel.clone().normalize();
                // return vec2.normalize(vec2.create(), vec2.fromValues(this.body.state.vel[0], this.body.state.vel[1]));
            },
            calculateDragForce: function calculateDragForce(rho) {
                // var
                //     dragForce;
                // dragForce = vec2.fromValues(0, 0);
                // if (rho === 0) {
                //     return dragForce;
                // }
                // vec2.scale(
                //     dragForce,
                //     vec2.fromValues(this.velocityDirection.x, this.velocityDirection.y),
                //     // dragMagnitude
                //     -0.5 * rho * this.dragCoefficient * this.area * vec2.squaredLength(this.velocity)
                // );
                // return dragForce;
                if (rho === 0) {
                    return {
                        x: 0,
                        y: 0
                    };
                }
                return this.velocityDirection
                    .mult(0.5 * rho, this.dragCoefficient * this.area * (this.body.state.vel.clone().normSq()))
                    .negate();
            },
            calculateFrictionForce: function calculateFrictionForce(mu, g) {
                return this
                    .velocityDirection
                    .mult(mu * this.mass * g)
                    .negate();
            },
            draw: function draw(context, metre) {
                // console.log(this.___cat)
                context.save();
                context.beginPath();
                context.translate(this.body.state.pos.x, this.body.state.pos.y);
                context.rotate(this.body.state.angular.pos);
                // context.rotate(this.angularDisplacement);
                context.arc(
                    0,
                    0,
                    this.radius * metre,
                    0,
                    math.TWO_PI,
                    true
                );
                // context.fillStyle = this.colour;
                // context.fill();
    context.restore();
    context.save();
    context.translate(this.body.state.pos.x, this.body.state.pos.y);
    context.rotate(this.body.state.angular.pos);
                context.beginPath();
                context.arc(
                    0,
                    0,
                    this.radius * metre - 5,
                    // this.radius * metre - 40,
                    0,
                    math.TWO_PI,
                    true
                );
                if (this.___cat) {
                    context.clip();
                    context.globalAlpha = 0.5;
                    // context.drawImage(this.___cat, -this.___cat.height / 2, -this.___cat.width / 2);
                    context.drawImage(
                        this.___cat,
                        0, 0,
                        this.___cat.width, this.___cat.height,
                        (-this.___cat.width / 2) - 2, (-this.___cat.height / 2) - 2,
                        this.___cat.width + 4, this.___cat.height + 4
                    );
                }
    context.restore();
    context.save();
    context.beginPath();
    context.translate(this.body.state.pos.x, this.body.state.pos.y);
    context.rotate(this.body.state.angular.pos);
                context.arc(
                    0,
                    0,
                    this.radius * metre - 3,
                    0,
                    math.TWO_PI,
                    true
                );
context.lineWidth = 6;
// context.strokeStyle = 'hsla(100, 100%, 100%, 0.9)';
if (this.body.___colliding) {
    context.strokeStyle = this.collidingStyle;
    // if (window.sto) {
    //     clearTimeout(window.sto);
    // }
    window.sto = setTimeout(function () {
        console.log(window.sto)
        this.body.___colliding = false;
    }.bind(this), 200);
} else {
    context.strokeStyle = this.colour;
}
// context.strokeStyle = 'hsla(200, 100%, 50%, 1)';
context.stroke();
                context.restore();
                if (this.engine) {
                    this.engine.draw(context, this.position, this.radius * metre);
                }
            },
            update: function update(keys, dt, rho, mu, g) {
                var
                    timeStep;
                // this.calculateDragForce(rho);
                if (this.master === true) {
                    this.input = {
                        up: keys.UP,
                        right: keys.RIGHT,
                        down: keys.DOWN,
                        left: keys.LEFT
                    };
                }
                if (this.master === false) {
                    this.input = {
                        up: keys.W,
                        right: keys.D,
                        down: keys.S,
                        left: keys.A
                    };
                }
                timeStep = dt / 1000;
                // this.body.applyForce(this.calculateFrictionForce(mu, g));
                // this.body.applyForce(this.calculateDragForce(rho));
                this.body.applyForce(this.engine.force);
                this.position[0] = (this.body.state.pos.x)/* * 40*/;
                this.position[1] = (this.body.state.pos.y)/* * 40*/;
                if (this.engine) {
                    this.engine.update(this.input, timeStep);
                }
            }
        }
    };
    return Token;
});
