<template>
  <div id="parent">
    <router-view/>
    <navbar></navbar>
    <sidebar></sidebar>
    <div class="dashboardContent">
    <dossier :userId="userId" v-if="openComponent === 'personalDossier'"></dossier>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'

import Dossier from './Dossier.vue'

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
