const boardState= [
    null, null, null, null, null, null, null, null, null
];
const WinCond =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let actPlayer=0;

const cells = document.querySelectorAll("td");

cells.forEach(function(cell, index){
    cell.dataset.index = index;

    cell.onmouseover = function(){
        cell.style.backgroundColor = "#ccc";
        cell.style.transition= "1s";
    }
    cell.onmouseout = function(){
        cell.style.backgroundColor = "#fff";
    }
    cell.addEventListener("click", clicked);
});

function clicked (event){

    const index= Number(event.target.dataset.index);

    const letter= actPlayer ? "O" : "X ";

    const cell= event.target;

    cell.textContent = letter;

    boardState[index]= actPlayer;

    cell.removeEventListener("click", clicked);

    cell.onmouseover = null;

    if (hasWon()){
        window.location = "./winner.html"
    }
    if (hasDrawn()){
        window.location = "./Draw.html"
    }

    actPlayer = actPlayer ? 0 : 1;
}

function hasWon(){
    for(const cond of WinCond){
        const boardVal = cond.map(function(item){
            return boardState[item];
        });
        const PlayerPieces = boardVal.filter(function(item){
            return item === actPlayer;
        });
        if(PlayerPieces.length === 3) return true; 
    }
    return false;
}
function hasDrawn(){
    const boardCap = boardState.filter(function(item){
            return item !== null;
});
return boardCap.length === boardState.length;
}
const again = document.querySelector("#again");
if (again){
    again.onclick = (event) => {
        event.preventDefault();
        window.location = "./index.html" ;
    }
}