import { math } from "../../modules/helper/math";
import * as vec2 from "gl-matrix/cjs/vec2";

export const Engine = {
  create: function create(configuration) {
    var engine;
    configuration = configuration || {};
    engine = Object.create(this.prototype);
    // configurable properties defaults
    engine.capacity = configuration.capacity || 300;
    engine.displacement = configuration.displacement || 0;
    engine.powerPerSecond = configuration.powerPerSecond || 480;
    engine.radiansPerSecond = configuration.radiansPerSecond || math.PI / 2;
    // internal properties
    engine.power = configuration.power || 0;
    return engine;
  },
  prototype: {
    get state() {
      return {
        capacity: this.capacity,
        displacement: this.displacement,
        power: this.power,
        powerPerSecond: this.powerPerSecond,
        radiansPerSecond: this.radiansPerSecond,
      };
    },
    get direction() {
      return vec2.fromValues(
        math.cos(this.displacement),
        math.sin(this.displacement),
      );
    },
    get force() {
      return this.direction.mult(this.power);
    },
    get intesity() {
      var startingColorHue, endingColorHue;
      startingColorHue = 60;
      endingColorHue = 10;
      return {
        hue: math.abs(
          (
            ((100 / this.capacity) *
              this.power *
              (startingColorHue - endingColorHue)) /
            100
          ).toFixed() - startingColorHue,
        ),
        opacity: 0.4,
      };
    },
    draw: function draw(context, position, radius) {
      var radiusPlusHalfRadius, doubleRadius;
      radiusPlusHalfRadius = radius + radius / 2;
      doubleRadius = radius * 2;
      context.save();
      context.beginPath();
      context.translate(position[0], position[1]);
      context.rotate(this.displacement);
      context.moveTo(
        radiusPlusHalfRadius * math.cos(math.TWO_PI * 0.25),
        radiusPlusHalfRadius * math.sin(math.TWO_PI * 0.25),
      );
      context.arc(
        0,
        0,
        radiusPlusHalfRadius,
        math.TWO_PI * 0.25,
        math.TWO_PI * 0.75,
        false,
      );
      context.lineTo(
        doubleRadius * math.cos(math.TWO_PI * 0.5),
        doubleRadius * math.sin(math.TWO_PI * 0.5),
      );
      context.closePath();
      context.lineWidth = 2;
      context.fillStyle =
        "hsla(" +
        this.intesity.hue +
        ", 100%, 50%, " +
        this.intesity.opacity +
        ")";
      context.fill();
      context.restore();
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
    rotateClockwise: function rotateClockwise(timeStep) {
      this.displacement -= this.radiansPerSecond * timeStep;
    },
    rotateAntiClockwise: function rotateAntiClockwise(timeStep) {
      this.displacement += this.radiansPerSecond * timeStep;
    },
    update: function update(input, timeStep) {
      this.processInput(input, timeStep);
    },
  },
};
