<template>
  <section class="forms">
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
      <label class="col-sm-2 form-control-label">E-Mail</label>
      <div class="col-sm-10">
        <input type="text" placeholder="E-Mail" v-model="email" v-on:keyup="checkForm" class="form-control">
      </div>
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
  </section>
</template>


<script>
  import Datepicker from "../Datepicker"

    export default {
      name: "updatem",
      props: ['user'],
      components: {
        'datepicker': Datepicker
      },

      data() {
        return {
          employees: [],
          name:'',
          lname:'',
          email:'',
          password:'',
        }
      },
      methods: {
        update() {
          this.$store.dispatch('updateRequest', {
            url:'doctors/' + this.user.user_id,
            body:{
              firstname: this.user.firstname,
              lastname: this.user.lastname,
              username: this.user.username,
              password: this.user.password,
            }
          }).then(() => {
            console.log('lukte')
          });
        },
          changeComponent (component) {
            this.$parent.changeComponent(component);
          },
        checkForm:function(e) {
          this.errors = [];
          console.log(this.firstname);
          if(!this.email || !this.password || !this.name || !this.lname || !this.birthdate || !this.street || !this.number) {
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
        mounted() {
          this.$store.dispatch("getRequest", 'admins').then((response) => {
            this.employees = response
            console.log(this.employees)
          });
        },
    }
</script>

<style scoped>

</style>
