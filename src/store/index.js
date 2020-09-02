import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /*
    **Global Snackbar for message
    */
    content: 'demo', //content of snackbar
    color: '', //color of snackbar
    /**
     * Authentication info
     */
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',  //token
    Info: localStorage.getItem('info') ? JSON.parse(localStorage.getItem('info')) : {
      userId: null,
      username: '',
      userEmail: '',
      userRoles: null,
    },


    logined: localStorage.getItem('flag') ? localStorage.getItem('flag') : false,

  },
  mutations: {
    showMessage(state, payload) {
      state.content = payload.content;
      state.color = payload.color;
    },
    addUserInfo(state, payload) {
      state.logined = true;
      localStorage.setItem('flag', true);
      state.Authorization = payload.Authorization;
      localStorage.setItem('Authorization', payload.Authorization);
      state.Info.userId = parseInt(payload.Id);
      state.Info.username = payload.Username;
      state.Info.userEmail = payload.UserEmail;
      state.Info.userRoles = payload.UserRoles;
      localStorage.setItem('info', JSON.stringify(state.Info));
    },
    logout(state) {
      state.logined = false;
      state.Authorization = '';
      state.Info = {
        userId: null,
        usename: '',
        userEmail: '',
        userRoles: null,
      };
      localStorage.removeItem('Authorization');
      localStorage.removeItem('flag');
      localStorage.removeItem('info');
    }
  },
  actions: {
  },
  modules: {
  }
})
