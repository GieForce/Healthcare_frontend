<!--suppress ALL -->
<template>
<div class="dashboardContentForms">
  <div class="row">
    <b-table
      show-empty
      :items="appointments"
      :busy.sync="isBusy"
      :fields="fields"
      :empty-text="'Er zijn geen afspraken'"
    >
      <template slot="patient" slot-scope="row">
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
      <b-button variant="primary" size="sm" v-on:click="approve(row.item)">
        Goedkeuren
      </b-button>
      <b-button variant="secondary" size="sm" v-on:click="disapprove(row.item)">
        Afkeuren
      </b-button>
    </template>
    </b-table>
  </div>
</div>
</template>

<script>
    export default {
      name: "AppointmentChecker",
      data (){
        return{
          fields: {
            patient: {label: 'Patiënt', sortable: true},
            startTime: {label: 'Datum', sortable: true},
            endTime: {label: 'Tijd', sortable: true},
            note: {label: 'Reden van bezoek'},
            doctor: {label: 'Dokter', sortable: true},
            currentDoctor: {label: 'Huidige dokter', sortable: true},
            actions: {label: 'Acties'}
          },
          items: [
            {Patient: 'D.J.M.M van den Bogaard',Date: '17-10-2018',Time: '10:00 - 10:15',Reason: 'Kipfilet beschimmeld opgegeten',Checked:false},
            {Patient: 'Devin Pennings',Date: '07-05-2018',Time: '10:00 - 10:15',Reason: 'Kipfilet beschimmeld opgegeten',Checked:true},
            {Patient: 'Devin Pennings',Date: '07-05-2018',Time: '10:00 - 10:15',Reason: 'Kipfilet beschimmeld opgegeten',Checked:false},
          ],
          isBusy: false,
          appointments: [],
          selected: null,
          options: [],
        }
      },
      created (){
        this.isBusy = true;
        this.$store.dispatch("getRequest", 'timeslots/available?availability=2').then((response) => {
          this.isBusy = false;
          this.appointments = this.ConvertToDatetime(response);
        });
      },
      methods: {
          approve(appointment){
              this.isBusy = true;
              this.$store.dispatch('postRequest' ,{
                url: 'timeslots/approve/' + appointment.id + '?approval=true',
              }).then(response => {
                this.loadAppointments();
              })
            },
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
            this.$store.dispatch("getRequest", 'timeslots/available?availability=2').then((response) => {
              this.isBusy = false;
              this.appointments = this.ConvertToDatetime(response);
            });
          },
        ConvertToDatetime(dateValues) {
          let entryAppointments = dateValues;
          for (let index = 0; index < entryAppointments.length; ++index) {
            let startTimeNew = new Date( parseFloat( entryAppointments[index].startTime));
            let endTimeNew = new Date( parseFloat( entryAppointments[index].endTime));
            let timeSlotStart = startTimeNew.getUTCHours() + ':' + startTimeNew.getUTCMinutes();
            let timeSlotEnd = endTimeNew.getUTCHours() + ':' + endTimeNew.getUTCMinutes();
            entryAppointments[index].startTime = new Date( parseFloat( entryAppointments[index].startTime)).toDateString();
            entryAppointments[index].endTime = timeSlotStart + ' - ' + timeSlotEnd;
          }
          entryAppointments.sort(function(a,b){
            let dateA = new Date(a.startTime), dateB = new Date(b.startTime);
            return dateA - dateB;
          });
          for (let i = 0; i < entryAppointments.length; ++i){
            if (entryAppointments[i].approval === true) {
              entryAppointments.splice(i,1);
              i--;
            }
          }
          return entryAppointments;
        },
      }
    }
</script>

<style scoped>

</style>
