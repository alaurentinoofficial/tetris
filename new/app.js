'use strict';

let board;
let ctx;
let canvas;


function play() {
    let piece = new Piece(ctx, [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0]
        ], "rgba(0,255,0,0.5)");
    
    board = new Board(ctx);
    piece.clear();
    piece.draw();
    
    board.piece = piece;
    time = { start: performance.now(), elapsed: 0, level: LEVEL[account.level] };
    animate();
    
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

function animate(now = 0) {
    time.elapsed = now - time.start;
    if (time.elapsed > time.level) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
    board.draw();
    requestId = requestAnimationFrame(animate);
  }
};