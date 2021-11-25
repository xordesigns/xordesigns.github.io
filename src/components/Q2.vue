<template>
  <div id="container" class="centered">
    <img class="splash centered" src="../assets/q2_splash.png">

    <hr class="hr-white" />

    <nav class="nav centered">
      <span class="disabled">Story (TBA)</span>
      <span class="pipe">|</span> 
      <router-link :to="{ name: 'Q2SetInfo' }">Set Info</router-link>
      <span class="pipe">|</span> 
      <span class="disabled">Play Guide (TBA)</span>
    </nav>
    
    <router-view />
  </div>
</template>

<script>
export default {
    name: "Q2"
}
</script>

<style scoped>
#container {
  background: url("../assets/background_purple.png");
}

.splash{
  display: block;
  transition-duration: 750ms;
  margin-top: 2rem;
}

.splash:hover{
  filter: drop-shadow(0px 0px 13px rgb(107, 90, 146));
}

.hr-white{
  border: 1px solid white;
  box-shadow: 0px 0px 8px 4px rgb(107, 90, 146)
}

.nav{
  font-size: 2rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: 'Jura';
}

.pipe{
  margin: 0rem 1rem;
}

.active {
  color: rgb(107, 90, 146) !important;
  font-weight: bold;
  text-shadow: none;
}

.disabled{
  color: #666;
}
</style>