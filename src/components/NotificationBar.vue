<template>
  <div class="notification-bar" :class="statusClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return { timeout: null };
  },
  computed: {
    statusClass() {
      return "-text-" + this.notification.type;
    }
  },
  methods: {
    ...mapActions("notificationModule", ["remove"])
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 3000*parseInt(this.notification.id));
  },
  beforeDestroy() {
    clearTimeout(this.Timeout);
  }
};
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
