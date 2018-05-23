<template>
  <div style="width: 100%;">
    <b-modal id="thankyou"
             title="Dankjewel voor het inplannen"
             @ok="changeComponent('home')"
             ok-only
             ok-title="OK">
      <p>U ontvangt spoedig een bevestiging van de assistent na goed keuring van de afspraak</p>
    </b-modal>
    <h1>Afspraak aanvragen</h1>
    <div class="row" style="margin-left: auto">
      <h2 class="text-center lead">Stap 1: Kies een dokter</h2>
    </div>
      <div class="text-center row justify-content-md-center" v-for="doctor in doctors">
          <div v-if="doctor.type === 'doctor'" v-bind:class="{ 'doctor-slot': doctor !== selectedDoctor, 'doctor-slotselected': doctor === selectedDoctor}" style="width: 500px; cursor: pointer;" v-model="selectedDoctor" :value="doctor" v-bind:id="doctor.id" @click="takeDaysFromAppointments(doctor)" >
            <img src="https://studiomango.nl/wp-content/uploads/2014/10/team-profile-picture_minko.jpg" class="rounded-circle img-responsive" alt="" style="height: 50px;">
            <label style="width: 250px; cursor: pointer;">
              {{doctor.firstname + " " + doctor.lastname}}
              <span v-if="doctor.user_id === patient.doctor.user_id"> (Uw huisarts)</span>
            </label>
          </div>
      </div>
      <br>
      <div v-if="selectedDoctor">
        <div class="row" style="margin-left: auto">
          <h2 class="text-center lead">Stap 2: Kies een dag</h2>
        </div>
        <div class="row justify-content-md-center">
          <div class="text-center" v-for="day in daysOfAppointments">
              <div v-bind:class="{ 'day-slot': day !== selectedDay, 'day-slotselected': day === selectedDay}" v-model="selectedDay" :value="day" v-bind:id="day.id" @click="takeAppointmentsForDay(day)">
                <label style="cursor: pointer;">{{day.startTime.toString().substring(0,12)}}
                </label>
              </div>
          </div>
        </div>
      </div>
      <br>
      <div v-if="selectedDay">
        <div class="row" style="margin-left: auto">
          <h2 class="text-center lead">Stap 3: Kies een tijd</h2>
        </div>
        <div class="row justify-content-md-center">
          <div class="text-center" v-for="appointment in appointmentsOfDay">
            <div v-bind:class="{ 'time-slot': appointment !== selectedTime, 'time-slotselected': appointment === selectedTime }" v-bind:id="appointment.id" v-model="selectedTime" :value="appointment" @click="selectAppointment(appointment)" v-on:change="selectAppointment(appointment)">
              <label> {{spliceTime(appointment.startTime)}} - {{spliceTime(appointment.endTime)}}</label>
            </div>
          </div>

        </div>
        <div v-if="selectedTime">
          <div class="row" style="margin-left: auto; margin-top: 10px;">
            <h2 class="text-center lead">Stap 4: Beschrijf reden van bezoek</h2>
          </div>
          <div class="row justify-content-md-center" style="margin-top: 10px;">
            <textarea class="textarea" placeholder="Reden van bezoek: " v-model="note" style="width: 500px; height: 200px;"></textarea>
          </div>
          <div class="row justify-content-md-center">
          <p v-if="errors.length">
            <b>De volgende fouten traden op:</b>
          </p>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
          </div>
          <div class="row justify-content-md-center" style="margin-top: 10px;margin-bottom: 10px;">
          <button class="btn btn-primary" style="vertical-align:middle" v-on:click="update()" :disabled="note === ''"><span>Bevestig</span></button>
        </div>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: "calendar",
    props: ['patientid'],
    data() {
      return {
        appointmentcheckbox: "",
        selectedDay: "",
        selectedAppointment: [],
        selectedDoctor: "",
        selectedTime: "",
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
        this.patient = response;
      });
    },
    methods: {
      update() {
        this.errors = [];
        if(this.selectedTime === "") {
          this.errors.push("Selecteer één gespreksmoment")
        }
        if(this.selectedTime !== "") {
          this.$store.dispatch('postRequest', {
            url: 'timeslots/' + this.selectedTime.id + '?user_id=' + this.patient.user_id + '&note=' + this.note,
          }).then(() => {
            this.$root.$emit('bv::show::modal', 'thankyou')
          });
        }
      },
      takeAppointmentsForDay(day) {
        this.selectedDay = day;
        this.selectedTime = "";
        let index = this.appointments.map(function(x) {return x.id; }).indexOf(day.id);
        let date = day.startTime.toString().substring(0,12);
        let compareDate;
        let dailyAppointments = [];
        for (let i = index; i < this.appointments.length; i++) {
          compareDate = this.appointments[i].startTime.toString().substring(0,12);
          if(compareDate === date){
            dailyAppointments.push(this.appointments[i]);
          }
        }
        dailyAppointments.forEach(function(obj) { obj.selected = false; });
        this.appointmentsOfDay = dailyAppointments;
      },
      spliceTime(day) {
        let dateTime = new Date(day);
        return dateTime.getUTCHours() + ':' + dateTime.getUTCMinutes();
      },
      takeDaysFromAppointments(doctor) {
        this.daysOfAppointments = null;
        this.selectedTime = "";
        this.selectedDay = "";
        this.selectedDoctor = doctor;
        this.$store.dispatch("getRequest", 'timeslots/available/?availability=1&doctor_id=' + doctor.user_id).then((response) => {
          this.appointments = this.ConvertToDatetime(response);
          let days = [];
          let currentTimeSlot = "";
          let newTimeSlot = "";
          for (let i = 0; i < this.appointments.length; i++) {
            newTimeSlot = this.appointments[i].startTime.toString().substring(0, 12);
            if (currentTimeSlot !== newTimeSlot) {
              days.push(this.appointments[i]);
              currentTimeSlot = newTimeSlot;
              this.daysOfAppointments = days;
            }
          }
        });
      },
      changeComponent (component) {
        this.$parent.changeComponent(component);
      },
      ConvertToDatetime(dateValues) {

        let entryAppointments = dateValues;
        for (let index = 0; index < entryAppointments.length; ++index) {
          entryAppointments[index].startTime = new Date( parseFloat( entryAppointments[index].startTime)).toUTCString();
          entryAppointments[index].endTime = new Date( parseFloat( entryAppointments[index].endTime)).toUTCString();
        }
        entryAppointments.sort(function(a,b){
          let dateA = new Date(a.startTime), dateB = new Date(b.startTime);
          return dateA - dateB;
        });
        return entryAppointments;
      },
      selectAppointment(appointment) {
        this.note = "";
        this.selectedTime = appointment;
        if(appointment.selected) {
          this.selectedAppointment.push(appointment);
        }
        if(!appointment.selected){
          let index = this.selectedAppointment.map(function(x) {return x.id; }).indexOf(appointment.id);
          if(index !== -1) {
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
    }
  }
</script>

<style>

</style>
