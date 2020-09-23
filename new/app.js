'use strict';

let board;
let ctx;
let canvas;
let next_canvas;
let next_ctx;
let next_piece;
var all_pieces = [];

function clear() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    next_ctx.clearRect(0, 0, next_ctx.canvas.width, next_ctx.canvas.height);
    board.clear();
}

function draw() {
    next_piece.refreshIsNextPiece(true);
    next_piece.draw();
    all_pieces.forEach(x => {
        x.refreshIsNextPiece(false);
        x.draw();
        board.draw(x);
    });
}

async function play() {
    board = new Board(ctx);
    board.restart();

    for(;;) {
        clear()

        let piece = next_piece;
        piece.ctx = ctx;
        board.piece = piece;

        all_pieces.push(piece);

        while (JSON.stringify(next_piece.shape) == JSON.stringify(piece.shape))
            next_piece = new PieceFactory(next_ctx, board);

        await gravity(piece);
    }
}

async function gravity(p) {
    while(moves[KEY.DOWN](p)) {
        clear();
        draw();
        await sleep(1000);
    }
}

window.onload = () => {
    canvas = document.getElementById('board');
    ctx = canvas.getContext('2d');
    
    // Calculate size of canvas from constants.
    ctx.canvas.width = COLS * BLOCK_SIZE;
    ctx.canvas.height = ROWS * BLOCK_SIZE;

    // Scale blocks
    ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

    next_canvas = document.getElementById('next');
    next_ctx = next_canvas.getContext('2d');

    next_ctx.canvas.width = 9 * BLOCK_SIZE;
    next_ctx.canvas.height = 4 * BLOCK_SIZE;

    next_ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
    
    next_piece = new PieceFactory(next_ctx, board);
    next_piece.refreshIsNextPiece(true);
    next_piece.clear();
    next_piece.draw();
};

document.addEventListener('keydown', event => {
    if(moves[event.keyCode]) {
        // Stop the event from bubbling.
        event.preventDefault();

        moves[event.keyCode](board.piece);

        clear();
        draw();
    }
});

const moves = {
    [KEY.UP]: (p) => p.rotate(),
    [KEY.LEFT]:  p => p.move(p.startPositionX - 1, p.startPositionY),
    [KEY.RIGHT]: p => p.move(p.startPositionX + 1, p.startPositionY),
    [KEY.DOWN]:  p => p.move(p.startPositionX, p.startPositionY + 1)
};

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}
