<template>
  <nav class="side-navbar">
    <div class="side-navbar-wrapper">
      <!-- Sidebar Header    -->
      <!-- Sidebar Navigation Menus-->
      <div class="main-menu">
        <ul id="side-main-menu" class="side-menu list-unstyled">

        <div class="profile-userpic">
          <img src="https://studiomango.nl/wp-content/uploads/2014/10/team-profile-picture_minko.jpg" class="img-responsive" alt="">
          <h6 class="py-1" style="text-align: center;"> {{ user.firstname + ' ' + user.lastname }} </h6>
        </div>

          <div v-if="userType === 'arts'">
            <li><a style="cursor:pointer"> <i class="ion-person"></i>Patienten</a></li>
            <li><a v-on:click="changeComponent('createPatient')" style="cursor:pointer"> <i class="ion-document"></i>Patient Aanmaken</a></li>
          </div>

        <li><a v-on:click="changeComponent('home')" style="cursor:pointer"> <i class="ion-home"></i>Home</a></li>

        <div v-if="user.type === 'admin'">
          <li><a v-on:click=" changeComponent('viewWerknemers')" style="cursor:pointer"><i class="ion-ios-people"></i>Werknemers</a></li>
        </div>

        <div v-if="user.type === 'doctor'">
          <li><a v-on:click="changeComponent('viewPatients')" style="cursor:pointer"><i class="ion-person"></i>Patienten</a></li>
        </div>

        <div v-if="user.type === 'doctor'">
          <li><a v-on:click="changeComponent('doctorChat')" style="cursor:pointer"><i class="ion-chatbubble"></i>Chat</a></li>
        </div>

        <div v-if="user.type === 'patient'">
          <li><a v-on:click="changeComponent('personalDossier')" style="cursor:pointer"><i class="ion-document"></i>Mijn dossier</a></li>
        </div>
        <li><a v-on:click="logout" style="cursor:pointer"><i class="ion-android-exit"></i>Uitloggen</a></li>

        </ul>
        <div class="sidenav-header d-flex align-items-center justify-content-center sidebar-footer">
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
      changeComponent (component) {
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


