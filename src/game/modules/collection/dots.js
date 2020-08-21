import { Dot } from "../entity/dot";
import { math } from "../../modules/helper/math";
import { vec2 } from "../../modules/helper/vec2";
import { zones } from "../../modules/singleton/zones";

export const dots = [];
dots.cookBatch = function cookBatch(
  number,
  worldPositionFromViewportPosition,
  randomViewportPosition,
  cameraPosition,
  metre,
) {
  var dot, i, length;
  for (i = 0, length = number; i < length; i += 1) {
    dot = math.random(this.planes)();
    dot.position = worldPositionFromViewportPosition(randomViewportPosition());
    dot.colour = zones
      .getByPosition(vec2.length(dot.position) / metre)
      .dotColour(dot.glimmer);
    this.push(Dot.create(dot, cameraPosition));
  }
  return this;
}.bind(dots);
dots.draw = function draw(context, metre) {
  var i, length;
  for (i = 0, length = this.length; i < length; i += 1) {
    this[i].draw(context, metre);
  }
}.bind(dots);
dots.planes = [
  function foreground() {
    return {
      delta: math.random(0, 0.1),
      glimmer: math.random(0.4, 0.6),
      radius: math.random(0.08, 0.1),
    };
  },
  function middleground() {
    return {
      delta: math.random(0.1, 0.3),
      glimmer: math.random(0.3, 0.5),
      radius: math.random(0.06, 0.08),
    };
  },
  function background() {
    return {
      delta: math.random(0.3, 0.6),
      glimmer: math.random(0.2, 0.4),
      radius: math.random(0.04, 0.06),
    };
  },
];
dots.update = function update(
  viewportPosition,
  getBounds,
  cameraPosition,
  metre,
) {
  var dotWasRepositioned, i, length;
  for (i = 0, length = this.length; i < length; i += 1) {
    dotWasRepositioned = this[i].update(
      viewportPosition(this[i].drawingPosition, this[i].radius),
      getBounds(),
      cameraPosition,
      zones.getByName("dangerZone").length * metre,
    );
    if (
      dotWasRepositioned &&
      zones.getByPosition(vec2.length(this[i].drawingPosition) / metre)
        .dotColour
    ) {
      this[i].colour = zones
        .getByPosition(vec2.length(this[i].drawingPosition) / metre)
        .dotColour(this[i].glimmer);
    }
  }
}.bind(dots);
