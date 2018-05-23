<template>
  <div  style="width: 100%;">
    <b-modal id="medicijnVoorschrijven"
             size="lg"
             title="Schrijf hier medicijnen voor"
             @ok="createPrescription"
             ok-only
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
    <div class="loader" v-if="isBusy" ><loader></loader></div>
    <div v-if="!isBusy">
      <b-modal id="addDiagnoseModal"
               title="Voeg een diagnose toe"
               @ok="newDiagnose"
               ok-title="Toevoegen">
        <b-form @submit="newDiagnose" @reset="">
          <label for="categoryInput">Categorie: </label>
          <b-form-input id="categoryInput"
                        v-model="form.category"
                        placeholder="Allergie, botbreuk, controle, etc"></b-form-input>
          <br>
          <label for="diagnoseInput">Diagnose: </label>
          <b-form-textarea  id="diagnoseInput"
                            v-model="form.diagnose"
                            :rows="3"></b-form-textarea>
        </b-form>
      </b-modal>
      <div class="row">
        <div class="col-md-6">
          <div class="row">
            <div class="col text-center py-5">
              <b-img slot="aside" blank-color="#ccc" width="200px" height="200px" alt="placeholder" class="rounded-circle" src="https://studiomango.nl/wp-content/uploads/2014/10/team-profile-picture_minko.jpg"></b-img>
            </div>
            <div class="col py-1">
              <h4>Volledige naam:</h4>
              <p>{{ patient.firstname + ' ' + patient.lastname }}</p>
              <hr>
              <h4>Mail:</h4>
              <p>{{ patient.username }}</p>
              <hr>
              <h4>Geboortedatum:</h4>
              <p>{{ getAge(patient.age) }}</p>
              <hr>
              <h4>Dokter:</h4>
              <p v-if="patient.doctor !== null">{{patient.doctor.firstname + ' ' + patient.doctor.lastname}}</p>
              <p v-else>~</p>
            </div>
          </div>
        </div>
      <div class="col-md-6">
      </div>
      </div>
      <div class="row">
        <b-table :sort-by.sync="sortBy"
                 :sort-desc.sync="sortDesc"
                 :items="items"
                 :busy.sync="isBusy"
                 :fields="fields"
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
        </b-table>
        <div v-if="user.type === 'doctor'">
          <b-button @click.stop="showModal($event.target)" class="btn btn-primary" variant="primary">
            Voeg diagnose toe
          </b-button>
        </div>
        <hr>
        <b-button @click="downloadDiagnosis">
          <i class="ion-ios-cloud-download"></i> Download dossier
        </b-button>
        <b-button @click="showTestModal">
          <i class="ion-ios-cloud-download"></i> Download dossier
        </b-button>

      </div>
    </div>
  </div>
</template>

<script>
    import Loader from '../loader.vue'
    var jsonexport = require('jsonexport');
    export default {
      name: "dossier",
      props: ['patientid'],
      components: {
        'loader' : Loader,
      },
      data () {
        return {
          test: 'false',
          testMedicijnen: [],
          testhoeveelheid: '',
          testnaam: 'Medicijn',
          testNote: '',
          testSelected: '',
          filter: null,
          sortBy: 'date',
          sortDesc: false,
          fields: {
            category: {label: 'Categorie', sortable: true},
            summary: {label: 'Diagnose', sortable: true},
            date: {label: 'Datum', sortable: true},
            show_details: {label: ''},
            id: {label: 'Id', sortable: true},
          },
          testFields: {
            id: {label: 'ID', sortable: true},
            name: {label: 'Naam', sortable: true},
            stock: {label: "Op voorraad", sortable: true},
            actions: {label: ''},
          },
          isBusy: false,
          items: [],
          patient: this.patientid,
          form: {
            category: '',
            diagnose: ''
          },
          isLoading: false,
          user: this.$store.getters.user
        }
      },
      computed: {
        sortOptions () {
          // Create an options list from our fields
          return this.testFields
            .filter(f => f.sortable)
            .map(f => { return { text: f.label, value: f.key } })
        }
      },
      methods: {
        selectMedicine(object){
          console.log("hoi");
          this.testnaam = object.name;
        },
        createPrescription(){
          this.$store.dispatch('postRequest', {
            url:'medicines/order/1?quantity=1' + this.testhoeveelheid + '&patient_id=' + this.patient.user_id + '&instructions=' + this.testNote,
          })
        },
        getAge(age){
          var d = new Date(age); // The 0 there is the key, which sets the date to the epoch
          console.log(d)
          return d.toLocaleDateString()
        },
        getItems () {
          return this.items;
        },
        showModal (button) {
          this.$root.$emit('bv::show::modal', 'addDiagnoseModal', button)
        },
        showTestModal (button) {
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
        newDiagnose () {
          this.isBusy = true
          console.log(this.patient.user_id)
          this.$store.dispatch('postRequest' ,{
            url: 'patients/dossier/' + this.patient.user_id,
            body: {
              category: this.form.category,
              report: this.form.diagnose,
              date: new Date().toJSON().slice(0,10).replace(/-/g,'-')
            }
          }).then(response => {
            this.loadDiagnosis();
          })
        },
        loadDiagnosis() {
          this.$store.dispatch("getRequest", "patients/dossier/" + this.patient.user_id).then(response => {
            this.isBusy = false;
            response.forEach(function(item) {
              item.summary = item.report.substring(0, 150)
              if(item.summary.length > 150){
                item.summary = item.summary.concat('...')
              }
            });
            this.items = response
          });
        },
        downloadDiagnosis() {
          var fileName = 'dossier_' + this.patient.firstname + '_' + this.patient.lastname + '_' + new Date().toJSON().slice(0,10).replace(/-/g,'-') + '.csv';

          var csvItems = this.items.slice();
          csvItems.forEach(function(v){
            delete v.id;
            delete v._showDetails;
          });


          jsonexport(this.items, function(err, csv){
            if(err)
              return console.log(err);
            const url = window.URL.createObjectURL(new Blob([csv]));
            var link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
          });
        }
      },
      created () {
        this.isBusy = true;
        console.log("hoi");
        console.log(this.$store.getters.user)
        if(this.$store.getters.user.type == 'patient'){
          console.log('user is patient')
          this.patientid = this.$store.getters.user.user_id
        }
        this.$store.dispatch("getRequest", "patients/" + this.patientid).then(response => {
          console.log(response);
          // this.user = response;
          this.patient = response;
          this.isLoading = false;
        });
        this.$store.dispatch("getRequest", "patients/dossier/" + this.patientid).then(response => {
          this.isBusy = false;
          this.items = response;
          this.isLoading = true
        });
        this.loadDiagnosis();
        console.log("hai");
        console.log(this.user);
      },
    }
</script>

<style scoped>
</style>
