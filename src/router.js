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
      alias: "/home",
      props: true
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
        console.log("before enter route guard");
        store
          .dispatch("eventModule/fetchEvent", routeTo.params.id)
          .then(event => {
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
  console.log("before each route guard");
  NProgress.start();
  next();
});

router.afterEach((routeTo, routeFrom) => {
  console.log("after each route guard");
  NProgress.done();
});

export default router;
