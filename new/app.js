'use strict';

let board;
let ctx;
let canvas;

function play() {
    let l = new Piece(ctx, [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ], "#00c3ff");

    let J = new Piece(ctx, [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ], "#ff6f00");

    let L = new Piece(ctx, [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ], "#ff00b3");

    let O = new Piece(ctx, [
        [1, 1],
        [1, 1]
    ], "#fffb00");

    let S = new Piece(ctx, [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ], "#ff0000");

    let Z = new Piece(ctx, [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ], "#00ff5e");

    let T = new Piece(ctx, [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ], "#c300ff");

    let pieces = [l, J, L, O, S, Z, T]
    let piece = pieces[Math.floor(Math.random() * (pieces.length))];

    board = new Board(ctx);
    piece.clear();
    piece.draw();
    
    board.piece = piece;
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

        let p = moves[event.keyCode](board.piece);

        if (board.valid(p)) {    
            // If the move is valid, move the piece.
            board.piece.move(p);
        }
        else {
            board.piece.shape = p.shape;
            board.piece.clear();
            board.piece.draw();
        }
    }
});

const moves = {
    [KEY.UP]: (p) => board.rotate(p),
    [KEY.LEFT]:  p => ({ ...p, startPositionX: p.startPositionX - 1 }),
    [KEY.RIGHT]: p => ({ ...p, startPositionX: p.startPositionX + 1 }),
    [KEY.DOWN]:    p => ({ ...p, startPositionY: p.startPositionY + 1 })
};