<template>
  <section class="forms">
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
            <datepicker placeholder="Selecteer een Datum"  v-model="birthdate" v-on:click.capture="checkForm"></datepicker>
          </div>
          <div class="line"></div>
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">Geslacht</label>
            <select v-model="geslacht">
              <option v-for="option in options" v-bind:value="option.value">
                {{ option.text }}
              </option>
            </select>
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
    </p>
    <div class="form-group row">
      <button class="btn btn-secondary" v-on:click="changeComponent('viewPatients')" style="cursor:pointer"><span>Cancel</span></button>
      <div v-if="!errors.length">
        <button class="btn btn-primary" style="vertical-align:middle" v-on:click="update({ name,lname,email,password})"><span>Create</span></button>
      </div>
    </div>
  </section>
</template>


<script>
  import Datepicker from "../Datepicker"

  export default {
    name: "updatep",
    props: ['userId'],
    components:{
      'datepicker' : Datepicker
    },

    data(){
      return{
        errors: [],
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
        ]
      }
    },
    methods: {
      update(){
        console.log(this.birthdate);
        this.$store.dispatch('postRequest', {
          url:'update/' + this.user.user_id,
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
          this.changeComponent("viewpat")
        });
      },
      changeComponent (component) {
        this.$parent.changeComponent(component);
      },
      checkForm:function(e) {
        console.log(this.name);
        console.log(this.lname);
        console.log(this.birthdate);
        console.log(this.street);
        console.log(this.number);
        console.log(this.geslacht);
        console.log(this.postcode);
        console.log(this.city);
        this.errors = [];
        console.log(this.firstname);
        if(!this.email || !this.name || !this.lname || !this.birthdate || !this.street || !this.number || !this.geslacht || !this.postcode || !this.city) {
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
    created(){
      this.$store.dispatch()
    }

  }

</script>

<style scoped>

</style>
