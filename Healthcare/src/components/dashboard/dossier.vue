<template>
  <div class="container-fluid" style="padding: 50px;width: 100%;">
    <div class="row">
      <div class="col-md-6">
        <div class="row">
          <div class="col text-center py-5">
            <b-img slot="aside" blank-color="#ccc" width="200px" height="200px" alt="placeholder" class="rounded-circle" src="https://lorempixel.com/1024/400/"></b-img>
          </div>
          <div class="col py-1">
            <h4>Volledige naam:</h4>
            <p>Jan van Hoofd</p>
            <hr>
            <h4>Naam:</h4>
            <p>Jan van Hoofd</p>
            <hr>
            <h4>Naam:</h4>
            <p>Jan van Hoofd</p>
            <hr>
            <h4>Naam:</h4>
            <p>Jan van Hoofd</p>
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
               :fields="fields"
                style="width: 100%;"
                >
      </b-table>
    </div>
  </div>


</template>

<script>
    export default {
        name: "dossier",
      data () {
        return {
          sortBy: 'date',
          sortDesc: false,
          fields: [
            { key: 'category', value:'Categorie'},
            { key: 'report', value: 'Rapport'},
            { key: 'date', value:'Datum', sortable: true }
          ],
          items: [
          {id: 1, category: "Rug", report: "Hevige pijn in de rug. Dit gaat gepaard met nek klachten. Afspraak met fysio word geadviseerd. En devins moeder is een hele lieve mevrouw. ik ga altijd koffie drinken bij devin.", date: new Date(2018,4,3).toLocaleDateString()},
          {id: 2, category: "Hoofd", report: "Migraine geconstateerd1", date: new Date(2018,4,4).toLocaleDateString()},
          {id: 2, category: "Hoofd", report: "Migraine geconstateerd2", date: new Date(2017,1,6).toLocaleDateString()},
            {id: 2, category: "Hoofd", report: "Migraine geconstateerd3", date: new Date(2018,4,7).toLocaleDateString()},
        ]
        }
      },
      methods: {
          getPatientData() {
            this.$store.dispatch("getRequest", "dossier" + userid).then(response => {
              console.log(response);
              items: response.body();
            });
          }
      }
    }
</script>

<style scoped>

</style>
