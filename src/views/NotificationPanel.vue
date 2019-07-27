<template>
  <div class="">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    ></NotificationBar>
  </div>
</template>

<script>
import NotificationBar from "@/components/NotificationBar";
import { mapState } from "vuex";

export default {
  components: {
    NotificationBar
  },
  computed: {
    ...mapState("notificationModule", ["notifications"])
  }
};
</script>

<style scoped>

</style>
