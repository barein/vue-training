<template>
  <form @submit.prevent="createEvent">
    <BaseSelect
      label="Select a category"
      :options="categories"
      v-model="event.category"
      @blur="$v.event.category.$touch"
      :class="{ error: $v.event.category.$error }"
    ></BaseSelect>
    <template v-if="$v.event.category.$error">
      <p v-if="!$v.event.category.required" class="errorMessage">
        Category is required
      </p>
    </template>

    <h3>Name & describe your event</h3>
    <BaseInput
      type="text"
      placeholder="Add a title"
      label="Name"
      v-model="event.title"
      :class="{ error: $v.event.title.$error }"
      @blur="$v.event.title.$touch()"
    ></BaseInput>
    <template v-if="$v.event.title.$error">
      <p v-if="!$v.event.title.required" class="errorMessage">
        A title is required
      </p>
    </template>

    <BaseInput
      type="text"
      placeholder="Add a description"
      label="Description"
      v-model="event.description"
      :class="{ error: $v.event.description.$error }"
      @blur="$v.event.description.$touch()"
    ></BaseInput>
    <template v-if="$v.event.description.$error">
      <p v-if="!$v.event.description.required" class="errorMessage">
        A description is required
      </p>
    </template>

    <h3>Where is your event?</h3>
    <BaseInput
      type="text"
      placeholder="Add a location"
      label="Location"
      v-model="event.location"
      :class="{ error: $v.event.location.$error }"
      @blur="$v.event.location.$touch()"
    ></BaseInput>
    <template v-if="$v.event.location.$error">
      <p v-if="!$v.event.location.required" class="errorMessage">
        A location is required
      </p>
    </template>

    <h3>When is your event?</h3>
    <div class="field">
      <label>Date</label>
      <datepicker
        v-model="event.date"
        placeholder="Select a date"
        @opened="$v.event.date.$touch()"
        :input-class="{ error: $v.event.date.$error }"
      />
    </div>
    <template v-if="$v.event.date.$error">
      <p v-if="!$v.event.date.required" class="errorMessage">
        A date is required
      </p>
    </template>

    <BaseSelect
      label="Select a time"
      :options="times"
      v-model="event.time"
      @blur="$v.event.time.$touch"
      :class="{ error: $v.event.time.$error }"
    ></BaseSelect>
    <template v-if="$v.event.time.$error">
      <p v-if="!$v.event.time.required" class="errorMessage">
        Time of the event is required
      </p>
    </template>

    <BaseButton
      type="submit"
      buttonClass="-fill-gradient"
      :disabled="$v.$anyError"
      >Submit</BaseButton
    >
    <p v-if="$v.$anyError" class="errorMessage">All required fields must be filled</p>

  </form>
</template>

<script>
// import { mapState, mapGetters } from "vuex";
import Datepicker from "vuejs-datepicker";
import NProgress from "nprogress";
import { required } from "vuelidate/lib/validators";

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
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
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
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }
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
