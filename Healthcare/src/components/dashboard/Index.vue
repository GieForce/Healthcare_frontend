<template>
  <div id="parent">
    <router-view/>
    <navbar></navbar>
    <sidebar></sidebar>
    <div class="dashboardContent">
<<<<<<< HEAD
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
=======
      <dossier :patientid="getUser" v-if="openComponent === 'personalDossier'"></dossier>
      <createm v-if="openComponent === 'createWerknemer'"></createm>
      <createp v-if="openComponent === 'createPatients'"></createp>
      <updatem :userId="userId" :user="getUser" v-if="openComponent === 'updateWerknemer'"></updatem>
      <updatep :userId="userId" v-if="openComponent === 'updatePatient'"></updatep>
      <news v-if="openComponent === 'home'"></news>
      <viewemp v-if="openComponent === 'viewWerknemers'"></viewemp>
      <news v-if="openComponent === 'home'"></news>
      <viewpat v-if="openComponent === 'viewPatients'"></viewpat>
<<<<<<< HEAD
      <appointmentlist :day="getDate" v-if="openComponent === 'appointmentlist'"></appointmentlist>
      <artsswitch v-if="openComponent === 'artsswitch'"></artsswitch>
>>>>>>> parent of 7958d85... Merge pull request #17 from JeroenAndCo/Chat
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
=======
      <doctorchat v-if="openComponent === 'doctorChat'"></doctorchat>
>>>>>>> parent of 5685637... Merge branch 'master' into Chat
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
<<<<<<< HEAD
<<<<<<< HEAD
import DoctorChat from '../chat/DoctorChat.vue'
import PatientChat from '../chat/PatientChat.vue'
import PatientChatWindow from '../chat/PatientChatWindow.vue'
<<<<<<< HEAD
=======
>>>>>>> parent of 7958d85... Merge pull request #17 from JeroenAndCo/Chat
import Calendar2 from './Calendar2.vue'
=======
import Calendar from './Calendar.vue'
>>>>>>> parent of bdb07fb... Merge branch 'master' into ESLINT
import Planner from './Planner.vue';
import AppointmentChecker from "./AppointmentChecker";
import AppointmentList from "./AppointmentList.vue";
import ArtsSwitch from "./ArtsSwitch.vue";


=======
>>>>>>> parent of 5685637... Merge branch 'master' into Chat

export default {


  name: 'app',
  data() {
    return {
      openComponent: 'home',
<<<<<<< HEAD
      userId: this.$store.getters.user.user_id,
=======
      openChat: false,
      userId: this.$store.getters.user.userId,
>>>>>>> parent of 5685637... Merge branch 'master' into Chat
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
<<<<<<< HEAD
    'planner' : Planner,
    'checker' : AppointmentChecker,
    'appointmentlist' : AppointmentList,
    'artsswitch' : ArtsSwitch,

=======
    'doctorchat' : DoctorChat,
    'patientchat' : PatientChat,
    'patientchatwindow' : PatientChatWindow,
>>>>>>> parent of 5685637... Merge branch 'master' into Chat
  },
  computed: {
    getUser(){
      return this.user;
    },
<<<<<<< HEAD
    getDate(){
      return this.day;
=======
    getActiveUser(){
      return this.$store.getters.user
>>>>>>> parent of 5685637... Merge branch 'master' into Chat
    }
  },
  methods: {
    changeComponent (component, user) {
      console.log('Changing component to: ' + component)
      this.openComponent = component;
<<<<<<< HEAD
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
=======
      this.user = user;
    },
    toggleChat (){
      this.openChat = !this.openChat
    },
    setupSockets(){
      this.$store.dispatch('setupSockets', this.$store.getters.user)
>>>>>>> parent of 5685637... Merge branch 'master' into Chat
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
