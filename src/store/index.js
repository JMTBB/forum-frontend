import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    content: 'demo', //content of snackbar
    color: '', //color of snackbar
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
  },
  mutations: {
    showMessage(state, payload) {
      state.content = payload.content;
      state.color = payload.color;
    },
    addUserInfo(state, payload) {
      state.Authorization = payload.Authorization;
      localStorage.setItem('Authorization', payload.Authorization);
    }
  },
  actions: {
  },
  modules: {
  }
})
