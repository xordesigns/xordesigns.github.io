<template>
<div>
    <div id="container" class="centered">
      <nav class="nav">
        <router-link to="/flavor" class="nav-item">Factions &amp; Story</router-link>
        <router-link :to="{ name: 'SetInfo' }" class="nav-item">Set Info</router-link>
        <router-link :to="{ name: 'PlayGuide' }" class="nav-item">Play Guide</router-link>
        <a
          to="/"
          href="https://planesculptors.net/set/quasar#cards"
          target="_blank"
          class="nav-item link">
            Card List
        </a>
        <a
          to="/"
          href="https://discord.com/invite/hkWs3KQ"
          target="_blank"
          class="nav-item link">
            Discord
        </a>
      </nav>
      
      <img class="splash centered" src="../assets/qsr_splash.png" />

      <hr />

      <router-view />

      <hr />

      <div @click="scrollTop" class="fab">▲</div>
    </div>
</div>
</template>

<script>
export default {
    name: "QuasarRoot",
    methods: {
    scrollTop() {
      window.requestAnimationFrame(() =>
        document.getElementById("container").scrollIntoView()
      );
    },
  }
}
</script>

<style scoped>
#container {
  background: url("../assets/background.png");
}

.splash {
  display: block;
  transition-duration: 750ms;
  margin-top: 1rem;
}

.splash:hover {
  filter: drop-shadow(0px 0px 13px #d00);
}

.nav {
  color: white;
  background: #000;
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
  border-bottom: 1px solid #111;
}

.nav-item {
  font-family: "Audiowide";
  font-size: 1.3rem;
  cursor: pointer;
  width: 25%;
  height: 100%;
  line-height: 3rem;
  text-align: center;
  border-right: 1px solid #111;
  text-decoration: none;
}

.nav-item.link {
  border: none;
  text-decoration-line: underline;
}

.nav-item:hover {
  background-color: #1f1f1f;
}

.fab {
  display: block;
  background-color: black;
  font-family: "Audiowide";
  font-size: 1.5rem;
  box-shadow: 0px 0px 1px 2px #fff;
  border-radius: 100%;
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  position: fixed;
  bottom: 5%;
  right: 5%;
  transition-duration: 400ms;
  cursor: pointer;
}

.fab:hover {
  color: #d00 !important;
  box-shadow: 0px 0px 5px 3px #d00;
}
</style>