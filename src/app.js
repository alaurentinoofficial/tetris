'use strict';

let board;
let pawn;
let next_piece;
let mainContext;
let nextContext;
let scoreTxt;

async function play() {
    board = new Board();
    pawn = new Pawn(board);
    SetScore(board.score);

    for(;;) {
        let piece = {...next_piece}
        pawn.Setup(piece, 3, 0);
        console.log(pawn.__setup);

        while(JSON.stringify(piece.shape) == JSON.stringify(next_piece.shape))
            next_piece = new PieceFactory();

        await gravity();

        pawn.ReleaseTiles();
        board.ValidateFillOneLine();
        
        SetScore(board.score);
    }
}

function Clear() {
    mainContext.clearRect(0, 0, mainContext.canvas.width, mainContext.canvas.height);
    nextContext.clearRect(0, 0, nextContext.canvas.width, nextContext.canvas.height);
}

function Draw() {
    pawn.Draw(mainContext);
    board.Draw(mainContext);
    next_piece.Draw(nextContext, 3, 0);
}

async function gravity() {
    let iterations = 0;

    while(moves[KEY.DOWN](pawn)) {
        Clear();
        Draw();
        await sleep(1000);
        iterations += 1;
    }

    return iterations;
}

function SetScore(point) {
    scoreTxt.innerHTML = point; 
}

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

    next_piece = new PieceFactory();
    next_piece.Draw(nextContext, 3, 0);
};

document.addEventListener('keydown', event => {
    if(moves[event.keyCode] && pawn) {
        event.preventDefault();
        moves[event.keyCode](pawn);
        Clear();
        Draw();
    }
});

const moves = {
    [KEY.UP]: (p) => p.Rotate(),
    [KEY.LEFT]:  p => p.AddForce(-1,0),
    [KEY.RIGHT]: p => p.AddForce(1,0),
    [KEY.DOWN]:  p => p.AddForce(0,1)
};