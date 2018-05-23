<template>
  <section class="forms">
    <div class="loader" v-if="isBusy" ></div>
    <div v-if="!isBusy">
    <div class="dashboardContentForms">
      <div class="container">
        <!-- Page Header-->
        <header>
          <h1 class="h3 display">Wijzigen</h1>
        </header>
      </div>
      <div class="card-body">
        <div class="line"></div>
        <form class="form-horizontal">
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">Naam</label>
            <div class="col-sm-10">
              <input type="text" placeholder="Naam" v-model="name" v-on:keyup="checkForm" class="form-control">
            </div>
          </div>
          <div class="line"></div>
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">Achternaam</label>
            <div class="col-sm-10">
              <input type="text" placeholder="Achternaam" v-model="lname" v-on:keyup="checkForm" class="form-control">
            </div>
          </div>
          <div class="line"></div>
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">Geboortedatum</label>
            <datepicker placeholder="Selecteer een Datum"  v-model="birthdate" v-on:change="checkForm">NOTHING</datepicker>
          </div>
          <div class="line"></div>
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">Geslacht</label>
            <label>
              <select v-model="geslacht">
                <option v-for="option in options" v-bind:value="option.value">
                  {{ option.text }}
                </option>
              </select>
            </label>
          </div>
          <div class="line"></div>
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">Adres</label>
            <div class="col-sm-10">
              <div class="row">
                <div class="col-md-4">
                  <input type="text" placeholder="Plaats" v-model="city" v-on:keyup="checkForm" class="form-control">
                </div>
                <div class="col-md-4">
                  <input type="text" placeholder="Straat" v-model="street" v-on:keyup="checkForm" class="form-control">
                </div>
                <div class="col-md-3">
                  <input type="number" placeholder="Huisnummer" v-model="housenumber" v-on:change="checkForm" class="form-control">
                </div>
                <div class="col-md-4">
                  <input type="text" placeholder="Postcode" v-model="zipcode" v-on:keyup="checkForm" class="form-control">
                </div>
              </div>
            </div>
          </div>
          <div class="line"></div>
          <div class="form-group row">
            <div class="col-sm-4 offset-sm-2">

            </div>
          </div>
        </form>
      </div>
    </div>
    <p v-if="errors.length">
      <b>De volgende fouten traden op:</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    <div class="form-group row">
      <button class="btn btn-secondary" v-on:click="changeComponent('viewPatients')" style="cursor:pointer"><span>Cancel</span></button>
      <div v-if="!errors.length">
        <button class="btn btn-primary" style="vertical-align:middle" v-on:click="update()"><span>Edit</span></button>
      </div>
    </div>
    </div>
  </section>
</template>



<script>
  import Datepicker from "../Datepicker"
  import Loader from '../loader.vue'

  export default {
    name: "updatep",
    props: ['patientId'],
    components:{
      'loader' : Loader,
      'datepicker' : Datepicker
    },

    data(){
      return{
        errors: [],
        isBusy: false,
        patient: this.patientId,
        name:'',
        lname:'',
        birthdate:'',
        email:'',
        street:'',
        housenumber:'',
        geslacht:'Man',
        city:'',
        zipcode:'',
        options: [
          { text: 'Man', value: 'Man' },
          { text: 'Vrouw', value: 'Vrouw' }
        ],
        user: this.$store.getters.user
      }
    },
    created () {
      this.isBusy = true;
      this.$store.dispatch("getRequest", "patients/" + this.patient.user_id).then(response => {
        this.patient = response;
        this.name = this.patient.firstname;
        this.lname = this.patient.lastname;
        this.birthdate = this.patient.age;
        this.email = this.patient.username;
        this.street = this.patient.street;
        this.housenumber = this.patient.housenumber;
        this.geslacht = this.patient.gender;
        this.city = this.patient.city;
        this.zipcode = this.patient.zipcode;
        this.isBusy = false;
      });
    },
    methods: {
      update(){
        this.$store.dispatch('postRequest', {
          url:'patients/update/' + this.patient.user_id,
          body: {
            firstname: this.name,
            lastname: this.lname,
            age: this.birthdate,
            username: this.email,
            street: this.street,
            housenumber: this.housenumber,
            zipcode: this.zipcode,
            city: this.city,
            gender: this.geslacht
          }
        }).then(() => {
          this.changeComponent("viewPatients")
        });
      },
      changeComponent (component) {
        this.$parent.changeComponent(component);
      },
      checkForm:function(e) {
        this.errors = [];
        if(!this.email || !this.name || !this.lname || !this.birthdate || !this.street || !this.housenumber || !this.geslacht || !this.zipcode || !this.city) {
          this.errors.push("Alle velden moeten ingevoerd worden");
        } else if(!this.validEmail(this.email)) {
          this.errors.push("Voer een geldig E-mail adres in");
        }
        if(!this.errors.length) return true;
        e.preventDefault();

      },
      validEmail:function(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
    },

  }

</script>

<style scoped>

</style>
