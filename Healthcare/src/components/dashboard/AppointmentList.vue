<!--suppress ALL -->
<template>
  <div class="dashboardContentForms">
    <b-button size="sm" v-on:click="changeComponent('planner')" variant="primary">
      <i class="ion-ios-arrow-back"></i> Terug
    </b-button>
    <div v-if="user.type === 'doctor'" class="row">
      <b-table
        show-empty
        :items="items"
        :busy.sync="isBusy"
        :fields="fields"
        :empty-text="'Er zijn geen afspraken'"
      >
        <template slot="patient" slot-scope="row">
          <div v-if="row.item.mappedPatient !== null">{{row.item.mappedPatient.firstname + ' ' + row.item.mappedPatient.lastname}}</div>
          <div v-else>NOTHING</div>
        </template>
        <template slot="actions" slot-scope="row">
          <b-button variant="secondary" size="sm" v-on:click="disapprove(row.item)">
            Verwijderen
          </b-button>
        </template>
      </b-table>
    </div>
    <div v-if="user.type === 'doctorEmployee'" class="row">
      <b-table
        show-empty
        :items="items"
        :busy.sync="isBusy"
        :fields="fieldsEmployee"
        :empty-text="'Er zijn geen afspraken'"
      > <template slot="patient" slot-scope="row">
        <div v-if="row.item.mappedPatient !== null">{{row.item.mappedPatient.firstname + ' ' + row.item.mappedPatient.lastname}}</div>
        <div v-else>NOTHING</div>
      </template>
        <template slot="currentDoctor" slot-scope="row">
          <div v-if="row.item.mappedPatient.doctor !== null">{{row.item.mappedPatient.doctor.firstname + ' ' + row.item.mappedPatient.doctor.lastname}}</div>
          <div v-else>~</div>
        </template>
        <template slot="doctor" slot-scope="row">
          <div v-if="row.item.mappedDoctor !== null">{{row.item.mappedDoctor.firstname + ' ' + row.item.mappedDoctor.lastname}}</div>
          <div v-else>NOTHING</div>
        </template>
        <template slot="actions" slot-scope="row">
          <b-button variant="secondary" size="sm" v-on:click="disapprove(row.item)">
            Verwijderen
          </b-button>
        </template>
      </b-table>
  </div>
  </div>
</template>

<script>
  export default {
    name: "AppointmentList",
    props: ['day'],
    data (){
      return{
        user_id: this.$store.getters.user.user_id,
        user: this.$store.getters.user,
        fields: {
          patient: {label: 'Patiënt', sortable: true},
          endTime: {label: 'Tijd', sortable: true},
          note: {label: 'Reden van bezoek'},
          actions: {label: 'Acties'}
        },
        fieldsEmployee:{
          patient: {label: 'Patiënt', sortable: true},
          endTime: {label: 'Tijd', sortable: true},
          note: {label: 'Reden van bezoek'},
          doctor: {label: 'Dokter', sortable: true},
          currentDoctor: {label: 'Huidige dokter', sortable: true},
          actions: {label: 'Acties'}
        },
        items: [

        ],
        isBusy: false,
        appointments: [],
        selected: null,
        options: [],
      }
    },
    created (){
      this.isBusy = true;
      if(this.$store.getters.user.type === 'doctor') {
        this.$store.dispatch("getRequest", 'timeslots/approved?approval=1&doctor_id=' + this.user_id).then((response) => {
          this.isBusy = false;
          this.appointments = response;
          let result = [];
          this.appointments.forEach((x) => {
            let appointmentDate = new Date(x.startTime);
            if (this.day.toDateString() === appointmentDate.toDateString()) {
              result.push(x);
            }
          });
          this.items = this.ConvertToDatetime(result)
        });
      }else if(this.$store.getters.user.type === 'doctorEmployee'){
        this.$store.dispatch("getRequest", 'timeslots/approved?approval=2&doctor_id0').then((response) => {
          this.isBusy = false;
          this.appointments = response;
          let result = [];
          this.appointments.forEach((x) => {
            let appointmentDate = new Date(x.startTime);
            if (this.day.toDateString() === appointmentDate.toDateString()) {
              result.push(x);
            }
          });
          this.items = this.ConvertToDatetime(result)
        });
      }
    },
    methods: {
      disapprove(appointment){
        this.isBusy = true;
        this.$store.dispatch('postRequest' , {
          url: 'timeslots/reset/' + appointment.id,
        }).then(response => {
          this.loadAppointments();
        })
      },
      loadAppointments() {
        this.isBusy = true;
        this.$store.dispatch("getRequest", 'timeslots/approved?approval=1&doctor_id=' + this.user_id).then((response) => {
          this.isBusy = false;
          this.appointments = this.ConvertToDatetime(response);
        });
      },
      changeComponent (component) {
        this.$parent.changeComponent(component);
      },
      CompareDates(day,calendarDay){
        let comparer = day.dayClick();
        let comparerm = day.startTime.toString().substring(8,11);
        let calenderm = calendarDay.date.toString().substring(4,7);
        if(calendarDay.monthDay.toString() === comparer && comparerm === calenderm){
          return true;
        }else {
          return false;
        }
      },
      ConvertToDatetime(dateValues) {
        let entryAppointments = dateValues;
        dateValues.forEach(x => {
          let startTimeNew = new Date(x.startTime);
          let endTimeNew = new Date(x.endTime);
          let timeSlotStart = startTimeNew.getUTCHours() + ':' + startTimeNew.getUTCMinutes();
          let timeSlotEnd = endTimeNew.getUTCHours() + ':' + endTimeNew.getUTCMinutes();
          entryAppointments.endTime = timeSlotStart + ' - ' + timeSlotEnd;
          x.endTime = entryAppointments.endTime
        });
        return dateValues;
      },
    },
  }
</script>

<style scoped>

</style>
