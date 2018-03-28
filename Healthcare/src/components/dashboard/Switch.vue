<template>
  <div class="dashboardContentForms">
    <form id="form-list-client">
      <h1 class="tableheader">Doctoren</h1>
      <div class="tbl-header">
        <table class="tableoverview" cellpadding="0" cellspacing="0" border="0">
          <thead>
          <tr>
            <th class="thoverview">Voornaam</th>
            <th class="thoverview">Achternaam</th>
            <th class="thoverview">E-Mail</th>
            <th class="thoverview">Leeftijd</th>
            <th class="thoverview">Geslacht</th>
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
              <td class="tdoverview"><input class="form-control" v-model="employee.username" readonly/></td>
              <td class="tdoverview"><input class="form-control" v-model="employee.age" readonly/></td>
              <td class="tdoverview"><input class="form-control" v-model="employee.sex" readonly/></td>
              <td class="tdoverview">
                <a title="edit this user" v-on:click="changeComponent('switch', patient)" class="btn btn-default btn-sm "> <i style="font-size:24px" class="fa">&#xf044;</i> </a>
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
      name: "switch",
      data() {
        return {
          employees: [],
        }
      },
      mounted() {
        this.$store.dispatch("getRequest", 'admins').then((response) => {
          this.employees = response;
          console.log(this.employees)
        });
      },

      methods: {
        changeCompontent(component) {
          this.$parent.changeComponent(component)
        }
      }
    }
</script>


