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

      path: '/admin',
      name: 'admin',
      component: function (resolve) {
        require(['@/components/admin/index.vue'], resolve)
      },
      beforeEnter: guardRoute
    }

  ]
})

function guardRoute (to, from, next) {

  const auth = router.app.$options.store

  console.log(auth.getters.isLoggedIn)
  if (!auth.getters.isLoggedIn) {
    console.log('not logged in')
    next({
      path: '/login',
      query: { redirect: to.path }
    })
  } else {
    next()
  }
}

export default router