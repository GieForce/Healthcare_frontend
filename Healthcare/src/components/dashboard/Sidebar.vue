<template>
  <nav class="side-navbar">
    <div class="side-navbar-wrapper">
      <!-- Sidebar Header    -->
      <div class="sidenav-header d-flex align-items-center justify-content-center">
        <img src="../../assets/img/logoZonnevelt-02.svg">
      </div>
      <!-- Sidebar Navigation Menus-->
      <div class="main-menu">
        <ul id="side-main-menu" class="side-menu list-unstyled">
          <li><a style="cursor:pointer"> <i class="ion-home"></i>Home</a></li>

          <div v-if="userType === 'admin'">
            <li><a style="cursor:pointer"> <i class="ion-ios-people"></i>Werknemers</a></li>
            <li><a style="cursor:pointer"> <i class="ion-person"></i>Patienten</a></li>
          </div>

          <div v-if="userType === 'arts'">
            <li><a style="cursor:pointer"> <i class="ion-person"></i>Patienten</a></li>
          </div>

          <div v-if="userType === 'patient'">
            <li><a style="cursor:pointer"> <i class="ion-document"></i>Mijn dossier</a></li>
          </div>

        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
      export default {
        name:'navbar',
        data(){
          return{
            userType: this.$store.getters.user.type
          }
        }
      }
</script>


