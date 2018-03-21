<template>
  <nav class="side-navbar">
    <div class="side-navbar-wrapper">
      <!-- Sidebar Header    -->
      <!-- Sidebar Navigation Menus-->
      <div class="main-menu">
        <ul id="side-main-menu" class="side-menu list-unstyled">

          <div v-if="userType === 'admin'">
            <li><a v-on:click="changeCompontent('viewWerknemers')" style="cursor:pointer"> <i class="ion-document"></i>Werknemer Overzicht</a></li>
            <li><a v-on:click="changeCompontent('createWerknemer')" style="cursor:pointer"> <i class="ion-document"></i>Werknemer Aanmaken</a></li>
          </div>

          <div v-if="userType === 'arts'">
            <li><a style="cursor:pointer"> <i class="ion-person"></i>Patienten</a></li>
            <li><a v-on:click="changeCompontent('createPatient')" style="cursor:pointer"> <i class="ion-document"></i>Patient Aanmaken</a></li>
          </div>
        <div class="profile-userpic">
          <img src="https://studiomango.nl/wp-content/uploads/2014/10/team-profile-picture_minko.jpg" class="img-responsive" alt="">
          <h6> {{ user.firstname + ' ' + user.lastname }} </h6>
        </div>

        <li><a v-on:click="changeCompontent('home')" style="cursor:pointer"> <i class="ion-home"></i>Home</a></li>

        <div v-if="user.type === 'admin'">
          <li><a style="cursor:pointer"><i class="ion-ios-people"></i>Werknemers</a></li>
          <li><a style="cursor:pointer"><i class="ion-person"></i>Patienten</a></li>
        </div>

        <div v-if="user.type === 'arts'">
          <li><a style="cursor:pointer"><i class="ion-person"></i>Patienten</a></li>
        </div>

        <div v-if="user.type === 'patient'">
          <li><a v-on:click="changeCompontent('personalDossier')" style="cursor:pointer"><i class="ion-document"></i>Mijn dossier</a></li>
        </div>
>>>>>>> logout-fix

        <li><a v-on:click="logout" style="cursor:pointer"><i class="ion-android-exit"></i>Logout</a></li>

        </ul>
        <div class="sidenav-header d-flex align-items-center justify-content-center">
          <img src="../../assets/img/logoZonnevelt-02.svg">
        </div>
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
        user: this.$store.getters.user,
        cPersonalDossier: false,
      }
    },
    methods: {
      changeCompontent (component) {
        this.$parent.changeComponent(component)
      },
      logout(){
        this.$store.dispatch("logout").then(() => {
          this.$router.push('/login');
        });
      }
    }
  }
</script>


