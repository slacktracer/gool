<template>
  <div id="main"></div>
</template>

<script>
import Vue from "vue";
import Matter from "matter-js";

import main from "./modules/main";

export default Vue.extend({
  name: "Game",

  mounted() {
    this.$emit("request-full-window", true);

    main.go();

    // var Engine = Matter.Engine,
    //   Render = Matter.Render,
    //   World = Matter.World,
    //   Bodies = Matter.Bodies;
    //
    // // create an engine
    // var engine = Engine.create();
    //
    // // create a renderer
    // var render = Render.create({
    //   element: document.body,
    //   engine: engine,
    // });
    //
    // // create two boxes and a ground
    // var boxA = Bodies.rectangle(400, 200, 80, 80);
    // var boxB = Bodies.rectangle(450, 50, 80, 80);
    // var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
    //
    // // add all of the bodies to the world
    // World.add(engine.world, [boxA, boxB, ground]);
    //
    // // run the engine
    // Engine.run(engine);
    //
    // // run the renderer
    // Render.run(render);

    // const context = Sketch.create({
    //   container: document.querySelector("#main"),
    // });
    //
    // let x = 1;
    // let y = 1;
    //
    // context.draw = () => {
    //   context.beginPath();
    //   context.arc(x, y, x, 0, TWO_PI);
    //   context.fill();
    //   x += 0.1;
    //   y += 0.1;
    // };
  },
});
</script>

<style>
body {
  margin: 0;
  overflow: hidden;
}
</style>

<style scopéd>
div#main {
  background: #212223;
}

div#main canvas {
  -moz-transition: background-color 0.5s;
  -o-transition: background-color 0.5s;
  -webkit-transition: background-color 0.5s;
  transition: background-color 0.5s;
}

div#main.goolZone canvas {
  background: hsla(190, 50%, 30%, 0.2);
}

div#main.safeZone canvas {
  background: hsla(130, 50%, 30%, 0.2);
}

div#main.dangerZone canvas {
  background: hsla(0, 50%, 30%, 0.2);
}

div#main.outerZone canvas {
  background: hsla(0, 50%, 30%, 0.2);
}

div#main.limbo canvas {
  background: hsla(360, 100%, 100%, 1);
}
</style>
