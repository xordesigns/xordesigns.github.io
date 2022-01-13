<!--features: move tiles (in select mode); copy/paste tiles; UI for row/column add/remove; hotkeys-->
<template>
  <div id="container">
    <div id="mapContainer">
      <table id="map">
        <tbody>
          <tr v-for="(row, rowIndex) in mapTiles" :key="rowIndex">
            <td v-for="(col, colIndex) of row" :key="colIndex"
            :class="[col.direction ? `${col.baseClassName}-${col.direction}` : col.baseClassName, selectedTiles[String(rowIndex) + colIndex] ? 'selected' : '']"
            @click="tileClickCallback($event, rowIndex, colIndex)"
            @mousedown="handleAuxMouseButtons($event, rowIndex, colIndex)"
            @mouseenter="setTileOnHover($event, rowIndex, colIndex)"
            @contextmenu="customRightClick($event, rowIndex, colIndex)"
            :title="col.tooltip">{{String(rowIndex)+colIndex}}
              <div class="quadrant q-top" :class="col.partial.top" @click="paintPartial($event, 'top', rowIndex, colIndex)"></div>
              <div class="quadrant q-right" :class="col.partial.right" @click="paintPartial($event, 'right', rowIndex, colIndex)"></div>
              <div class="quadrant q-bot" :class="col.partial.bottom" @click="paintPartial($event, 'bottom', rowIndex, colIndex)"></div>
              <div class="quadrant q-left" :class="col.partial.left" @click="paintPartial($event, 'left', rowIndex, colIndex)"></div>
            </td>
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
      <button @click="test()">Test</button>

      <div id="toolbox">
        <label for="paintMode">Select Mode</label>
        <input type="checkbox" name="paintMode" id="paintMode" v-model="bPaintModeEnabled">
        <label for="paintMode">Paint Mode</label>

        <br>
        <label for="overwritePartials">Overwrite partials when setting a tile?</label>
        <input type="checkbox" name="overwritePartials" id="overwritePartials" v-model="bOverwritePartials">

        <select name="tileSelect" id="tileSelect">
          <option v-for="tile in Object.keys(fullTiles)" :key="tile" :value="tile">{{tile}} - {{fullTiles[tile].tooltip}}</option>
        </select>

        <select name="partialSelect" id="partialSelect">
          <option v-for="partial in Object.keys(partials)" :key="partial" :value="partial">{{partial}} - {{partials[partial].tooltip}}</option>
        </select>
      </div>

    </div>

    <div id="contextmenu" v-show="bContextMenuShown">
      <ul id="menu">
        <li class="ctxmenu-item" @click="selectAll()">Select All</li>
        <li class="ctxmenu-item" @click="deselectAll()">Deselect All</li>
        <hr>
        <li class="ctxmenu-item">
          <span>Select ►</span>
          <ul class="submenu">
            <li class="ctxmenu-item" @click="selectRow()">Row</li>
            <li class="ctxmenu-item" @click="selectColumn()">Column</li>
            <li class="ctxmenu-item" @click="selectAdjacent(true)">Adjacent</li>
            <li class="ctxmenu-item" @click="selectAdjacent(false)">Adjacent (Ortho)</li>
            <hr>
            <li class="ctxmenu-item" @click="$event.stopPropagation(); bSelectRightClickedTile = !bSelectRightClickedTile">
              <input type="checkbox" name="selectRightClickedTile" id="selectRightClickedTile" v-model="bSelectRightClickedTile">
              <label>Select right-clicked tile</label>
            </li>
          </ul>
        </li>
        <hr>
        <li class="ctxmenu-item">
          <span>Set selected ►</span>
          <ul class="submenu">
            <li class="ctxmenu-item" v-for="tile in Object.keys(fullTiles)" :key="tile" @click="setSelected(tile)">{{tile}}</li>
          </ul>
        </li>
        <li class="ctxmenu-item">
          <span>Set selected partial ►</span>
          <ul class="submenu">
            <li class="ctxmenu-item" v-for="dir in ['top','bottom','right','left', 'all']" :key="dir">{{dir}} ►
              <ul class="submenu">
                <li class="ctxmenu-item" @click="setSelectedPartial(dir, 'tile')">empty</li>
                <li class="ctxmenu-item" v-for="tile in Object.keys(partials)" :key="tile" @click="setSelectedPartial(dir, tile)">{{tile}}</li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="ctxmenu-item" @click="$event.stopPropagation(); bDeselectAfterSet = !bDeselectAfterSet">
              <input type="checkbox" name="deselectAfterSet" id="deselectAfterSet" v-model="bDeselectAfterSet">
              <label>Deselect tiles after setting</label>
        </li>
        <hr>
        <li class="ctxmenu-item">
          <span>Rotate ►</span>
          <ul class="submenu">
            <li class="ctxmenu-item" @click="rotateSelected(true)">Clockwise</li>
            <li class="ctxmenu-item" @click="rotateSelected(false)">Counterclockwise</li>
            <hr>
            <li class="ctxmenu-item" @click="$event.stopPropagation(); bRotatePartials = !bRotatePartials">
              <input type="checkbox" name="rotatePartials" id="rotatePartials" v-model="bRotatePartials">
              <label>Rotate partial tiles</label>
            </li>
            <li class="ctxmenu-item" @click="$event.stopPropagation(); bDeselectAfterRotate = !bDeselectAfterRotate">
              <input type="checkbox" name="deselectAfterRotate" id="deselectAfterRotate" v-model="bDeselectAfterRotate">
              <label>Deselect after rotation</label>
            </li>
          </ul>
        </li>
        <hr>
        <li class="ctxmenu-item">
          <span>Insert ►</span>
          <ul class="submenu">
            <li class="ctxmenu-item" @click="insertRow(false)">Row Above</li>
            <li class="ctxmenu-item" @click="insertRow(true)">Row Below</li>
            <li class="ctxmenu-item" @click="insertColumn(false)">Column Left</li>
            <li class="ctxmenu-item" @click="insertColumn(true)">Column Right</li>
          </ul>
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
      // tileSize: 100,
      mapTiles: [],
      selectedTiles: {},
      copiedTile: {},
      clickedRow: 0,
      clickedColumn: 0,
      hoveredRow: 0,
      hoveredColumn: 0,
      tileClickCallback: null,
      bPaintModeEnabled: true,
      bContextMenuShown: false,
      bSelectRightClickedTile: true,
      bDeselectAfterSet: true,
      bDeselectAfterRotate: true,
      bOverwritePartials: false,
      bRotatePartials: true,
    };
  },
  created(){
    this.fullTiles = Object.fromEntries(Object.entries(tiles).filter(kvp => !kvp[1].onlyPartial));
    this.partials = Object.fromEntries(Object.entries(tiles).filter(kvp => kvp[1].canBePartial));
    this.tileClickCallback = this.paintTile;
  },
  mounted()
  {
    for (let row = 0; row < this.mapHeight; row++) {
      this.mapTiles.push([])
      for(let col = 0; col < this.mapWidth; col++){
        this.mapTiles[row].push({...tiles.empty, partial: { top: "", right:"", bottom:"", left:"" } })
      }
    }

    this.$el.addEventListener('click', (e) => {
      if(this.bContextMenuShown) {
          e.preventDefault()
          this.bContextMenuShown = false
      }
    });

    document.addEventListener('keydown', (e) => {
      console.log(e.code)
      switch(e.code){
        // TODO finish keybinds
        case 'Space':
          e.preventDefault();
          this.bPaintModeEnabled = !this.bPaintModeEnabled;
          break;
        case 'KeyC':
          this.copyTile(this.hoveredRow, this.hoveredColumn);
          break;
        case 'KeyV':
          this.pasteTile(this.hoveredRow, this.hoveredColumn);
          break;
        case 'KeyQ':
          break;
        case 'KeyE':
          break;
        case 'KeyD':
        case 'Delete':
          this.clearTile(this.hoveredRow, this.hoveredColumn);
          break;
      }
    })
  },
  watch:{
    bPaintModeEnabled: function(newValue){
      if(newValue){
        this.tileClickCallback = this.paintTile;
      } else{
        this.tileClickCallback = this.selectTile;
      }
    }
  },
  methods: {
    test(){
      this.mapTiles[0][0].partial.right = "wall"
      this.mapTiles[0][0].partial.top = "hole"
      this.mapTiles[0][0].partial.bottom = "barrier"
      this.mapTiles[0][0].partial.left = "hazard"
      // console.log(this.mapTiles);
    }, 
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
        for(let row = 0; row < this.mapHeight; row++){
          for(let i = 0; i < diff; i++){
            this.mapTiles[row].push({...tiles.empty, partial: { top: "", right:"", bottom:"", left:"" }})
          }
        }
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
          let newRow = [];
          for(let j = 0; j < this.mapWidth; j++){
            newRow.push({...tiles.empty, partial: { top: "", right:"", bottom:"", left:"" }})
          }
          this.mapTiles.push(newRow);
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
      // console.log(this.selectedTiles);
    },
    paintTile(e, row, col){
      let selectedTileType = document.getElementById('tileSelect').value;
      console.log(selectedTileType);
      if(this.bOverwritePartials){
        this.mapTiles[row].splice(col, 1, {...tiles[selectedTileType], partial: { top: "", right:"", bottom:"", left:"" }})
      } else {
        this.mapTiles[row].splice(col, 1, {...tiles[selectedTileType], partial: {...this.mapTiles[row][col].partial}})
      }
    },
    paintPartial(e, dir, row, col){
      // console.log(`dir:${dir}row:${row}col:${col}`);
      let bPaintModeEnabled = document.getElementById('paintMode').checked;
      if(bPaintModeEnabled){
        e.stopPropagation();
        let selectedPartialType = document.getElementById('partialSelect').value;
        let currentPartial = this.mapTiles[row][col].partial[dir];
        if(currentPartial === selectedPartialType){
          this.mapTiles[row][col].partial[dir] = '';
        }
        else{
          this.mapTiles[row][col].partial[dir] = selectedPartialType;
        }
      }
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
      //TODO better parsing to handle partial codes
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
      //TODO generate partial codes
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
          // console.log(this.selectedTiles);
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
    },
    setSelected(tileType){
      for(let index of Object.keys(this.selectedTiles)){
        let row = index[0];
        let col = index[1];
        if(this.bOverwritePartials){
          this.mapTiles[row].splice(col, 1, {...tiles[tileType], partial: { top: "", right:"", bottom:"", left:"" }})
        } else {
        this.mapTiles[row].splice(col, 1, {...tiles[tileType], partial: {...this.mapTiles[row][col].partial}})
        }
      }
      if(this.bDeselectAfterSet){
        this.deselectAll();
      }
    },
    setSelectedPartial(dir, partialType){
      if(dir === 'all'){
        for(let dir of ['top','left','bottom','right']){
            for(let index of Object.keys(this.selectedTiles)){
            let row = index[0];
            let col = index[1];
            this.mapTiles[row][col].partial[dir] = partialType;
          }
        }
        return;
      } else{
        for(let index of Object.keys(this.selectedTiles)){
          let row = index[0];
          let col = index[1];
          this.mapTiles[row][col].partial[dir] = partialType;
        }
      }
      if(this.bDeselectAfterSet){
        this.deselectAll();
      }
    },
    insertRow(insertBelow){
      if(this.mapHeight == 9){
        return;
      }

      let newRow = [];
      for(let i = 0; i < this.mapWidth; i++){
        newRow.push({...tiles.empty, partial: { top: "", right:"", bottom:"", left:"" }})
      }

      let rowIndex = insertBelow ? this.clickedRow + 1 : this.clickedRow;

      this.mapTiles.splice(rowIndex, 0, newRow);
      this.mapHeight++;
      document.getElementById('mapHeight').value = this.mapHeight;
    },
    insertColumn(insertRight){
      if(this.mapWidth == 9){
        return;
      }

      let colIndex = insertRight ? this.clickedColumn + 1 : this.clickedColumn;

      for(let row of this.mapTiles){
        row.splice(colIndex, 0, {...tiles.empty, partial: { top: "", right:"", bottom:"", left:"" }})
      }

      this.mapWidth++;
      document.getElementById('mapWidth').value = this.mapWidth;
    },
    rotateSelected(clockwise){
      for(let index of Object.keys(this.selectedTiles)){
        let row = index[0];
        let col = index[1];
        let dirs = ['top','right','bottom','left']
        let rotateDirection = clockwise ? 1 : -1;
        let tile = this.mapTiles[row][col]
        if(tile.direction){
          let index = dirs.indexOf(tile.direction) + rotateDirection;
          tile.direction = dirs.at(index % dirs.length)
        }
        if(this.bRotatePartials){
          let partialsCopy = Object.values(tile.partial)
          for(let i = 0; i < 4; i++){
            tile.partial[dirs[i]] = partialsCopy.at((i - rotateDirection) % dirs.length)
          }
        }
      }
      if(this.bDeselectAfterRotate){
        this.deselectAll();
      }
    },
    setTileOnHover(e, row, col){
      this.hoveredRow = row;
      this.hoveredColumn = col;
    },
    handleAuxMouseButtons(e, row, col){
      if(e.button == 1){ // middle click
        e.preventDefault();
        this.clearTile(row, col)
      }
    },
    clearTile(row, col){
      this.mapTiles[row][col] = {...tiles.empty, partial: { top: "", right:"", bottom:"", left:"" }}
    },
    copyTile(row, col){
      this.copiedTile = {...this.mapTiles[row][col]};
      this.copiedTile.partial = {...this.mapTiles[row][col].partial};
    },
    pasteTile(row, col){
      console.log(row, col)
      this.mapTiles[row][col] = {...this.copiedTile};
      this.mapTiles[row][col].partial = {...this.copiedTile.partial};
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

td{
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  text-align: center;
  position:relative;
  cursor:pointer;
}
.quadrant{
  position:absolute;
  border-style: solid;
  border-width: 0px;
  border-color: transparent;
}
.q-top,.q-bot{
  left:0;
  width:100%;
  height:20%;
}
.q-top{
  top:0;
  border-width: 0px 0px 1px 0px;
}
.q-bot{
  bottom:0;
  border-width: 1px 0px 0px 0px;
}
.q-left,.q-right{
  top:0;
  width:20%;
  height:100%;
}
.q-left{
  left:0;
  border-width: 0px 1px 0px 0px;
}
.q-right{
  right:0;
  border-width: 0px 0px 0px 1px;
}

td:hover .quadrant{
  border-color:#aaa;
}

.quadrant:hover{
  background: yellow;
  /* border-color:black; */
  /* border-width:3px; */
}

.empty{
  background: white;
  color:black;
}
.wall{
  background: #ff0000;
}
.hole{
  background: #333;
}
.diagonalwall-top{
  background: linear-gradient(315deg, rgba(255,255,255,1) 50%, rgba(255,0,0,1) 51%);
}
.diagonalwall-right{
  background: linear-gradient(45deg, rgba(255,255,255,1) 50%, rgba(255,0,0,1) 51%);
}
.diagonalwall-bottom{
  background: linear-gradient(135deg, rgba(255,255,255,1) 50%, rgba(255,0,0,1) 51%);
}
.diagonalwall-left{
  background: linear-gradient(225deg, rgba(255,255,255,1) 50%, rgba(255,0,0,1) 51%);
}
.playerstart{
  background: radial-gradient(circle, rgba(50,205,50,1) 34%, rgba(255,255,255,1) 35%);
}
.pickup{
  background: radial-gradient(circle, rgba(255,165,0,1) 34%, rgba(255,255,255,1) 35%);
}
.barrier{
  background: orange;
}
.hazard{
  background: cyan;
}

#contextmenu{
  background-color: #999;
  text-align: center;
  position: absolute;
  /* visibility: hidden; */
}
ul{
    list-style-type: none;
    padding: 0;
    margin: 0;
}
.ctxmenu-item{
    padding: 5px;
    background-color: #999;
    border: 1px solid black;
    cursor:pointer;
    position:relative;
}
.submenu{
  position:absolute;
  top:0;  
  left:100%;
  visibility:hidden;
  width:100%;
}
.ctxmenu-item:hover{
    background-color: #bbb;
}
.ctxmenu-item:hover > .submenu{
  visibility:visible;
  background-color: #bbb;
}
ul hr{
  margin: 0;
  width: initial;
  border: none;
  background: #666;
  height: 3px;
}

.selected::after{
  content:'';
  width: 100px;
  height:100px;
  box-shadow: 0px 0px 3px 5px inset yellow;
  display:block;
  position:absolute;
  top:0;
  left:0;
}
</style>