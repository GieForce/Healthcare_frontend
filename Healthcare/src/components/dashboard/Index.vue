<template>
  <div id="parent">
    <router-view/>
    <navbar></navbar>
    <sidebar></sidebar>
    <div class="dashboardContent">
      <dossier :userId="userId" :patientid="getUser" v-if="openComponent === 'personalDossier'"></dossier>
      <createm v-if="openComponent === 'createWerknemer'"></createm>
      <createp v-if="openComponent === 'createPatients'"></createp>
      <updatem :userId="userId" :user="getUser" v-if="openComponent === 'updateWerknemer'"></updatem>
      <updatep :userId="userId" v-if="openComponent === 'updatePatient'"></updatep>
      <news v-if="openComponent === 'home'"></news>
      <viewemp v-if="openComponent === 'viewWerknemers'"></viewemp>
      <news v-if="openComponent === 'home'"></news>
      <viewpat v-if="openComponent === 'viewPatients'"></viewpat>
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
import ViewPat from './ViewPat.vue'

export default {


  name: 'app',
  data() {
    return {
      openComponent: 'home',
      userId: this.$store.getters.user.userId,
      user: '',
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
    'viewpat' : ViewPat,
  },
  computed: {
    getUser(){
      return this.user;
    }
  },
  methods: {
    changeComponent (component, user) {
      console.log('Changing component to: ' + component)
      this.openComponent = component;
      this.user = user;
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