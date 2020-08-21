import { dots } from "./collection/dots";
import { tokens } from "./collection/tokens";
import { Camera } from "./entity/camera";
import { Context } from "./entity/context";
import { Grid } from "./entity/grid";
import { Token } from "./entity/token";
import { World } from "./entity/world";
import { environment } from "./helper/environment";
import { update } from "./update";
import { render } from "./render";
import { hooks } from "./singleton/hooks";
import { zones } from "./singleton/zones";

export default {
  go: function () {
    var camera, context, grid, token, world;

    world = World.create();

    if (environment.client) {
      context = Context.create("main");
      hooks.install(context);
      // token = Token.create({
      //   master: true,
      //   mass: 20,
      // });
      // tokens.push(token);
      camera = Camera.create(context.width, context.height, 0, 0, false, token);
      grid = Grid.create("fixed size", 15, 0.2, {
        width: zones.getByName("dangerZone").length * world.metre,
        height: zones.getByName("dangerZone").length * world.metre,
      });
      dots.cookBatch(
        40,
        camera.worldPositionFromViewportPosition.bind(camera),
        camera.randomViewportPosition.bind(camera),
        camera.position,
        world.metre,
      );
    }

    var fixedTimeStep = 20;
    if (environment.client) {
      context.setup = function () {};
      context.update = function () {
        update(camera, context, world);
      };
      context.draw = function () {
        render(camera, context, grid, world);
      };
      context.start();
    } else {
      setInterval(function () {
        update(camera, context, world);
      }, fixedTimeStep);
    }
  },
};
