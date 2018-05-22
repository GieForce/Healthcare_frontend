<template>
  <div id="parent">
    <patientchat v-if="getActiveUser.type === 'patient'"></patientchat>
    <patientchatwindow v-if="openChat && getActiveUser.type === 'patient'" class="chatFloat"></patientchatwindow>
    <router-view/>
    <navbar>NOTHING</navbar>
    <sidebar>NOTHING</sidebar>
    <div class="dashboardContent">
      <dossier :patientid="getUser" v-if="openComponent === 'personalDossier'"></dossier>
      <calendar :patientid="getUser" v-if="openComponent === 'calendar'"></calendar>
      <createm v-if="openComponent === 'createWerknemer'"></createm>
      <createp v-if="openComponent === 'createPatients'"></createp>
      <updatem :userId="userId" :user="getUser" v-if="openComponent === 'updateWerknemer'"></updatem>
      <updatep :patientId="getUser" v-if="openComponent === 'updatePatient'"></updatep>
      <news v-if="openComponent === 'home'"></news>
      <viewemp v-if="openComponent === 'viewWerknemers'"></viewemp>
      <viewpat v-if="openComponent === 'viewPatients'"></viewpat>
      <doctorchat v-if="openComponent === 'doctorChat'"></doctorchat>
      <appointmentlist :day="getDate" v-if="openComponent === 'appointmentlist'"></appointmentlist>
      <artsswitch v-if="openComponent === 'artsswitch'"></artsswitch>
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
      <storage v-if="openComponent === 'storage'"></storage>
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
import DoctorChat from '../chat/DoctorChat.vue'
import PatientChat from '../chat/PatientChat.vue'
import PatientChatWindow from '../chat/PatientChatWindow.vue'
import Planner from './Planner.vue';
import AppointmentChecker from "./AppointmentChecker";
import AppointmentList from "./AppointmentList.vue";
import ArtsSwitch from "./ArtsSwitch.vue";
import Storage from "./MedicineStorage.vue";

export default {

  name: 'app',
  data() {
    return {
      openComponent: 'home',
      openChat: false,
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
    'doctorchat' : DoctorChat,
    'patientchat' : PatientChat,
    'patientchatwindow' : PatientChatWindow,
    'planner' : Planner,
    'checker' : AppointmentChecker,
    'appointmentlist' : AppointmentList,
    'artsswitch' : ArtsSwitch,
    'storage' : Storage,
  },
  computed: {
    getUser(){
      return this.user;
    },

    getActiveUser(){
      return this.$store.getters.user

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
      this.user = user;
    },
    toggleChat (){
      this.openChat = !this.openChat
    },
    setupSockets(){
      this.$store.dispatch('setupSockets', this.$store.getters.user)
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

  },
  created() {
    if(this.$store.getters.user.type == 'doctor'){
      this.setupSockets();
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

