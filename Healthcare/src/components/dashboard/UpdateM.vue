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
              <input type="text" placeholder="Naam" v-model="user.firstname" class="form-control">
            </div>
          </div>
          <div class="line"></div>
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">Achternaam</label>
            <div class="col-sm-10">
              <input type="text" placeholder="Achternaam" v-model="user.lastname" class="form-control">
            </div>
          </div>
          <div class="line"></div>
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">E-Mail</label>
            <div class="col-sm-10">
              <input type="text" placeholder="E-Mail" v-model="user.username" class="form-control">
            </div>
          </div>
      <div class="line"></div>
      <div class="form-group row">
        <label class="col-sm-2 form-control-label">Geboortedatum</label>
        <datepicker placeholder="Selecteer een Datum" ></datepicker>
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
      <button class="btn btn-secondary" v-on:click="changeCompontent('home')" style="cursor:pointer"><span>Cancel</span></button>
      <button class="btn btn-primary" style="vertical-align:middle" v-on:click="update({ name,lname,email,password })"><span>Create</span></button>
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
              firstname: this.name,
              lastname: this.lname,
              username: this.email,
              password: this.password,
            }
          }).then(() => {
            console.log('lukte')
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
