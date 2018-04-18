<template>
  <div id="parent">
    <router-view/>
    <navbar></navbar>
    <sidebar></sidebar>
    <div class="dashboardContent">
      <dossier :patientid="getUser" v-if="openComponent === 'personalDossier'"></dossier>
      <calendar :patientid="getUser" v-if="openComponent === 'calendar'"></calendar>
      <createm v-if="openComponent === 'createWerknemer'"></createm>
      <createp v-if="openComponent === 'createPatients'"></createp>
      <updatem :userId="userId" :user="getUser" v-if="openComponent === 'updateWerknemer'"></updatem>
      <updatep :patientId="userId" v-if="openComponent === 'updatePatient'"></updatep>
      <news v-if="openComponent === 'home'"></news>
      <viewemp v-if="openComponent === 'viewWerknemers'"></viewemp>
      <viewpat v-if="openComponent === 'viewPatients'"></viewpat>
      <calender v-if="openComponent === 'calendar'"></calender>
      <planner v-if="openComponent === 'planner'" class="test-fc" :events="fcEvents"
               first-day='1' locale="nl"
               @changeMonth="changeMonth"
               @eventClick="eventClick"
               @dayClick="dayClick"
               @moreClick="moreClick">
        <template slot="fc-event-card" scope="p">
          <p>{{ p.event.title }}</p>
        </template>
      </planner>
      <checker v-if="openComponent === 'checker'"></checker>
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
import Calendar from './Calendar.vue'
import Planner from './Planner.vue';
import AppointmentChecker from "./AppointmentChecker";


export default {


  name: 'app',
  data() {
    return {
      openComponent: 'home',
      userId: this.$store.getters.user.user_id,
      user: '',
      fcEvents: Planner.events,

    }
  },
  components: {
    'calender': Calendar,
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
    'calendar' : Calendar,
    'planner' : Planner,
    'checker' : AppointmentChecker,
  },
  computed: {
    getUser(){
      return this.user;
    }
  },
  created(){

  },
  methods: {
    changeComponent (component, user) {
      console.log('Changing component to: ' + component)
      this.openComponent = component;
      if(user === undefined)
      {
        this.user = this.$store.getters.user
      }
      else {
        this.user = user;
      }
    },
    changeMonth(start, end, current) {
      console.log('changeMonth', start.format(), end.format(), current.format())
    },
    eventClick(event, jsEvent, pos) {
      console.log('eventClick', event, jsEvent, pos)
    },
    dayClick(day, jsEvent) {
      console.log('dayClick', day, jsEvent)
    },
    moreClick(day, events, jsEvent) {
      console.log('moreCLick', day, events, jsEvent)
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
