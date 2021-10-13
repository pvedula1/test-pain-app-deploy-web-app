<template>
  <loading-indicator :full-screen="true" v-if="loading" />
  <div class="container p-4">
    <div class="col-md-6 offset-md-3">
      <h3>Create New Subject</h3>
      <hr />
      <form @submit.prevent="submitCreateSubjectForm">
        <label class="form-label fw-bold">ID</label>
        <input
          class="form-control form-control-sm mb-3"
          type="text"
          placeholder="Subject ID"
          v-model="subjectData._id"
          required
        />
        <label class="form-label fw-bold">New Password</label>
        <input
          class="form-control form-control-sm mb-3"
          type="password"
          placeholder="Enter new password"
          v-model="subjectData.password"
          required
        />
        <label class="form-label fw-bold">Confirmation</label>
        <input
          class="form-control form-control-sm mb-3"
          type="password"
          placeholder="Confirm new password"
          v-model="passwordConfirmation"
          required
        />
        <label class="form-label fw-bold">Timezone</label>
        <select class="form-control form-control-sm mb-3" v-model="subjectData.timezone" required>
          <option
            v-for="option in timezoneOptions"
            :key="option['value']"
            :disabled="option['disabled']"
            :value="option['value']"
          >
            {{ option["name"] }}
          </option>
        </select>

        <label class="form-label fw-bold">Study Group</label>

        <p v-if="isStudyGroupsLoading" class="text-muted fst-italic">
          Loading study groups...
        </p>

        <select
          class="form-control form-control-sm mb-3"
          v-model="subjectData.study_group"
          required
        >
          <option v-for="group in studyGroups" :key="group" :value="group['_id']">
            {{ group["name"] }}
          </option>
        </select>

        <div class="d-grid gap-2">
          <input type="submit" class="btn btn-primary" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import * as axios from "axios";
import { timezoneOptions } from "@/constants";
import LoadingIndicator from "../common/LoadingIndicator.vue";

export default {
  components: { LoadingIndicator },
  name: "NewSubjectPage",
  data() {
    return {
      loading: false,
      isStudyGroupsLoading: false,
      timezoneOptions,
      studyGroups: [],
      subjectData: {
        _id: "",
        password: "",
        configuration: {
          questions: []
        },
        timezone: "America/New York",
        study_group: "",
        device_tokens: [],
        data: []
      },
      passwordConfirmation: ""
    };
  },

  created() {
    this.loadStudyGroups();
  },

  methods: {
    loadStudyGroups() {
      this.isStudyGroupsLoading = true;
      axios.get("/study-groups").then(resp => {
        this.studyGroups = resp.data;
        this.isStudyGroupsLoading = false;
      });
    },

    submitCreateSubjectForm() {
      if (this.passwordConfirmation !== this.subjectData.password) {
        // eslint-disable-next-line no-alert
        alert("Password and Password confirmation don't match");
        return;
      }

      if (this.subjectData.password.length < 6) {
        // eslint-disable-next-line no-alert
        alert("Password should be at least 6 characters");
        return;
      }

      this.loading = true;

      axios
        .post("/subjects", this.subjectData)
        .then(resp => {
          const notification = {
            status: "success",
            heading: "Created subject successfully",
            message: resp.data
          };
          this.$store.dispatch("notify", notification);
        })
        .catch(err => {
          // eslint-disable-next-line no-alert
          const notification = {
            status: "danger",
            heading: "Could not create subject",
            message: err.response.data
          };
          this.$store.dispatch("notify", notification);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
