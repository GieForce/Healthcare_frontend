<template>
  <div id="parent">
    <router-view/>
    <navbar></navbar>
    <sidebar></sidebar>
    <div class="dashboardContent">
      <dossier :userId="userId" v-if="openComponent === 'personalDossier'"></dossier>
      <createm v-if="openComponent === 'createWerknemer'"></createm>
      <createp v-if="openComponent === 'createPatient'"></createp>
      <updatem :userId="userId" :user="getMedewerker" v-if="openComponent === 'updateWerknemer'"></updatem>
      <updatep :userId="userId" v-if="openComponent === 'updatePatient'"></updatep>
      <news v-if="openComponent === 'home'"></news>
      <viewemp v-if="openComponent === 'viewWerknemers'"></viewemp>
      <news v-if="openComponent === 'home'"></news>
      <dossier :userId="userId" v-if="openComponent === 'personalDossier'"></dossier>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'
import Dossier from './Dossier.vue'
import UpdateP from "./UpdateP";
import UpdateM from "./UpdateM";
import CreateM from "./CreateM";
import CreateP from "./CreateP";
import News from './News.vue'
import ViewEmp from './ViewEmp.vue'
import News from './News.vue'

export default {


  name: 'app',
  data() {
    return {
      openComponent: 'home',
      userId: this.$store.getters.user.userId,
      medewerker: '',
    }
  },
  components: {
    'navbar' : Navbar,
    'sidebar' : Sidebar,
    'dossier' : Dossier,
    'createm' : CreateM,
    'createp' : CreateP,
    'updatem' : UpdateM,
    'updatep' : UpdateP,
    'news' : News,
    'viewemp' : ViewEmp,
  },
  computed: {
    getMedewerker(){
      return this.medewerker;
    }
    'news' : News
  },
  methods: {
    changeComponent (component) {
      this.openComponent = component;
    },
    changeComponent (component, user) {
      this.openComponent = component;
      this.medewerker = user;
    }
  }
}
</script>

<style>@import"../../assets/style/style.sea.css";</style>
<style>@import"../../assets/style/fontastic.css";</style>
<style>@import"../../assets/style/style.text.css";</style>
<style>@import"../../assets/style/grasp_mobile_progress_circle-1.0.0.min.css";</style>
<style>@import"../../assets/style/style.sea.css";</style>
<style>@import"../../assets/icons-reference/ionicons.css";</style>
<style>@import"../../assets/style/landing.css";</style>
<style>@import"http://fontawesome.io/assets/font-awesome/css/font-awesome.css";</style>
<style>@import"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";</style>
<style>@import"https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css";</style>
