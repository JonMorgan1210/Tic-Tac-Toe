window.onload = () => {
    main()
}

let grid = Array.from(Array(3), () => new Array(3).fill(""));
let resetBtn;
let btnLst;
let p1Count = 0;
let p2Count = 0;
document.querySelector('#o-wins').innerHTML = p2Count;
document.querySelector('#x-wins').innerHTML = p1Count;

//turn object
const turn = {
    currentTurn: "X",
    cycleTurn() {
        this.currentTurn == "X" ? this.currentTurn = "O" : this.currentTurn = "X"
    }
}



function main() {

    btnLst = document.querySelectorAll('#game-grid input');
    let replayBtn = document.querySelector('#replay');
    resetBtn = document.querySelector('#reset');

    //create grid and enter values in grid when pressed
    let i = 0;
    let j = 0;
    btnLst.forEach((btn) => {
        if (j == 3) {
            j = 0;
            i++;
        }
        grid[i][j] = btn;
        j++;  
        btn.onclick = () => {
            btn.value = turn.currentTurn
            turn.cycleTurn();
            btn.disabled = true
            checkWin()
        }  
    })

    //reset the board and clear score
    resetBtn.onclick = () => {
        clearBoard();
        turn.currentTurn = "X";
        p1Count = 0;
        p2Count = 0;
        document.querySelector('#o-wins').innerHTML = p2Count;
        document.querySelector('#x-wins').innerHTML = p1Count;
    }

    //replay after win
    replayBtn.onclick = () => {
        clearBoard();
        document.querySelector("#game-grid").style.opacity = 1;
        document.querySelector("#win-screen").style.display = "none";
        turn.currentTurn = "X";
    }
}

//check if there was a win
function checkWin() {

    //check rows
    grid.forEach((row) => {
        let rowStr = row.map((elem) => {
            if (elem == "") {
                return elem;
            }
            return elem.value;
        }).join("");

        winningStr(rowStr);
    })

    //check columns
    for (let i = 0; i < 3; i++) {
        let colStr = "" 
        for (let j = 0; j < 3; j++) {
            colStr += grid[j][i] == "" ? "" : grid[j][i].value;
        }

        winningStr(colStr);
    }

    //check left to right diagnol
    let diagStr = ""
    for (let i = 0; i < 3; i++) {
        diagStr += grid[i][i] == "" ? "" : grid[i][i].value
    }
    winningStr(diagStr);

    //check right to left diagnol
    diagStr = ""
    for (let i = 2; i>=0; i--) {
        diagStr += grid[i][i] == "" ? "" : grid[i][i].value
    }
    winningStr(diagStr);

}

function winningStr(str) {
    if (str == "XXX") {
        p1Count++;
        winDisplay("X");
    } else if (str == "OOO") {
        p2Count++;
        winDisplay("O");
    }
}

//clear the board
function clearBoard() {
    btnLst.forEach((btn) => {
        btn.value = "";
        btn.disabled = false; 
    })
}

//display winner and replay button
function winDisplay (winner) {
    document.querySelector("#game-grid").style.opacity = .5;
    document.querySelector("#win-screen").style.display = "block";
    document.querySelector('#win-screen pre').innerHTML = winner + " WINS!\nPress replay to play again!";
    document.querySelector('#o-wins').innerHTML = p2Count;
    document.querySelector('#x-wins').innerHTML = p1Count;
}
