<template>
  <div class="card">
    <div class="card-header">New Notification</div>
    <div class="card-body p-3">
      <form @submit.prevent="saveNotification">
        <div class="mb-3">
          <label class="form-label">Start Date<span class="text-muted">*</span></label>
          <input
            type="date"
            class="form-control form-control-sm"
            v-model="notification['start_date']"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">End Date</label>
          <input
            type="date"
            class="form-control form-control-sm"
            v-model="notification['end_date']"
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Time<span class="text-muted">*</span></label>
          <input
            type="time"
            class="form-control form-control-sm"
            v-model="notification['notify_at']"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Title<span class="text-muted">*</span></label>
          <input type="text" class="form-control form-control-sm" v-model="notification['title']" />
        </div>
        <div class="mb-3">
          <label class="form-label">Body<span class="text-muted">*</span></label>
          <input type="text" class="form-control form-control-sm" v-model="notification['body']" />
        </div>
        <div class="mb-3">
          <label class="form-label"># Reminders</label>
          <input
            type="number"
            class="form-control form-control-sm"
            v-model="notification['num_reminders']"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Reminder Interval (in minutes)</label>
          <input
            type="number"
            class="form-control form-control-sm"
            v-model="notification['reminder_interval']"
          />
        </div>
        <div class="mb-4">
          <button type="submit" class="btn btn-primary me-md-2">Create Notification</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import * as axios from "axios";

export default {
  name: "NewNotificationForm",
  props: ["subjectId"],
  emits: ["update:notifications"],
  data() {
    return {
      notification: {
        notify_sub_id: this.subjectId,
        start_date: "",
        end_date: "",
        notify_at: "",
        title: "Record your pain level",
        body: "Don't Forget!",
        num_reminders: 0,
        reminder_interval: 0
      }
    };
  },
  methods: {
    saveNotification() {
      axios
        .post("/notifications", this.notification)
        .then(() => {
          const notification = {
            status: "success",
            message: "Saved reminder"
          };
          this.$store.dispatch("notify", notification);
          this.$emit("update:notifications");
        })
        .catch(err => {
          const notification = {
            status: "danger",
            heading: "Could not save reminder",
            message: err
          };
          this.$store.dispatch("notify", notification);
        });
    }
  }
};
</script>
