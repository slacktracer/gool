import { dots } from "./collection/dots";
import { tokens } from "./collection/tokens";
import { Context } from "./entity/context";

export const render = (camera, context, grid, world) => {
  Context.set(context, camera);
  // begin drawing
  dots.draw(context, world.metre);
  grid.draw(context, world.metre, camera.zoom, camera.position);
  tokens.draw(context, world.metre);
  camera.draw(context, world.metre);
  // end drawing
  Context.unset(context);
};
