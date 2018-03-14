<template id="patient">
    <section>
  <h2>{{ patient.name }}</h2>
  <b>Description: </b>
  <div>{{ patient.description }}</div>
  <b>Price:</b>
  <div>{{ patient.price }}<span class="glyphicon glyphicon-euro"></span></div>
  <br/>
  <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
  <router-link to="/">Back to product list</router-link>
</section>
</template>

var Product = Vue.extend({
  template: '#product',
  data: function () {
    return {patient: findPatient(this.$route.params.patient_id)};
  }
});

function findPatient (productId) {
  return patients[findPatientKey(patientId)];
};
 
function findPatientKey (patientId) {
  for (var key = 0; key < patients.length; key++) {
    if (patients[key].id == patientId) {
      return key;
    }
  }
};
