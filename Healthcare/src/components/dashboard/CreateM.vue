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
                <input type="text" placeholder="Naam" v-model="name" v-on:keyup="formCheck" class="form-control">
            </div>
            </div>
            <div class="line"></div>
            <div class="form-group row">
              <label class="col-sm-2 form-control-label">Achternaam</label>
              <div class="col-sm-10">
                <input type="text" placeholder="Achternaam" v-model="lname" v-on:keyup="formCheck" class="form-control">
              </div>
            </div>
            <div class="line"></div>
            <div class="form-group row">
              <label class="col-sm-2 form-control-label">Leeftijd</label>
              <div class="col-sm-10">
                <input type="text" placeholder="Leeftijd" class="form-control">
              </div>
            </div>
            <div class="line"></div>
            <div class="form-group row">
              <label class="col-sm-2 form-control-label">E-Mail</label>
              <div class="col-sm-10">
                <input type="text" placeholder="E-Mail" v-model="email" v-on:keyup="formCheck" class="form-control">
              </div>
            </div>
            <div class="line"></div>
            <div class="form-group row">
              <label class="col-sm-2 form-control-label">Wachtwoord</label>
              <div class="col-sm-10">
                <input type="text" placeholder="Wachtwoord" v-model="password" v-on:keyup="formCheck" class="form-control">
              </div>
            </div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="form-group row">
              <label class="col-sm-2 form-control-label">Geboortedatum</label>
                <datepicker placeholder="Selecteer een Datum"  v-model="birthdate"></datepicker>
            </div>
            <div class="line"></div>
            <div class="form-group row">
              <label class="col-sm-2 form-control-label">Adres</label>
              <div class="col-sm-10">
                <div class="row">
                  <div class="col-md-4">
                    <input type="text" placeholder="Straat" class="form-control">
                  </div>
                  <div class="col-md-3">
                    <input type="text" placeholder="Huisnummer" class="form-control">
                  </div>
                </div>
              </div>
            </div>
          </form>
          <p v-if="errors.length">
            <b>De volgende fouten traden op:</b>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
          </p>
          <button class="btn btn-secondary" v-on:click="changeComponent('viewWerknemers')" style="cursor:pointer"><span>Cancel</span></button>
          <button class="btn btn-primary" style="vertical-align:middle" v-on:click="create({ name,lname,email,password})"><span>Create</span></button>
        </div>
      </div>
    </section>
</template>

<script>
    import Home from './Home.vue'
    import Datepicker from "../Datepicker"

    export default {
      name: "createm",

      data(){
        return{
          errors: [],
          name:'',
          lname:'',
          email:'',
          password:'',
          birthdate:'',

        }
      },
      components:{
        'datepicker' : Datepicker
      },
      methods: {
        create() {
          this.$store.dispatch('postRequest', {
            url:'doctors',
            body:{
              firstname: this.name,
              lastname: this.lname,
              username: this.email,
              password: this.password,
              birthdate: this.birthdate,
            }
          }).then(() => {
            this.changeComponent('viewWerknemers')
          });
        },
        changeComponent (component) {
          this.$parent.changeComponent(component)
        },
        checkForm:function(e) {
          this.errors = [];
          console.log(this.errors);
          if(!this.email || !this.password || !this.name || !this.lname || !this.birthdate) {
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
