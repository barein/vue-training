<template>
  <div>
    <h1>Event Listing for {{ user.name }}</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div>
      <router-link
        v-if="listEventLinks.prev"
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        ><< Prev</router-link
      >
      <router-link
        v-if="listEventLinks.next"
        class="l-margin-10"
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        >Next>></router-link
      >
    </div>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { mapState } from "vuex";
import store from "@/store/store";

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page || 1);
  store
    .dispatch("eventModule/fetchEvents", {
      page: currentPage
    })
    .then(() => {
      routeTo.params.page = currentPage;

      next();
    });
}

export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  computed: {
    ...mapState({
      events: state => state.eventModule.events,
      listEventLinks: state => state.eventModule.listEventLinks,
      user: state => state.userModule.user
    })
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  }
};
</script>

<style scoped>
.l-margin-10 {
  margin-left: 10px;
}
</style>
