<template>
  <div class="navbar-component">
  <header class="header">
    <nav class="navbar">
      <div class="container-fluid">
        <div class="navbar-holder d-flex align-items-center justify-content-between">
            <div class="navbar-header"><a id="toggle-btn" href="" class="menu-btn"><i class="icon-bars"> </i></a><a class="navbar-brand">
            <div class="brand-text d-none d-md-inline-block"><strong class="text-primary">{{ user.Name }}</strong></div></a></div>
        </div>
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
      }
    }
</script>


