<template>
  <div>
    <p>
      Recorded at:
      <span class="badge bg-secondary">{{ formatDate(record["timestamp"]) }}</span>
    </p>

    <p class="fst-italic" v-if="record['ratings'].length == 0">No Pain Ratings</p>
    <table class="table table-bordered table-sm" v-else>
      <thead>
        <tr>
          <th>Body Segment ID</th>
          <th>Pain Rating</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(bodySegment, idx) in record['ratings']" :key="idx">
          <td>
            {{ bodySegment["body_segment_id"] }}
          </td>
          <td>
            {{ bodySegment["pain_rating"] }}
          </td>
          <td>
            <template v-for="tag in bodySegment['tags']" :key="tag">
              <span class="badge rounded-pill bg-primary">{{ getTagText(tag) }}</span>
              {{ " " }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-for="(q, idx) in record['questionnaire_responses']" :key="idx">
      <p class="mb-0">
        <span class="text-muted"> {{ q["question"] }}:</span>&nbsp;
        <span class="fst-italic"> {{ q["response"] }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { painDescriptions } from "../../constants";

export default {
  name: "PainRecord",
  props: ["record"],

  methods: {
    formatDate(isoDateStr) {
      const date = new Date(isoDateStr);
      const formatOptions = {
        dateStyle: "medium",
        timeStyle: "medium"
      };
      return new Intl.DateTimeFormat("en-US", formatOptions).format(date);
    },

    getTagText(tagId) {
      return painDescriptions[tagId];
    }
  }
};
</script>
