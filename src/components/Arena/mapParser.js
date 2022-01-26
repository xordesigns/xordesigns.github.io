const dirCodeToDirStringMap = { t: 'top', r: 'right', b: 'bottom', l: 'left' };
const tileCodeToTileMap = {};
const partialCodeToTileMap = {};
let rowStringGlobal = '';
let pos = 0;
let currentChar = '';

// row := (count? tile){3, 9} (symmetry modifiers would go here)
export function parseRow(rowString, fullTiles, partials){
    tileCodeToTileMap = createCodeToTileMap(fullTiles);
    partialCodeToTileMap = createCodeToTileMap(partials);
    rowStringGlobal = rowString;

    let parsedRow = [];

    while(currentChar){
        let count = count();
        if(count > 1){
            let parsedTile = tile();
            for (let i = 0; i < count; i++) {
                parsedRow.push(parsedTile);
            }
        } else{
            parsedRow.push(tile());
        }
    }
    
    return parsedRow;
}

function advance(){
    pos++;
    if(pos >= rowStringGlobal.length){
        currentChar = null;
    } else{
        currentChar = rowStringGlobal[pos];
    }
}

// tile := code direction? partial?
function tile(){
    let tileCode = code();
    if(!tileCode){
        return null;
    }
    let tileDirection = direction();
    let partialObject = partial();
    let tileObject = { ...tileCodeToTileMap[tileCode] };
    if(tileDirection){
        tileObject.direction = direction;
    }
    if(partialObject){
        tileObject.partial = partialObject;
    }
    return tileObject;
}

// count := 2|3|4|5|6|7|8|9
function count(){
    if(currentChar >= '2' && currentChar <= '9'){
        let number = +currentChar;
        advance();
        return number;
    } else {
        return 1;
    }
}

// code := <dynamically generated from tiles.js>
function code(){
    if(Object.keys(tileCodeToTileMap).includes(currentChar)){
        let code = currentChar;
        advance();
        return code;
    } else {
        return null;
    }
}

// direction := t|r|b|l
function direction(){
    if(Object.keys(dirCodeToDirStringMap).includes(currentChar)){
        let direction = dirCodeToDirStringMap[currentChar];
        advance();
        return direction;    
    } else {
        return null;
    }
}

// partial := LPAR partialstring RPAR
function partial(){
    if(currentChar == '('){
        advance();
        let partialObject = {top: '', right: '',bottom: '', left: ''};
        let partialCodes = partialstring();
        switch(partialCodes.length){
            case 1:
                partialObject.top = partialCodeToTileMap[partialCodes[0]];
                partialObject.right = partialObject.top;
                partialObject.bottom = partialObject.top;
                partialObject.left = partialObject.top;
                break;
            case 2:
                partialObject.top = partialCodeToTileMap[partialCodes[0]];
                partialObject.bottom = partialObject.top;
                partialObject.right = partialCodeToTileMap[partialCodes[1]];
                partialObject.left = partialObject.right;
                break;
            case 4:
                partialObject.top = partialCodeToTileMap[partialCodes[0]];
                partialObject.right = partialCodeToTileMap[partialCodes[1]];
                partialObject.bottom = partialCodeToTileMap[partialCodes[2]];
                partialObject.left = partialCodeToTileMap[partialCodes[3]];
                break;
            default:
                return null;
        }
        return partialObject;
    } else {
        return null;
    }
}

// partialstring := partialcode | partialcode{2} | partialcode{4}
function partialString(){
    let partialCodes = '';

    while(currentChar !== ')'){
        let code = partialCode();
        if(code){
            partialCodes = partialCodes.concat(code);
        } else {
            return null;
        }
    }

    advance();
    return partialCodes;
}

// partialcode := <dynamically generated from tiles.js>
function partialCode(){
    if(Object.keys(partialCodeToTileMap).includes(currentChar)){
        let code = currentChar;
        advance();
        return code;
    } else {
        return null;
    }
}

function createCodeToTileMap(tileObject){
    let codeToTileMap = {};
    for(let tile of Object.values(tileObject)){
        codeToTileMap[tile.code] = {...tile};
    }
    return codeToTileMap;
}