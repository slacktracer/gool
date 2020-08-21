import { dots } from "./collection/dots";
import { tokens } from "./collection/tokens";
import { environment } from "./helper/environment";
import { vec2 } from "./helper/vec2";
import { simulation } from "./singleton/simulation";
import { zones } from "./singleton/zones";

export const update = (camera, context, world) => {
  if (environment.client) {
    dots.update(
      camera.viewportPosition.bind(camera),
      camera.getBounds.bind(camera),
      camera.position,
      world.metre,
    );
    // simulation.step(Date.now());
    // tokens.update(
    //   context.keys,
    //   context.dt,
    //   world.rho,
    //   world.mu,
    //   world.gravityAcceleration,
    // );
    context.container.className = zones.getByPosition(
      vec2.length(camera.position) / world.metre,
    ).name;
    camera.update(context.keys);
  }
};
