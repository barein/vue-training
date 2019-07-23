import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: 1,
      name: "nicolas"
    },
    events: [],
    event: null,
    listEventLinks: {
      prev: false,
      next: false
    },
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
    ADD_EVENT(state, value) {
      state.events.push(value);
    },
    SET_EVENTS(state, value) {
      state.events = value;
    },
    SET_EVENT(state, value) {
      state.event = value;
    },
    SET_PAGINATION_LINKS(state, { prev, next }) {
      state.listEventLinks.prev = prev;
      state.listEventLinks.next = next;
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit("ADD_EVENT", event);
      });
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(response => {
          commit("SET_EVENTS", response.data);

          let test = response.headers["link"];
          let prev = -1 !== test.indexOf("prev");
          let next = -1 !== test.indexOf("next");

          commit("SET_PAGINATION_LINKS", { prev, next });
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
    },
    fetchEvent({ commit, getters }, id) {
      let event = getters.getEventById(id);
console.log(id);
console.log(event);
      if (event) {
        console.log("getting event from state");
        commit("SET_EVENT", event);
      } else {
        EventService.getEvent(id)
          .then(response => {
            console.log("getting event from api");
            commit("SET_EVENT", response.data);
          })
          .catch(error => {
            console.log('There was an error:', error.response)
          });
      }
    }
  }
});
