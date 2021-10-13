<template>
  <div class="container pt-4">
    <div class="col-md-6 offset-md-3">
      <h2 class="mb-2">Study Groups</h2>
      <hr />

      <loading-indicator v-if="isStudyGroupsLoading" />

      <div v-else v-for="studyGroup in studyGroups" :key="studyGroup['_id']">
        <div v-if="currentlyEditingStudyGroupId == studyGroup['_id']">
          <form @submit.prevent="updateStudyGroup">
            <div class="input-group mb-2">
              <input
                class="form-control form-control-sm"
                type="text"
                v-model="editedStudyGroupName"
                required
              />
              <button
                type="submit"
                class="btn btn-sm btn-secondary"
                :disabled="isUpdateStudyGroupSubmitting"
              >
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                  v-if="isUpdateStudyGroupSubmitting"
                ></span>
                <span class="visually-hidden" v-if="isUpdateStudyGroupSubmitting">Loading...</span>
                <span v-else>Save</span>
              </button>
            </div>
          </form>
        </div>
        <div class="d-flex justify-content-between mb-2 bg-light px-2 py-1 rounded" v-else>
          <div>
            <p class="m-0">{{ studyGroup["name"] }}</p>
          </div>
          <div>
            <button @click="editStudyGroup(studyGroup)" class="btn btn-sm btn-link p-0 me-1">
              <span>
                <font-awesome-icon icon="edit" />
              </span>
            </button>

            <button
              @click="deleteStudyGroup(studyGroup['_id'])"
              class="btn btn-sm btn-link text-danger p-0"
            >
              <span>
                <font-awesome-icon icon="trash" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <form @submit.prevent="createNewStudyGroup" class="mt-5">
        <div class="input-group mb-3">
          <input
            class="form-control form-control-sm"
            type="text"
            placeholder="New Study Group Name"
            v-model="newStudyGroupName"
            required
          />
          <button
            type="submit"
            class="btn btn-sm btn-primary"
            :disabled="isNewStudyGroupSubmitting"
          >
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
              v-if="isNewStudyGroupSubmitting"
            ></span>
            <span class="visually-hidden" v-if="isNewStudyGroupSubmitting">Loading...</span>
            <span v-else>Add Study Group</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import * as axios from "axios";
import LoadingIndicator from "@/components/common/LoadingIndicator.vue";

export default {
  name: "StudyGroupsPage",

  components: {
    LoadingIndicator
  },

  data() {
    return {
      isStudyGroupsLoading: true,
      isNewStudyGroupSubmitting: false,
      studyGroups: [],
      currentlyEditingStudyGroupId: null,
      editedStudyGroupName: "",
      isUpdateStudyGroupSubmitting: false,
      newStudyGroupName: ""
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

    editStudyGroup(studyGroup) {
      // eslint-disable-next-line dot-notation
      this.currentlyEditingStudyGroupId = studyGroup["_id"];
      this.editedStudyGroupName = studyGroup.name;
    },

    updateStudyGroup() {
      this.isUpdateStudyGroupSubmitting = true;
      const studyGroupId = this.currentlyEditingStudyGroupId;
      const studyGroupData = { name: this.editedStudyGroupName };
      axios
        .put(`/study-groups/${studyGroupId}`, studyGroupData)
        .then(resp => {
          console.log("Resp: ", resp);
        })
        .catch(err => {
          const notification = {
            status: "danger",
            message: err.response.data
          };
          this.$store.dispatch("notify", notification);
        })
        .finally(() => {
          this.loadStudyGroups();
          this.newStudyGroupName = "";
          this.isUpdateStudyGroupSubmitting = false;
          this.currentlyEditingStudyGroupId = null;
        });
    },

    deleteStudyGroup(studyGroupId) {
      axios
        .delete(`/study-groups/${studyGroupId}`)
        .then(resp => {
          console.log("Resp: ", resp);
        })
        .catch(err => {
          const notification = {
            status: "danger",
            message: err.response.data
          };
          this.$store.dispatch("notify", notification);
        })
        .finally(() => {
          this.loadStudyGroups();
        });
    },

    createNewStudyGroup() {
      this.isNewStudyGroupSubmitting = true;
      const studyGroup = { name: this.newStudyGroupName };
      axios
        .post("/study-groups", studyGroup)
        .then(resp => {
          console.log("Resp: ", resp);
        })
        .catch(err => {
          console.log("Error: ", err);
        })
        .finally(() => {
          this.loadStudyGroups();
          this.newStudyGroupName = "";
          this.isNewStudyGroupSubmitting = false;
        });
    }
  }
};
</script>
