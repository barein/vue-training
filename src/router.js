import Vue from "vue";
import Router from "vue-router";
import EventList from "./views/EventList";
import EventCreate from "./views/EventCreate";
import EventShow from "./views/EventShow";
import NotificationPanel from "./views/NotificationPanel";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "event-list",
      component: EventList,
      alias: "/home"
    },
    {
      path: "/event/create",
      name: "event-create",
      component: EventCreate
    },
    {
      path: "/event/:id",
      name: "event-show",
      component: EventShow,
      props: true
    },
    {
      path: "/notification",
      name: "notification-list",
      component: NotificationPanel
    }
  ]
});
