<template>
  <div id="parent">
    <router-view/>
    <navbar></navbar>
    <sidebar></sidebar>
    <div class="dashboardContent">
      <dossier :userId="userId" v-if="openComponent === 'personalDossier'"></dossier>
      <createm v-if="openComponent === 'createWerknemer'"></createm>
      <createp v-if="openComponent === 'createPatient'"></createp>
      <updatem :userId="userId" v-if="openComponent === 'updateWerknemer'"></updatem>
      <updatep :userId="userId" v-if="openComponent === 'updatePatient'"></updatep>
      <news v-if="openComponent === 'news'"></news>
      <viewemp v-if="openComponent === 'viewWerknemers'"></viewemp>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'
import Dossier from './Dossier.vue'
import UpdateP from "./UpdateM";
import UpdateM from "./UpdateP";
import CreateM from "./UpdateM";
import CreateP from "./UpdateP";
import News from './News.vue'
import ViewEmp from './ViewEmp.vue'

export default {


  name: 'app',
  data() {
    return {
      openComponent: 'home',
      userId: this.$store.getters.user.userId,
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
  methods: {
    changeComponent (component) {
      this.openComponent = component;
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
