<template>
<div>
<div class="login-page text-center" id= "logincheck">
  <div class="container text-center loginform">
      <div class="row">
          <div class="col"></div>
          <div class="col-xl-5">
            <div class="form-inner bordercontainerlogin">
              <a href="index.html" class="logosvg">
                <div class="text-center">
                  <img src="../../assets/img/logoZonnevelt-02.svg" alt="lock" width="250px">
                </div>
              </a>
              <hr width="100%">
              <div class="row py-3">
                <div class="col">
                  <label class="field field_type2">
                    <a>Hallo</a> <a>Naam </a> <a>registreer hier uw wachtwoord </a>
                  </label>
                </div>
            </div>
            <div class="row py-3">
              <img src="../../assets/img/lock2.0.jpg" alt="lock" width="38" height="41">
                <div class="col">
                  <label class="field field_type2" v-on:keyup="formCheck">
                    <input type="password" class="field__input" id="wachtwoord" v-model="wachtwoord" placeholder="wachtwoord">
                    <span class="field__label-wrap">
                      <span class="field__label">Voer hier uw wachtwoord in</span>
                    </span>
                  </label>
                </div>
            </div>
            <div class="row py-3">
              <img src="../../assets/img/lock2.0.jpg" alt="lock" width="38" height="41">
                <div class="col">
                  <label class="field field_type2" v-on:keyup="formCheck">
                    <input type="password" class="field__input" id="wachtwoordCheck" v-model="wachtwoordCheck" placeholder="wachtwoord">
                    <span class="field__label-wrap">
                      <span class="field__label">Herhaal uw wachtwoord</span>
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
              <!--<div class="col-md-3"></div>-->
              <div class="col">
                <div style="text-align:center">
                  <button v-bind:class="{ button: !errors.length, 'buttonGrey': errors.length }" v-on:click="register" style="vertical-align:middle"><span> Registreren </span></button>
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
    name: 'register',
    data() {
      return {
        errors: [],
        wachtwoord: null,
        wachtwoordCheck: null,
        token: this.$route.query,
      }
    },
    created (){

      this.$store.dispatch("putRequest", {
        url: 'patients/validate/' + this.$route.query.token,
        body: {

        }
      }).then(response => {
        console.log(response);
      });
    },
    methods: {
    formCheck:function(e) {
      this.errors = [];
      let password = this.wachtwoord;
      let passwordCheck = this.wachtwoordCheck;
      if(!this.wachtwoord) this.errors.push("Voer een wachtwoord in.");
      if(password !== passwordCheck) {
        this.errors.push("De twee ingevoerde wachtwoorden moeten overeen komen.");
      }
      if(!this.errors.length) return true;
      e.preventDefault();
      },
      register: function() {
        console.log('sending request with password: ' + this.wachtwoord);
        let link = "patients/activate/" + this.$route.query.token;
        this.$store.dispatch("putRequest", {
          url: link,
          body: {
            password: this.wachtwoord
          }
        }).then(response => {
          this.$router.push('login');
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
