<template>
  <div class="navbar-component">
  <header class="header">
    <nav class="navbar d-felx justify-content-end">
        <a id="toggle-btn" href="" class="menu-btn mr-auto p-2"><i class="icon-bars"></i></a><a class="navbar-brand"></a>
        
        <div>
          <b-dropdown id="ddown1" style="cursor:pointer" :text="user.firstname + ' ' + user.lastname" class="m-md-2">
            <a class="dropdown-item" v-on:click="logout">Logout</a>
          </b-dropdown>
        </div>


    </nav>
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


