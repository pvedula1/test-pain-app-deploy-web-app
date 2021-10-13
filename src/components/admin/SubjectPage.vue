<template>
  <div>
    <LoadingIndicator :full-screen="true" v-if="loading" />
    <div class="container py-4" v-else>
      <div class="row">
        <p v-if="subjectData['data'] === undefined || subjectData['data'].length == 0">
          No data recorded!
        </p>
        <div class="col-md-8 offset-md-2" v-else>
          <div class="card my-4" v-for="(painRecord, idx) in subjectData['data']" :key="idx">
            <div class="card-body">
              <PainRecord :record="painRecord" />
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
import PainRecord from "@/components/admin/PainRecord.vue";

export default {
  name: "SubjectPage",

  components: {
    LoadingIndicator,
    PainRecord
  },

  data() {
    return {
      subjectID: "",
      subjectData: {},
      loading: true
    };
  },

  created() {
    this.subjectID = this.$route.params.subjectId;
    if (this.$route.query.pane) this.selectedPane = this.$route.query.pane;
    axios.get(`/subjects/${this.subjectID}`).then(resp => {
      this.loading = false;
      this.subjectData = resp.data;
    });
  }
};
</script>
