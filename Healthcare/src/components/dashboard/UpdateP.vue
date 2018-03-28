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
        <div class="form-group row">
          <label class="col-sm-2 form-control-label">Selecteer Patient</label>
          <div class="col-sm-10 mb-3">
            <select name="account" class="form-control">
              <option>Patient 1</option>
              <option>Patient 2</option>
              <option>Patient 3</option>
              <option>Patient 4</option>
            </select>
          </div>
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
          <div class="line"></div>
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">Geboortedatum</label>
            <datepicker placeholder="Selecteer een Datum"  v-model="vModelExample">datepicker</datepicker>
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

            </div>
          </div>
        </form>
      </div>
    </div>
    <button class="btn btn-secondary" v-on:click="changeCompontent('viewPatients')" style="cursor:pointer"><span>Cancel</span></button>
    <button class="btn btn-primary" style="vertical-align:middle" v-on:click="update({ name,lname,email,password,job,bdate,adres,})"><span>Wijzig</span></button>
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

      }
    },
    update() {
      this.$store.dispatch("update", {
        name: this.name,
        lname: this.lname,
        email: this.email,
        password: this.password,
        job: this.job,
        bdate: this.bdate,
        adres: this.adres
      }).then(() => {
      });
    }
  }

</script>

<style scoped>

</style>
