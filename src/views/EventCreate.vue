<template>
  <div>
    <h1>Create Event</h1>
    <p>By {{ user.name }}</p>
    <ul>
      <li v-for="(categoriy, index) in categories" :key="index">{{ categoriy }}</li>
    </ul>
    <p>{{ getEventById(1) }}</p>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(["catLength", "getEventById"]),
    ...mapState(["user", "categories"])
  }
};
</script>
