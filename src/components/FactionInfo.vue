<template>
  <div>
      <splide id="faction-cards" :options="options" :slides="faction.cardImages">
        <splide-slide v-for="imageName in faction.cardImages" :key="imageName">
          <img :src="imageName">
        </splide-slide>
      </splide>

      <div class="faction-text">
        <h1 id="faction-title">
          <img id="faction-logo" :src="faction.logoImage"/>
          <span :style="{ fontSize: faction.name.length > 11 ? '0.8em' : '1em' }">{{ faction.name }}</span>
        </h1>
        <hr id="separator">
        <div v-html="faction.description"></div>
      </div>
  </div>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
export default {
  name: "FactionInfo",
  data() {
    return {
      options: {
        autoplay: true,
        rewind: true,
        width: "450px",
        pagination: false
      }
    }
  },
  props: {
    faction: {},
  },
  components: {
    Splide,
    SplideSlide
  }
};
</script>

<style scoped>
.image-wrapper {
  width:450px;
  height: 627px;
}

.faction-text {
  text-align: center;
  display: inline-block;
  width: 510px;
  padding: 10px;
}

#faction-title{
  display: flex;
  align-items: center;
  justify-content: center;
  margin:0;
}

#faction-logo{
  height: 3em;
  width: 3em;
  margin-right: 0.2em;
}

#separator{
  border: 1px solid #444;
  background-color: #444;
  width:50%;
}
</style>