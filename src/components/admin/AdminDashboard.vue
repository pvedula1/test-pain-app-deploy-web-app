<template>
  <div class="container pt-4">
    <p class="mb-2 fw-bold text-decoration-underline">Admin Dashboard</p>
    <div class="py-4">
      <div class="d-inline-block me-1">
        <router-link to="/subjects/new" tag="button" class="btn btn-outline-primary btn-sm">
          Create new subject
        </router-link>
      </div>

      <div class="d-inline-block">
        <router-link to="/study-groups" tag="button" class="btn btn-outline-primary btn-sm">
          Manage Study Groups
        </router-link>
      </div>
    </div>
    <loading-indicator v-if="isSubjectDataLoading || isStudyGroupsLoading" />
    <div class="accordion" v-else>
      <div
        class="accordion-item"
        v-for="studyGroup in subjectsData"
        :key="studyGroup['study_group']"
      >
        <div class="accordion-header">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#collapse-${studyGroup['study_group']}`"
            aria-expanded="false"
            :aria-controls="`collapse-${studyGroup['study_group']}`"
          >
            {{ studyGroupNames[studyGroup["study_group"]] }} ({{ studyGroup["subjects"].length }})
          </button>
        </div>
        <div class="accordion-collapse collapse" :id="`collapse-${studyGroup['study_group']}`">
          <div class="accordion-body">
            <button
              class="btn btn-primary btn-sm mb-3"
              @click.prevent="exportMultiple(studyGroup['subjects'].map(x => x['_id']))"
            >
              Export All
            </button>

            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Subject ID</th>
                  <th scope="col">Recent Data</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(subject, idx) in studyGroup['subjects']" v-bind:key="idx">
                  <td>{{ idx + 1 }}</td>
                  <td>{{ subject["_id"] }}</td>
                  <td>
                    <PainRecord
                      :record="subject['data'][subject['data'].length - 1]"
                      v-if="subject['data'] && subject['data'].length > 0"
                    />
                    <p v-else>No data</p>
                  </td>
                  <td>
                    <p class="mb-1">
                      <span class="badge rounded-pill bg-success">
                        Questions: {{ subject["configuration"]["questions"].length }}
                      </span>
                      <span
                        class="badge rounded-pill bg-success mx-1"
                        v-if="subject['device_tokens']"
                      >
                        Devices: {{ subject["device_tokens"].length }}
                      </span>
                    </p>
                    <div class="d-flex flex-wrap">
                      <router-link
                        class="btn btn-sm btn-link p-0 me-1"
                        :to="`/subjects/${subject['_id']}`"
                      >
                        View
                      </router-link>
                      <button
                        class="btn btn-sm btn-link p-0 me-1"
                        @click.prevent="exportData(subject['_id'])"
                      >
                        Export
                      </button>
                      <button
                        class="btn btn-sm btn-link p-0 me-1"
                        @click.prevent="sendTestReminder(subject['_id'])"
                      >
                        Send Test Reminder
                      </button>
                      <router-link
                        class="btn btn-sm btn-link p-0 me-1"
                        :to="`/subjects/${subject['_id']}/edit`"
                      >
                        Edit Configuration
                      </router-link>
                      <button
                        class="btn btn-sm btn-link text-danger p-0 me-1"
                        @click="confirmDeleteSubjectRequest(subject['_id'])"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as axios from "axios";
import PainRecord from "./PainRecord.vue";
import LoadingIndicator from "../common/LoadingIndicator.vue";
import { painDescriptions } from "../../constants";

export default {
  name: "AdminDashboard",
  components: {
    PainRecord,
    LoadingIndicator
  },

  data() {
    return {
      isSubjectDataLoading: true,
      isStudyGroupsLoading: true,
      subjectsData: {},
      studyGroupNames: {}
    };
  },

  created() {
    this.loadSubjects();
    this.loadStudyGroups();
  },

  methods: {
    loadSubjects() {
      this.isSubjectDataLoading = true;
      axios.get("/subjects-by-study-group").then(resp => {
        this.subjectsData = resp.data;
        this.isSubjectDataLoading = false;
      });
    },

    loadStudyGroups() {
      this.isStudyGroupsLoading = true;
      axios.get("/study-groups").then(resp => {
        resp.data.forEach(studyGroup => {
          // eslint-disable-next-line dot-notation
          this.studyGroupNames[studyGroup["_id"]] = studyGroup.name;
        });
        this.isStudyGroupsLoading = false;
      });
    },

    exportData(id) {
      console.log(id);
      axios
        .get(`/subjects/${id}`)
        .then(resp => {
          const subject = resp.data;

          // eslint-disable-next-line dot-notation
          const subjectId = subject["_id"].replace(/"/g, '""');
          const subjectData = subject.data;

          let csvContent = "data:text/csv;charset=utf-8,";
          csvContent += `"Subject ID":,"${subjectId}"\r\n\r\n`;
          csvContent += "Date,Time,";

          for (let i = 1; i <= 44; i += 1) {
            csvContent += `RatingBodySeg_${i},TagsBodySeg_${i},`;
          }
          csvContent += "Questions\r\n";

          subjectData.forEach(d => {
            const timestamp = new Date(d.timestamp);
            const row = [timestamp.toDateString(), timestamp.toTimeString()];
            const ratings = new Array(45).fill(0);
            const tags = new Array(45).fill("-");

            d.ratings.forEach(rating => {
              // eslint-disable-next-line dot-notation
              const bodySegmentId = rating["body_segment_id"];
              // eslint-disable-next-line dot-notation
              ratings[bodySegmentId] = rating["pain_rating"];
              tags[bodySegmentId] = rating.tags.map(i => painDescriptions[i]).join(",");
            });

            for (let i = 1; i <= 44; i += 1) {
              row.push(ratings[i]);
              row.push(`"${tags[i].replace(/"/g, '""')}"`);
            }
            // eslint-disable-next-line dot-notation
            const responses = d["questionnaire_responses"]
              .map(
                q => `Q. ${q.question.replace(/"/g, '""')}\nA. ${q.response.replace(/"/g, '""')}\n`
              )
              .join("\n");

            row.push(`"${responses}"`);

            csvContent += `${row.join(",")}\r\n`;
          });

          const downloadLink = document.createElement("a");
          downloadLink.setAttribute("href", encodeURI(csvContent));
          downloadLink.setAttribute("download", `${subjectId}-export.csv`);
          document.body.appendChild(downloadLink);

          downloadLink.click();
        })
        .catch(err => {
          console.log(err);
          const notification = {
            status: "danger",
            heading: `Could not export data for subject ${id}`,
            message: err.response.data
          };
          this.$store.dispatch("notify", notification);
        });
    },

    exportMultiple(subjectIds) {
      subjectIds.forEach(id => this.exportData(id));
    },

    sendTestReminder(subjectId) {
      axios
        .get(`/subjects/${subjectId}/send-test-notification`)
        .then(resp => {
          console.log(resp.data);
          const notification = {
            status: "success",
            heading: "Message sent successfully",
            message: `Details: success: ${resp.data.success}, failure: ${resp.data.failure}`
          };
          this.$store.dispatch("notify", notification);
        })
        .catch(err => {
          const notification = {
            status: "danger",
            heading: "Something went wrong",
            message: err
          };
          this.$store.dispatch("notify", notification);
        });
    },

    confirmDeleteSubjectRequest(subjectId) {
      // eslint-disable-next-line no-alert
      const confirmation = prompt(`Type "Delete ${subjectId}" to confirm`, "");
      if (confirmation === `Delete ${subjectId}`) {
        axios
          .delete(`/subjects/${subjectId}`)
          .then(resp => {
            if (resp.status === 204) {
              const notification = {
                status: "success",
                message: `Deleted ${subjectId}`
              };
              this.$store.dispatch("notify", notification);
            } else {
              const notification = {
                status: "danger",
                heading: `Could not delete ${subjectId}`,
                message: resp.data
              };
              this.$store.dispatch("notify", notification);
            }
          })
          .catch(err => {
            const notification = {
              status: "danger",
              heading: `Could not delete ${subjectId}`,
              message: err.response.data
            };
            this.$store.dispatch("notify", notification);
          })
          .then(() => this.loadSubjects());
      }
    }
  }
};
</script>
