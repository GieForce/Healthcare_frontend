<template>
  <div class="dashboardContent">
    <h1 class="tableheader">Werknemers</h1>
    <div class="tbl-header">
    <div class="pull-right">
      <a v-on:click="changeComponent('createWerknemer')" style="cursor:pointer"> <i class="ion-ios-plus"></i> Werknemer Aanmaken</a>
    </div>      <table class="tableoverview" cellpadding="0" cellspacing="0" border="0">
        <thead>
        <tr>
          <th class="thoverview">Voornaam</th>
          <th class="thoverview">Achternaam</th>
          <th class="thoverview">Afdeling</th>
          <th class="thoverview">Email</th>
          <th class="thoverview">Acties</th>
        </tr>

        </thead>
      </table>
      <div class="tbl-content">
        <table class="tableoverview" cellpadding="0" cellspacing="0" border="0">
          <tbody id="form-list-client-body">
          <tr v-for="employee in employees">
            <td class="tdoverview"><input class="form-control" v-model="employee.firstname" readonly/></td>
            <td class="tdoverview"><input class="form-control" v-model="employee.lastname" readonly/></td>
            <td class="tdoverview"><input class="form-control" v-model="employee.type" readonly/></td>
            <td class="tdoverview"><input class="form-control" v-model="employee.username" readonly/></td>
            <td class="tdoverview">
              <button title="view this user" class="btn btn-default btn-sm "> <i style="font-size:24px" class="fa">&#xf06e;</i> </button>
              <button title="edit this user" class="btn btn-default btn-sm " v-on:click="changeComponent('updateWerknemer', employee)">  <i style="font-size:24px" class="fa">&#xf044;</i> </button>
              <button title="delete this user" class="btn btn-default btn-sm ">  <i style="font-size:24px" class="fa">&#xf014;</i> </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
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
      this.$store.dispatch("getRequest", 'admins').then((response) => {
        this.employees = response
        console.log(this.employees)
      });
    },
    methods: {
      changeComponent (component) {
        this.$parent.changeComponent(component);
      },
      changeComponent (component, employee) {
        this.$parent.changeComponent(component, employee);
      }
    },
  }

</script>
