import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: 1,
      name: "nicolas"
    },
    count: 0,
    categories: [
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community"
    ]
  },
  getters: {
    catLength(state) {
      return state.categories.length;
    },
    getEventById: state => id => {
      return state.events.find(event => event.id === id);
    }
  },
  mutations: {
    INCREMENT_COUNT(state, value) {
      // console.log(value)
      state.count += value;
    }
  },
  actions: {
    updateCount({ state, commit }, incrementBy) {
      if (state.user) {
        commit("INCREMENT_COUNT", incrementBy);
      }
    }
  }
});
