'use strict';

let board;
let pawn;
let next_piece;
let mainContext;
let nextContext;
let scoreTxt;

function nextPiece() {
    let I = [[
        [1, 1, 1, 1]
    ], new Tile("#00c3ff", "#0a9ac7", "rgba(0, 195, 255, 0.4)")];
    
    let J = [[
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ], new Tile("#ff6f00", "#d16008", "rgba(255, 111, 0, 0.4)")];
    
    let L = [[
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ], new Tile("#ff00b3", "#cc0892", "rgba(255, 0, 179, 0.4)")];
    
    let O = [[
        [1, 1],
        [1, 1]
    ], new Tile("#fffb00", "#d1ce08", "rgba(255, 251, 0, 0.4)")];
    
    let S = [[
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ], new Tile("#e3412b", "#ba2f1c", "rgba(227, 65, 43, 0.5)")];
    
    let Z = [[
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ], new Tile("#00ff5e", "#08d152", "rgba(0, 255, 94, 0.4)")];
    
    let T = [[
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ], new Tile("#c300ff", "#9e08cc", "rgba(195, 0, 255, 0.4)")];
    
    let pieces = [I, J, L, O, S, Z, T]

    return pieces[Math.floor(Math.random() * (pieces.length))];
}

async function play() {
    board = new BoardV2();
    pawn = new Pawn(board);

    for(;;) {
        let piece = next_piece;
        pawn.Setup(piece[0], piece[1], 3, 0);

        next_piece = nextPiece();

        await gravity(pawn);

        pawn.ReleaseTiles();
        board.ValidateFillOneLine();
        
        SetScore(board.score);
    }
}

async function gravity() {
    while(moves[KEY.DOWN](pawn)) {
        clear();
        draw();
        await sleep(1000);
    }
}

function clear() {
    mainContext.clearRect(0, 0, mainContext.canvas.width, mainContext.canvas.height);
    nextContext.clearRect(0, 0, nextContext.canvas.width, nextContext.canvas.height);
}

function draw() {
    pawn.Draw(mainContext);
    board.Draw(mainContext);
}


document.addEventListener('keydown', event => {
    if(moves[event.keyCode]) {
        event.preventDefault();
        moves[event.keyCode](pawn);
        clear();
        draw();
    }
});

window.onload = () => {
    scoreTxt = document.getElementById("score");

    let mainCanvas = document.getElementById('board');
    mainContext = mainCanvas.getContext('2d');
    
    mainContext.canvas.width = COLS * BLOCK_SIZE;
    mainContext.canvas.height = ROWS * BLOCK_SIZE;

    mainContext.scale(BLOCK_SIZE, BLOCK_SIZE);

    let nextCanvas = document.getElementById('next');
    nextContext = nextCanvas.getContext('2d');

    nextContext.canvas.width = 9 * BLOCK_SIZE;
    nextContext.canvas.height = 4 * BLOCK_SIZE;

    nextContext.scale(BLOCK_SIZE, BLOCK_SIZE);

    next_piece = nextPiece();
};

function SetScore(point) {
    scoreTxt.innerHTML = point; 
}

const moves = {
    [KEY.UP]: (p) => p.Rotate(),
    [KEY.LEFT]:  p => p.AddForce(-1,0),
    [KEY.RIGHT]: p => p.AddForce(1,0),
    [KEY.DOWN]:  p => p.AddForce(0,+1)
};