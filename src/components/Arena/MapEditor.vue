<template>
  <div id="container">
    <div id="mapContainer">
      <table id="map">
        <tbody>
          <tr v-for="(row, rowIndex) in mapTiles" :key="rowIndex">
            <td v-for="(col, colIndex) of row" :key="colIndex"
            :class="[col.baseClassName, col.partialClassName, selectedTiles[String(rowIndex) + colIndex] ? 'selected' : '']"
            @click="selectTile($event, rowIndex, colIndex)"
            @contextmenu="customRightClick($event, row, col)"
            title="Explanation of the tile">{{String(rowIndex)+colIndex}}</td>
          </tr>
        </tbody>
      </table>
      <!-- <label for="Tilesize">Tile size: {{ tileSize }}</label> -->
      <!-- <input type="range" name="Tilesize" min="50" max="200" v-model="tileSize"/> -->
    </div>

    <div id="controls">
      <label for="mapWidth">Map Width: {{ mapWidth }}</label>
      <br />
      <input type="range" name="mapWidth" id="mapWidth" value="5" min="3" max="9" @change="changeMapWidth($event)"/>
      <br />
      <label for="mapWidth">Map Height: {{ mapHeight }}</label>
      <br />
      <input type="range" name="mapHeight" id="mapHeight" value="5" min="3" max="9" @change="changeMapHeight($event)"/>
      <br />

      <input name="mapCodeInput" id="mapCodeInput">
      <button @click="loadMapCode()">Load</button>
      <br />

      <div id="toolbox">

      </div>

      <input readonly name="mapCodeOutput" id="mapCodeOutput">
      <button @click="generateMapCode()">Copy to clipboard</button>

      <button @click="selectAll()">Select All</button>
      <button @click="deselectAll()">Deselect All</button>
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
      selectedTiles: {},
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
  methods: {
    changeMapWidth(e){
      let newValue = +e.target.value;
      if(newValue < this.mapWidth){
        this.mapTiles = this.mapTiles.map(row => row.slice(0, -1))
        for(let i = 0; i < this.mapHeight; i++){
          delete this.selectedTiles[`${i}${newValue}`]
        }
      }
      else if(newValue > this.mapWidth){
        this.mapTiles = this.mapTiles.map(row => [...row, tiles.empty])
      }

      this.mapWidth = newValue;
    },
    changeMapHeight(e){
      let newValue = +e.target.value;
      if(newValue < this.mapHeight){
        this.mapTiles = this.mapTiles.slice(0, -1)
        for(let i = 0; i < this.mapWidth; i++){
          delete this.selectedTiles[`${newValue}${i}`]
        }
      }
      else if(newValue > this.mapHeight){
        this.mapTiles.push(Array(this.mapWidth).fill(tiles.empty))
      }

      this.mapHeight = newValue;
    },
    /* customRightClick(e, row, col)
    {
        e.preventDefault();
        let contextMenu = document.getElementById("contextmenu")
        console.log(`${row}, ${col}`);
        bCustomContextMenuShown = true;
        contextMenu.style.left = `${e.clientX}px`;
        contextMenu.style.top = `${e.clientY}px`;
        setCtxMenuVisibility();
    },*/
    selectTile(e, row, col)
    {
      let tileIndex = `${row}${col}`;
      let existingSelection = this.selectedTiles[tileIndex];
      if(existingSelection)
      {
          delete this.selectedTiles[tileIndex]
      }
      else
      {
          this.selectedTiles[tileIndex] = true
      }
      console.log(this.selectedTiles);
    },
    selectAll(){
      for (let row = 0; row < this.mapHeight; row++) {
        for (let col = 0; col < this.mapWidth; col++) {
          this.selectedTiles[`${row}${col}`] = true;
        }
      }
    },
    deselectAll(){
      this.selectedTiles = {}
    },
    loadMapCode(){
      let input = document.getElementById('mapCodeInput').value;
      let rows = input.split('|');
      if(rows.some(row => row.length !== rows[0].length)){
        alert('Maps must be rectangular. Fix the input and try again.');
        return;
      }

      rows = rows.map(row =>
      Array.from(row).map( code =>
        {
          let tileKeyForCode = Object.keys(tiles).find(key => tiles[key].code === code);
          if(tileKeyForCode) { return tiles[tileKeyForCode]; }
          else { alert('Invalid tile code. Fix the input and try again.') }
        }
      ));

      this.mapTiles = rows;
      this.mapHeight = rows.length;
      this.mapWidth = rows[0].length;
      document.getElementById('mapHeight').value = this.mapHeight;
      document.getElementById('mapWidth').value = this.mapWidthe;
    },
    generateMapCode(){
      let mapCode = '';
      for(let row of this.mapTiles){
        for(let tile of row){
          mapCode = mapCode.concat(tile.code);
        }
        mapCode = mapCode.concat('|')
      }
      mapCode = mapCode.slice(0, -1)
      document.getElementById('mapCodeOutput').value = mapCode;
      navigator.clipboard.writeText(mapCode);
    }
    /*setCtxMenuVisibility()
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
  /* background: white; */
  box-sizing: border-box;
}

.empty{
  background: white;
  color:black;
}
.wall{
  background: red;
}
.hole{
  background: #333;
}
.partialwall-right{
  border-right: 10px solid orange;
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

.selected{
  box-shadow: 0px 0px 3px 5px inset yellow;
}
</style>