<template>
  <div class="dashboardContentForms">
    <b-modal id="prescriptionDetails"
             title="Details"
             ok-title="Afhandelen"
             @ok="giveMedicine(chosenOrder)">
      <div v-if="chosenOrder" class="row" style="height: 500px;">
        <div class="col-md-6" style="border-right: 1px solid #c4bdb8">
          <h5>Patiënt</h5><br>
          <h6 class="lead">Naam:</h6>
            {{chosenOrder.patient.firstname + ' ' + chosenOrder.patient.lastname}}
          <hr>
          <h6 class="lead">Geboortedatum:</h6>
          07/04/1999
          <hr>
          <h6 class="lead">Geslacht:</h6>
          {{chosenOrder.patient.gender}}
          <hr>
          <h6 class="lead">Dokter:</h6>
          {{chosenOrder.patient.doctor.firstname + ' ' + chosenOrder.patient.doctor.lastname}}
          <hr>
        </div>
        <div class="col-md-6">
          <h5>Medicijnen</h5><br/>
          <h6 class="lead">Naam:</h6>
          {{chosenOrder.medicine.name}}
          <hr>
          <h6 class="lead">Hoeveelheid:</h6>
          {{chosenOrder.quantity}}
          <hr>
          <h6 class="lead">Instructies:</h6>
          {{chosenOrder.instructions}}
          <hr>
          <h6 class="lead">Datum van opgave:</h6>
          {{chosenOrder.date}}
          <hr>
          <h6 class="lead">Status:</h6>
          {{chosenOrder.status}}
          <hr>
        </div>
      </div>
    </b-modal>
    <b-modal id="addMedicineModal"
             title="Medicijn toevoegen"
             @ok="addMedicine()"
             ok-title="Bestellen">
          <b-form-group id="exampleInputGroup1"
                        label="Naam:"
                        label-for="exampleInput1">
            <b-form-input id="exampleInput1"
                          type="text"
                          v-model="form.name"
                          placeholder="bv. Paracetamol 500g">
            </b-form-input>
          </b-form-group>
          <b-form-group id="exampleInputGroup2"
                        label="Barcode:"
                        label-for="exampleInput2">
            <b-form-input id="exampleInput2"
                          type="text"
                          v-model="form.barcode"
                          placeholder="bv. 128489848">
            </b-form-input>
          </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Hoeveelheid per afgifte:"
                    label-for="exampleInput2">
        <NumberInputSpinner
          :min="0"
          :max="99"
          :integerOnly="true"
          v-model="form.weight"
        />
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Aantal:"
                    label-for="exampleInput2">
        <NumberInputSpinner
          :min="0"
          :max="99"
          :integerOnly="true"
          v-model="form.stock"
        />
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Prijs:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type=""
                      v-model="form.price"
                      placeholder="bv. 2.45">
        </b-form-input>
      </b-form-group>
          </b-modal>
    <b-modal id="medicineDetails"
             title="Medicine"
             ok-title="Bestellen">
      <div v-if="chosenMedicine">
        <h6 class="lead">Naam:</h6>
        {{chosenMedicine.name}}
        <hr>
        <h6 class="lead">Hoeveelheid per afgifte:</h6>
        {{chosenMedicine.weight}}
        <hr>
        <h6 class="lead">Op Voorraad:</h6>
        {{chosenMedicine.stock}}
        <hr>
        <NumberInputSpinner
          :min="0"
          :max="10"
          :integerOnly="true"
          v-model="yourVModel"
        />
      </div>
    </b-modal>
    <form id="form-list-client">
      <b-row style="height: 500px;">
        <b-col md="6">
          <h2>Orders</h2>
          <div class="table-wrapper-2">
            <b-table :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :items="orders"
                    :busy.sync="isBusy"
                    :fields="fieldsOrders"
                    style="width: 100%;"
            >
            <template slot="name" slot-scope="row">
            {{row.item.patient.firstname + ' ' + row.item.patient.lastname}}
          </template>
              <template slot="doctor" slot-scope="row">
                {{row.item.patient.doctor.firstname + ' ' + row.item.patient.doctor.lastname}}
              </template>
            <template slot="actions" slot-scope="row">
              <b-button size="sm" variant="primary" @click="showModal(row.item)">
                In wachtrij
              </b-button>
            </template>
          </b-table>
          </div>
        </b-col>
        <b-col md="6">
          <h2>Wachtrij</h2>
          <div class="table-wrapper-2">
          <b-table :sort-by.sync="sortBy"
                   :sort-desc.sync="sortDesc"
                   :items="waitingline"
                   :busy.sync="isBusy"
                   :fields="fieldsWait"
                   style="width: 100%;"
          >
            <template slot="actions" slot-scope="row">
              <b-button size="sm" variant="primary" @click="showModal">
                Afhandelen
              </b-button>
            </template>
          </b-table>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <h2>Voorraad</h2>
            <div class="" style="padding-top: 10px">
              <b-button size="sm" v-on:click="addMedicineModal()" variant="primary">
                <i class="ion-ios-plus"></i> Medicijn toevoegen
              </b-button>
            </div>
        </b-col>
        <b-col md="6" class="my-1 pull-right">
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
               :items="medicine"
               :busy.sync="isBusy"
               :fields="fields"
               :filter="filter"
               style="width: 100%;"
               @filtered="onFiltered"
      >
        <template slot="actions" slot-scope="row">
          <b-button size="sm" variant="primary" @click="showMedicine(row.item)">
            Details
          </b-button>
        </template>
      </b-table>
    </form>
  </div>
</template>

<script>
  import NumberInputSpinner from 'vue-number-input-spinner'
    export default {
      name: "Voorraad",
      data() {
        return {
          form: {
            name: '',
            barcode: '',
            weight: 0,
            stock: 0,
            price: 0
          },
          medicine: [],
          orders: [],
          waitingline: [
            {name: "Davetsdf",doctor: "S.H.H Klijsen", nr: 1},
            {name: "Davetsdf",doctor: "S.H.H Klijsen", nr: 2},
            {name: "Davetsdf",doctor: "S.H.H Klijsen", nr: 3}
          ],
          fields: {
            name: {label: 'Naam', sortable: true},
            // producer: {label: 'Producent', sortable: true},
            weight: {label: 'Hoeveelheid per afgifte', sortable: true},
            price: {label: 'Prijs', sortable: true},
            stock: {label: 'Op voorraad', sortable: true},
            // info: {label: 'Extra info'},
            actions: {label: 'Acties'}
          },
          fieldsOrders: {
            name: {label: 'Naam', sortable: true},
            doctor: {label: 'Dokter', sortable: true},
            actions: {label: 'Acties'}
          },
          fieldsWait: {
            nr: {label: 'Wachtnr.'},
            name: {label: 'Naam', sortable: true},
            actions: {label: 'Acties'}
          },
          isBusy: false,
          totalRows: 0,
          sortBy: null,
          sortDesc: false,
          filter: null,
          chosenMedicine: null,
          chosenOrder: null,
        }
      },
      created() {
        this.isBusy = true;
        this.$store.dispatch("getRequest", 'medicines').then((response) => {
          this.isBusy = false;
          this.medicine = response;
          this.totalRows = this.medicine.length
        });
        this.$store.dispatch("getRequest", 'prescriptions').then((response) => {
          this.orders = response;
          console.log(response);
        });
      },
      computed: {
        sortOptions() {
          // Create an options list from our fields
          return this.fields
            .filter(f => f.sortable)
            .map(f => {
              return {text: f.label, value: f.key}
            })
        }
      },
      methods: {
        onFiltered(filteredItems) {
          this.totalRows = filteredItems.length
        },
        showModal(order){
          this.chosenOrder = order;
          this.$root.$emit('bv::show::modal', 'prescriptionDetails')
        },
        showMedicine(medicine){
          this.chosenMedicine = medicine;
          this.$root.$emit('bv::show::modal', 'medicineDetails')
        },
        addMedicineModal(){
          this.$root.$emit('bv::show::modal','addMedicineModal')
        },
        addMedicine(){
          this.$store.dispatch('postRequest', {
            url:'medicines/1',
            body:{
              name: this.form.name,
              barcode: this.form.barcode,
              weight: this.form.weight,
              stock: this.form.stock,
              price: this.form.price,
            }
          }).then(() => {
          this.$store.dispatch(("getRequest", 'medicines').then((response) => {
            this.isBusy = false;
                this.medicine = response;
                this.totalRows = this.medicine.length
          }))})
        },
        giveMedicine(order){
          console.log(order);
          this.$store.dispatch("postRequest", {
            url: 'prescriptions/' + order.id,
            body:{

            }
          }).then(() => {
            this.$store.dispatch("getRequest", 'prescriptions').then((response) => {
              this.orders = response;
              console.log(response);
            });
          })
        }
      },
      components: {
        NumberInputSpinner,
      },
    }
</script>

<style scoped>
  .table-wrapper-2 {
    display: block;
    max-height: 450px;
    overflow-y: auto;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }
</style>
