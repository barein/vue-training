<template>
  <div>
    <h1>Create Event</h1>
    <p>By {{ user.name }}</p>
    <ul>
      <li v-for="(category, index) in categories" :key="index">
        {{ category }}
      </li>
    </ul>
    <label for="count"></label
    ><input type="text" id="count" v-model.number="increment" />
    <button @click="incrementCount()">Increment count</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      increment: 1
    };
  },
  computed: {
    ...mapGetters(["catLength", "getEventById"]),
    ...mapState(["user", "categories"])
  },
  methods: {
    incrementCount() {
      this.$store.dispatch("updateCount", this.increment);
    }
  }
};
</script>
