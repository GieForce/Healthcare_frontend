<template>
  <div class="navbar-component">
  <header class="header">
    <nav class="navbar d-felx justify-content-end">    </nav>
  </header>
  </div>
</template>

<script>
    export default {
      name:'navbar',
      data(){
        return{
          user: this.$store.getters.user
        }
      },
      methods: {
        logout(){
          this.$store.dispatch("logout").then(() => {
            this.$router.push('/login');
          });
        }
      }
    }
</script>


