<template id="patient-edit">
    <section>
  <h2>Edit patient</h2>
  <form v-on:submit="updatePatient">
    <div class="form-group">
      <label for="edit-name">Name</label>
      <input class="form-control" id="edit-name" v-model="patient.name" required/>
    </div>
    <div class="form-group">
      <label for="edit-description">Description</label>
      <textarea class="form-control" id="edit-description" rows="3" v-model="patient.description"></textarea>
    </div>
    <div class="form-group">
      <label for="edit-price">Price, <span class="glyphicon glyphicon-euro"></span></label>
      <input type="number" class="form-control" id="edit-price" v-model="patient.price"/>
    </div>
    <button type="submit" class="btn btn-primary">Save</button>
    <router-link to="/" class="btn btn-default">Cancel</router-link>
  </form>
</section>
</template>

var ProductEdit = Vue.extend({
  template: '#patient-edit',
  data: function () {
    return {product: findPatient(this.$route.params.patient_id)};
  },
  methods: {
    updatePatient: function () {
      var patient = this.patient;
      products[findPatientKey(patient.id)] = {
        id: patient.id,
        name: patient.name,
        description: patient.description,
        price: patient.price
      };
      router.push('/');
    }
  }
});
