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
            <a v-on:click="changeComponent('createWerknemer')" style="cursor:pointer"> <i class="ion-ios-plus"></i> Werknemer Aanmaken</a>
          </div>
        </b-col>
      </b-row>
      <b-table :sort-by.sync="sortBy"
               :sort-desc.sync="sortDesc"
               :items="employees  "
               :busy.sync="isBusy"
               :fields="fields"
               :filter="filter"
               style="width: 100%;"
               @filtered="onFiltered"
      >
        <template slot="actions" slot-scope="row">
          <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
          <b-button size="sm" variant="primary">
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
    </form>
  <div class="dashboardContent">
    <h1 class="tableheader">Werknemers</h1>
    <div class="tbl-header">
    <div class="pull-right">
      <a v-on:click="changeComponent('createWerknemer')" style="cursor:pointer"> <i class="ion-ios-plus"></i> Werknemer Aanmaken</a>
    </div>      
    <table class="tableoverview" cellpadding="0" cellspacing="0" border="0">
        <thead>
        <tr>
          <th class="thoverview">Voornaam</th>
          <th class="thoverview">Achternaam</th>
          <th class="thoverview">Afdeling</th>
          <th class="thoverview">Email</th>
          <th class="thoverview">Acties</th>
        </tr>

        </thead>
      </table>
      <div class="tbl-content">
        <table class="tableoverview" cellpadding="0" cellspacing="0" border="0">
          <tbody id="form-list-client-body">
          <tr v-for="employee in employees">
            <td class="tdoverview"><input class="form-control" v-model="employee.firstname" readonly/></td>
            <td class="tdoverview"><input class="form-control" v-model="employee.lastname" readonly/></td>
            <td class="tdoverview"><input class="form-control" v-model="employee.type" readonly/></td>
            <td class="tdoverview"><input class="form-control" v-model="employee.username" readonly/></td>
            <td class="tdoverview">
              <button title="view this user" class="btn btn-default btn-sm "> <i style="font-size:24px" class="fa">&#xf06e;</i> </button>
              <button title="edit this user" class="btn btn-default btn-sm " v-on:click="changeComponent('updateWerknemer', employee)">  <i style="font-size:24px" class="fa">&#xf044;</i> </button>
              <button title="delete this user" class="btn btn-default btn-sm ">  <i style="font-size:24px" class="fa">&#xf014;</i> </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script>

  export default{
    name: 'employeeOverview',
    data() {
      return {
        employees: [],
        fields: {
          firstname: {label: 'Voornaam', sortable: true},
          lastname: {label: 'Achternaam', sortable: true},
          type: {label: 'Type', sortable: true},
          username: {label: 'Email', sortable: true},
          actions: {label: 'Acties'}
        },
        isBusy: false,
        totalRows: 0,
        sortBy: null,
        sortDesc: false,
        filter: null
      }
    },
    created () {
      this.isBusy = true;
      this.$store.dispatch("getRequest", 'admins').then((response) => {
        this.isBusy = false;
        this.employees = response
        console.log(this.employees)
        this.totalRows = this.patients.length
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
      }
    },
  }

</script>
