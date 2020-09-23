'use strict';

let board;
let pawn;
let next_piece;
let mainContext;
let nextContext;
let scoreTxt;
let gameState;
let mainSoundTrack;
let gameOverSoundTrack;
let gameOverModal;

async function play() {
    board = new Board();
    pawn = new Pawn(board);
    SetState(GameState.GAMING);
    SetGameOverModalState(false);

    mainSoundTrack.play();

    while(GetState() == GameState.GAMING) {
        let piece = {...next_piece}
        pawn.Setup(piece, 3, 0);

        while(JSON.stringify(piece.shape) == JSON.stringify(next_piece.shape))
            next_piece = new PieceFactory();

        await Gravity();

        if(GetState() == GameState.GAMING) {
            try { pawn.ReleaseTiles(); }
            catch(e) { GameOver(); return; }

            board.ValidateFillOneLine();
            
            Clear();
            board.Draw(mainContext);
            
            SetScore(board.score);
        }
    }
}

function pauseResume() {
    if (GetState() == GameState.PAUSED) {
        SetState(GameState.GAMING);
        mainSoundTrack.play();
    }
    else if (GetState() == GameState.GAMING) {
        SetState(GameState.PAUSED);
        mainSoundTrack.pause();
    }
}

function stop() {
    SetState(GameState.STOPED);
    Reset();
}

function exit() {
    gameOverSoundTrack.pause();
    gameOverSoundTrack.currentTime = 0;
    SetGameOverModalState(false);
}

async function GameOver() {
    mainSoundTrack.pause();
    mainSoundTrack.currentTime = 0;
    gameOverSoundTrack.play();
    SetGameOverModalState(true);
    stop();
}

function Reset() {
    mainSoundTrack.pause();
    mainSoundTrack.currentTime = 0;
    SetScore(0);
    Clear();
    next_piece = new PieceFactory();
    next_piece.Draw(nextContext, 3, 0);
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

function DrawFrame() {
    Clear();
    Draw();
}

async function Gravity() {
    let iterations = 0;

    let keepMoving = PressKeyListeners[KEY.DOWN]();

    while(keepMoving && GetState() != GameState.STOPED) {
        DrawFrame();

        await sleep(1000);
        
        while(GetState() != GameState.GAMING && GetState() != GameState.STOPED)
            await sleep(300);

        iterations += 1;
        keepMoving = PressKeyListeners[KEY.DOWN]();
    }

    return iterations;
}

function SetScore(point) {
    scoreTxt.innerHTML = point; 
}

function SetState(state) {
    gameState.className = state;
}

function GetState() {
    return gameState.className;
}

function SetGameOverModalState(state) {
    if (state)
        gameOverModal.className = "active";
    else
        gameOverModal.className = "";
}

window.onload = () => {
    scoreTxt = document.getElementById("score");
    gameState = document.getElementById("gameState");
    mainSoundTrack = document.getElementById("main-soundtrack");
    mainSoundTrack.loop = true;
    mainSoundTrack.volume = 0.4;

    gameOverSoundTrack = document.getElementById("damage-soundtrack");
    gameOverModal = document.getElementById("game-over-modal");

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

    Reset();
};

document.addEventListener('keydown', event => {
    if(PressKeyListeners[event.keyCode] && pawn) {
        event.preventDefault();
        PressKeyListeners[event.keyCode]();
        DrawFrame();
    }
});

const PressKeyListeners = {
    [KEY.UP]:    () => GetState() == GameState.GAMING ? pawn.Rotate() : true,
    [KEY.LEFT]:  () => GetState() == GameState.GAMING ? pawn.AddForce(-1,0) : true,
    [KEY.RIGHT]: () => GetState() == GameState.GAMING ? pawn.AddForce(1,0) : true,
    [KEY.DOWN]:  () => GetState() == GameState.GAMING ? pawn.AddForce(0,1) : true
};