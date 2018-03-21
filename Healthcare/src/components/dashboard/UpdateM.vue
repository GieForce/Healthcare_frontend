<template>
  <section class="forms">
    <div class="dashboardContentForms">
    <div class="container">
      <!-- Page Header-->
      <header>
        <h1 class="h3 display">Wijzigen</h1>
      </header>
    </div>
        <div class="line"></div>
        <form class="form-horizontal">
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">Naam</label>
            <div class="col-sm-10">
              <input type="text" placeholder="Naam" class="form-control">
            </div>
          </div>
          <div class="line"></div>
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">Achternaam</label>
            <div class="col-sm-10">
              <input type="text" placeholder="Achternaam" class="form-control">
            </div>
          </div>
          <div class="line"></div>
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">E-Mail</label>
            <div class="col-sm-10">
              <input type="text" placeholder="E-Mail" class="form-control">
            </div>
          </div>
          <label class="col-sm-2 form-control-label">Beroep</label>
          <div class="col-sm-10">
            <div class="i-checks">
              <input id="radioCustom1" type="radio" checked="" value="option1" name="optionsRadios" class="form-control-custom radio-custom">
              <label for="radioCustom1">Huisarts</label>
            </div>
            <div class="i-checks">
              <input id="radioCustom2" type="radio" checked="" value="option2" name="optionsRadios" class="form-control-custom radio-custom">
              <label for="radioCustom2">Receptie Medewerker</label>
            </div>
            <div class="i-checks">
              <input id="radioCustom3" type="radio" checked="" value="option3" name="optionsRadios" class="form-control-custom radio-custom">
              <label for="radioCustom3">Apotheker</label>
            </div>
          </div>
      <div class="line"></div>
      <div class="form-group row">
        <label class="col-sm-2 form-control-label">Geboortedatum</label>
        <datepicker placeholder="Selecteer een Datum"  v-model="vModelExample"></datepicker>
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
      <div class="line"></div>
      <div class="form-group row">
        <div class="col-sm-4 offset-sm-2">
          <button class="btn btn-secondary" v-on:click="changeCompontent('home')" style="cursor:pointer"><span>Cancel</span></button>
          <button class="btn btn-primary" style="vertical-align:middle" v-on:click="update({ name,lname,email,password,job,bdate,adres,})"><span>Create</span></button>
        </div>
      </div>
      </form>
    </div>
    </div>
  </section>
</template>


<script>
  import Datepicker from "../Datepicker"

    export default {
      name: "updatem",
      props: ['userId'],
      components: {
        'datepicker': Datepicker
      },

      data() {
        return {
          employees: [],
        }
      },
      methods: {
        create() {
          this.$store.dispatch("", {
            name: this.name,
            lname: this.lname,
            email: this.email,
            password: this.password,
          }).then(() => {
          });
        },
          changeComponent (component) {
            this.openComponent = component;
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
