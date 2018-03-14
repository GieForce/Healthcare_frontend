<template id="patient-list">
  <section>
  <div class="actions">
    <router-link class="btn btn-default" :to="{path: '/add-patient'}">
      <span class="glyphicon glyphicon-plus"></span>
      Add patient
    </router-link>
  </div>
  <div class="filters row">
    <div class="form-group col-sm-3">
      <label for="search-element">Patient name</label>
      <input v-model="searchKey" class="form-control" id="search-element" requred/>
    </div>
  </div>
  <table class="table b-table">
    <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Price</th>
      <th class="col-sm-2">Actions</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="patient in filteredPatients">
      <td>
        <router-link :to="{name: 'patient', params: {patient_id: patient.id}}">{{ patient.name }}</router-link>
      </td>
      <td>{{ patient.description }}</td>
      <td>
        {{ patient.price }}
        <span class="glyphicon glyphicon-euro" aria-hidden="true"></span>
      </td>
      <td>
        <router-link class="btn btn-warning btn-xs" :to="{name: 'patient-edit', params: {patient_id: patient.id}}">Edit</router-link>
        <router-link class="btn btn-danger btn-xs" :to="{name: 'patient-delete', params: {patient_id: patient.id}}">Delete</router-link>
      </td>
    </tr>
    </tbody>
  </table>
  </section>
</template>

var patients = [
  {id: 1, name: 'Angular', description: 'Superheroic JavaScript MVW Framework.', price: 100},
  {id: 2, name: 'Ember', description: 'A framework for creating ambitious web applications.', price: 100},
  {id: 3, name: 'React', description: 'A JavaScript Library for building user interfaces.', price: 100}
];

var List = Vue.extend({
  template: '#patient-list',
  data: function () {
    return {patients: patients, searchKey: ''};
  },
  computed : {
    filteredPatients: function () {
    var self = this;

      console.log(self.patients, self.searchKey)
      if(!self.searchKey) {
        return self.patients
      }
    return self.patients.filter(function (patient) {
      return patient.name.indexOf(self.searchKey) !== -1
    })
  }
}
});
