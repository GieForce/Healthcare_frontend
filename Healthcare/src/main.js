/* Vue */
import Vue from 'vue'
import router from './router'
import VueResource from 'vue-resource'
Vue.use(VueResource)

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import Vuex from 'vuex'
Vue.use(Vuex)

Vue.config.productionTip = false

import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/* App component */
import App from './components/App.vue'

/* Auth plugin */
import Auth from './auth'
Vue.use(Auth)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  // Attach the Vue instance to the window,
  // so it's available globally.
  created: function () {
    window.Vue = this
  },
  router,
  store,
  render: h => h(App)
})

