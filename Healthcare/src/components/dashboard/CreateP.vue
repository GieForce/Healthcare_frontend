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
              <input type="text" placeholder="Naam" v-model="name" class="form-control">
            </div>
          </div>
          <div class="line"></div>
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">Achternaam</label>
            <div class="col-sm-10">
              <input type="text" placeholder="Achternaam" v-model="lname" class="form-control">
            </div>
          </div>
          <div class="line"></div>
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">Leeftijd</label>
            <div class="col-sm-10">
              <input type="text" placeholder="Leeftijd"  class="form-control">
            </div>
          </div>
          <div class="line"></div>
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">E-Mail</label>
            <div class="col-sm-10">
              <input type="text" placeholder="E-Mail" v-model="email" class="form-control">
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
              <button class="btn btn-primary" style="vertical-align:middle" v-on:click="create({ name,lname,email,password})"><span>Create</span></button>
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
    name: "createp",

    data(){
      return{
        name:'',
        lname:'',
        email:'',
      }
    },
    components:{
      'datepicker' : Datepicker
    },
    methods: {
      create() {
        this.$store.dispatch("postRequest", {
          url:'patients',
          body:{
            firstname: this.name,
            surname: this.lname,
            username: this.email,
          }
        }).then(() => {

        });
      },
      changeCompontent (component) {
        this.$parent.changeComponent(component)
      }
    },
  }
</script>

<style scoped>

</style>
