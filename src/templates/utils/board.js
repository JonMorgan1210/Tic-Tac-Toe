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
            btn.disabled = true;
            checkWin();
            checkDraw();
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
    let diagStr = "";
    let diagStrtwo = "";
    for (let i = 0; i < 3; i++) {
        diagStr += grid[i][i] == "" ? "" : grid[i][i].value;
        let j;
        if(i == 0){
            j = 2;
        } else if(i == 1) {
            j = 1;
        } else {
            j = 0;
        }

        diagStrtwo += grid[i][j] == "" ? "" : grid[i][j].value;
    }
    winningStr(diagStr);
    winningStr(diagStrtwo);

}

function checkDraw() {
    if (grid.every((row) => {return (row.every((elem) => {return elem.value != ""}))})) {
        winDisplay("DRAW!");
    }
}

//check possible winning string
function winningStr(str) {
    if (str == "XXX") {
        p1Count++;
        winDisplay("X WINS!");
    } else if (str == "OOO") {
        p2Count++;
        winDisplay("O WINS!");
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
    document.querySelector('#win-screen pre').innerHTML = winner + "\nPress replay to play again!";
    document.querySelector('#o-wins').innerHTML = p2Count;
    document.querySelector('#x-wins').innerHTML = p1Count;
    log(winner);
}

async function log(winner) {
    const url = `http://localhost:8080/log`
    let data = {winner: winner};
    await fetch(url, {
        method: "POST",
        headers: {'Content-Type': 'application/json; charset=UTF-8'}, 
        body: JSON.stringify(data)
    });
}

