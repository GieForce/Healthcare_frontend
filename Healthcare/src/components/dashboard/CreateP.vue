<template>
  <section class="forms">
    <div class="dashboardContentForms">
      <div class="container">
        <!-- Page Header-->
        <header>
          <h1 class="h3 display">Creëren            </h1>
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
            <datepicker placeholder="Selecteer een Datum"  v-model="birthdate" v-on:click.capture="checkForm"></datepicker>
          </div>
          <div class="line"></div>
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">Wachtwoord</label>
            <div class="col-sm-10">
              <input type="text" placeholder="Wachtwoord" v-model="password" v-on:keyup="checkForm" class="form-control">
            </div>
          </div>
          <div class="line"></div>
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">Adres</label>
            <div class="col-sm-10">
              <div class="row">
                <div class="col-md-4">
                  <input type="text" placeholder="Straat" v-model="street" v-on:keyup="checkForm" class="form-control">
                </div>
                <div class="col-md-3">
                  <input type="number" placeholder="Huisnummer" v-model="number" v-on:keyup="checkForm" class="form-control">
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
        <p v-if="errors.length">
          <b>De volgende fouten traden op:</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
        </p>
        <div class="form-group row">
          <button class="btn btn-secondary" v-on:click="changeComponent('viewPatients')" style="cursor:pointer"><span>Cancel</span></button>
          <div v-if="!errors.length">
            <button class="btn btn-primary" style="vertical-align:middle" v-on:click="create({ name,lname,email,password})"><span>Create</span></button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Datepicker from "../Datepicker"

  export default {
    name: "createp",

    data(){
      return{
        name:'',
        lname:'',
        email:'',
        birthdate:'',
        password:'',
      }
    },
    components:{
      'datepicker' : Datepicker
    },
    methods: {
      create() {
        this.$store.dispatch('postRequest', {
          url:'patients',
          body:{
            firstname: this.name,
            lastname: this.lname,
            username: this.email,
            age: this.leeftijd,
          }
        }).then(() => {
          this.changeComponent('viewPatients');
        });
      },
      changeComponent (component) {
        this.$parent.changeComponent(component)
      },
      checkForm:function(e) {
        this.errors = [];
        console.log(this.firstname);
        if(!this.email || !this.name || !this.lname || !this.birthdate || !this.street || !this.number) {
          this.errors.push("Alle velden moeten ingevoerd worden");
        } else if(!this.validEmail(this.email)) {
          this.errors.push("Voer een geldig E-mail adres in");
        }
        if(!this.errors.length) return true;
        e.preventDefault();

      },
      validEmail:function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
    },
  }
</script>

<style scoped>

</style>
