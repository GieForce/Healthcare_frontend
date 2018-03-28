<template>
  <div class="dashboardContentForms">
  <form id="form-list-client">
    <h1 class="tableheader">Patiënten</h1>
    <div class="pull-right">
      <a v-on:click="changeComponent('createPatients')" style="cursor:pointer"> <i class="ion-ios-plus"></i> Patient Aanmaken</a>
    </div>
    <div class="tbl-header">
      <table class="tableoverview" cellpadding="0" cellspacing="0" border="0">
        <thead>
        <tr>
          <th class="thoverview">Voornaam</th>
          <th class="thoverview">Achternaam</th>
          <th class="thoverview">Leeftijd</th>
          <th class="thoverview">Geslacht</th>
          <th class="thoverview">Acties</th>
        </tr>

        </thead>
      </table>
      <div class="tbl-content">
        <table class="tableoverview" cellpadding="0" cellspacing="0" border="0">
          <tbody id="form-list-client-body">
          <tr v-for="patient in patients">
            <td class="tdoverview">
              <input class="form-control" v-model="patient.firstname" readonly/>
            </td>
            <td class="tdoverview">
              <input class="form-control" v-model="patient.lastname" readonly/>
            </td>
            <td class="tdoverview">
              <input class="form-control" v-model="patient.age" readonly/>
            </td>
            <td class="tdoverview">
              <input class="form-control" v-model="patient.gender" readonly/>
            </td>
            <td class="tdoverview">
              <a title="view this user" v-on:click="changeComponent('personalDossier', patient)" class="btn btn-default btn-sm "> <i style="font-size:24px" class="fa">&#xf06e;</i> </a>
              <a title="edit this user" class="btn btn-default btn-sm "> <i style="font-size:24px" class="fa">&#xf044;</i> </a>
              <a title="delete this user" class="btn btn-default btn-sm "> <i style="font-size:24px" class="fa">&#xf014;</i> </a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </form>
 </div>
</template>

<script>

  export default {
    name: 'patientoverview',
    data() {
      return {
        patients: [],
      }
    },
    mounted() {
      this.$store.dispatch("getRequest", 'patients').then((response) => {
        this.patients = response
      });
    },
    methods: {
      addRow: function(voornaam, achternaam, geboortedatum, geslacht) {
        try {
          this.patients.splice(firstName, achternaam, geboortedatum, geslacht, {});
        } catch (e) {
          console.log(e);
        }
      },
      changeComponent (component) {
        this.$parent.changeComponent(component);
      },
      changeComponent (component, patient) {
        this.$parent.changeComponent(component, patient);
      }
    }
  }

</script>

<style>

</style>
