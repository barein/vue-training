import Vue from "vue";
import Router from "vue-router";
import EventList from "./views/EventList";
import EventCreate from "./views/EventCreate";
import EventShow from "./views/EventShow";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "event-list",
      component: EventList,
      alias: "/home"
    },
    {
      path: "/event",
      name: "event-show",
      component: EventShow
    },
    {
      path: "/event/create",
      name: "event-create",
      component: EventCreate
    }
  ]
});
