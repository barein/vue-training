<template>
  <form @submit.prevent="createEvent">
    <BaseSelect
      label="Select a category"
      :options="categories"
      v-model="event.category"
    ></BaseSelect>

    <h3>Name & describe your event</h3>
    <BaseInput
      type="text"
      placeholder="Add a title"
      label="Name"
      v-model="event.title"
    ></BaseInput>

    <BaseInput
      type="text"
      placeholder="Add a description"
      label="Description"
      v-model="event.description"
    ></BaseInput>

    <h3>Where is your event?</h3>
    <BaseInput
      type="text"
      placeholder="Add a location"
      label="Location"
      v-model="event.location"
    ></BaseInput>

    <h3>When is your event?</h3>
    <div class="field">
      <label>Date</label>
      <datepicker v-model="event.date" placeholder="Select a date" />
    </div>

    <div class="field">
      <label>Select a time</label>
      <select v-model="event.time">
        <option v-for="time in times" :key="time">{{ time }}</option>
      </select>
    </div>

    <input type="submit" class="button -fill-gradient" value="Submit" />
  </form>
</template>

<script>
// import { mapState, mapGetters } from "vuex";
import Datepicker from "vuejs-datepicker";
import NProgress from "nprogress";

export default {
  components: {
    Datepicker
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ":00");
    }
    return {
      event: this.createFreshEvent(),
      times,
      categories: this.$store.state.categories
    };
  },
  methods: {
    createFreshEvent() {
      const user = this.$store.state.userModule.user;
      const id = Math.floor(Math.random() * 10000000);

      return {
        id: id,
        category: "",
        organizer: user,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: []
      };
    },
    createEvent() {
      NProgress.start();
      this.$store
        .dispatch("eventModule/createEvent", this.event)
        .then(() => {
          console.log("routing to event-show");
          this.$router.push({
            name: "event-show",
            params: { id: this.event.id }
          });
          this.event = this.createFreshEvent();
        })
        .catch(() => {
          NProgress.done();
        });
    }
  }
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
