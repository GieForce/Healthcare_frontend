<template>
<div>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Zonnevelt Huisartsen</title>
</head>
<body>
<gmap-map
  :center="{lat:52.722306, lng:6.46789}"
  :zoom="15"
  map-type-id="terrain"
  style="width: 100%; height: 450px">
  <gmap-marker
      :position="{lat:52.722306, lng:6.46789}"
      :clickable="true"
      :draggable="false"
    ></gmap-marker>    
  </gmap-map>
<div class="container-fluid py-5">
    <div class="row">
        <div class="col-md-1"></div>
        <div class="col">
            <img src="../../assets/contactPraktijk.jpg" class="img-fluid rounded"/>
        </div>
        <div class="col-md-1"></div>
        <div class="col">
            <h1 style="color:#666666;">Contactgegevens</h1>
            <hr>
            <p class="py-2 lead">Jan Loterlaan 21<br>1234 LZ Hoogeveen<br>info@zonnevelt.nl<br>0123-456789</p>
            <br>
            <p class="lead">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
        </div>
        <div class="col-md-1"></div>
    </div>
</div>
</body>
</div>
</template>

<script>

export default {

  components: {
    
  }
}
</script>

<style>
@import"../../assets/style/landing.css";
</style>






