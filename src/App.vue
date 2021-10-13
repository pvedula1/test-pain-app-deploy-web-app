<template>
  <main>
    <div id="nav">
      <NavBar />
    </div>
    <router-view />
    <Footer />
    <notification-message />
  </main>
</template>

<script>
import * as axios from "axios";
import NavBar from "@/components/common/NavBar.vue";
import Footer from "@/components/common/Footer.vue";
import NotificationMessage from "@/components/common/NotificationMessage.vue";

export default {
  name: "App",
  components: {
    NavBar,
    NotificationMessage,
    Footer
  },

  created() {
    axios.defaults.baseURL =
      process.env.NODE_ENV === "production"
        ? "https://lrnlabapp.tech/api"
        : "http://127.0.0.1:6073/api";

    axios.interceptors.request.use(
      config => {
        if (this.$store.getters.isLoggedIn) {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `Bearer ${this.$store.state.accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    axios.interceptors.response.use(
      response => response,
      async error => {
        if (error.response.status !== 401) {
          return new Promise((_resolve, reject) => reject(error));
        }

        // Logout if the refresh token didn't work
        if (error.config.url === "/token/refresh") {
          this.$store.dispatch("logout");
          this.$router.push("/");
          return new Promise((_resolve, reject) => reject(error));
        }

        await this.$store.dispatch("refreshToken");
        return axios.request(error.config);
      }
    );
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  min-height: 100vh;
}
</style>
