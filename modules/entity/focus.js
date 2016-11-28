define([
    'modules/helper/math'
],function (
    math
) {
    'use strict';
    var
        Focus;
    Focus = {
        create: function create() {
            var
                focus;
            focus = Object.create(this.prototype);
            return focus;
        },
        prototype: {
            colours: {
                center: 'hsla(360, 100%, 100%, 0.1)',
                freeCenter: 'hsla(0, 100%, 60%, 0.3)',
                target: 'hsla(180, 100%, 43%, 0.3)'
            },
            degrees: 0,
            draw: function draw(context, metre, position, free, target) {
                context.save();
                context.translate(position[0], position[1]);
                context.rotate((math.PI / 180) * this.degrees);
                context.beginPath();
                context.arc(0, 0, this.radius * metre, 0, math.TWO_PI * 4 / 30);
                context.moveTo(this.radius * metre * math.cos(math.TWO_PI * 6 / 30), this.radius * metre * math.sin(math.TWO_PI * 6 / 30));
                context.arc(0, 0, this.radius * metre, math.TWO_PI * 6 / 30, math.TWO_PI * 10 / 30);
                context.moveTo(this.radius * metre * math.cos(math.TWO_PI * 12 / 30), this.radius * metre * math.sin(math.TWO_PI * 12 / 30));
                context.arc(0, 0, this.radius * metre, math.TWO_PI * 12 / 30, math.TWO_PI * 16 / 30);
                context.moveTo(this.radius * metre * math.cos(math.TWO_PI * 18 / 30), this.radius * metre * math.sin(math.TWO_PI * 18 / 30));
                context.arc(0, 0, this.radius * metre, math.TWO_PI * 18 / 30, math.TWO_PI * 22 / 30);
                context.moveTo(this.radius * metre * math.cos(math.TWO_PI * 24 / 30), this.radius * metre * math.sin(math.TWO_PI * 24 / 30));
                context.arc(0, 0, this.radius * metre, math.TWO_PI * 24 / 30, math.TWO_PI * 28 / 30);
                context.lineWidth = 15;
                context.strokeStyle = target ? this.colours.target : (free ? this.colours.freeCenter : this.colours.center);
                context.stroke();
                context.restore();
            },
            radius: 5,
            update: function update() {
                this.degrees += 1;
                this.degrees = this.degrees % 360;
            }
        }
    };
    return Focus;
});
