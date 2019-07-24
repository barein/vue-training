<template>
  <div>
    <h1>Event Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div>
      <router-link v-if="listEventLinks.prev" :to="{ name: 'event-list', query: { page: page - 1 } }"
        ><< Prev</router-link
      >
      <router-link v-if="listEventLinks.next" class="l-margin-10" :to="{ name: 'event-list', query: { page: page + 1 } }"
        >Next >></router-link
      >
    </div>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService.js";

export default {
  components: {
    EventCard
  },
  data() {
    return {
      events: []
    };
  },
  created() {
    EventService.getEvents('')
      .then(response => {
        this.events = response.data;
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  }
};
</script>