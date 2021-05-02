<template>
    <div>
        <h1 id="subnav"><router-link :to="{ name:'Factions' }">Factions</router-link>
        <span>&nbsp;|&nbsp;</span>
        <router-link :to="{ name:'Story' }">Story</router-link></h1>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "Flavor"
    }
</script>

<style scoped>
#subnav{
    display: flex;
    justify-content: center;
}
</style>