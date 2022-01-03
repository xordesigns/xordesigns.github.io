<template>
  <div id="container">
    <div id="mapContainer">
      <table id="map">
        <tbody>
          <tr v-for="row in +mapHeight" :key="row">
            <td v-for="col in +mapWidth" :key="col" @click="selectTile($event, row, col)" @contextmenu="customRightClick($event, row, col)" title="Explanation of the tile"></td>
          </tr>
        </tbody>
      </table>
      <label for="Tilesize">Tile size: {{ tileSize }}</label>
      <input type="range" name="Tilesize" min="50" max="200" v-model="tileSize"/>
    </div>

    <div id="controls">
      <label for="mapWidth">Map Width: {{ mapWidth }}</label>
      <br />
      <input type="range" name="mapWidth" id="mapWidth" min="3" max="9" v-model="mapWidth"/>
      <br />
      <label for="mapWidth">Map Height: {{ mapHeight }}</label>
      <br />
      <input type="range" name="mapHeight" id="mapHeight" min="3" max="9" v-model="mapHeight"/>
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
        <li class="ctxmenu-item" onclick="randomBoxColor()">Random box color</li>
        <li class="ctxmenu-item" onclick="addText()">Add Lipsum header</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MapEditor",
  data() {
    return {
      mapWidth: 3,
      mapHeight: 3,
      tileSize: 100,
      mapTiles: [],
      selectedTiles: []
    };
  },
  methods: {
    customRightClick(e, row, col) {
        e.preventDefault();
        console.log(`${row}, ${col}`);
    },
    selectTile(e, row, col){
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
    }
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