<template>
  <div id="app">
    <app-nav></app-nav>
    <div class="container app-content">
      <router-view></router-view>
    </div>
    <app-footer></app-footer>
  </div>

</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>