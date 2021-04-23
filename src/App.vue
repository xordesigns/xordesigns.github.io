<template>
  <div id="container" class="centered">
    <nav class="nav">
      <router-link :to="{ name: 'Factions' }" class="nav-item"
        >Factions &amp; Story</router-link
      >
      <router-link :to="{ name: 'SetInfo' }" class="nav-item"
        >Set Info</router-link
      >
      <router-link :to="{ name: 'PlayGuide' }" class="nav-item"
        >Play Guide</router-link
      >
      <a
        to="/"
        href="https://discord.com/invite/hkWs3KQ"
        target="_blank"
        class="nav-item"
        >Discord</a
      >
    </nav>

    <img class="splash centered" src="./assets/qsr_splash.png" />

    <hr />

    <router-view />

    <hr />

    <div @click="scrollTop" class="fab">▲</div>
  </div>
</template>

<script>
export default {
  methods: {
    scrollTop() {
      window.requestAnimationFrame(() =>
        document.getElementById("container").scrollIntoView()
      );
    },
  },
};
</script>

<style>
html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  color: white;
  background-color: black;
  font-family: "Montserrat", sans-serif;
}

#container {
  background: url("./assets/background.png");
  /* background: white; */
}

a,
a:visited {
  color: unset;
  text-decoration: none;
}

.centered {
  margin: auto;
}

.splash {
  display: block;
  transition-duration: 750ms;
  margin-top: 1rem;
}

.splash:hover {
  filter: drop-shadow(0px 0px 13px #d00);
}

hr {
  border: 2px solid #1f1f1f;
  width: 30%;
  margin: 1rem auto 1rem auto;
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

.nav-item:last-child {
  border: none;
  text-decoration-line: underline;
}

.nav-item:hover {
  background-color: #1f1f1f;
}

.active {
  color: #d00 !important;
  text-shadow: 0px 0px 5px #d00;
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

.info {
  width: 960px;
  font-size: 1.2rem;
  color: #fff;
}

.info p,
li {
  font-family: "Montserrat", sans-serif;
}

.info a {
  text-decoration: underline;
}

h1, h2, h3{
  font-family: 'Audiowide', sans-serif;
  text-align: center;
}
</style>
