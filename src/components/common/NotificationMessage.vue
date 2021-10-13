<template>
  <div :class="`alert alert-${notification.status}`" role="alert" v-if="notification.display">
    <h4 class="alert-heading" v-if="notification.heading !== ''">{{ notification.heading }}</h4>
    <p>
      {{ notification.message }}
    </p>
    <button
      type="button"
      class="btn-close"
      @click.prevent="dismissNotification"
      aria-label="Close"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NotificationMessage",

  computed: mapState(["notification"]),

  methods: {
    dismissNotification() {
      this.$store.dispatch("closeNotification");
    }
  }
};
</script>

<style scoped>
.alert {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 25%;
  min-width: 200px;
}
</style>
