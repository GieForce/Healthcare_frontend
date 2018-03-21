<template>
  <div class="dashboardContent">
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
          <th class="thoverview">Afdeling</th>
          <th class="thoverview">Acties</th>
        </tr>

        </thead>
      </table>
      <div class="tbl-content">
        <table class="tableoverview" cellpadding="0" cellspacing="0" border="0">
          <tbody id="form-list-client-body">
          <tr v-for="employee in employees">
            <td class="tdoverview"><input class="form-control" v-model="employee.firstname" readonly/></td>
            <td class="tdoverview"><input class="form-control" v-model="employee.surname" readonly/></td>
            <td class="tdoverview"><input class="form-control" v-model="employee.department" readonly/></td>
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
  </div>

</template>

<script>

  export default{
    name: 'employeeOverview',
    data() {
      return {
        employees: [],
      }
    },
    mounted() {
      this.$store.dispatch("getRequest", 'employees').then((response) => {
        this.employees = response
        console.log(this.employees)
      });
    },
    methods: {
      addRow: function (voornaam, achternaam, geboortedatum, geslacht) {
        try {
          this.employees.splice(firstName, achternaam, geboortedatum, geslacht, {});
        } catch (e) {
          console.log(e);
        }
      },

      changeComponent (component) {
        this.openComponent = component;
      }
    }
  }

</script>

<style>

</style>
