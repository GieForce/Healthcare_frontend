<template>
<div>
<head>
<!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Zonnevelt Huisartsen</title>
</head>
<vnavbar> </vnavbar>
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
            {{ message }}
            <hr>
            <p class="lead">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. </p>
        </div>
        <div class="col-md-2"></div>
    </div>
</div>
<vfooter></vfooter>
</div>
</template>

<style>
@import"../../assets/style/landing.css";
</style>

<script>

import vnavbar from './v-navbar.vue'
import vfooter from './v-footer.vue'

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
  },
  components: {
    vnavbar,
    vfooter
  }
}
</script>