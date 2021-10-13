<template>
  <div>
    <LoadingIndicator :full-screen="true" v-if="questionsLoading" />
    <div class="container py-4" v-else>
      <div class="row">
        <div class="col-md-2 pt-4">
          <p>
            Subject: <strong>{{ subjectID }}</strong>
          </p>
          <ul class="list-group">
            <li
              class="list-group-item"
              :class="{ active: selectedPane == 1 }"
              @click="selectedPane = 1"
            >
              Account
            </li>
            <li
              class="list-group-item"
              :class="{ active: selectedPane == 2 }"
              @click="selectedPane = 2"
            >
              Questions
            </li>
            <li
              class="list-group-item"
              :class="{ active: selectedPane == 3 }"
              @click="selectedPane = 3"
            >
              Notifications
            </li>
          </ul>
        </div>
        <div class="col-md-9 p-4">
          <div class="container" v-if="selectedPane == 1">
            <h3>Account</h3>
            <hr />
            <h4 class="mb-3">Change Password</h4>
            <form @submit.prevent="changePassword">
              <input
                class="form-control form-control-sm mb-3"
                type="password"
                placeholder="Enter new password"
                v-model="passwordChange.password"
                required
              />
              <input
                class="form-control form-control-sm mb-3"
                type="password"
                placeholder="Confirm new password"
                v-model="passwordChange.confirmation"
                required
              />
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary" :disabled="passwordChangeInProgress">
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                    v-if="passwordChangeInProgress"
                  ></span>
                  <span class="visually-hidden" v-if="passwordChangeInProgress">Loading...</span>
                  <span v-else>Update Password</span>
                </button>
              </div>
            </form>

            <hr />

            <h4 class="mb-3">Timezone</h4>
            <form @submit.prevent="changeTimezone">
              <select class="form-control form-control-sm mb-3" v-model="subjectTimezone" required>
                <option
                  v-for="option in timezoneOptions"
                  :key="option['value']"
                  :disabled="option['disabled']"
                  :value="option['value']"
                >
                  {{ option["name"] }}
                </option>
              </select>
              <div class="d-grid gap-2">
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="isChangeTimezoneSubmitting"
                >
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                    v-if="isChangeTimezoneSubmitting"
                  ></span>
                  <span class="visually-hidden" v-if="isChangeTimezoneSubmitting">Loading...</span>
                  <span v-else>Change Timezone</span>
                </button>
              </div>
            </form>

            <hr />

            <h4 class="mb-3">Study Group</h4>
            <form @submit.prevent="changeStudyGroup">
              <select
                class="form-control form-control-sm mb-3"
                v-model="subjectStudyGroup"
                required
              >
                <option v-for="group in studyGroups" :key="group" :value="group['_id']">
                  {{ group["name"] }}
                </option>
              </select>
              <div class="d-grid gap-2">
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="isChangeStudyGroupSubmitting"
                >
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                    v-if="isChangeStudyGroupSubmitting"
                  ></span>
                  <span class="visually-hidden" v-if="isChangeStudyGroupSubmitting"
                    >Loading...</span
                  >
                  <span v-else>Change Study Group</span>
                </button>
              </div>
            </form>
          </div>

          <div class="container" v-if="selectedPane == 2">
            <h3>Questions</h3>
            <hr />

            <div class="card mb-3">
              <div class="card-body">
                <div class="mb-3">
                  <label for="templateFileField" class="form-label">Fill from template file</label>

                  <input
                    id="templateFileField"
                    class="form-control form-control-sm"
                    type="file"
                    @change="fillFromTemplateFile"
                  />
                  <div class="form-text text-warning">
                    Warning: Choose a template file previously downloaded.
                  </div>
                </div>

                <div class="mb-3">
                  <button class="btn btn-sm btn-primary" @click="saveAsTemplateFile">
                    Download these questions into a template file
                  </button>
                </div>
              </div>
            </div>

            <QuestionnaireForm
              v-model:questionnaireData="subjectData['configuration']['questions']"
              @update:questionnaireData="subjectData['configuration']['questions'] = $event"
            />
            <div class="d-grid gap-2">
              <button class="btn btn-primary" @click="postUpdatedModel">
                Save Changes
              </button>
            </div>
          </div>

          <div class="container" v-if="selectedPane == 3">
            <h3>Notifications</h3>
            <hr />
            <div class="row">
              <div class="col-md-6">
                <p v-if="parentNotifications().length == 0">
                  No notifications set!
                </p>
                <p v-if="parentNotifications().length == 1">
                  1 notification set!
                </p>
                <p v-if="parentNotifications().length > 1">
                  {{ parentNotifications().length }} notifications set!
                </p>

                <LoadingIndicator v-if="isNotificationsLoading" />

                <div
                  v-else
                  v-for="notification in parentNotifications()"
                  :key="notification['_id']"
                >
                  <div
                    class="card mb-2"
                    :class="notification['status'] == 'cancelled' ? 'bg-warning' : 'bg-light'"
                  >
                    <div class="card-body py-2 d-flex justify-content-between">
                      <div>
                        <p
                          class="mb-1"
                          :class="notification['is_active'] ? '' : 'text-decoration-line-through'"
                        >
                          <span class="text-muted"> at </span>
                          <span class="text-primary fw-bold">
                            {{ notification["notify_at"] }}
                          </span>
                          <span v-if="notification['start_date'] != ''">
                            <span class="text-muted"> starting </span>
                            <span class="text-decoration-underline">
                              {{ notification["start_date"] }}
                            </span>
                          </span>
                          <span v-if="notification['end_date'] != ''">
                            <span class="text-muted"> until </span>
                            <span class="text-decoration-underline text-info">
                              {{ notification["end_date"] }}
                            </span>
                          </span>
                        </p>
                        <p class="fw-bold mb-0">{{ notification["title"] }}</p>
                        <p class="fw-light mb-1">{{ notification["body"] }}</p>

                        <p class="fw-light mb-0 text-muted">
                          {{ notification["num_reminders"] }} reminder(s) at
                          {{ notification["reminder_interval"] }} minutes
                        </p>
                      </div>
                      <div>
                        <button
                          class="btn btn-link text-danger"
                          @click.prevent="deleteReminder(notification['_id'])"
                          v-if="notification['is_active']"
                        >
                          <font-awesome-icon icon="trash" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <NewNotificationForm
                  :subjectId="subjectID"
                  @update:notifications="loadNotifications"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as axios from "axios";
import { timezoneOptions } from "@/constants";
import LoadingIndicator from "@/components/common/LoadingIndicator.vue";
import QuestionnaireForm from "@/components/admin/QuestionnaireForm.vue";
import NewNotificationForm from "@/components/admin/NewNotificationForm.vue";

export default {
  name: "EditSubjectPage",

  components: {
    LoadingIndicator,
    QuestionnaireForm,
    NewNotificationForm
  },

  data() {
    return {
      timezoneOptions,

      passwordChangeInProgress: false,
      isChangeTimezoneSubmitting: false,
      questionsLoading: true,
      isNotificationsLoading: true,

      selectedPane: 1,
      subjectID: "",
      subjectData: {},

      reminders: [],

      isStudyGroupsLoading: true,
      studyGroups: [],
      isChangeStudyGroupSubmitting: false,

      passwordChange: {
        password: "",
        confirmation: ""
      }
    };
  },

  created() {
    this.subjectID = this.$route.params.subjectId;

    if (this.$route.query.pane) this.selectedPane = this.$route.query.pane;

    axios.get(`/subjects/${this.subjectID}`).then(resp => {
      this.questionsLoading = false;
      this.subjectData = resp.data;
      this.subjectTimezone = resp.data.timezone;
      this.subjectStudyGroup = resp.data.study_group;
    });
    this.loadNotifications();
    this.loadStudyGroups();
  },

  methods: {
    loadNotifications() {
      this.isNotificationsLoading = true;
      axios.get(`/subjects/${this.subjectID}/notifications`).then(resp => {
        this.isNotificationsLoading = false;
        this.notifications = resp.data;
      });
    },

    loadStudyGroups() {
      this.isStudyGroupsLoading = true;
      axios.get("/study-groups").then(resp => {
        this.studyGroups = resp.data;
        this.isStudyGroupsLoading = false;
      });
    },

    changeTimezone() {
      this.isChangeTimezoneSubmitting = true;
      const timezone = this.subjectTimezone;
      axios
        .put(`/subjects/${this.subjectID}/timezone`, { timezone })
        // eslint-disable-next-line no-unused-vars
        .then(_ => {
          const notification = {
            status: "success",
            message: `Successfully saved timezone for ${this.subjectID}`
          };
          this.$store.dispatch("notify", notification);
        })
        // eslint-disable-next-line no-unused-vars
        .catch(_ => {
          const notification = {
            status: "danger",
            message: `Could not change timezone for ${this.subjectID}`
          };
          this.$store.dispatch("notify", notification);
        })
        .finally(() => {
          this.isChangeTimezoneSubmitting = false;
        });
    },

    changeStudyGroup() {
      this.isChangeStudyGroupSubmitting = true;
      axios
        .put(`/subjects/${this.subjectID}/study-group`, { study_group: this.subjectStudyGroup })
        // eslint-disable-next-line no-unused-vars
        .then(_ => {
          const notification = {
            status: "success",
            message: `Successfully saved study group for ${this.subjectID}`
          };
          this.$store.dispatch("notify", notification);
        })
        // eslint-disable-next-line no-unused-vars
        .catch(_ => {
          const notification = {
            status: "danger",
            message: `Could not change study group for ${this.subjectID}`
          };
          this.$store.dispatch("notify", notification);
        })
        .finally(() => {
          this.isChangeStudyGroupSubmitting = false;
        });
    },

    saveAsTemplateFile() {
      let contents = "data:text/json;charset=utf-8,";
      contents += JSON.stringify(this.subjectData.configuration.questions);
      const downloadLink = document.createElement("a");
      downloadLink.setAttribute("href", encodeURI(contents));
      downloadLink.setAttribute("download", `questions-template-Subject-${this.subjectID}.json`);
      document.body.appendChild(downloadLink);

      downloadLink.click();
    },

    fillFromTemplateFile(event) {
      const reader = new FileReader();
      reader.addEventListener("load", readerEvent => {
        const fileContents = readerEvent.target.result;
        try {
          this.subjectData.configuration.questions = JSON.parse(fileContents);
          const notification = {
            status: "success",
            message: "Loaded questions from template file successfully"
          };
          this.$store.dispatch("notify", notification);
        } catch (e) {
          console.log(e);
          const notification = {
            status: "danger",
            heading: "Incorrect file format",
            message: "Failed to parse file format"
          };
          this.$store.dispatch("notify", notification);
        }
      });

      const file = event.target.files[0];

      if (file.type !== "application/json") {
        const notification = {
          status: "danger",
          heading: "Incorrect file extension",
          message: "The template file is a JSON file"
        };
        this.$store.dispatch("notify", notification);
      }
      reader.readAsText(file);
    },

    parentNotifications() {
      return this.notifications.filter(x => !x.is_reminder);
    },

    deleteReminder(reminderId) {
      axios
        .delete(`/notifications/${reminderId}`)
        .then(() => {
          const notification = {
            status: "success",
            message: "Deleted reminder"
          };
          this.$store.dispatch("notify", notification);
          this.loadNotifications();
        })
        .catch(err => {
          const notification = {
            status: "danger",
            heading: "Could not delete reminder",
            message: err
          };
          this.$store.dispatch("notify", notification);
        });
    },

    postUpdatedModel() {
      this.questionsLoading = true;
      axios
        .post(`/subjects/${this.subjectID}/configuration`, this.subjectData.configuration)
        // eslint-disable-next-line no-unused-vars
        .then(_ => {
          const notification = {
            status: "success",
            message: `Successfully saved configuration for ${this.subjectID}`
          };
          this.$store.dispatch("notify", notification);
        })
        // eslint-disable-next-line no-unused-vars
        .catch(_ => {
          const notification = {
            status: "danger",
            message: `Could not save configuration for ${this.subjectID}`
          };
          this.$store.dispatch("notify", notification);
        })
        .finally(() => {
          this.questionsLoading = false;
        });
    },

    changePassword() {
      if (this.passwordChange.password !== this.passwordChange.confirmation) {
        const notification = {
          status: "warning",
          message: "Password and Password confirmation don't match"
        };
        this.$store.dispatch("notify", notification);
        return;
      }

      if (this.passwordChange.password.length < 6) {
        const notification = {
          status: "warning",
          message: "Password should be at least 6 characters"
        };
        this.$store.dispatch("notify", notification);
        return;
      }
      this.passwordChangeInProgress = true;
      axios
        .put(`/subjects/${this.subjectID}/password`, this.passwordChange)
        // eslint-disable-next-line no-unused-vars
        .then(_ => {
          const notification = {
            status: "success",
            message: `Successfully saved password for ${this.subjectID}`
          };
          this.$store.dispatch("notify", notification);
        })
        // eslint-disable-next-line no-unused-vars
        .catch(_ => {
          const notification = {
            status: "danger",
            message: `Could not change password for ${this.subjectID}`
          };
          this.$store.dispatch("notify", notification);
        })
        .finally(() => {
          this.passwordChangeInProgress = false;
        });
    }
  }
};
</script>
