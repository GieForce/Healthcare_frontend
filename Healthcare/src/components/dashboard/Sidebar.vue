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
          <li><a v-on:click="changeCompontent('home')" style="cursor:pointer"> <i class="ion-home"></i>Home</a></li>

          <div v-if="userType === 'admin'">
            <li><a v-on:click="changeCompontent('viewWerknemers')" style="cursor:pointer"> <i class="ion-document"></i>Werknemer Overzicht</a></li>
            <li><a v-on:click="changeCompontent('createWerknemer')" style="cursor:pointer"> <i class="ion-document"></i>Werknemer Aanmaken</a></li>
            <li><a v-on:click="changeCompontent('updateWerknemer')" style="cursor:pointer"> <i class="ion-document"></i>Werknemer Update</a></li>
          </div>

          <div v-if="userType === 'arts'">
            <li><a style="cursor:pointer"> <i class="ion-person"></i>Patienten</a></li>
            <li><a v-on:click="changeCompontent('createPatient')" style="cursor:pointer"> <i class="ion-document"></i>Patient Aanmaken</a></li>
            <li><a v-on:click="changeCompontent('updatePatient')" style="cursor:pointer"> <i class="ion-document"></i>Patient Update</a></li>
          </div>

          <div v-if="userType === 'patient'">
            <li><a v-on:click="changeCompontent('personalDossier')" style="cursor:pointer"> <i class="ion-document"></i>Mijn dossier</a></li>
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
        userType: this.$store.getters.user.type,
      }
    },
    methods: {
      changeCompontent (component) {
        this.$parent.changeComponent(component)
      }
    }
  }
</script>
