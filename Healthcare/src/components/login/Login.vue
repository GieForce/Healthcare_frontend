<template>
  <form @submit.prevent="login({ email, password })">
    <input type="text" placeholder="email" v-model="email">
    <input type="password" placeholder="password" v-model="password">
    <button type="submit">Login</button>
    {{ message }}
  </form>
</template>

<script>

  import axios from 'axios'

  export default{
    name: 'login',
    data() {
      return {
        email: '',
        password: '',
      }
    },
    computed: {
      message () {
          return this.$store.getters.isPending;
      }
    },
    methods: {
      login() {
        this.$store.dispatch("login", {
          email: this.email,
          password: this.password
        }).then(() => {
          this.$store.dispatch("getRequest", "patients").then(response => {
            console.log(response)
          })
        });
      }
    }
  }
</script>
