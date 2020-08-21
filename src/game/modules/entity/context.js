import Sketch from "sketch-js";

export const Context = {
  create(layerId) {
    const context = Sketch.create({
      autopause: false,
      autostart: false,
      container: document.getElementById(layerId),
      globals: false,
    });
    return context;
  },

  set(context, camera) {
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.translate(
      context.width / 2 - camera.position[0] * camera.zoom,
      context.height / 2 - camera.position[1] * camera.zoom,
    );
    context.scale(camera.zoom, camera.zoom);
  },

  unset(context) {
    context.restore();
  },
};
