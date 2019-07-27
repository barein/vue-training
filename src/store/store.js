import Vue from "vue";
import Vuex from "vuex";
import * as userModule from "@/store/modules/user.js";
import * as eventModule from "@/store/modules/event.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userModule,
    eventModule
  },
  state: {
    categories: [
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community"
    ]
  }
});
