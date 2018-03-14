<template>
<div class="sidebarClasses">
    <div class="sidebar-wrapper" id="style-3">
      <div v-for="page of pages">
        <div class="sidebar-link">
          {{ page.pageName }}
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
   data () {
    return {
      pages: [
        { pageName: 'Home' },
        { pageName: 'Medewerkers' },
        { pageName: 'Patienten' }
      ]
    }
  },
  components: {
    
  }
}
</script>

<style>
@import"../../assets/style/landing.css";
</style>
