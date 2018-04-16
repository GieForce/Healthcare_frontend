import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // Each of these routes are loaded asynchronously, when a user first navigates to each corresponding endpoint.
    // The route will load once into memory, the first time it's called, and no more on future calls.
    // This behavior can be observed on the network tab of your browser dev tools.
    {
      path: '/',
      name: 'home',
      component: function (resolve) {
        require(['@/components/landingpage/index.vue'], resolve)
      }
    },
    {
      path: '/login',
      name: 'login',
      component: function (resolve) {
        require(['@/components/login/Login.vue'], resolve)
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: function (resolve) {
        require(['@/components/dashboard/Index.vue'], resolve)
      },
      beforeEnter: guardRoute
    },
    {
      path: '/dossier',
      name: 'dossier',
      component: function (resolve) {
        require(['@/components/dashboard/Dossier.vue'], resolve)
      }
    },
    {
      path: '/register',
      name: 'register',
      component: function (resolve) {
        require(['@/components/login/Register.vue'], resolve)
      }
    },
    {
      path: '/doctorchat',
      name: 'doctorchat',
      component: function (resolve) {
        require(['@/components/chat/DoctorChat.vue'], resolve)
      },
      beforeEnter: guardRoute
    },
    {
      path: '/patientchat',
      name: 'patientchat',
      component: function (resolve) {
        require(['@/components/chat/PatientChat.vue'], resolve)
      },
      beforeEnter: guardRoute
    },
  ]
})

function guardRoute (to, from, next) {

  const auth = router.app.$options.store;

  if (auth.getters.user == null || (!auth.getters.isLoggedIn  && auth.getters.user.type != null)) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export default router

