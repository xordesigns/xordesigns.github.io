<template>
  <div id="container">
    <div id="mapContainer">
      <table id="map">
        <tbody>
          <tr v-for="(row, rowIndex) in mapTiles" :key="rowIndex">
            <td v-for="(col, colIndex) of row" :key="colIndex"
            :class="[col.baseClassName, col.partialClassName, selectedTiles[String(rowIndex) + colIndex] ? 'selected' : '']"
            @click="selectTile($event, rowIndex, colIndex)"
            @contextmenu="customRightClick($event, rowIndex, colIndex)"
            :title="col.tooltip">{{String(rowIndex)+colIndex}}</td>
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
      <input readonly name="mapCodeOutput" id="mapCodeOutput">
      <button @click="generateMapCode()">Copy to clipboard</button>

      <div id="toolbox">
        <label for="paintMode">Select Mode</label>
        <input type="checkbox" name="paintMode" id="paintMode">
        <label for="paintMode">Paint Mode</label>
        <select name="tileSelect" id="tileSelect">
          <option v-for="tile in Object.keys(tiles)" :key="tile" :value="tile">{{tile}} - {{tiles[tile].tooltip}}</option>
        </select>
      </div>

    </div>

    <div id="contextmenu" v-show="bContextMenuShown">
      <ul>
        <li class="ctxmenu-item" @click="selectAll()">Select All</li>
        <li class="ctxmenu-item" @click="deselectAll()">Deselect All</li>
        <hr>
        <li class="ctxmenu-item" @click="selectRow()">Select Row</li>
        <li class="ctxmenu-item" @click="selectColumn()">Select Column</li>
        <li class="ctxmenu-item" @click="selectAdjacent(true)">Select Adjacent</li>
        <li class="ctxmenu-item" @click="selectAdjacent(false)">Select Adjacent (Ortho)</li>
        <li class="ctxmenu-item" @click="$event.stopPropagation(); bSelectRightClickedTile = !bSelectRightClickedTile">
          <input type="checkbox" name="selectRightClickedTile" id="selectRightClickedTile" v-model="bSelectRightClickedTile">
          <label>Select right-clicked tile</label>
        </li>
        <hr>
        <li class="ctxmenu-item" @click="deleteRow()">Delete Row</li>
        <li class="ctxmenu-item" @click="deleteColumn()">Delete Column</li>

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
      bContextMenuShown: false,
      clickedRow: 0,
      clickedColumn: 0,
      bSelectRightClickedTile: false
    };
  },
  created(){
    this.tiles = tiles;
    console.log(this.tiles)
  },
  mounted()
  {
    for (let row = 0; row < this.mapHeight; row++) {
      this.mapTiles.push([])
      for(let col = 0; col < this.mapWidth; col++){
        this.mapTiles[row].push(tiles.empty)
      }
    }

    this.$el.addEventListener('click', (e) => {
      if(this.bContextMenuShown) {
          e.preventDefault()
          this.bContextMenuShown = false
      }
    })
  },
  methods: {
    changeMapWidth(e){
      let newValue = +e.target.value;
      let diff = newValue - this.mapWidth;
      if(diff < 0){
        this.mapTiles = this.mapTiles.map(row => row.slice(0, diff))
        for(let col = newValue; col < this.mapWidth; col++){
          for(let i = 0; i < this.mapHeight; i++){
            delete this.selectedTiles[`${i}${col}`]
          }
        }
      }
      else if(diff > 0){
        this.mapTiles = this.mapTiles.map(row => [...row, ...Array(diff).fill(tiles.empty)])
      }

      this.mapWidth = newValue;
    },
    changeMapHeight(e){
      let newValue = +e.target.value;
      let diff = newValue - this.mapHeight;
      if(diff < 0){
        this.mapTiles = this.mapTiles.slice(0, diff)
        for(let row = newValue; row < this.mapHeight; row++){
          for(let i = 0; i < this.mapWidth; i++){
            delete this.selectedTiles[`${row}${i}`]
          }
        }
      }
      else if(diff > 0){
        for(let i = 0; i < diff; i++){
          this.mapTiles.push(Array(this.mapWidth).fill(tiles.empty))
        }
      }

      this.mapHeight = newValue;
    },
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

      if(rows.length < 3 || rows.some(row => row.length < 3)){
        alert('Maps must be at least 3x3.');
        return;
      }

      if(rows.length > 9 || rows.some(row => row.length > 9)){
        alert('Maps must be at most 9x9.');
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
      document.getElementById('mapWidth').value = this.mapWidth;
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
    },
    customRightClick(e, row, col)
    {
        e.preventDefault();
        let contextMenu = document.getElementById("contextmenu")
        this.bContextMenuShown = true;
        contextMenu.style.left = `${e.clientX}px`;
        contextMenu.style.top = `${e.clientY}px`;
        this.clickedRow = row;
        this.clickedColumn = col;
        
        if(this.bSelectRightClickedTile){
          this.selectedTiles[`${row}${col}`] = true;
          console.log(this.selectedTiles);
        }
    },
    deleteRow(){
      if(this.mapHeight > 3){
        this.mapTiles.splice(this.clickedRow, 1)
        this.mapHeight--;
        for(let i = 0; i < this.mapWidth; i++){
            delete this.selectedTiles[`${this.clickedRow}${i}`]
        }
        document.getElementById('mapHeight').value = this.mapHeight;
      }
    },
    deleteColumn(){
      if(this.mapWidth > 3){
        this.mapTiles.forEach(row => row.splice(this.clickedColumn, 1))
        this.mapWidth--;
        for(let i = 0; i < this.mapHeight; i++){
            delete this.selectedTiles[`${i}${this.clickedColumn}`]
            console.log(this.selectedTiles);
        }
        document.getElementById('mapWidth').value = this.mapWidth;
      }
    },
    selectRow(){
      for (let i = 0; i < this.mapWidth; i++) {
        this.selectedTiles[`${this.clickedRow}${i}`] = true;
      }
    },
    selectColumn(){
      for (let i = 0; i < this.mapHeight; i++) {
        this.selectedTiles[`${i}${this.clickedColumn}`] = true;
      }
    },
    selectAdjacent(diagonals){
      let tileCoordinates = { col: this.clickedColumn, row: this.clickedRow };
      if(tileCoordinates.row < (this.mapHeight - 1)){
        this.selectedTiles[`${tileCoordinates.row + 1}${tileCoordinates.col}`] = true;
      }
      if(tileCoordinates.row > 0){
        this.selectedTiles[`${tileCoordinates.row - 1}${tileCoordinates.col}`] = true;
      }
      if(tileCoordinates.col < (this.mapWidth - 1)){
        this.selectedTiles[`${tileCoordinates.row}${tileCoordinates.col + 1}`] = true;
      }
      if(tileCoordinates.col > 0){
        this.selectedTiles[`${tileCoordinates.row}${tileCoordinates.col - 1}`] = true;
      }
      if(diagonals){
        if(tileCoordinates.row < (this.mapHeight - 1) && tileCoordinates.col < (this.mapWidth - 1)){
          this.selectedTiles[`${tileCoordinates.row + 1}${tileCoordinates.col + 1}`] = true;
        }
        if(tileCoordinates.row < (this.mapHeight - 1) && tileCoordinates.col > 0){
          this.selectedTiles[`${tileCoordinates.row + 1}${tileCoordinates.col - 1}`] = true;
        }
        if(tileCoordinates.row > 0 && tileCoordinates.col < (this.mapWidth - 1)){
          this.selectedTiles[`${tileCoordinates.row - 1}${tileCoordinates.col + 1}`] = true;
        }
        if(tileCoordinates.row > 0 && tileCoordinates.col > 0){
          this.selectedTiles[`${tileCoordinates.row - 1}${tileCoordinates.col - 1}`] = true;
        }
      }
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
  /* visibility: hidden; */
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
ul hr{
  margin: 0;
  width: initial;
  border: none;
  background: #666;
  height: 3px;
}

.selected{
  box-shadow: 0px 0px 3px 5px inset yellow;
}
</style>