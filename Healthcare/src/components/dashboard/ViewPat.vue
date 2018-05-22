<template>
  <div class="dashboardContentForms">
    <b-modal id="medicijnVoorschrijven"
             size="lg"
             title="Schrijf hier medicijnen voor"
             @ok="createPrescription"
             ok-only=true
             ok-title="OK">
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
        </b-row>
        <b-table :sort-by.sync="sortBy"
                 :sort-desc.sync="sortDesc"
                 :items="testMedicijnen"
                 :busy.sync="isBusy"
                 :fields="testFields"
                 :filter="filter"
                 style="width: 100%;"
        >
          <template slot="show_details" slot-scope="row">
            <a size="sm" @click.stop="row.toggleDetails" class="mr-2">
              <i v-if="!row.detailsShowing" class="ion-ios-arrow-down"></i>
              <i v-if="row.detailsShowing" class="ion-ios-arrow-up"></i>
            </a>
          </template>
          <template slot="row-details" slot-scope="row">
            <b-card>
              <b-row class="mb-2">
                <b-col>{{ row.item.report }}</b-col>
              </b-row>
            </b-card>
          </template>
          <template slot="actions" slot-scope="row">
            <b-form-checkbox :value="row.item" :id="row.item.id" v-model="testSelected" v-on:change="selectMedicine(row.item)"></b-form-checkbox>
          </template>
        </b-table>
      </form>
      <div class="card-body">
        <form class="form-horizontal">
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">Recept:</label>
            <div class="col-sm-10">
              <div class="row">
                <div class="col-md-4">
                  <label>{{testnaam}}</label>
                </div>
                <div class="col-md-3">
                  <input type="number" placeholder="Hoeveelheid" v-model="testhoeveelheid" class="form-control">
                </div>
              </div>
              <div class="row" style="margin-left: auto; margin-top: 10px;">
                <h2 class="lead">Extra instructies</h2>
              </div>
              <div class="row" style="margin-top: 10px;">
                <textarea class="textarea" placeholder="" v-model="testNote" style="width: 500px; height: 200px;"></textarea>
              </div>
            </div>
          </div>
        </form>
      </div>
      <p>Klik op ok om te bevestigen</p>
    </b-modal>
  <form id="form-list-client2">
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
        <b-button size="sm" v-if="user.type === 'doctor'" v-on:click="showTestModal(row.item)" variant="primary">
          <i style="font-size:24px" class="fa">&#xf0f9;</i>
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
  import Loader from '../loader.vue'
  export default {
    name: 'patientoverview',
    components: {
      'loader': Loader,
    },
    data() {
      return {
        test: 'false',
        testMedicijnen: [],
        testhoeveelheid: '',
        testnaam: 'Medicijn',
        testNote: '',
        testSelected: '',
        fields: {
          firstname: {label: 'Voornaam', sortable: true},
          lastname: {label: 'Achternaam', sortable: true},
          age: {label: 'Geboortedatum', sortable: true},
          sex: {label: 'Geslacht', sortable: true},
          actions: {label: 'Acties'}
        },
        testFields: {
          id: {label: 'ID', sortable: true},
          name: {label: 'Naam', sortable: true},
          stock: {label: "Op voorraad", sortable: true},
          actions: {label: ''},
        },
        user: this.$store.getters.user,
        isBusy: false,
        patients: [],
        totalRows: 0,
        patient: this.patientid,
        sortBy: null,
        sortDesc: false,
        filter: null,
        activePatient: null,
      }
    },
    created() {
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
      sortOptions() {
        // Create an options list from our fields
        return this.testFields
          .filter(f => f.sortable)
          .map(f => {
            return {text: f.label, value: f.key}
          })
      }
    },
    methods: {
      selectMedicine(object) {
        console.log(this.testSelected);
        this.testnaam = object.name;
      },
      createPrescription() {
        this.$store.dispatch('postRequest', {
          url: 'medicines/order/1?quantity=1' + this.testhoeveelheid + '&patient_id=' + this.patient.user_id + '&instructions=' + this.testNote,
        })
      },
      getAge(age) {
        var d = new Date(age); // The 0 there is the key, which sets the date to the epoch
        console.log(d)
        return d.toLocaleDateString()
      },
      getItems() {
        return this.items;
      },
      showTestModal(button) {
        this.isBusy = true;
        this.$store.dispatch("getRequest", "medicines").then(response => {
          this.isBusy = false;
          console.log(response);
          // this.user = response;
          this.testMedicijnen = response;
          this.isLoading = false;
          this.$root.$emit('bv::show::modal', 'medicijnVoorschrijven', button)
        });
      },
      newDiagnose() {
        this.isBusy = true
        console.log(this.patient.user_id)
        this.$store.dispatch('postRequest', {
          url: 'patients/dossier/' + this.patient.user_id,
          body: {
            category: this.form.category,
            report: this.form.diagnose,
            date: new Date().toJSON().slice(0, 10).replace(/-/g, '-')
          }
        }).then(response => {
          this.loadDiagnosis();
        })
      },
      selectMedicine(object) {
        this.naam = object.name;
      },
      createPrescription() {
        this.$store.dispatch('postRequest', {
          url: 'medicines/order/1?quantity=1' + this.hoeveelheid + '&patient_id=' + this.activePatient.user_id + '&instructions=' + this.Note,
        })
      },
      showModal(button) {
        this.$root.$emit('bv::show::modal', 'addDiagnoseModal', button)
      },
      showTestModal(button) {
        this.isBusy = true;
        this.$store.dispatch("getRequest", "medicines").then(response => {
          this.isBusy = false;
          console.log(response);
          // this.user = response;
          this.testMedicijnen = response;
          this.isLoading = false;
          this.$root.$emit('bv::show::modal', 'medicijnVoorschrijven', button)
        });
      },
      changeComponent(component) {
        this.$parent.changeComponent(component);
      },
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
      },
      changeComponent(component, patient) {
        this.$parent.changeComponent(component, patient);
      },
      dateConverter(values) {
        var regex = /-?\d+/;
        var entries = values;
        for (var index = 0; index < entries.length; ++index) {
          entries[index].age = new Date(parseFloat(entries[index].age)).toLocaleDateString();
        }
        return entries;
      }
    },
  }
</script>

<style>

</style>
