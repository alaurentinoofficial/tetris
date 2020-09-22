'use strict';

let board;
let ctx;
let canvas;

function gravity() {
    setTimeout(() => {
        if (!moves[KEY.DOWN](board.piece))
            return
        
        gravity();
    }, 1000);
}

function play() {
    let piece = new PieceFactory(ctx);

    board = new Board(ctx);
    piece.clear();
    piece.draw();
    board.piece = piece;

    gravity();
}

window.onload = () => {
    canvas = document.getElementById('board');
    ctx = canvas.getContext('2d');

    // Calculate size of canvas from constants.
    ctx.canvas.width = COLS * BLOCK_SIZE;
    ctx.canvas.height = ROWS * BLOCK_SIZE;

    // Scale blocks
    ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
};

document.addEventListener('keydown', event => {
    if(moves[event.keyCode]) {
        // Stop the event from bubbling.
        event.preventDefault();

        moves[event.keyCode](board.piece);
    }
});

const moves = {
    [KEY.UP]: (p) => p.rotate(),
    [KEY.LEFT]:  p => p.move(p.startPositionX - 1, p.startPositionY),
    [KEY.RIGHT]: p => p.move(p.startPositionX + 1, p.startPositionY),
    [KEY.DOWN]:  p => p.move(p.startPositionX, p.startPositionY + 1)
};
