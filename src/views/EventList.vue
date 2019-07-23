<template>
  <div>
    <h1>Event Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div>
      <router-link v-if="listEventLinks.prev" :to="{ name: 'event-list', query: { page: page - 1 } }"
        ><< Prev</router-link
      >
      <router-link v-if="listEventLinks.next" class="l-margin-10" :to="{ name: 'event-list', query: { page: page + 1 } }"
        >Next>></router-link
      >
    </div>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { mapState } from "vuex";

export default {
  components: {
    EventCard
  },
  data() {
    return {};
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    ...mapState(["events", "listEventLinks"])
  },
  created() {
    this.$store.dispatch("fetchEvents", {
      perPage: 3,
      page: this.page
    });
  }
};
</script>

<style scoped>
.l-margin-10 {
  margin-left: 10px;
}
</style>
