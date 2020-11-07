import { baseService, baseUrl } from "@/services";

export default {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    SET_USER_DATA(state, data) {
      const { token } = data;
      state.user = data;
      localStorage.setItem("access-token", JSON.stringify(token));
    },
    CLEAR_USER_DATA(state) {
      state.user = null;
      location.reload();
      // localStorage.removeItem("user");
      // axios.defaults.headers.common['Authorization'] = ''
    },
  },
  actions: {
    async login({ commit }, user) {
      const url = `${baseUrl}auth/login/`;
      const config = {};
      const resp = await baseService.post(url, user, config);
      const { data } = resp;
      if (data.data) {
        commit("SET_USER_DATA", data.data);
      }
      return data.data;
    },
    logout({ commit }) {
      commit("CLEAR_USER_DATA");
    },
  },
  getters: {
    loggedIn(state) {
      console.log(!!state.user);
      return !!state.user;
    },
  },
};
