<template>
  <div class="row times">

    <div class="col-xs-4 text-center" v-for="day in appointments">

      <h2>{{ day.startDate }}</h2>

      <div class="time-slot" v-for="appointment in takeAppointmentsForDay(day)">

        <input type="checkbox" id="{{ appointment.id }}" v-model="appointmentcheckbox">

        <label v-for="appointment in takeAppointmentsForDay(day)">{{ slot.time }}<br>
          <span v-if="!appointment.available">Booked</span>
          <span v-if="appointment.available">Available</span>
        </label>

      </div>
    </div>

  </div>
</template>

<script>
    export default {
      name: "Calendar",
      data() {
        return {
          doctor: "",
          patient: "",
          appointments: [],
          fields: {
            startDate: {label: 'Dag', sortable: true},
            id: {label: 'Id', sortable: true},
            available: {label: 'Beschikbaar', sortable: true}
          },
        }
      },
      methods: {
        takeAppointmentsForDay(day) {
          first = this.appointments[0].id;
          times = day.id + 11;
          dailyAppointments: [];
            for (i = 0; i < 12; i++) {
              dailyAppointments[i] = this.appointments[day.id-first+i];
            }
            return dailyAppointments;
        }
      }
    }
</script>

<style scoped>

</style>
