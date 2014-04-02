define([
    'modules/context'
],function (
    Context
) {
    'use strict';
    var
        prototype;
    prototype = {
        update: function update() {
            this.degrees += 1;
            this.degrees = this.degrees % 360;
        },
        draw: function draw(context, metre, position) {
            context.save();
            context.translate(position[0], position[1]);
            context.rotate((Context.PI / 180) * this.degrees);
            context.beginPath();
            context.arc(0, 0, this.radius * metre, 0, Context.TWO_PI * 4 / 30);
            context.moveTo(this.radius * metre * Context.cos(Context.TWO_PI * 6 / 30), this.radius * metre * Context.sin(Context.TWO_PI * 6 / 30));
            context.arc(0, 0, this.radius * metre, Context.TWO_PI * 6 / 30, Context.TWO_PI * 10 / 30);
            context.moveTo(this.radius * metre * Context.cos(Context.TWO_PI * 12 / 30), this.radius * metre * Context.sin(Context.TWO_PI * 12 / 30));
            context.arc(0, 0, this.radius * metre, Context.TWO_PI * 12 / 30, Context.TWO_PI * 16 / 30);
            context.moveTo(this.radius * metre * Context.cos(Context.TWO_PI * 18 / 30), this.radius * metre * Context.sin(Context.TWO_PI * 18 / 30));
            context.arc(0, 0, this.radius * metre, Context.TWO_PI * 18 / 30, Context.TWO_PI * 22 / 30);
            context.moveTo(this.radius * metre * Context.cos(Context.TWO_PI * 24 / 30), this.radius * metre * Context.sin(Context.TWO_PI * 24 / 30));
            context.arc(0, 0, this.radius * metre, Context.TWO_PI * 24 / 30, Context.TWO_PI * 28 / 30);
            context.lineWidth = 15;
            context.strokeStyle = this.colour;
            context.stroke();
            context.restore();
        },
        colour: 'hsla(360, 100%, 100%, 0.1)',
        degrees: 0,
        radius: 5
    };
    return {
        create: function create() {
            var focus = Object.create(prototype);
            return focus;
        }
    };
});
