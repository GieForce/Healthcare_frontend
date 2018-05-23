<template>
    <section class="forms">
      <div class="dashboardContentForms">
      <div class="container">
        <!-- Page Header-->
        <header>
          <h1 class="h3 display">Creëren</h1>
        </header>
      </div>
        <div class="card-body">
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
              <datepicker placeholder="Selecteer een Datum"  v-model="birthdate" v-on:click.capture="checkForm">NOTHING</datepicker>
            </div>
            <div class="line"></div>
            <div class="form-group row">
              <label class="col-sm-2 form-control-label">E-Mail</label>
              <div class="col-sm-10">
                <input type="text" placeholder="E-Mail" v-model="email" v-on:keyup="checkForm" class="form-control">
              </div>
            </div>
            <div class="line"></div>
            <div class="form-group row">
              <label class="col-sm-2 form-control-label">Beroep</label>
              <div class="col-sm-10">
                <b-container>
                  <label>
                    <select v-model="beroep">
                      <option disabled value="">Selecteer  beroep</option>
                      <option v-for="beroep in beroepen" v-bind:value="beroep">{{beroep.toString()}}
                      </option>
                    </select>
                  </label>
                </b-container>
              </div>
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
                    <input type="number" placeholder="Huisnummer" v-model="housenumber" v-on:keyup="checkForm" class="form-control">
                  </div>
                  <div class="col-md-4">
                    <input type="text" placeholder="Postcode" v-model="zipcode" v-on:keyup="checkForm" class="form-control">
                  </div>
                </div>
              </div>
            </div>
          </form>
          <p v-if="errors.length">
            <b>De volgende fouten traden op:</b>
          </p>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
          <div class="form-group row">
          <button class="btn btn-secondary" v-on:click="changeComponent('viewWerknemers')" style="cursor:pointer"><span>Cancel</span></button>
          <div v-if="!errors.length">
          <button class="btn btn-primary" style="vertical-align:middle" v-on:click="create()"><span>Create</span></button>
          </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>

    import Datepicker from "../Datepicker"

    export default {
      name: "createm",

      data(){
        return{
          errors: [],
          beroepen:["Dokter","Assistent","Apotheker"],
          name:'',
          lname:'',
          email:'',
          beroep:'',
          password:'',
          zipcode: '',
          city:'',
          housenumber: '',
          birthdate:'',
          street:'',
          number:'',

        }
      },
      components:{
        'datepicker' : Datepicker
      },
      methods: {
        create() {
          if(this.beroep.toString() === "Dokter"){
            this.$store.dispatch('postRequest', {
              url:'doctors?password=password',
              body:{
                firstname: this.name,
                lastname: this.lname,
                username: this.email,
                password: this.password,
                birthdate: this.birthdate,
                streetName: this.street,
                houseNumber: this.number,
              }
            }).then(() => {
              this.changeComponent('viewWerknemers')
            });
          }else if(this.beroep.toString() === "Assistent"){
            this.$store.dispatch('postRequest', {
              url:'doctoremployees?password=password',
              body:{
                firstname: this.name,
                lastname: this.lname,
                username: this.email,
                password: this.password,
                birthdate: this.birthdate,
                streetName: this.street,
                houseNumber: this.number,
              }
            }).then(() => {
              this.changeComponent('viewWerknemers')
            });
          }else if(this.beroep.toString() === "Apotheker"){
            this.$store.dispatch('postRequest', {
              url:'pharmacyemployees?password=password',
              body:{
                firstname: this.name,
                lastname: this.lname,
                username: this.email,
                password: this.password,
                birthdate: this.birthdate,
                streetName: this.street,
                houseNumber: this.number,
              }
            }).then(() => {
              this.changeComponent('viewWerknemers')
            });
          }
        },
        changeComponent (component) {
          this.$parent.changeComponent(component)
        },
        checkForm:function(e) {
          this.errors = [];
          console.log(this.firstname);
          if(!this.email || !this.name || !this.lname || !this.birthdate || !this.street || !this.housenumber || !this.city || !this.zipcode || !this.beroep) {
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
