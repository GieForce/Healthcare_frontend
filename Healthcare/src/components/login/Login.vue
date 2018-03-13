<template>
<div>
<meta charset="utf-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
<meta name="viewport" content="width=device-width, initial-scale=1">
  <div class="login-page text-center id=logincheck">
    <div class="container text-center loginform">
        <div class="row">

            <div class="col"></div>
            <div class="col-xl-5">
              <div class="form-inner bordercontainerlogin">
                <div v-if="isLoading" > <loader> </loader> </div>
                <div v-if="!isLoading">
                <a href="index.html" class="logosvg">
                  <div class="text-center">
                    <img src="../../assets/logoZonnevelt-02.svg" alt="lock" width="250px">
                  </div>
                </a>
                <hr width="100%">
                <div class="row">
                  <i style="font-size:24px" class="fa">&#xf003;</i>
                  <div class="col">
                    <label class="field field_type3">
                      <input class="field__input" id="email" v-model="email" placeholder="bv. Jan.hermans@hotmail.com">
                        <span class="field__label-wrap">
                          <span class="field__label">Email</span>
                        </span>
                    </label>
                  </div>
              </div>
              <div class="row py-3">
                <img src="../../assets/lock2.0.jpg" alt="lock" width="25" height="25">
                  <div class="col">
                    <label class="field field_type2">
                      <input type="password" class="field__input" id="password" v-model="password" placeholder="wachtwoord">
                      <span class="field__label-wrap">
                        <span class="field__label">Wachtwoord</span>
                      </span>
                    </label>
                  </div>
              </div>
              <div class="row">
                <div class="col" style="padding-top: .35rem">
                  <div class="form-check mb-2 mr-sm-2 mb-sm-0, text-center">
                    <label class="form-check-label">
                      <input class="form-check-input" name="remember"type="checkbox">
                      <span style="padding-bottom: .15rem">Remember me</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="row" style="padding-top: 1rem">
                <div class="col">
                  <div style="text-align:center">
                    <button class="button" style="vertical-align:middle" v-on:click="login({ email, password })"><span>Inloggen </span></button>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
            <div class="col"></div>

          </div>
          </div>
          </div>
  </div>
</div>
</template>

<script>

  import Loader from '../loader.vue'
  import axios from 'axios'

  export default{
    name: 'login',
    data() {
      return {
        email: '',
        password: '',
      }
    },
    computed: {
      isLoading () {
          return this.$store.getters.isPending;
      }
    },
    methods: {
      login() {
        this.$store.dispatch("login", {
          email: this.email,
          password: this.password,
        }).then(() => {
          this.$store.dispatch("getRequest", "patients").then(response => {
            console.log(response)
          })
        });
      }
    },
    components: {
      'loader': Loader
    }
  }


</script>
<style>
@import"../../assets/style/landing.css";
@import"https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css";
</style>
