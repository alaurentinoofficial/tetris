'use strict';

let board;
let ctx;
let canvas;


function play() {
    let piece = new PieceFactory(ctx);

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

        moves[event.keyCode](board.piece);
    }
});

const moves = {
    [KEY.UP]: (p) => p.rotate(),
    [KEY.LEFT]:  p => p.move(p.startPositionX - 1, p.startPositionY),
    [KEY.RIGHT]: p => p.move(p.startPositionX + 1, p.startPositionY),
    [KEY.DOWN]:  p => p.move(p.startPositionX, p.startPositionY + 1)
};

function animate(now = 0) {
    time.elapsed = now - time.start;
    if (time.elapsed > time.level) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
    board.draw();
    requestId = requestAnimationFrame(animate);
  }
};
