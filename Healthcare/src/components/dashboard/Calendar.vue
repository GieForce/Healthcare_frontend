<template>
  <div class="row times">

    <div class="col-xs-4 text-center row times" v-for="day in takeDaysFromAppointments(appointments)">
      <div class="day-slot">
        <label>{{day.startTime.toString().substring(0,12)}} <br>
          <input type="radio" v-model="selectedDay" :value="day" v-bind:id="day.id">
          <p>Beschikbaar: {{takeAppointmentsForDay(day).length}}</p>
        </label>
      </div>
    </div>
      <br>
      <div v-if="selectedDay">
      <div class="row">
      <div v-bind:class="{ 'time-slot': appointment.available == true, 'time-slot-unavailable': appointment.available == false }" v-for="appointment in takeAppointmentsForDay(selectedDay)">
        <label> {{appointment.startTime}} <br>
          <input type="checkbox" v-bind:id="appointment.id" v-model="appointment.available" v-on:input="appointment.available = $event.target.value">
          <span v-if="!appointment.available">Bezet</span>
          <span v-if="appointment.available">Beschikbaar</span>
        </label>
      </div>
      </div>
        <div class="row">
          <textarea class="textarea" placeholder="De reden van mijn bezoek is: " v-model="note"></textarea>
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
          selectedDay: "",
          note: "",
          doctor: "",
          patient: "",
          props: ['doctorid'],
          checkboxVal: "hoi",
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
            console.log("Eind: ");
            console.log(this.appointments)
        });
      },
      methods: {
        update(selectedAppointment) {
          this.$store.dispatch('postRequest', {
            url:'timeslot',
            body:{
              doctor: this.name,
              patient: this.lname,
              appointment: selectedAppointment,
              note: this.note,
            }
          }).then(() => {
            this.changeComponent('viewWerknemers')
          });
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
            console.log("daily: ");
            console.log(dailyAppointments);
            return dailyAppointments;
        },
        takeDaysFromAppointments(dataValues) {
          var days = [];
          var currentTimeSlot = "";
          var newTimeSlot = "";
          for (var i = 0; i < dataValues.length; i++){
            newTimeSlot = dataValues[i].startTime.toString().substring(0,12);
            if(currentTimeSlot != newTimeSlot){
              days.push(dataValues[i]);
              currentTimeSlot = newTimeSlot;
            }
          }
          console.log(days);
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
        }
      }
    }
</script>

<style>

  @import"../../assets/style/landing.css";
  @import"https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css";
  @import"../../assets/icons-reference/ionicons.css";

</style>
