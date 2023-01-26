var gifts = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;
var moves = 0;

var currTile;
var otherTile;


window.onload = function() {
    startGame();

    //1/10th of a second
    window.setInterval(function(){
        crushGift();
        slideGift();
        generateGift();
        moveCount();
    }, 100);
}

function randomGift() {
    return gifts[Math.floor(Math.random() * gifts.length)]; //0 - 5.99
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // <img id="0-0" src="./images/Red.png">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomGift() + ".png";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); //click on a gift, initialize drag process
            tile.addEventListener("dragover", dragOver);  //clicking on gift, moving mouse to drag the candy
            tile.addEventListener("dragenter", dragEnter); //dragging gift onto another candy
            tile.addEventListener("dragleave", dragLeave); //leave gift over another candy
            tile.addEventListener("drop", dragDrop); //dropping a gift over another candy
            tile.addEventListener("dragend", dragEnd); //after drag process completed, we swap gifts

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    console.log(board);
}

function dragStart() {
    //this refers to tile that was clicked on for dragging
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    //this refers to the target tile that was dropped on
    otherTile = this;
}

function dragEnd() {

    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }

    let currCoords = currTile.id.split("-"); // id="0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;

    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if (!validMove) {
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;    
        }
    }
}

function crushGift() {
    //crushFive();
    //crushFour();
    crushThree();
    document.getElementById("score").innerText = score;

}

function moveCount() {
    document.getElementById("moves").innerText = moves;
}

function crushThree() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let gift1 = board[r][c];
            let gift2 = board[r][c+1];
            let gift3 = board[r][c+2];
            if (gift1.src == gift2.src && gift2.src == gift3.src && !gift1.src.includes("blank")) {
                gift1.src = "./images/blank.png";
                gift2.src = "./images/blank.png";
                gift3.src = "./images/blank.png";
                score += 30;
                //moves += 1;
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let gift1 = board[r][c];
            let gift2 = board[r+1][c];
            let gift3 = board[r+2][c];
            if (gift1.src == gift2.src && gift2.src == gift3.src && !gift1.src.includes("blank")) {
                gift1.src = "./images/blank.png";
                gift2.src = "./images/blank.png";
                gift3.src = "./images/blank.png";
                score += 30;
                //moves += 1;
            }
        }
    }
}

function checkValid() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let gift1 = board[r][c];
            let gift2 = board[r][c+1];
            let gift3 = board[r][c+2];
            if (gift1.src == gift2.src && gift2.src == gift3.src && !gift1.src.includes("blank")) {
                moves += 1;
                return true;
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let gift1 = board[r][c];
            let gift2 = board[r+1][c];
            let gift3 = board[r+2][c];
            if (gift1.src == gift2.src && gift2.src == gift3.src && !gift1.src.includes("blank")) {
                moves += 1;
                return true;
            }
        }
    }

    return false;
}

//flytta
function slideGift() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = columns-1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }

        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./images/blank.png";
        }
    }
}
//Spawna
function generateGift() {
    for (let c = 0; c < columns;  c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./images/" + randomGift() + ".png";
        }
    }
}