/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
var count = 0;

function initializeGrid() {
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';

    for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum % 2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if (gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        if (!isAvailbleText(rowIdx, colIdx)) {
            let t = document.getElementsByClassName("columnsStyle")[0];
            content = t.children[colIdx].children[rowIdx].innerText;
        }

        rowDivs = rowDivs + '<div colIdx="' + colIdx + '" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    if (isAvailble(this)) {
        let newValue = 1;
        grid[colIdx][rowIdx] = newValue;
        renderMainGrid();
        count++;
        checkForWin(rowIdx, colIdx);
        doCompMove();
        addClickHandlers();
    } else {
        console.log("This place is fulled already");
    }

}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}
function doCompMove() {
    var found = false;
    while (!found) {
        let row = Math.floor(Math.random() * 3);
        let col = Math.floor(Math.random() * 3);
        if (isAvailbleText(row, col)) {
            found = true;
            doMove(row, col);
            count++;
            checkForWin(row, col);
        } else {
            found = true;
        }
    }
}
function isAvailble(dt) {
    return dt.innerText.length > 0 ? false : true;
}
function isAvailbleText(row, col) {
    let t = document.getElementsByClassName("columnsStyle")[0];
    if (t == undefined) {
        return true
    } else {
        return t.children[col].children[row].innerText.length > 0 ? false : true;
    }

}
function doMove(row, col) {
    let t = document.getElementsByClassName("columnsStyle")[0];
    if (isAvailbleText(row, col)) {
        t.children[col].children[row].innerText = "O";
    }
}
function isDone(row, col, move) {
    // Row Wise
    for (let i = 0; i < grid.length; i++) {
        const element = grid[i];
        if ((grid[i][0] == grid[i][1]) == 1 && (grid[i][0] == grid[i][2]) == 1) {
            return true;
        }
    }


    // Column Wise
    for (let i = 0; i < grid.length; i++) {
        if ((grid[0][i] == grid[1][i]) == 1 && (grid[0][i] == grid[2][i]) == 1) {
            return true;
        }
    }

    // Diagonal
    if ((grid[0][0] == grid[1][1] == grid[2][2]) == 1) {
        return true;
    }

    if ((grid[0][2] == grid[1][1] == grid[2][0]) == 1) {
        return true;
    }

    return false;
}
function checkForWin(row, col) {
    if (count < 5) {
        return;
    }
    if (isDone(row, col, 'X')) {
        Tovictory();
    } else if (isDone(row, col, 'O')) {
        Todefeat();
    } else if (count == 9) {
        Todraw();
    }
}
function Todraw() {
    alert("It's Draw,Both played really well");
    reset();
    location.reload();
}
function Tovictory() {
    alert('You win!, wow');
    reset();
    location.reload();
}
function Todefeat() {
    alert("You lost! Better luck next time!");
    reset();
    location.reload();
}
function reset() {
    count = 0;
}
initializeGrid();
renderMainGrid();
addClickHandlers();
