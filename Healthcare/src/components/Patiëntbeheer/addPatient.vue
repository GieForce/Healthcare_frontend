<template id="add-patient">
    <section>
  <h2>Add new patient</h2>
  <form v-on:submit="createPatient">
    <div class="form-group">
      <label for="add-name">Name</label>
      <input class="form-control" id="add-name" v-model="patient.name" required/>
    </div>
    <div class="form-group">
      <label for="add-description">Description</label>
      <textarea class="form-control" id="add-description" rows="10" v-model="patient.description"></textarea>
    </div>
    <div class="form-group">
      <label for="add-price">Price, <span class="glyphicon glyphicon-euro"></span></label>
      <input type="number" class="form-control" id="add-price" v-model="patient.price"/>
    </div>
    <button type="submit" class="btn btn-primary">Create</button>
     <router-link class="btn btn-default" :to="{name: 'root'}">Cancel</router-link>
  </form>
</section>
</template>

var AddPatient = Vue.extend({
  template: '#add-patient',
  data: function () {
    return {patient: {name: '', description: '', price: ''}
    }
  },
  methods: {
    createPatient: function() {
      var patient = this.patient;
      patients.push({
        id: Math.random().toString().split('.')[1],
        name: patient.name,
        description: patient.description,
        price: product.price
      });
      router.push('/');
    }
  }
});
