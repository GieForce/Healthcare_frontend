<template>
<div>
<body>
<vnavbar></vnavbar>
<img src="../../assets/Huisartsen_4469.jpg" width="100%" height="450px" class="img-fluid"/>
<div class="container-fluid py-5">
    <div class="row" style="height: 250px">
    <div class="col-md-1"></div>
    <div class="col bordernavbar medewerkerprofile">
        <div class="row">

        </div>
    </div>
    <div class="col-md-1"></div>
    </div>
    <div class="row" style="height: 250px"></div>
    <div class="row" style="height: 250px"></div>
    <div class="row" style="height: 250px"></div>
</div>
<vfooter></vfooter>
</body>
</div>
</template>

<script>
import vnavbar from './v-navbar.vue'
import vfooter from './v-footer.vue'

export default {

  components: {
    vnavbar,
    vfooter
  }
}
</script>

<style>
@import"../../assets/style/landing.css";
</style>
