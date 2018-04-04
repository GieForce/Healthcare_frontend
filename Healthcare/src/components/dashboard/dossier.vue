<template>
  <div  style="width: 100%;">
    <div class="loader" v-if="isBusy" ><loader></loader></div>
    <div v-if="!isBusy">
      <div class="row">
        <div class="col-md-6">
          <div class="row">
            <div class="col text-center py-5">
              <b-img slot="aside" blank-color="#ccc" width="200px" height="200px" alt="placeholder" class="rounded-circle" src="https://studiomango.nl/wp-content/uploads/2014/10/team-profile-picture_minko.jpg"></b-img>
            </div>
            <div class="col py-1">
              <h4>Volledige naam:</h4>
              <p>{{ user.firstname + ' ' + user.lastname }}</p>
              <hr>
              <h4>Mail:</h4>
              <p>{{ user.username }}</p>
              <hr>
              <h4>Leeftijd:</h4>
              <p>{{ user.age }}</p>
              <hr>
              <h4>Arts:</h4>
              <p>Bartje Jansen</p>
            </div>
          </div>
        </div>
      <div class="col-md-6">
      </div>
      </div>
      <div class="row">
        <b-table :sort-by.sync="sortBy"
                 :sort-desc.sync="sortDesc"
                 :items="items"
                 :busy.sync="isBusy"
                 :fields="fields"
                  style="width: 100%;"
                  >
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>

    import Loader from '../loader.vue'

    export default {
      name: "dossier",
      props: ['userId'],
      components: {
        'loader' : Loader,
      },
      data () {
        return {
          sortBy: 'date',
          sortDesc: false,
          fields: {
            category: {label: 'Categorie', sortable: true},
            report: {label: 'Diagnose', sortable: true},
            date: {label: 'Datum', sortable: true},
          },
          isBusy: false,
          items: [],
          user: '',
        }
      },
      created () {
        console.log(this.userId);
        this.isBusy = true;
        console.log(this.$store.getters.user)
        if(this.$store.getters.user.type == 'patient'){
          console.log('user is patient')
          this.userId = this.$store.getters.user.userId
        }
        this.$store.dispatch("getRequest", "patients/" + this.userId).then(response => {
          console.log(response);
          this.user = response;
        });
        this.$store.dispatch("getRequest", "patients/dossier/" + this.userId).then(response => {
          this.isBusy = false;
          this.items = response;
        });
      },
      methods: {
        getItems () {

        }
      }
    }
</script>

<style scoped>

</style>
