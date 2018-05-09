<template>
  <div class="dashboardContentForms">
    <b-modal id="medicijnVoorschrijven"
             title="Schrijf hier medicijnen voor"
             @ok="changeComponent('home')"
             ok-only=true
             ok-title="OK">
      <div class="col-md-10 col-md-offset-1">

        <div class="panel panel-default panel-table">
          <div class="panel-heading">
            <div class="row">
              <div class="col col-xs-6">
                <h3 class="panel-title">Panel Heading</h3>
              </div>
              <div class="col col-xs-6 text-right">
                <button type="button" class="btn btn-sm btn-primary btn-create">Create New</button>
              </div>
            </div>
          </div>
          <div class="panel-body">
            <table class="table table-striped table-bordered table-list">
              <thead>
              <tr>
                <th><em class="fa fa-cog"></em></th>
                <th class="hidden-xs">ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td align="center">
                  <a class="btn btn-default"><em class="fa fa-pencil"></em></a>
                  <a class="btn btn-danger"><em class="fa fa-trash"></em></a>
                </td>
                <td class="hidden-xs">1</td>
                <td>John Doe</td>
                <td>johndoe@example.com</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <p>Medicijnen zijn voorgeschreven</p>
    </b-modal>
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
          <b-button size="sm" v-on:click="changeComponent('createPatients')" variant="primary">
            <i class="ion-ios-plus"></i> Patient Aanmaken
          </b-button>
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
        <b-button size="sm" v-if="user.type === 'doctor'" v-on:click="changeComponent('personalDossier', row.item.user_id)" variant="primary">
          <i style="font-size:24px" class="fa">&#xf06e;</i>
        </b-button>
        <b-button size="sm" v-on:click="changeComponent('updatePatient', row.item)" variant="primary">
            <i style="font-size:24px" class="fa">&#xf044;</i>
        </b-button>
        <b-button size="sm" variant="primary">
          <i style="font-size:24px" class="fa">&#xf014;</i>
        </b-button>
      </template>
    </b-table>
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
        user: this.$store.getters.user,
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
        this.patients = this.dateConverter(response);
        console.log(this.patients);
        this.totalRows = this.patients.length;
        this.patients = response
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
      onFiltered (filteredItems) {
        this.totalRows = filteredItems.length
      },
      changeComponent (component, patient) {
        this.$parent.changeComponent(component, patient);
      },
      dateConverter(values){
        var regex = /-?\d+/;
        var entries = values;
        for (var index = 0; index < entries.length; ++index) {
          entries[index].age = new Date( parseFloat( entries[index].age)).toLocaleDateString();
        }
        return entries;
      }
    }
  }

</script>

<style>

</style>
