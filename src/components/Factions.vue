<template>
  <div>
    <div id="factions" class="factions centered">
      <div v-for="faction of factions.colored" :key="faction.color" class="img" @click="changeFaction(faction.color)">
        <img :src="faction.splashImage" />
        <div class="overlay"></div>
        <span class="facname">{{ faction.name }}</span>
      </div>
    </div>

    <div id="neutral" class="factions centered" @click="changeFaction(factions.neutral.color)">
      <div class="img">
        <img :src="factions.neutral.splashImage" />
        <div class="overlay"></div>
        <span class="facname">{{ factions.neutral.name }}</span>
      </div>
    </div>

    <p id="reminder"><em>(Click on a faction to learn more)</em></p>

    <faction-info v-if="selectedFaction" id="factioninfo" class="info centered" :faction="selectedFaction"/>
    
  </div>
</template>

<script>
import { factions } from "../data/factions"
import FactionInfo from './FactionInfo.vue';
export default {
  name: "Factions",
  components:{
    FactionInfo
  },
  data() {
    return {
      factions,
      factionList: {},
      selectedFaction: null
    };
  },
  mounted () {
    for(let faction of this.factions.colored){
      this.factionList[faction.color] = faction
    }
    this.factionList[this.factions.neutral.color] = this.factions.neutral
  },
  methods: {
    changeFaction(color) {
      this.selectedFaction = this.factionList[color]
      window.requestAnimationFrame(() => { document.getElementById('factioninfo').scrollIntoView(true) })
    }
  }
};
</script>

<style scoped>
.factions {
  width: 770px;
  display: flex;
  justify-content: space-between;
}

.img {
  display: inline-block;
  position: relative;
  cursor: pointer;
}

.facname {
  position: absolute;
  color: white;
  bottom: 5%;
  right: 5%;
  writing-mode: vertical-lr;
  opacity: 0;
  transition-duration: 200ms;
  font-family: "Audiowide";
  font-size: 2rem;
  text-shadow: 2px 2px 2px black;
}

.img:hover .facname {
  transition-delay: 200ms;
  opacity: 1;
}

.overlay {
  width: 150px;
  height: 500px;
  background: black;
  opacity: 0.75;
  position: absolute;
  top: 0;
  left: 0;
  transition-duration: 500ms;
}

.img:hover .overlay {
  opacity: 0;
}

#neutral .overlay {
  width: 770px;
  height: 150px;
}

#neutral .facname {
  writing-mode: horizontal-tb;
}

#reminder {
  text-align: center;
  color: #333;
  font-weight: bold;
  margin-top: 0.5rem;
}

#factioninfo{
  display: flex;
  align-items: center;
}
</style>