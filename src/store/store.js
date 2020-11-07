import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const dataState = createPersistedState({
  paths: ["user"],
});

export default new Vuex.Store({
  modules: {
    user,
  },
  plugins: [dataState],
});
