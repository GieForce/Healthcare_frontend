<template>
  <div id="parent">
    <router-view/>
    <navbar>NOTHING</navbar>
    <sidebar>NOTHING</sidebar>
    <div class="dashboardContent">
      <dossier :patientid="getUser" v-if="openComponent === 'personalDossier'"/>
      <calendar :patientid="getUser" v-if="openComponent === 'calendar'"/>
      <createm v-if="openComponent === 'createWerknemer'"/>
      <createp v-if="openComponent === 'createPatients'"/>
      <updatem :employeeId="getUser"  v-if="openComponent === 'updateWerknemer'"/>
      <updatep :patientId="getUser" v-if="openComponent === 'updatePatient'"/>
      <news v-if="openComponent === 'home'"/>
      <viewemp v-if="openComponent === 'viewWerknemers'"/>
      <viewpat v-if="openComponent === 'viewPatients'"/>
      <appointmentlist :day="getDate" v-if="openComponent === 'appointmentlist'"/>.
      <artsswitch v-if="openComponent === 'artsswitch'"/>
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
      <checker v-if="openComponent === 'checker'"/>
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
import AppointmentList from "./AppointmentList.vue";
import ArtsSwitch from "./ArtsSwitch.vue";


export default {


  name: 'app',
  data() {
    return {
      openComponent: 'home',
      userId: this.$store.getters.user.user_id,
      user: '',
      fcEvents: Planner.events,
      day: ''
    }
  },
  components: {
    'calendar': Calendar,
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
    'planner' : Planner,
    'checker' : AppointmentChecker,
    'appointmentlist' : AppointmentList,
    'artsswitch' : ArtsSwitch,

  },
  computed: {
    getUser(){
      return this.user;
    },
    getDate(){
      return this.day;
    }
  },
  created(){

  },
  methods: {
    changeComponent (component, user) {
      console.log('Changing component to: ' + component);
      this.openComponent = component;
      if(user === undefined)
      {
        this.user = this.$store.getters.user
      }
      else {
        this.user = user;
      }
    },
    changeComponent2(component) {
      this.openComponent = component;
    },
    changeMonth(start, end, current) {
      console.log('changeMonth', start.format(), end.format(), current.format())
    },
    eventClick(event, jsEvent, pos) {
      console.log('eventClick', event, jsEvent, pos)
    },
    dayClick(day, jsEvent) {
      this.day = day._d;
      console.log('Meegegeven datum:');
      console.log(this.day);
      this.changeComponent2('appointmentlist');
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

