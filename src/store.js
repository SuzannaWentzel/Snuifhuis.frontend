import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    bewoner: null
  },
  mutations: {
    setToken: (state, token) => {
      state.token = token;
    },
    clearToken: state => {
      state.token = null;
    },
    setUser: (state, user) => {
      state.user = user;
    },
    clearUser: state => {
      state.user = null;
    },
    setBewoner: (state, bewoner) => {
      state.bewoner = bewoner;
    },
    clearBewoner: state => {
      state.bewoner = null;
    }
  },
  actions: {}
});
