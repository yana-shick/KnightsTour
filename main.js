//  draw a board of 64 tiles

const gameboard = document.querySelector('#board'); // chess board for DOM
let indNumber = 0;  // index of numbers on chessboard
let indLetter = 0;  // index of letters on chessboard
let isWhite = true;

for (let i = 1; i <= 64; i++) {
    // DOM: create div for a tile, set white or black, set id (for example: 00, 01, 02...)
    let tile = document.createElement('div');
    tile.classList.add('tile');
    if (!isWhite) {
        tile.classList.add('black');
    }
    tile.setAttribute('id', indNumber.toString() + indLetter.toString());

    isWhite = !isWhite;
    indLetter++;
    // every 8 loops preserve color of the tile
    // increase index of numbers
    // reset index of letters
    if (i % 8 === 0) {
        isWhite = !isWhite;
        indNumber++;
        indLetter = 0;
    }
    gameboard.appendChild(tile);
}


//  build numbers and letters indication lines

const numbers = document.querySelector('#numbers');
const letters = document.querySelector('#letters');

let letter = 'ABCDEFGH';

for (let i = 1; i <= 8; i++) {
    // DOM
    let numberli = document.createElement('li');
    numberli.textContent = i;
    numbers.appendChild(numberli);
    let letterli = document.createElement('li');
    letterli.textContent = letter.charAt(i - 1);
    letters.appendChild(letterli);
}


//  ---------------------------------------------------------------------------------------------

//  drugging a knight to a chess board

let drugKnight = document.querySelector("#drugKnight"); // knught figure that i can drug
let boardWidthDesk = 800;
let boardWidthMovile = 280;

let boardX = document.getElementById('board').offsetTop;  // coordinates of a chess board
let boardY = document.getElementById('board').offsetLeft; // coordinates of a chess board

let eachTileCoordX = boardX;  // coordianate of a tile to check if dragged knight is above
let eachTileCoordY = boardY;  // coordianate of a tile to check if dragged knight is above

let startN;  // number coordinates from id of a first tile
let startL;  // letter coordinates from id of a first tile

let interval;  // length of step from one tile to neighboring one, width and hight of a tile


//  for a desktop

//  disable this build in method
drugKnight.ondragstart = function () {
    return false;
};
//  when mouse is preesed on a knight do all the drugging
drugKnight.onmousedown = function (event) {
    // steping into a func automaticly indicates that i using desktop
    interval = 80;
    // console.log('onmousedown triggered');
    function moveAt(pageX, pageY) {
        // assign to drugKnight new coordinates with a shift
        // to make a ancor of coordinates to be in a middle of a knight
        drugKnight.style.left = pageX - drugKnight.offsetWidth / 2 + 'px';
        drugKnight.style.top = pageY - drugKnight.offsetHeight / 2 + 'px';
    }
    // when mouse is moving grab a mouse cursor coordinates
    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }
    document.addEventListener('mousemove', onMouseMove);
    // when mouse is released
    drugKnight.onmouseup = function () {
        // check if a knight is in a board area
        // else do nothing
        let y = parseInt(drugKnight.style.left) + drugKnight.offsetWidth / 2;
        let x = parseInt(drugKnight.style.top) + drugKnight.offsetHeight / 2;
        if ((y > boardY && y < boardY + boardWidthDesk) && (x > boardX && x < boardX + boardWidthDesk)) {
            // snap to a board
            for (let i = 0; i < 8; i++) {
                // check if position matched a tile
                if (y >= eachTileCoordY && y <= eachTileCoordY + interval) {
                    drugKnight.style.left = eachTileCoordY + 'px';
                    // calculate id of a start tile
                    startL = (eachTileCoordY - boardY) / interval;
                }
                eachTileCoordY += interval;
                if (x >= eachTileCoordX && x <= eachTileCoordX + interval) {
                    drugKnight.style.top = eachTileCoordX + 'px';
                    // calculate id of a start tile
                    startN = (eachTileCoordX - boardX) / interval;
                }
                eachTileCoordX += interval;

            }
        }
        // stop listening to a mouse move
        document.removeEventListener('mousemove', onMouseMove);
        drugKnight.onmouseup = null;
        // restart coordinate of a tiles for a future dragging
        eachTileCoordX = boardX;
        eachTileCoordY = boardY;
    };
}


//  for mobile

drugKnight.addEventListener('touchmove', (ev) => {
    // steping into a func automaticly indicates that i using mobile
    interval = 35;
    // grab the location of the touch
    let touchLocation = ev.targetTouches[0];
    // assign to drugKnight new coordinates with a shift
    // to make a ancor of coordinates to be in a middle of a knight
    drugKnight.style.left = touchLocation.pageX - drugKnight.offsetWidth / 2 + 'px';
    drugKnight.style.top = touchLocation.pageY - drugKnight.offsetHeight / 2 + 'px';

})

drugKnight.addEventListener('touchend', (ev) => {
    // check if a knight is in a board area
    // else do nothing
    // current position when dropped with shift 
    // to make a ancor of coordinates to be in a middle of a knight
    let y = parseInt(drugKnight.style.left) + drugKnight.offsetWidth / 2;
    let x = parseInt(drugKnight.style.top) + drugKnight.offsetHeight / 2;
    if ((y > boardY && y < boardY + boardWidthMovile) && (x > boardX && x < boardX + boardWidthMovile)) {
        for (let i = 0; i < 8; i++) {
            // check if position matched any tile
            if (y >= eachTileCoordY && y <= eachTileCoordY + interval) {
                drugKnight.style.left = eachTileCoordY + 'px';
                // calculate id of a start tile
                startL = (eachTileCoordY - boardY) / interval;
            }
            eachTileCoordY += interval;
            if (x >= eachTileCoordX && x <= eachTileCoordX + interval) {
                drugKnight.style.top = eachTileCoordX + 'px';
                // calculate id of a start tile
                startN = (eachTileCoordX - boardX) / interval;
            }
            eachTileCoordX += interval;
        }
    }
    // restart coordinate of a tiles for a future dragging
    eachTileCoordX = boardX;
    eachTileCoordY = boardY;
})


//  ---------------------------------------------------------------------------------------------

//  support

//  two dementional array that represents chessboard
let result = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];
//  8 possible steps for knight figure
let eightSteps = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1]
];
//  count how many possible steps there are from given tile
let countFunc = (a, b) => {
    let count = 0;
    // do 8 steps
    for (let j = 0; j < eightSteps.length; j++) {
        let aStep = a + eightSteps[j][0];
        let bStep = b + eightSteps[j][1];
        // check if coordinate is in parametor of 8*8 chessboard
        // and the tale is free
        if (aStep > -1 && aStep < 8 && bStep > -1 && bStep < 8 && result[aStep][bStep] == 0) {
            count++;;
        }
    }
    return count;
}
//  again button
let again = () => {
    location.reload();
}


//  ---------------------------------------------------------------------------------------------

//  walk knight on chess board

//  is my desk is clear, i can run knight only one time
let isClear = true;

async function start() {
    if (isClear) {
        //mark first tile on my two dementional array 
        //coordinates are from droped knight
        result[startN][startL] = 1;
        //write a number inside first tile
        document.getElementById(startN.toString() + startL.toString()).innerHTML = 1;
        //set transition property to a knight for a smooth animation
        drugKnight.style.transition = 'left 0.4s, top 0.4s';
        //wait for smooth start
        await new Promise(r => setTimeout(r, 600));

        //do all 63 steps
        await goKnight(startN, startL);

        //knight return home to a menu
        drugKnight.style.top = document.getElementById('knight-home').offsetTop + 'px';
        drugKnight.style.left = document.getElementById('knight-home').offsetLeft + 'px';
        await new Promise(r => setTimeout(r, 600));

        //enable start button
        isClear = false;
    }
}

async function goKnight(n, l) {
    //do 63 movies
    for (let x = 1; x <= 64; x++) {
        let bestStep = 0;
        //start with imposible amount of steps for
        //defining the minimun
        let minCount = 9;
        // do 8 steps and define best step
        //best step is the step that have a minimum future steps
        for (let i = 0; i < eightSteps.length; i++) {
            let nStep = n + eightSteps[i][0];
            let lStep = l + eightSteps[i][1];
            // if good do another 8 steps and count
            //check if coordinate is in parametor of 8*8 chessboard
            //and the tale is free
            if (nStep > -1 && nStep < 8 && lStep > -1 && lStep < 8 && result[nStep][lStep] == 0) {
                let stepCount = countFunc(nStep, lStep);
                //define best step
                if (stepCount < minCount) {
                    minCount = stepCount;
                    bestStep = i;
                }
            }
        }
        //do step only if there is not end of the board:
        //minCount varible is not changed
        if (minCount < 9) {
            n += eightSteps[bestStep][0];
            l += eightSteps[bestStep][1];
            console.log(`round / step number: ${x}; number coor: ${n} and letter coor: ${l} `);
            result[n][l] = x + 1;
            //animate knight
            drugKnight.style.top = (interval * n) + boardX + 'px';
            drugKnight.style.left = (interval * l) + boardY + 'px';
            await new Promise(r => setTimeout(r, 500));
            //write a number on a chess board
            document.getElementById(n.toString() + l.toString()).innerHTML = x + 1;
        }
        else {
            break;
        }
    }
    printFunc();
}

//  print to console the steps on the board
function printFunc() {
    let print = '';
    for (let a = 0; a < 8; a++) {
        for (let b = 0; b < 8; b++) {
            if (result[a][b] == 0) {
                print += ' !!';
            }
            else if (result[a][b] > 9) {
                print += " " + result[a][b];
            }
            else {
                print += " 0" + result[a][b];
            }
        }
        print += '\n';
    }
    console.log(print);
}


