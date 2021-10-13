<template>
  <div>
    <div class="container py-4">
      <p class="mb-2 fw-bold text-decoration-underline">Logs</p>
      <div class=" row my-4">
        <div class="col">
          <label class="form-label">Entries to show</label>
          <select class="form-select" v-model="entriesToShow">
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="500">500</option>
          </select>
        </div>
        <div class="col">
          <label class="form-label">Level</label>
          <select class="form-select" v-model="logLevel">
            <option value="ALL">ALL</option>
            <option value="DEBUG">DEBUG</option>
            <option value="INFO">INFO</option>
            <option value="WARNING">WARNING</option>
            <option value="ERROR">ERROR</option>
          </select>
        </div>
      </div>
      <LoadingIndicator v-if="loading" />
      <table class="table" v-else>
        <thead>
          <tr>
            <td>#</td>
            <th>Timestamp</th>
            <th>Level</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(logItem, idx) in logs" :key="idx">
            <td>
              {{ idx + 1 }}
            </td>
            <td>
              {{ logItem[0] }}
            </td>
            <td>
              {{ logItem[1] }}
            </td>
            <td>
              <div class="d-inline-block text-truncate" style="max-width: 750px">
                {{ logItem[2] }}
              </div>
            </td>
            <td>
              <button
                class="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                @click="modalData = logItem"
              >
                More Info
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="modalData"
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalData[0] }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="log-data-pre">
              {{ modalData[2] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as axios from "axios";
import LoadingIndicator from "@/components/common/LoadingIndicator.vue";

export default {
  name: "LogViewerPage",

  components: {
    LoadingIndicator
  },

  data() {
    return {
      logs: "",
      loading: true,
      entriesToShow: 50,
      logLevel: "ALL",
      modalData: null
    };
  },

  created() {
    this.loadLogs();
  },

  watch: {
    entriesToShow() {
      this.loadLogs();
    },

    logLevel() {
      this.loadLogs();
    }
  },

  methods: {
    loadLogs() {
      this.loading = true;
      axios
        .get("/logs", { params: { entries: this.entriesToShow, level: this.logLevel } })
        .then(resp => {
          this.logs = resp.data;
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
    }
  }
};
</script>

<style scoped>
.log-data-pre {
  border: 1px solid #cecece;
  border-radius: 5px;
  padding: 0.5rem;
  overflow-wrap: break-word;
  font-family: monospace;
  font-size: 0.85em;
}
</style>
