<template>
  <div class="row times">

    <div class="col-xs-4 text-center row times" v-for="day in takeDaysFromAppointments(appointments)">

      <h2 class="row">{{ day.startTime }}</h2>
      <br>
      <div class="row">
      <div v-bind:class="{ 'time-slot': !checkboxVal, 'time-slot-unavailable': checkboxVal }" v-for="appointment in takeAppointmentsForDay(day)">

        <label> {{appointment.startTime}} <br>
          <input type="checkbox" :id="appointments.id" v-model="appointmentcheckbox[day.id]" :value="checkboxVal" :checked="booleanVal" v-on:input="checkboxVal = $event.target.value">
          <span v-if="!appointment.available">Booked</span>
          <span v-if="appointment.available">Available</span>
        </label>

      </div>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
      name: "Calendar",
      data() {
        return {
          appointmentcheckbox: "",
          doctor: "",
          patient: "",
          props: ['doctorid'],
          appointments: [],
          fields: {
            startTime: {label: 'Dag', sortable: true},
            id: {label: 'Id', sortable: true},
            available: {label: 'Beschikbaar', sortable: true},
            endTime: {label: 'Eindtijd', sortable: true}
          },
        }
      },
      created () {
          this.$store.dispatch("getRequest", 'timeslots').then((response) => {
          this.appointments = this.ConvertToDatetime(response);
          console.log(this.appointments)
        });
      },
      methods: {
        takeAppointmentsForDay(day) {
          var index = this.appointments.map(function(x) {return x.id; }).indexOf(day.id);
          var dailyAppointments = [];
            for (var i = index; i < index + 24; i++) {
              dailyAppointments.push(this.appointments[i]);
            }
            console.log(dailyAppointments)
            return dailyAppointments;
        },
        takeDaysFromAppointments(dataValues) {
          var days = [];
          for (var i = 0; i < 480; i = i + 24){
            days.push(dataValues[i])
          }
          return days;
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
        getId(element) {
          return element == element.id;
        },
        checkCheckbox(){

        }
      }
    }
</script>

<style>

  @import"../../assets/style/landing.css";
  @import"https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css";
  @import"../../assets/icons-reference/ionicons.css";

</style>
