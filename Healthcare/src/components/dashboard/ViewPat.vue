<template>
  <div class="dashboardContentForms">
  <form id="form-list-client">
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Typ om te zoeken" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''" variant="primary">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <div class="pull-right" style="padding-top: 10px">
          <a v-on:click="changeComponent('createPatients')" style="cursor:pointer"> <i class="ion-ios-plus"></i> Patient Aanmaken</a>
        </div>
      </b-col>
    </b-row>
    <b-table :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :items="patients"
             :busy.sync="isBusy"
             :fields="fields"
             :filter="filter"
             style="width: 100%;"
             @filtered="onFiltered"
    >
      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button size="sm" v-on:click="changeComponent('personalDossier', row.item.user_id)" variant="primary">
          <i style="font-size:24px" class="fa">&#xf06e;</i>
        </b-button>
        <b-button size="sm" v-on:click="changeComponent('updateWerknemer', row.item)" variant="primary">
            <i style="font-size:24px" class="fa">&#xf044;</i>
        </b-button>
        <b-button size="sm" variant="primary">
          <i style="font-size:24px" class="fa">&#xf014;</i>
        </b-button>
      </template>
    </b-table>
    <h1 class="tableheader">Patiënten</h1>
    <div class="pull-right">
      <a v-on:click="changeComponent('createPatients')" style="cursor:pointer"> <i class="ion-ios-plus"></i> Patient Aanmaken</a>
    </div>
    <div class="tbl-header">
      <table class="tableoverview" cellpadding="0" cellspacing="0" border="0">
        <thead>
        <tr>
          <th class="thoverview">Voornaam</th>
          <th class="thoverview">Achternaam</th>
          <th class="thoverview">Leeftijd</th>
          <th class="thoverview">Geslacht</th>
          <th class="thoverview">Acties</th>
        </tr>

        </thead>
      </table>
      <div class="tbl-content">
        <table class="tableoverview" cellpadding="0" cellspacing="0" border="0">
          <tbody id="form-list-client-body">
          <tr v-for="patient in patients">
            <td class="tdoverview">
              <input class="form-control" v-model="patient.firstname" readonly/>
            </td>
            <td class="tdoverview">
              <input class="form-control" v-model="patient.lastname" readonly/>
            </td>
            <td class="tdoverview">
              <input class="form-control" v-model="patient.age" readonly/>
            </td>
            <td class="tdoverview">
              <input class="form-control" v-model="patient.gender" readonly/>
            </td>
            <td class="tdoverview">
              <a title="view this user" v-on:click="changeComponent('personalDossier', patient)" class="btn btn-default btn-sm "> <i style="font-size:24px" class="fa">&#xf06e;</i> </a>
              <a title="edit this user" class="btn btn-default btn-sm "> <i style="font-size:24px" class="fa">&#xf044;</i> </a>
              <a title="delete this user" class="btn btn-default btn-sm "> <i style="font-size:24px" class="fa">&#xf014;</i> </a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
>>>>>>> DiagnoseCreate
  </form>
 </div>
</template>

<script>

  export default {
    name: 'patientoverview',
    data() {
      return {
        fields: {
          firstname: {label: 'Voornaam', sortable: true},
          lastname: {label: 'Achternaam', sortable: true},
          age: {label: 'Geboortedatum', sortable: true},
          sex: {label: 'Geslacht', sortable: true},
          actions: {label: 'Acties'}
        },
        isBusy: false,
        patients: [],
        totalRows: 0,
        sortBy: null,
        sortDesc: false,
        filter: null
      }
    },
    created () {
      console.log(this.userId);
      this.isBusy = true;
      this.$store.dispatch("getRequest", 'patients').then((response) => {
        this.isBusy = false;
        this.patients = response;
        console.log(this.patients);
        this.totalRows = this.patients.length
        this.patients = response
>>>>>>> DiagnoseCreate
      });
    },
    computed: {
      sortOptions () {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => { return { text: f.label, value: f.key } })
      }
    },
    methods: {
      changeComponent (component) {
        this.$parent.changeComponent(component);
      },
      changeComponent (component, employee) {
        this.$parent.changeComponent(component, employee);
      },
      onFiltered (filteredItems) {
        this.totalRows = filteredItems.length
      changeComponent (component, patient) {
        this.$parent.changeComponent(component, patient);
      }
    }
  }

</script>

<style>

</style>
