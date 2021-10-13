<template>
  <div>
    <LoadingIndicator :full-screen="true" v-if="loading" />
    <div class="container py-4" v-else>
      <p class="mb-2 fw-bold text-decoration-underline">Scheduled Notifications</p>
      <div
        class="card my-4"
        v-for="(schedule, schedule_idx) in scheduledNotifications"
        :key="schedule_idx"
      >
        <div class="card-header text-white bg-secondary">
          <p class="fw-bold m-0">{{ schedule["timestamp"] }}</p>
        </div>

        <div class="card-body">
          <table class="table table-sm">
            <thead>
              <tr>
                <th>
                  ID
                </th>
                <th>
                  Subject
                </th>
                <th>
                  Start Date
                </th>
                <th>
                  End Date
                </th>
                <th>
                  Notify At
                </th>
                <th>
                  Is Active?
                </th>
                <th>
                  Is Reminder?
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(notif, notif_idx) in schedule['notifications']" :key="notif_idx">
                <td>
                  {{ notif }}
                </td>
                <td>
                  {{ notificationDetails[notif]["notify_sub_id"] }}
                </td>
                <td>
                  {{ notificationDetails[notif]["start_date"] }}
                </td>
                <td>
                  {{ notificationDetails[notif]["end_date"] }}
                </td>
                <td>
                  {{ notificationDetails[notif]["notify_at"] }}
                </td>
                <td>
                  {{ notificationDetails[notif]["is_active"] }}
                </td>
                <td>
                  {{ notificationDetails[notif]["is_reminder"] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as axios from "axios";
import LoadingIndicator from "@/components/common/LoadingIndicator.vue";

export default {
  name: "ScheduledNotificationsPage",

  components: {
    LoadingIndicator
  },

  data() {
    return {
      scheduledNotifications: [],
      notificationDetails: {},
      loading: true
    };
  },

  created() {
    this.loadScheduledReminders();
  },

  methods: {
    loadScheduledReminders() {
      this.loading = true;
      axios
        .get("/scheduled-notifications")
        .then(resp => {
          this.scheduledNotifications = resp.data;
          this.loadNotificationDetails();
        })
        .catch(err => {
          const notification = {
            status: "danger",
            message: "Something went wrong"
          };
          this.$store.dispatch("notify", notification);
          console.log(err);
        })
        .then(() => {
          this.loading = false;
        });
    },

    loadNotificationDetails() {
      axios
        .get("/notifications")
        .then(resp => {
          const details = resp.data;
          details.forEach(n => {
            // eslint-disable-next-line dot-notation
            this.notificationDetails[n["_id"]] = n;
          });
        })
        .catch(err => {
          const notification = {
            status: "danger",
            message: "Something went wrong"
          };
          this.$store.dispatch("notify", notification);
          console.log(err);
        });
    }
  }
};
</script>
