import { createStore } from "vuex";
import * as axios from "axios";

const store = createStore({
  state() {
    return {
      status: "",
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
      user: localStorage.getItem("user"),

      notification: {
        heading: "",
        message: "",
        status: "",
        display: false
      }
    };
  },

  mutations: {
    authRequest(state) {
      state.status = "loading";
    },

    authSuccess(state, { accessToken, refreshToken, user }) {
      state.status = "success";
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.user = user;
    },

    authError(state) {
      state.status = "";
      state.accessToken = "";
      state.refreshToken = "";
    },

    newNotification(state, { status, heading, message }) {
      state.notification = { status, heading, message, display: true };
    },

    dismissNotification(state) {
      state.notification.display = false;
    }
  },

  getters: {
    isLoggedIn: state => !!state.accessToken,
    authStatus: state => state.status
  },

  actions: {
    login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        commit("authRequest");
        axios
          .post("/admin/login", { username, password })
          .then(resp => {
            const accessToken = resp.data.access_token;
            const refreshToken = resp.data.refresh_token;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("user", username);

            commit("authSuccess", { accessToken, refreshToken, username });
            resolve(resp);
          })
          .catch(err => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");

            commit("authError");
            reject(err);
          });
      });
    },

    logout({ commit }) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      commit("authError");
    },

    refreshToken({ commit, state }) {
      return new Promise((resolve, reject) => {
        const { refreshToken, user } = state;
        axios
          .post("/token/refresh", { refresh_token: refreshToken })
          .then(resp => {
            const accessToken = resp.data.access_token;
            localStorage.setItem("accessToken", accessToken);
            commit("authSuccess", { accessToken, refreshToken, user });
            resolve(resp);
          })
          .catch(err => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            commit("authError");
            reject(err);
          });
      });
    },

    notify({ commit }, { status, heading, message }) {
      commit("newNotification", { status, heading, message });
      setTimeout(() => {
        commit("dismissNotification");
      }, 5000);
    },

    closeNotification({ commit }) {
      commit("dismissNotification");
    }
  }
});

export default store;
