<template>
  <div class="dashboardContentForms">
    <b-button size="sm" v-on:click="changeComponent('planner')" variant="primary">
      <i class="ion-ios-arrow-back"></i> Terug
    </b-button>
    <div class="row">
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
  </div>
</template>

<script>
  export default {
    name: "AppointmentList",
    props: ['day'],
    data (){
      return{
        user_id: this.$store.getters.user.user_id,
        fields: {
          patient: {label: 'Patiënt', sortable: true},
          startTime: {label: 'Datum', sortable: true},
          endTime: {label: 'Tijd', sortable: true},
          note: {label: 'Reden van bezoek'},
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
      console.log(this.$store.getters.user)
      console.log('hallo')
      this.$store.dispatch("getRequest", 'timeslots/approved?approval=1&doctor_id=' + this.user_id).then((response) => {
        this.isBusy = false;
        console.log(response)
        this.appointments = response;
        console.log('meegegeven datuM:')
        console.log(this.day)
        var result = [];
        this.appointments.forEach((x) => {
          var appointmentDate = new Date(x.startTime);
          if(this.day.toDateString() == appointmentDate.toDateString()){
            result.push(x);
          }
        });
        console.log(result)
        this.items = this.ConvertToDatetime(result)
      });
    },
    methods: {
      delete(appointment){
        this.isBusy = true;
        this.$store.dispatch('deleteRequest' , {
          url: 'timeslots/' + appointment.id,
        }).then(response => {
          this.loadAppointments();
        })
      },
      changeComponent (component) {
        this.$parent.changeComponent(component);
      },
      CompareDates(day,calendarDay){
        var comparer = day.dayClick();
        var comparerm = day.startTime.toString().substring(8,11);
        var calenderm = calendarDay.date.toString().substring(4,7);
        if(calendarDay.monthDay.toString() === comparer && comparerm == calenderm){
          return true;
        }else {
          return false;
        }
      },
      ConvertToDatetime(dateValues) {
        dateValues.forEach(x => {
          x.startTime = new Date(x.startTime).toDateString();
          var endTime = new Date(x.endTime);
          x.endTime = endTime.getUTCHours() + ':' + endTime.getUTCMinutes();
        })
        return dateValues;
      },
    },
  }
</script>

<style scoped>

</style>
