<template>
  <div>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>Zonnevelt Huisartsen</title>
    </head>

    <b-navbar class="navbar navbar-expand-lg sticky-top navbar-light bg-light bordernavbar" toggleable="md" variant="info">
        <b-navbar-brand class="logosvg">
            <img v-on:click="setHome" style="cursor:pointer" src="../../assets/img/logoZonnevelt-02.svg" alt="" height="55px">
        </b-navbar-brand>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav class="ml-auto">
            <b-nav-item v-on:click="setHome" style="cursor:pointer" class="linkani">Home</b-nav-item>
            <b-nav-item v-on:click="setMedewerkers" style="cursor:pointer" class="linkani">Werknemers</b-nav-item>
            <b-nav-item v-on:click="setContact" style="cursor:pointer" class="linkani">Contactgegevens</b-nav-item>
            <b-button size="sm" class="my-2 my-sm-0 buttonnav" type="submit" href="/login"><span>Inloggen</span></b-button>
         </b-navbar-nav>
      </b-collapse>
    </b-navbar>


    <vmedewerkers v-if="cMedewerkers"/>
    <vcontactgegevens v-if="cContactgegevens"/>
    <vhome v-if="cHome"/>

    <vfooter/>

  </div>
</template>

<style>
@import"../../assets/style/landing.css";
</style>

<script>

import vfooter from './v-footer.vue'
import vmedewerkers from './medewerkers.vue'
import vcontactgegevens from './contactgegevens.vue'
import vhome from './home.vue'

export default {
  data () {
    return {
      slide: 0,
      sliding: null,
      cMedewerkers: false,
      cHome: true,
      cContactgegevens: false
    }
  },
  components: {
    vfooter,
    vmedewerkers,
    vhome,
    vcontactgegevens
  },
  methods: {
    setHome: function () {
      this.cMedewerkers = false;
      this.cHome = true;
      this.cContactgegevens = false;
    },
    setContact: function () {
      this.cMedewerkers = false;
      this.cHome = false;
      this.cContactgegevens = true;
    },
    setMedewerkers: function () {
      this.cMedewerkers =  true;
      this.cHome = false;
      this.cContactgegevens = false;
    }
  }
}
</script>
