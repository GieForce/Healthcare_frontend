<template>
      <form id="form-list-client">
              <h1 class="tableheader">Patiënten</h1>
              <div class="pull-right">
                <button class="buttonadd" style="vertical-align:middle" v-on:click="addRow('voornaam', 'achternaam', '17-01-1998', 'M')"><span></span></button>
              </div>
              <div class="tbl-header">
              <table class="tableoverview" cellpadding="0" cellspacing="0" border="0">
                <thead>
                  <tr>
                    <th class="thoverview">Voornaam</th>
                    <th class="thoverview">Achternaam</th>
                    <th class="thoverview">Geboortedatum</th>
                    <th class="thoverview">Geslacht</th>
                    <th class="thoverview">Acties</th>
                  </tr>

                </thead>
              </table>
              <div class="tbl-content">
                <table class="tableoverview" cellpadding="0" cellspacing="0" border="0">
                  <tbody id="form-list-client-body">
                    <tr v-for="patient in patients">
                      <td class="tdoverview"><input class="form-control" v-model="patient.firstName" readonly/></td>
                      <td class="tdoverview"><input class="form-control" v-model="patient.lastName" readonly/></td>
                      <td class="tdoverview"><input class="form-control" v-model="patient.birthDate" readonly/></td>
                      <td class="tdoverview"><input class="form-control" v-model="patient.gender" readonly/></td>
                      <td class="tdoverview">
                        <a title="view this user" class="btn btn-default btn-sm "> <i style="font-size:24px" class="fa">&#xf06e;</i> </a>
                        <a title="edit this user" class="btn btn-default btn-sm ">  <i style="font-size:24px" class="fa">&#xf044;</i> </a>
                        <a title="delete this user" class="btn btn-default btn-sm ">  <i style="font-size:24px" class="fa">&#xf014;</i> </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
        </form>

</template>

<script>

export default{
  name: 'patientoverview',
  data() {
    return {
      patients: [
      {firstName: "Eduardo", lastName: "Gonzales", birthDate: "01-02-1990", gender: "M"},
      {firstName: "Susan", lastName: "Gonzales", birthDate: "19-07-1991", gender: "F"},
      {firstName: "Susan", lastName: "Gonzales", birthDate: "19-07-1991", gender: "F"},
      {firstName: "Susan", lastName: "Gonzales", birthDate: "19-07-1991", gender: "F"},
      {firstName: "Susan", lastName: "Gonzales", birthDate: "19-07-1991", gender: "F"},
      {firstName: "Susan", lastName: "Gonzales", birthDate: "19-07-1991", gender: "F"},
      {firstName: "Susan", lastName: "Gonzales", birthDate: "19-07-1991", gender: "F"},
      {firstName: "Susan", lastName: "Gonzales", birthDate: "19-07-1991", gender: "F"},
      {firstName: "Susan", lastName: "Gonzales", birthDate: "19-07-1991", gender: "F"},
      {firstName: "Susan", lastName: "Gonzales", birthDate: "19-07-1991", gender: "F"},
      {firstName: "Susan", lastName: "Gonzales", birthDate: "19-07-1991", gender: "F"},
      {firstName: "Susan", lastName: "Gonzales", birthDate: "19-07-1991", gender: "F"},
      {firstName: "Susan", lastName: "Gonzales", birthDate: "19-07-1991", gender: "F"},
      {firstName: "Susan", lastName: "Gonzales", birthDate: "19-07-1991", gender: "F"},
      {firstName: "Susan", lastName: "Gonzales", birthDate: "19-07-1991", gender: "F"},
      {firstName: "Susan", lastName: "Gonzales", birthDate: "19-07-1991", gender: "F"},
      ],
    }
  },
  methods: {
  addRow: function (voornaam, achternaam, geboortedatum, geslacht) {
           try {
               this.patients.splice(firstName, achternaam, geboortedatum, geslacht, {});
           } catch(e)
           {
               console.log(e);
           }
       }
  }
}

</script>

<style>
@import"../../assets/style/landing.css";
@import"http://fontawesome.io/assets/font-awesome/css/font-awesome.css";
@import"//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css";
@import"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
@import"https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css";
</style>
