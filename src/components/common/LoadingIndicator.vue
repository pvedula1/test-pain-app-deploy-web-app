<template>
  <div :class="fullScreen ? 'loading-indicator-full-screen' : ''">
    <div
      class="d-flex justify-content-center align-items-center"
      :class="fullScreen ? 'vh-100' : ''"
    >
      <div
        class="spinner-border text-primary mx-2"
        style="width: 4rem; height: 4rem;"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingIndicator",
  props: {
    fullScreen: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.loading-indicator-full-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
