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
let score = 0;

function AddScore(value) {
    score += value;
    SetScore(score);
}

async function play() {
    SetGameOverModalState(false);

    GameManager.GetInstance().Start();
    AudioMixer.GetInstance().GetAudios()["gameOver"].Stop();
    AudioMixer.GetInstance().GetAudios()["main"].Play();

    while(true) {
        // Set the new Piece into Pawn Controller
        let piece = {...next_piece}
        GameManager.GetInstance().GetPawn().SetPiece(piece, 3, 0);

        console.log(GameManager.GetInstance().GetPawn().shape)

        // Wait the next random piece be different than actual
        while(JSON.stringify(piece.shape) == JSON.stringify(next_piece.shape))
            next_piece = new PieceFactory();

        // Check if the game alrady ended
        if (!await GravityThread()) {
            return;
        }
        
        // Check if the Game Over
        try { GameManager.GetInstance().GetPawn().ReleaseTiles(); }
        catch(e) { GameOver(); return; }

        // Run check to gets score
        GameManager.GetInstance().GetBoard().ValidateFillOneLine(AddScore);
        
        Clear();
        Draw();
    }
}

function pauseResume() {
    if (GameManager.GetInstance().GetState() == GameState.PAUSED) {
        GameManager.GetInstance().SetState(GameState.GAMING);
        AudioMixer.GetInstance().GetAudios()["main"].Play();
    }
    else if (GameManager.GetInstance().GetState() == GameState.GAMING) {
        GameManager.GetInstance().SetState(GameState.PAUSED);
        AudioMixer.GetInstance().GetAudios()["main"].Pause();
    }
}

function stop() {
    GameManager.GetInstance().SetState(GameState.STOPED);
}

function exit() {
    stop();
    AudioMixer.GetInstance().GetAudios()["gameOver"].Stop();
    SetGameOverModalState(false);
    Reset();
}

function playAgain() {
    Reset();
    play();
}

async function GameOver() {
    AudioMixer.GetInstance().GetAudios()["main"].Pause();
    AudioMixer.GetInstance().GetAudios()["gameOver"].Play();
    SetGameOverModalState(true);
    stop();
}

function Reset() {
    console.log("a")
    AudioMixer.GetInstance().GetAudios()["main"].Stop();
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
    GameManager.GetInstance().GetPawn().Draw(mainContext);
    GameManager.GetInstance().GetBoard().Draw(mainContext);
    next_piece.Draw(nextContext, 3, 0);
}

function DrawFrame() {
    Clear();
    Draw();
}

async function GravityThread() {

    while(PressKeyListeners[KEY.DOWN]() && GameManager.GetInstance().GetState() != GameState.STOPED) {
        DrawFrame();
        
        // Wait if the game is paused
        while(GameManager.GetInstance().GetState() == GameState.PAUSED)
            await sleep(300);
        
        await sleep(1000);
    }

    // Return false if the game ended
    if(GameManager.GetInstance().GetState() == GameState.STOPED)
        return false;

    return true;
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

    AudioMixer.GetInstance().AddAudio("main", mainSoundTrack);
    AudioMixer.GetInstance().AddAudio("gameOver", gameOverSoundTrack);

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

    GameManager.GetInstance().OnChangeStateEvent = SetState

    Reset();
};

document.addEventListener('keydown', event => {
    if(PressKeyListeners[event.keyCode]) {
        event.preventDefault();
        PressKeyListeners[event.keyCode]();
        DrawFrame();
    }
});

const PressKeyListeners = {
    [KEY.UP]:    () => GameManager.GetInstance().GetState() == GameState.GAMING ? GameManager.GetInstance().GetPawn().Rotate() : true,
    [KEY.LEFT]:  () => GameManager.GetInstance().GetState() == GameState.GAMING ? GameManager.GetInstance().GetPawn().AddForce(-1,0) : true,
    [KEY.RIGHT]: () => GameManager.GetInstance().GetState() == GameState.GAMING ? GameManager.GetInstance().GetPawn().AddForce(1,0) : true,
    [KEY.DOWN]:  () => GameManager.GetInstance().GetState() == GameState.GAMING ? GameManager.GetInstance().GetPawn().AddForce(0,1) : true
};