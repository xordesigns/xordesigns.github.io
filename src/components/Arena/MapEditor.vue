<template>
  <div id="container">
    <div id="mapContainer">
      <table id="map">
        <tbody>
          <tr v-for="row in mapTiles" :key="row">
            <td v-for="col of row" :key="col"
            :class="col.className"
            @click="selectTile($event, row, col)"
            @contextmenu="customRightClick($event, row, col)"
            title="Explanation of the tile"></td>
          </tr>
        </tbody>
      </table>
      <label for="Tilesize">Tile size: {{ tileSize }}</label>
      <input type="range" name="Tilesize" min="50" max="200" v-model="tileSize"/>
    </div>

    <div id="controls">
      <label for="mapWidth">Map Width: {{ mapWidth }}</label>
      <br />
      <input type="range" name="mapWidth" id="mapWidth" min="3" max="9" v-model.number="mapWidth"/>
      <br />
      <label for="mapWidth">Map Height: {{ mapHeight }}</label>
      <br />
      <input type="range" name="mapHeight" id="mapHeight" min="3" max="9" v-model.number="mapHeight"/>
      <br />

      <input name="mapCodeInput" id="mapCodeInput">
      <button @click="loadMapCode()">Load</button>
      <br />

      <div id="toolbox">

      </div>

      <input readonly name="mapCodeOutput" id="mapCodeOutput">
      <button @click="generateMapCode()">Copy to clipboard</button>
    </div>

    <div id="contextmenu">
      <ul>
        <li class="ctxmenu-item" onclick="location.reload()">Reload page</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {tiles} from "./tiles"
export default {
  name: "MapEditor",
  data() {
    return {
      mapWidth: 5,
      mapHeight: 5,
      tileSize: 100,
      mapTiles: [],
      selectedTiles: [],
      bCustomContextMenuShown: false
    };
  },
  created()
  {
    for (let row = 0; row < this.mapHeight; row++) {
      this.mapTiles.push([])
      for(let col = 0; col < this.mapWidth; col++){
        this.mapTiles[row].push(tiles.empty)
      }
    }
  },
  watch:{
    mapWidth: function(newValue, oldValue){
      if(newValue < oldValue){
        this.mapTiles = this.mapTiles.map(row => row.slice(0, -1))
      }
      else if(newValue > oldValue){
        this.mapTiles = this.mapTiles.map(row => [...row, tiles.empty])
      }
    },
    mapHeight: function(newValue, oldValue){
      if(newValue < oldValue){
        this.mapTiles = this.mapTiles.slice(0, -1)
        console.log(this.mapTiles);
      }
      else if(newValue > oldValue){
        console.log(`map width: ${this.mapWidth}`);
        let arr = Array(this.mapWidth).fill(tiles.empty)
        console.log(arr);
        this.mapTiles.push(arr)
        console.log(this.mapTiles);
      }
    }
  },
  methods: {
    /* customRightClick(e, row, col)
    {
        e.preventDefault();
        let contextMenu = document.getElementById("contextmenu")
        console.log(`${row}, ${col}`);
        bCustomContextMenuShown = true;
        contextMenu.style.left = `${e.clientX}px`;
        contextMenu.style.top = `${e.clientY}px`;
        setCtxMenuVisibility();
    },
    selectTile(e, row, col)
    {
        let existingIndex = this.selectedTiles.indexOf(`${row}${col}`);
        if(existingIndex > -1)
        {
            this.selectedTiles.splice(existingIndex, 1);
        }
        else
        {
            this.selectedTiles.push(`${row}${col}`);
        }
        console.log(this.selectedTiles);
    },
    setCtxMenuVisibility()
    {
      contextMenu.style.visibility = bCustomContextMenuShown ? 'visible' : 'hidden'
    } */
  },
};
</script>

<style scoped>
#container {
  width:100%;
  height:100%;
}

#mapContainer{
    width:70%;
    float:left;
}

#controls{
    width:30%;
    float:left;
}

td {
  width: 100px;
  height: 100px;
  background: white;
}

.empty{
  background: red;
}

#contextmenu{
  background-color: #999;
  text-align: center;
  position: absolute;
  visibility: hidden;
}
#contextmenu ul{
    list-style-type: none;
    padding: 0;
    margin: 0;
}
.ctxmenu-item{
    padding: 5px;
    background-color: #999;
    border: 1px solid black;
    cursor:pointer;
}
.ctxmenu-item:hover{
    background-color: #bbb;
}
</style>