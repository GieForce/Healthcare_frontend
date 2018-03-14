import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const LOGIN = "LOGIN";
const LOGIN_SUCCES = "LOGIN_SUCCES";
const LOGIN_FAILED = "LOGIN_FAILED";
const LOGOUT = "LOGOUT";
const PENDING = 'PENDING';
const REQUEST_SUCCES = 'REQUEST_SUCCES';
const REQUEST_FAIL = 'REQUEST_FAIL';

const Store = new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem("healthcare"),
    pending: false
  },
  mutations: {
    [PENDING] (state){
      state.pending = true;
    },
    [LOGIN_SUCCES] (state){
      state.isLoggedIn = true;
      state.pending = false;
    },
    [LOGIN_FAILED] (state){
      state.isLoggedIn = false;
      state.pending = false;
    },
    [LOGOUT] (state){
      state.isLoggedIn = false;
    },
    [REQUEST_SUCCES] (state){
      state.pending = true;
    },
    [REQUEST_FAIL] (state){
      state.pending = true;
    }
  },

  actions: {
   login({ commit }, creds) {
     commit(PENDING); // show spinner
     console.log("Loggin in...");
     return new Promise(resolve => {
       setTimeout(() => {

         axios({
          method: 'post',
          url: 'https://zonnevelt.nl/oauth/token',
          params: {
            grant_type: 'password',
            username: creds.email,
            password: creds.password,
            scope: 'read',
            client_id: 'pharmacy'
          },
          headers: {
            'Authorization': 'Basic cGhhcm1hY3k6c2VjcmV0',
            'content-type': 'application/x-www-form-urlencoded'
          }
         }).then(function (response) {
          localStorage.setItem("healthcare", response.data.access_token);
          commit(LOGIN_SUCCES);
         }).catch(function (error) {
          localStorage.removeItem("healthcare");
          commit(LOGIN_FAILED);
        });
         resolve();
       }, 1000);
     });
   },
   logout({ commit }) {
     localStorage.removeItem("healthcare");
     commit(LOGOUT);
   },
   getRequest({ commit }, url) {
    commit(PENDING);
    return new Promise(resolve => {
    setTimeout(() => {
     axios({
      method: 'get',
      url: 'https://zonnevelt.nl/' + url,
      headers: {
        'Authorization': 'Bearer' + localStorage.getItem("healthcare"),
      }
      }).then(function (response) {
       resolve(response.data);
      }).catch(function (error){
       resolve(error);
      });
     }, 1000);
    });
   },
   putRequest({ commit }, url, wachtwoord) {
    commit(PENDING);
    return new Promise(resolve => {
    setTimeout(() => {
     axios({
      method: 'put',
      url: 'https://zonnevelt.nl/' + url,
      headers: {
        
      },
      data: {
          password: wachtwoord,
        }
      }).then(function (response) {
       resolve(response.data);
      }).catch(function (error){
       resolve(error);
      });
     }, 1000);
    });
   },
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    },
    isPending: state => {
      return state.pending
    }
  }
});

export default Store
