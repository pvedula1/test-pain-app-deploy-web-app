<template>
  <div>
    <form>
      <div class="border rounded mb-3 p-2" v-for="(item, idx) in questionnaireData" :key="idx">
        <div class="w-100 text-end mb-3">
          <a href="#" class="text-decoration-none text-danger" @click="deleteQuestion(idx)">
            <span><font-awesome-icon icon="trash"/></span> <span>Delete Question</span>
          </a>
        </div>

        <div class="form-check mb-3">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            :id="`checkbox1_${idx}`"
            v-model="item['show_in_window']"
          />
          <label class="form-check-label" :for="`checkbox1_${idx}`">
            Show question during a specific time window
          </label>
        </div>

        <div class="mb-3" v-if="item['show_in_window']">
          <div class="row mb-2">
            <div class="col-md-6">
              <label class="form-label fw-bold">Window Begin Time</label>
              <input
                type="time"
                class="form-control form-control-sm"
                v-model="item['window_begin']"
              />
            </div>

            <div class="col-md-6">
              <label class="form-label fw-bold">Window End Time</label>
              <input
                type="time"
                class="form-control form-control-sm"
                v-model="item['window_end']"
              />
            </div>
          </div>

          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              :id="`checkbox${idx}`"
              v-model="item['only_once_in_window']"
            />
            <label class="form-check-label" :for="`checkbox${idx}`">
              Show only the first time in window
            </label>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label"><strong>Prompt</strong></label>
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Enter your question"
            v-model="item['question']"
          />
        </div>

        <div class="mb-3">
          <label class="form-label"><strong>Type</strong></label>
          <select class="form-control form-control-sm" v-model="item['answer_type']">
            <option value="integer_slider">Integer Slider</option>
            <option value="select">Select From Options</option>
            <option value="single_line_text">Single Line Text</option>
            <option value="multi_line_text">Multi-Line Text</option>
          </select>
        </div>

        <div class="row mb-3" v-if="item['answer_type'] == 'integer_slider'">
          <div class="col-md-4">
            <label class="form-label"><strong>Min Value</strong></label>
            <input
              type="number"
              class="form-control form-control-sm"
              v-model="item['integer_slider_min']"
            />
          </div>

          <div class="col-md-4">
            <label class="form-label"><strong>Max Value</strong></label>

            <input
              type="number"
              class="form-control form-control-sm"
              v-model="item['integer_slider_max']"
            />
          </div>

          <div class="col-md-4">
            <label class="form-label"><strong>Divisions</strong></label>

            <input
              type="number"
              class="form-control form-control-sm"
              v-model="item['integer_slider_divisions']"
            />
          </div>
        </div>

        <div class="mb-3" v-if="item['answer_type'] == 'select'">
          <label class="form-label"><strong>Options</strong></label>

          <div class="row" v-for="(selectOption, idx) in item['select_options']" :key="idx">
            <div class="col-sm-10">
              <input
                type="text"
                placeholder="Enter option text"
                class="form-control form-control-sm"
                v-model="item['select_options'][idx]"
              />
            </div>
            <div class="col-sm-2">
              <button
                class="btn text-danger"
                @click.prevent="item['select_options'].splice(idx, 1)"
              >
                <font-awesome-icon icon="times" />
              </button>
            </div>
          </div>
          <div class="mb-3">
            <button class="btn btn-sm btn-outline-success" @click.prevent="addSelectOption(item)">
              <font-awesome-icon icon="plus" /> Add Option
            </button>
          </div>
        </div>
      </div>
    </form>

    <div class="d-grid gap-2 mb-2">
      <button class="btn btn-outline-success" @click="addQuestion()">Add Question</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionnaireForm",
  props: ["questionnaireData"],
  emits: ["update:questionnaireData"],
  methods: {
    addQuestion() {
      this.$emit("update:questionnaireData", [
        ...this.questionnaireData,
        {
          question: "",
          answer_type: "single_line_text",
          show_in_window: false,
          only_once_in_window: false
        }
      ]);
    },

    addSelectOption(selectItem) {
      if (selectItem.select_options === undefined) {
        // eslint-disable-next-line no-param-reassign
        selectItem.select_options = [];
      }
      selectItem.select_options.push("");
    },

    deleteQuestion(idx) {
      this.$emit("update:questionnaireData", [
        ...this.questionnaireData.slice(0, idx),
        ...this.questionnaireData.slice(idx + 1)
      ]);
    }
  }
};
</script>
