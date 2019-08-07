import Vue from "vue";
import Router from "vue-router";
import EventList from "./views/EventList";
import EventCreate from "./views/EventCreate";
import EventShow from "./views/EventShow";
import NotificationPanel from "./views/NotificationPanel";
import NProgress from "nprogress";
import store from "@/store/store";

Vue.use(Router);

const router = new Router({
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
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store.dispatch("eventModule/fetchEvent", routeTo.params.id).then(event => {
          routeTo.params.event = event;
          next();
        });
      }
    },
    {
      path: "/notification",
      name: "notification-list",
      component: NotificationPanel
    }
  ]
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach((routeTo, routeFrom, next) => {
  NProgress.done();
  next();
});

export default router;