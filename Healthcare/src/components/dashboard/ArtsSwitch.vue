<template>
  <div class="dashboardContentForms">
    <div class="container">
      <!-- Page Header-->
      <header>
        <h1 class="h3 display">Afmelding en Vervangend Arts aangeven            </h1>
      </header>
    </div>
    <div class="card-body">
        <div class="line"></div>
        <div class="form-group row">
          <label  class="col-sm-2 form-control-label">Dokter</label>
          <b-container fluid>
            <label>
              <select v-model="selected">
                <option disabled value="">Selecteer vervangend dokter</option>
                <option v-for="doctors in employees" v-bind:value="doctors.user_id">{{doctors.firstname + " " + doctors.lastname }}
                </option>
              </select>
            </label>
          </b-container>
          </div>
        </div>
        <div class="line"></div>
        <div class="form-group row">
          <div class="col-sm-10">
            <b-container fluid>
              <b-row class="my-1" v-for="type in types" :key="type">
                <label class="col-sm-2 form-control-label">Datum begin</label>
                <b-col  sm="10"><b-form-input v-model="start" :id="`type-${type}`" :type="type"></b-form-input></b-col>
              </b-row>
            </b-container>
            <b-container fluid>
              <b-row class="my-1" v-for="type in types" :key="type">
                <label class="col-sm-2 form-control-label">Datum eind</label>
                <b-col sm="10"><b-form-input v-model="end"  :id="`type-${type}`" :type="type"></b-form-input></b-col>
              </b-row>
            </b-container>
          </div>
        </div>
          <b-button size="sm" v-on:click="create" variant="primary">
            <i></i> Afwezig melden
          </b-button>
  </div>
</template>

<script>

  export default{
    name: 'artswitch',
    data() {
      return {
        employees: [],
        fields: {
          id: {label: 'id', sortable: true},
          firstname: {label: 'Voornaam', sortable: true},
          lastname: {label: 'Achternaam', sortable: true},
          type: {label: 'Type', sortable: true},
          username: {label: 'Email', sortable: true},
        },
        selected: '',
        isBusy: false,
        totalRows: 0,
        user_id: this.$store.getters.user.user_id,
        sortBy: null,
        sortDesc: false,
        filter: null,
        end: '',
        start:'',
        types: [
          'date',
        ],

      }
    },
    created () {
      this.isBusy = true;
      this.$store.dispatch("getRequest", 'doctors').then((response) => {
        this.isBusy = false;
        this.employees = response
      });
    },

    methods: {
      create() {
        let date = new Date(this.start);
        let date2 = new Date(this.end);
        this.$store.dispatch('postRequest',
          {
            url:'doctors/requestSubtitude/'+ this.user_id + '?subtitudeId=' + this.selected + '&startTime='+ date.valueOf().toString() +'&endTime=' + date2.valueOf().toString(),
          }).then(() => {
          this.changeComponent('planner');

        });
      },
      changeComponent (component) {
        this.$parent.changeComponent(component);
      },
      onFiltered (filteredItems) {
        this.totalRows = filteredItems.length
      }
    },
  }

</script>
