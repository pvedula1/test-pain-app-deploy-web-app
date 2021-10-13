<template>
  <nav class="navbar navbar-light navbar-expand-lg border-bottom">
    <div class="container">
      <router-link class="navbar-brand fw-bold" to="/">LRN Lab Pain Tracking</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-if="this.$store.getters.isLoggedIn">
            <router-link class="nav-link" to="/logs">Logs</router-link>
          </li>
          <li class="nav-item" v-if="this.$store.getters.isLoggedIn">
            <router-link class="nav-link" to="/scheduled-notifications">
              Scheduled Notifications
            </router-link>
          </li>
          <!-- <li class="nav-item" v-if="this.$store.getters.isLoggedIn">
            <router-link class="nav-link" to="/scheduled-reminders">
              Scheduled Reminders
            </router-link>
          </li> -->
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a class="dropdown-item" href="#">Something else here</a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li> -->
        </ul>
        <ul class="navbar-nav mx-4 mb-2 mb-lg-0" v-if="this.$store.getters.isLoggedIn">
          <li class="nav-item">
            <button class="btn btn-light" @click="logoutAdmin">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",

  methods: {
    logoutAdmin() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
      const notification = {
        status: "success",
        message: "Logged out successfully"
      };
      this.$store.dispatch("notify", notification);
    }
  }
};
</script>
