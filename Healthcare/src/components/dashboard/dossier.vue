<template>
  <div  style="width: 100%;">
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
              <h4>Leeftijd:</h4>
              <p>{{ patient.age }}</p>
              <hr>
              <h4>Arts:</h4>
              <p>Bartje Jansen</p>
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
        <div v:if="this.$store.getters.user.type === 'doctor'">
          <b-button @click.stop="showModal($event.target)" class="btn btn-primary">
            Voeg diagnose toe
          </b-button>
        </div>
        <hr>
        <b-button @click="downloadDiagnosis">
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
          sortBy: 'date',
          sortDesc: false,
          fields: {
            category: {label: 'Categorie', sortable: true},
            summary: {label: 'Diagnose', sortable: true},
            date: {label: 'Datum', sortable: true},
            show_details: {label: ''},
          },
          isBusy: false,
          items: [],
          patient: this.patientid,
          form: {
            category: '',
            diagnose: ''
          },
          isLoading: false
        }
      },
      methods: {
        getItems () {
          return this.items;
        },
        showModal (button) {
          this.$root.$emit('bv::show::modal', 'addDiagnoseModal', button)
        },
        newDiagnose () {
          this.isBusy = true
          this.$store.dispatch('postRequest' ,{
            url: 'patients/dossier/2',
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
          this.$store.dispatch("getRequest", "patients/dossier/" + this.patientid).then(response => {
            this.isBusy = false;
            response.forEach(function(item) {
              item.summary = item.report.substring(0, 100).concat('...')
            });
            this.items = response
          });
        },
        downloadDiagnosis() {
          var fileName = 'dossier_' + this.patient.firstname + '_' + this.patient.lastname + '_' + new Date().toJSON().slice(0,10).replace(/-/g,'-') + '.csv';
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
        console.log(this.$store.getters.user)
        if(this.$store.getters.user.type == 'patient'){
          console.log('user is patient')
          this.patientid = this.$store.getters.user.userId
        }
        this.$store.dispatch("getRequest", "patients/" + this.patientid).then(response => {
          console.log(response);
          this.user = response;
          this.patient = response;
          this.isLoading = false;
        });
        this.$store.dispatch("getRequest", "patients/dossier/" + this.patientid).then(response => {
          this.isBusy = false;
          this.items = response;
          this.isLoading = true
        });
        this.loadDiagnosis();
      },
    }
</script>

<style scoped>

</style>
