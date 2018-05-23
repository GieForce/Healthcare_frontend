import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const LOGIN = "LOGIN";
const LOGIN_SUCCES = "LOGIN_SUCCES";
const LOGIN_FAILED = "LOGIN_FAILED";
const LOGOUT = "LOGOUT";
const PENDING = 'PENDING';
const REQUEST_SUCCES = 'REQUEST_SUCCES';
const REQUEST_FAIL = 'REQUEST_FAIL';
const USER_CHANGED = 'USER_CHANGED';
const API_URL = 'http://35.195.241.255:8081/api/';

import createPersistedState from 'vuex-persistedstate'

const Store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    isLoggedIn: !!localStorage.getItem("healthcare"),
    pending: false,
    user: null,
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
      state.user = null;
      state.pending = false;
    },
    [REQUEST_SUCCES] (state){
      state.pending = true;
    },
    [REQUEST_FAIL] (state){
      state.pending = true;
    },
    [USER_CHANGED] (state, user){
      state.user = user;
      state.pending = false;
    }
  },
  actions: {
    login({commit}, creds) {
      commit(PENDING);

      return new Promise(resolve => {
        setTimeout(() => {
          axios({
            method: 'post',
            url: API_URL + 'oauth/token',
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
            console.log(response);
            commit(LOGIN_SUCCES);
            commit(USER_CHANGED, response.data.user);
            resolve();
          }).catch(function (error) {
            localStorage.removeItem("healthcare");
            commit(LOGIN_FAILED);
            resolve();
            //throw "Incorrect wachtwoord of E-mail adres"
          });
        }, 1000);
      });
    },
    putRequest({commit}, info) {
      commit(PENDING);
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(info.url);
          console.log(info.body);
          axios({
            method: 'put',
            url: API_URL + info.url,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            params: info.body,
          }).then(function (response) {
            resolve(response.data);
          }).catch(function (error) {
            resolve(error);
          });
        }, 1000);
      });
    },

    logout({commit}) {
      localStorage.removeItem("healthcare");
      commit(LOGOUT);
    },
    getRequest({commit}, url) {
      commit(PENDING);
      return new Promise(resolve => {
        setTimeout(() => {
          axios({
            method: 'get',
            url: API_URL + url,
            headers: {
              'Authorization': 'Bearer' + localStorage.getItem("healthcare"),
            }
          }).then(function (response) {
            resolve(response.data);
          }).catch(function (error) {
            resolve(error);
          });
        }, 1000);
      });
    },
    postRequest({commit}, info) {
      commit(PENDING);
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(info.url);
          console.log(info.body);
          axios({
            method: 'post',
            url: API_URL + info.url,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer' + localStorage.getItem("healthcare"),
            },
            data: info.body,
          }).then(function (response) {
            resolve(response.data);
          }).catch(function (error) {
            resolve(error);
          });
        }, 1000);
      });
    },
    updateRequest ({commit}, info) {
      commit(PENDING);
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(info.url);
          console.log(info.body);
          axios({
            method: 'update',
            url: API_URL + info.url,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer' + localStorage.getItem("healthcare"),
            },
            data: info.body,
          }).then(function (response) {
            resolve(response.data);
          }).catch(function (error) {
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
    },
    user: state => {
      return state.user
    }
  }
});

export default Store
