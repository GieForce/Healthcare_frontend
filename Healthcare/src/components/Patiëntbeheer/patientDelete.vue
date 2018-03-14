<template id="patient-delete">
    <section>
  <h2>Delete patient {{ patient.name }}</h2>
  <form v-on:submit="deletePatient">
    <p>The action cannot be undone.</p>
    <button type="submit" class="btn btn-danger">Delete</button>
    <router-link to="'/'" class="btn btn-default">Cancel</router-link>
  </form>
</section>
</template>

var PatientDelete = Vue.extend({
  template: '#patient-delete',
  data: function () {
    return {patient: findPatient(this.$route.params.patient_id)};
  },
  methods: {
    deletePatient: function () {
      patients.splice(findPatientKey(this.$route.params.patient_id), 1);
      router.push('/');
    }
  }
});
