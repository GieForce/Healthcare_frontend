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
                <div v-if="isLoading" > <loader></loader> </div>
                <div v-if="!isLoading && !isLoggedIn">
                  <div class="text-center">
                    <img src="../../assets/img/logoZonnevelt-02.svg" alt="lock" width="250px" style="padding-bottom:60px">
                  </div>
                <div class="row">
                  <div class="col-md-1" align="center"><i class="ion-android-mail" style="font-size:22px; color:#B5B5B5; text-align:center"></i></div>
                  <div class="col">
                    <label class="field field_type3">
                      <input class="field__input" id="email" v-on:keyup.enter="login()" v-on:keyup="checkForm" v-model="email" placeholder="mail@provider.nl">
                        <span class="field__label-wrap">
                          <span class="field__label">Email</span>
                        </span>
                    </label>
                  </div>
              </div>
              <div class="row py-3">
                  <div class="col-md-1" align="center" style="text-align:center;"><i class="ion-android-lock" style="font-size:22px; color:#B5B5B5; text-align:center"></i></div>
                  <div class="col">
                    <label class="field field_type2">
                      <input type="password" class="field__input" id="password" v-on:keyup.enter="login()" v-on:keyup="checkForm" v-model="password" placeholder="****************">
                      <span class="field__label-wrap">
                        <span class="field__label">Wachtwoord</span>
                      </span>
                    </label>
                  </div>
              </div>
                  <p v-if="errors.length">
                    <b>De volgende fouten traden op:</b>
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
              <div class="row" style="padding-top: 1rem">
                <div class="col">
                  <div style="text-align:center">
                    <button class="button" style="vertical-align:middle" v-on:click="login()"><span>Inloggen</span></button>
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
</template>

<script>

  import Loader from '../loader.vue'


  export default{
    name: 'login',
    data() {
      return {
        email: '',
        password: '',
        errors: [],
      }
    },
    computed: {
      isLoading () {
          return this.$store.getters.isPending;
      },
      isLoggedIn () {
          return this.$store.getters.isLoggedIn;
      }
    },
    created () {
      if(this.$store.getters.isLoggedIn){
        this.$router.push('/dashboard')
      }
    },
    methods: {
      login() {
          this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          }).then(response => {
            this.$router.push('dashboard');
            this.errors.push("Incorrect wachtwoord of E-mail adres")
          }).catch(error => {
            this.errors.push("Incorrect wachtwoord of E-mail adres");
          });
      },
      checkForm:function(e) {
        this.errors = [];
        if(!this.password) this.errors.push("Voer een wachtwoord in");
        if(!this.email) {
          this.errors.push("Voer een E-mail adres in");
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
    components: {
      'loader': Loader
    }
  }


</script>
<style>
@import"../../assets/style/landing.css";
@import"https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css";
@import"../../assets/icons-reference/ionicons.css";

</style>
