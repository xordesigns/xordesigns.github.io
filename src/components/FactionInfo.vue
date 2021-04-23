<template>
  <div>
      <div class="image-wrapper">
        <img v-for="imageIndex in faction.cardImages" :key="imageIndex" :src="imageIndex" class="faction-card" />
      </div>
      <div class="faction-text">
        <h1>{{ faction.name }}</h1>
        <p>{{ faction.description }}</p>
      </div>
  </div>
</template>

<script>
export default {
  name: "FactionInfo",
  props: {
    faction: {},
  },
};
</script>

<style scoped>
.image-wrapper {
  position: relative;
  flex-basis: 450px;
  height: 627px;
}

@keyframes crossfade {
  0% {
    opacity: 1;
  }
  27% {
    opacity: 1;
  }
  33% {
    opacity: 0;
  }
  95% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.faction-card {
  position: absolute;
  top: 0%;
  left: 0%;
  animation-name: crossfade;
  animation-duration: 12s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.faction-card:nth-of-type(1) {
  animation-delay: 8s;
}
.faction-card:nth-of-type(2) {
  animation-delay: 4s;
}
.faction-card:nth-of-type(3) {
  animation-delay: 0s;
}

.faction-text {
  text-align: center;
  display: inline-block;
  width: 510px;
  padding: 10px;
}
</style>