<template>
  <div style="width: 100%;">
    <b-modal id="thankyou"
             title="Dankjewel voor het inplannen"
             @ok="changeComponent('home')"
             ok-only=true
             ok-title="OK">
      <p>U ontvangt spoedig een bevestiging van de assistent na goed keuring van de afspraak</p>
    </b-modal>
    <h1>Afspraak aanvragen</h1>
    <div class="row" style="margin-left: auto">
      <h2 class="text-center lead">Stap 1: Kies een dokter</h2>
    </div>
    <div class="row" style="width: 100%;">
      <div class="text-center doctor-slot" style="width: 100%;" v-for="doctor in doctors">
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-1">
            <img src="https://studiomango.nl/wp-content/uploads/2014/10/team-profile-picture_minko.jpg" class="rounded-circle img-responsive" alt="" style="height: 50px;">
          </div>
          <div class="col-md-5">
            <label>
              {{doctor.firstname + " " + doctor.lastname}}
              <input type="radio" v-model="selectedDoctor" :value="doctor" v-bind:id="doctor.id" v-on:click="takeDaysFromAppointments(doctor)" style="cursor: pointer;">
              <span v-if="doctor.user_id === patient.doctor.user_id">(dit is uw huisarts)</span>
            </label>
          </div>
          <div class="col-md-3"></div>
        </div>
      </div>
      <br>
      <div v-if="selectedDoctor">
        <div class="row" style="margin-left: auto">
          <h2 class="text-center lead">Stap 2: Kies een dag</h2>
        </div>
        <div class="row">
          <div class="col-xs-4 text-center row" v-for="day in daysOfAppointments">
            <div class="col-xs-1 times">
              <div class="day-slot">
                <label>{{day.startTime.toString().substring(0,12)}} <br>
                  <input type="radio" v-model="selectedDay" :value="day" v-bind:id="day.id" v-on:click="takeAppointmentsForDay(day)">
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br>
      <div v-if="selectedDay">
        <div class="row" style="margin-left: auto">
          <h2 class="text-center lead">Stap 3: Kies een tijd</h2>
        </div>
        <div class="row">
          <div v-bind:class="{ 'time-slot': appointment.poep == false, 'time-slot-unavailable': appointment.available == false, 'time-slot-selected': appointment.poep == true }" v-for="appointment in appointmentsOfDay">
            <label> {{appointment.startTime}} <br>
              <input type="checkbox" v-bind:id="appointment.id" v-model="appointment.poep" v-on:change="selectAppointment(appointment)">
              <span v-if="!appointment.available">Bezet</span>
              <span v-if="appointment.available">Beschikbaar</span>
            </label>
          </div>
        </div>
        <div class="row">
          <textarea class="textarea" placeholder="De reden van mijn bezoek is: " v-model="note"></textarea>
        </div>
        <p v-if="errors.length">
          <b>De volgende fouten traden op:</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
        </p>
        <div class="row">
          <div class="col-md-4"></div>
          <button class="btn btn-primary" style="vertical-align:middle" v-on:click="update()"><span>Bevestig</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Calendar",
      props: ['patientid'],
      data() {
        return {
          appointmentcheckbox: "",
          selectedDay: "",
          selectedAppointment: [],
          selectedDoctor: "",
          note: "",
          patient: this.patientid,
          errors: [],
          doctors: [],
          isBusy: false,
          checkboxVal: "hoi",
          daysOfAppointments:[],
          appointmentsOfDay:[],
          appointments: [],
          fields: {
            startTime: {label: 'Dag', sortable: true},
            id: {label: 'Id', sortable: true},
            available: {label: 'Beschikbaar', sortable: true},
            endTime: {label: 'Eindtijd', sortable: true},
          },
        }
      },
      created () {
          this.getAllDoctors();
          this.$store.dispatch("getRequest", "patients/" + this.patient.user_id).then(response => {
            console.log(response);
            this.patient = response;
            console.log(this.patient)
          });
      },
      methods: {
        update() {
          this.errors = [];
          if(this.selectedAppointment.length > 1 || this.selectedAppointment.length === 0) {
            this.errors.push("Selecteer één gespreksmoment")
          }
          if(this.selectedAppointment.length === 1) {
            console.log("hoi");
            this.$store.dispatch('postRequest', {
              url: 'timeslots/' + this.selectedAppointment[0].id + '?user_id=' + this.patient.user_id + '&note=' + this.note,
            }).then(() => {
              this.$root.$emit('bv::show::modal', 'thankyou')
              // this.changeComponent('News');
            });
          }
        },
        takeAppointmentsForDay(day) {
          var index = this.appointments.map(function(x) {return x.id; }).indexOf(day.id);
          var date = day.startTime.toString().substring(0,12);
          var compareDate;
          var dailyAppointments = [];
            for (var i = index; i < this.appointments.length; i++) {
              compareDate = this.appointments[i].startTime.toString().substring(0,12);
              if(compareDate == date){
                dailyAppointments.push(this.appointments[i]);
              }
            }
            dailyAppointments.forEach(function(obj) { obj.poep = false; });
            this.appointmentsOfDay = dailyAppointments;
        },
        takeDaysFromAppointments(doctor) {
          console.log("test");
          this.$store.dispatch("getRequest", 'timeslots/available/?availability=1&doctor_id=' + doctor.user_id).then((response) => {
            this.appointments = this.ConvertToDatetime(response);
            var days = [];
            var currentTimeSlot = "";
            var newTimeSlot = "";
            for (var i = 0; i < this.appointments.length; i++) {
              newTimeSlot = this.appointments[i].startTime.toString().substring(0, 12);
              if (currentTimeSlot != newTimeSlot) {
                days.push(this.appointments[i]);
                currentTimeSlot = newTimeSlot;
                this.daysOfAppointments = days;
                console.log(this.daysOfAppointments)
              }
            }
          });
        },
        changeComponent (component) {
          this.$parent.changeComponent(component);
        },
        ConvertToDatetime(dateValues) {
         var regex = /-?\d+/;
         var entryAppointments = dateValues;
          for (var index = 0; index < entryAppointments.length; ++index) {
            entryAppointments[index].startTime = new Date( parseFloat( entryAppointments[index].startTime)).toUTCString();
            entryAppointments[index].endTime = new Date( parseFloat( entryAppointments[index].endTime)).toUTCString();
          }
          entryAppointments.sort(function(a,b){
            var dateA = new Date(a.startTime), dateB = new Date(b.startTime);
            return dateA - dateB;
          });
          return entryAppointments;
        },
        selectAppointment(appointment) {
          console.log(appointment);
          if(appointment.poep) {
            this.selectedAppointment.push(appointment);
          }
          if(!appointment.poep){
            var index = this.selectedAppointment.map(function(x) {return x.id; }).indexOf(appointment.id);
            if(index != -1) {
              this.selectedAppointment.splice(index, 1);
            }
          }
        },
        getAllDoctors(){
          this.isBusy = true;
          this.$store.dispatch("getRequest", 'doctors').then((response) => {
            this.doctors = response;
            this.isBusy = false;
          });
        },
        getId(element) {
          return element == element.id;
        }
      }
    }
</script>

<style>

  @import"../../assets/style/landing.css";
  @import"https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css";
  @import"../../assets/icons-reference/ionicons.css";

</style>
