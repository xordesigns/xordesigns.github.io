<template>
    <router-view />
</template>

<script>
export default {
  
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

a,
a:visited {
  color: unset;
  text-decoration: none;
}

.active {
  color: #d00 !important;
  text-shadow: 0px 0px 5px #d00;
}

.centered {
  margin: auto;
}

hr {
  border: 2px solid #1f1f1f;
  width: 30%;
  margin: 1rem auto 1rem auto;
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
