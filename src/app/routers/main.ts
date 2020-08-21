import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: (): Promise<object> =>
      import(/* webpackChunkName: "game" */ "src/game/game.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: (): Promise<object> =>
      import(/* webpackChunkName: "about" */ "src/about/about.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: (): Promise<object> =>
      import(/* webpackChunkName: "home" */ "src/home/home.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
