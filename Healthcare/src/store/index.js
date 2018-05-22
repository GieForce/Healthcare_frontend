import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import io from 'socket.io-client';

Vue.use(Vuex)

const LOGIN = "LOGIN";
const LOGIN_SUCCES = "LOGIN_SUCCES";
const LOGIN_FAILED = "LOGIN_FAILED";
const LOGOUT = "LOGOUT";
const PENDING = 'PENDING';
const REQUEST_SUCCES = 'REQUEST_SUCCES';
const REQUEST_FAIL = 'REQUEST_FAIL';
const USER_CHANGED = 'USER_CHANGED';
const SOCKET_SETUP = 'SOCKET_SETUP';
const CHATSESSION_CHANGED = 'CHATSESSION_CHANGED';
const CHAT_UPDATE = 'CHAT_UPDATE';
const NEW_MESSAGE = 'NEW_MESSAGE';

const API_URL = 'http://130.211.53.35:8081/api/';

import createPersistedState from 'vuex-persistedstate'

const Store = new Vuex.Store({
  plugins: [createPersistedState({
    paths: ['isLoggedIn', 'user']
  })],
  state: {
    isLoggedIn: !!localStorage.getItem("healthcare"),
    pending: false,
    user: null,
    chatSession: null,
    chats: null,
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
    },
    [SOCKET_SETUP] (state, socket){
      state.chatSession = socket;
    },
    [CHATSESSION_CHANGED] (state, chatSession){
      state.chatSession = chatSession;
    },
    [CHAT_UPDATE] (state, chat){
      var chatIndex = state.chatSession.chats.find(x => x.id == chat.id);
      var i = state.chatSession.chats.indexOf(chatIndex);
      if(i == -1){
        i = state.chatSession.chats.length;
      }
      Vue.set(state.chatSession.chats, i, chat);
    },
    [NEW_MESSAGE] (state, message){
      var chat = state.chatSession.chats.find(x => x.id === message.chatId);
      var i = state.chatSession.chats.indexOf(chat);
      Vue.set(state.chatSession.chats[i].messages, state.chatSession.chats[i].messages.length, message);
    }
  },
  actions: {
    login({ commit }, creds) {
     commit(PENDING);
     console.log("logging in...");
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
           if (response instanceof Error) {
             console.log(response);
             localStorage.setItem("error", "true");
           }
           else{
             console.log("hoi");
           }
           console.log("hier komt ie wel");
          localStorage.setItem("healthcare", response.data.access_token);
          console.log(response);
          commit(LOGIN_SUCCES);
          response.data.user.mappedDoctor = response.data.mappedDoctor;
          commit(USER_CHANGED, response.data.user);
          resolve();
         }).catch(function (error) {
           console.log(error.response);
           localStorage.setItem("error", "false");
           localStorage.removeItem("healthcare");
          commit(LOGIN_FAILED);
          return Promise.reject(error.response)
        });
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
        url: API_URL + url,
        headers: {
          'Authorization': 'Bearer' + localStorage.getItem("healthcare"),
        }
        }).then(function (response) {
         resolve(response.data);
        }).catch(function (error){
         resolve(error);
        });
        });
       }, 1000);
    },
    putRequest({ commit }, info) {
      commit(PENDING);
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(info.url)
          console.log(info.body)
         axios({
          method: 'put',
          url: API_URL + info.url,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          params: info.body,
          }).then(function (response) {
           resolve(response.data);
          }).catch(function (error){
           resolve(error);
          });
        }, 1000);
      });
    },
    postRequest({commit}, info) {
      commit(PENDING);
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(info.url)
          console.log(info.body)
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
    updateRequest({commit}, info) {
      commit(PENDING);
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(info.url)
          console.log(info.body)
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
    setupSockets({commit}, user){

      let chatSession = {
        socket: null,
        status: 'disconnected',
        chats: [],
      }

      let socket = io('http://localhost:3000')
      chatSession.socket = socket;

      socket.on('connect', function() {
        socket.emit('authenticate', user);
        console.log('user connected');
        chatSession.status = 'connected';

        socket.on('disconnect', function() { 
          console.log('user disconnected');
          chatSession.status = 'disconnected';
        });

        socket.on('user_joined', (data) => {
          console.log(data);
          console.log('user joined id ' + data.user.user_id + ' on room ' + data.room.id); 
          data.room.messages.forEach((message) => {
            message.date = new Date(message.date);
          });
          commit(CHAT_UPDATE, data.room);
        });

        socket.on('user_left', (data) => {
          console.log('user left id ' + data.user.user_id + ' from room ' + data.room.id); 
          console.log(data.room);
          commit(CHAT_UPDATE, data.room);
        });

        socket.on('new_message', (message) => {
          message.date = new Date(message.date);
          console.log('new message ' + message.message + ' from ' + message.sender.user_id + ' on ' + message.chatId)
          commit(NEW_MESSAGE, message);
        });



      });

      commit(SOCKET_SETUP, chatSession);

    }
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
    },
    chatSession: state => {
      return state.chatSession
    },
    chats: state => {
      return state.chats
    }
  }
});

export default Store
