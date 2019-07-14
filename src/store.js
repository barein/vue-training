import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: 1,
      name: "nicolas"
    },
    events: [
    {id: 1, name: 'event 1'},
    {id: 2, name: 'event 2'},
    {id: 3, name: 'event 3'},
    ],
    categories: ['nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
  },
  getters: {
    catLength(state) {
      return state.categories.length;
    },
    getEventById: state => id => {
      return state.events.find(event => event.id === id);
    }
  },
  mutations: {},
  actions: {}
});
