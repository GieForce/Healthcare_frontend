<template>
<div>
<head>
<!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Zonnevelt Huisartsen</title>
</head>
<nav class="navbar navbar-expand-lg sticky-top navbar-light bg-light bordernavbar">
    <a class="navbar-brand logosvg" href="index.html">
        <img src="../../assets/logoZonnevelt-02.svg" alt="" height="55px">
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li class="nav-item linkani">
                <a class="nav-link" href="/medewerkers">Medewerkers</a>
            </li>
            <li class="nav-item linkani">
                <a class="nav-link" href="/contactgegevens">Contactgegevens</a>
            </li>
            <li class="nav-item linkani">
                <a class="nav-link" href="#">Spoedgeval</a>
            </li>
            <li class="nav-item"><a href="/login" style="text-decoration: none; color: #FFF;"><button class="btn my-2 my-sm-0 buttonnav"><span>Inloggen</span></button></a> </li>
        </ul>
    </div>
</nav>
<div>
    <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                img-width="1024"
                img-height="480"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
    >

      <!-- Text slides with image -->
      <b-carousel-slide :img-src="require('../../assets/ousa-chea-552189-unsplash.jpeg')">
      </b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide :img-src="require('../../assets/dan-gold-220226-unsplash.jpeg')">
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide :img-src="require('../../assets/jesse-orrico-60373-unsplash.jpeg')">
      </b-carousel-slide>
    </b-carousel>
  </div>
<div class="container-fluid py-5">
    <div class="row">
        <div class="col-md-2"></div>
        <div class="col">
            <h1 style="color:#666666;">Lorem ipsum</h1>
            <hr>
            <p class="lead">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. </p>
        </div>
        <div class="col-md-2"></div>
</div>
    <div class="row">
            <div class="col-md-2"></div>
            <div class="col">
                <h1 style="color:#666666;">Lorem ipsum</h1>
                <hr>
                <p class="lead">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. </p>
            </div>
            <div class="col-md-2"></div>
    </div>
    <div class="row">
        <div class="col-md-2"></div>
        <div class="col">
            <h1 style="color:#666666;">Lorem ipsum</h1>
            <hr>
            <p class="lead">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. </p>
        </div>
        <div class="col-md-2"></div>
    </div>
</div>
<footer class="footer" >
    <div class="container py-5">
        <div class="row">
            <div class="col-md-3">
                <img src="../../assets/logoZonnevelt-02.svg" alt="" width="80%">
                <h6 style="color: #FFF; margin-top:30px;">Spoednummer:</h6>
                <h3 style="color: #4ec7dc;">0987-654321</h3>
            </div>
            <div class="col-md-3">
                <h4 style="color: #FFF;">Contact</h4>
                <p class="py-2" style="color:#FFF;">Jan Loterlaan 21<br>1234 LZ Hoogeveen<br>info@zonnevelt.nl<br>0123-456789</p>
            </div>
            <div class="col-md-3">
                <h4 style="color: #FFF;">Links</h4>
                <div class="footerLinks">
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="medewerkers.html">Medewerkers</a></li>
                        <li><a href="contactgegevens.html">Contact</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul></div>
            </div>
            <div class="col-md-3">
                <h4 style="color: #FFF;">Openingstijden</h4>
                <p class="py-2" style="color:#FFF;">Ma - Do&emsp;08:00 - 16:00<br>Vr&emsp;09:00 - 17:00<br>Za&emsp;13:00 - 16:00<br>Zo&emsp;Gesloten</p>
            </div>

        </div>
    </div>
</footer>
</div>
</template>

<style>
@import"../../assets/style/landing.css";
</style>

<script>
export default {


  data () {
    return {
      slide: 0,
      sliding: null,
      image1: image
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>