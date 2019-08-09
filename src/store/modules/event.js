import EventService from "@/services/EventService.js";

export const namespaced = true;

export const state = {
  events: [],
  event: null,
  listEventLinks: {
    prev: false,
    next: false
  },
  perPage: 3
};

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id);
  }
};

export const mutations = {
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
};

export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit("ADD_EVENT", event);

        let notification = {
          type: "success",
          message: "Event successfully created !"
        };

        dispatch("notificationModule/add", notification, { root: true });
      })
      .catch(error => {
        let notification = {
          type: "error",
          message: "There was a problem creating the event: " + error.message
        };

        dispatch("notificationModule/add", notification, { root: true });

        throw error;
      });
  },
  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(state.perPage, page)
      .then(response => {
        commit("SET_EVENTS", response.data);

        let link = response.headers["link"];
        let prev = -1 !== link.indexOf("prev");
        let next = -1 !== link.indexOf("next");

        commit("SET_PAGINATION_LINKS", { prev, next });
      })
      .catch(error => {
        let notification = {
          type: "error",
          message: "There was a problem fetching events: " + error.message
        };
        dispatch("notificationModule/add", notification, { root: true });
      });
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    //try to get it from state
    let event = getters.getEventById(id);

    if (event) {
      console.log("getting event from state");
      commit("SET_EVENT", event);

      return event; //useful to get event in .then() afterwhile
    } else {
      //otherwise get it from the api
      return EventService.getEvent(id).then(response => {
        console.log("getting event from api");
        commit("SET_EVENT", response.data);

        return response.data;
      });
    }
  }
};
