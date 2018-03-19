<template>
  <div id="app">
    <router-view/>
    <navbar></navbar>
    <sidebar></sidebar>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'


export default {
  name: 'app',
  components:{
    'home':  Home,
    'navbar': Navbar,
    'sidebar': Sidebar,
    'create': Create
  },
  data () {
    return {
      cHome: true,
      cCreate: false,
      cDelete: false,
      cUpdate: false
    }
  },
  methods: {
    setCreate: function (event) {
      this.cCreate = true;
      this.cDelete = false;
      this.cUpdate = false;
    },
    setDelete: function (event) {
      this.cCreate = false;
      this.cDelete = true;
      this.cUpdate = false;
    },
    setUpdate: function (event) {
      this.cCreate = false;
      this.cDelete = false;
      this.cUpdate = true;
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
