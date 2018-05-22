<template>
  <div class="dashboardContentForms">
    <form id="form-list-client">
      <b-row>
        <b-col md="6" class="my-1">
          <b-form-group horizontal label="Filter" class="mb-0">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Typ om te zoeken" ></b-form-input>
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
          <b-button size="sm" v-on:click="changeComponentUpdate('updateWerknemer', row.item)" variant="primary">
            <i style="font-size:24px" class="fa">&#xf044;</i>
          </b-button>
        </template>
      </b-table>
    </form>
  </div>
</template>

<script>

  export default{
    name: 'employeeOverview',
    data() {
      return {
        fields: {
          firstname: {label: 'Voornaam', sortable: true},
          lastname: {label: 'Achternaam', sortable: true},
          type: {label: 'Type', sortable: true},
          username: {label: 'Email', sortable: true},
          actions: {label: 'Acties'}
        },
        user: this.$store.getters.user,
        isBusy: false,
        employees:[],
        totalRows: 0,
        sortBy: null,
        sortDesc: false,
        filter: null
      }
    },
    created () {
      this.isBusy = true;
      this.$store.dispatch("getRequest", 'employees').then((response) => {
        this.isBusy = false;
        this.totalRows = this.employees.length;
        this.employees = response;
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
      changeComponentUpdate (component, employee) {
        this.$parent.changeComponent(component, employee);
      },
      onFiltered (filteredItems) {
        this.totalRows = filteredItems.length
      }
    },
  }

</script>
