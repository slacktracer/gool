<template>
  <div id="app">
    <main-navbar v-if="!fullWindow" />
    <router-view @request-full-window="goFullWindow" />
  </div>
</template>

<script>
import Vue from "vue";

import mainNavbar from "src/main-navbar/main-navbar.vue";

export default Vue.extend({
  name: "App",

  components: { mainNavbar },

  data() {
    return {
      fullWindow: false,
    };
  },

  methods: {
    goFullWindow(value) {
      this.fullWindow = value;
    },
  },
});
</script>
