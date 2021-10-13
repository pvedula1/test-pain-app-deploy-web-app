<template>
  <LoadingIndicator :full-screen="true" v-if="loading" />
  <div class="container p-4">
    <div class="col-md-8 offset-md-2">
      <div class="card border-primary">
        <div class="card-header bg-primary">
          <h5 class="my-1 text-white">Login</h5>
        </div>
        <div class="card-body">
          <div class="container">
            <form @submit.prevent="loginUser">
              <div class="mb-4">
                <label class="form-label"><strong>Username</strong></label>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Username"
                  v-model="login.username"
                  required
                />
              </div>
              <div class="mb-4">
                <label class="form-label"><strong>Password</strong></label>
                <input
                  class="form-control"
                  type="password"
                  placeholder="Password"
                  v-model="login.password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingIndicator from "../common/LoadingIndicator.vue";

export default {
  name: "LoginPage",

  components: { LoadingIndicator },

  data() {
    return {
      loading: false,
      login: {
        username: "",
        password: ""
      }
    };
  },

  methods: {
    loginUser() {
      this.loading = true;
      this.$store
        .dispatch("login", this.login)
        .then(() => {
          this.$router.push("/");
          const notification = {
            status: "success",
            message: "Logged in successfully"
          };
          this.$store.dispatch("notify", notification);
        })
        .catch(err => {
          const notification = {
            status: "danger",
            heading: "Could not log in",
            message: err.response.data
          };
          this.$store.dispatch("notify", notification);
          this.$router.push("/login");
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
