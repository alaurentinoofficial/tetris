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
    //Start the game
    GameManager.GetInstance().Start();

    // Stop the game over music
    AudioMixer.GetInstance().GetAudios()["gameOver"].Stop();

    // Play the game music
    AudioMixer.GetInstance().GetAudios()["main"].Play();

    while(true) {
        // Set the new Piece into Pawn Controller
        let piece = {...next_piece}
        GameManager.GetInstance().GetPawn().SetPiece(piece, 3, 0);

        // Wait the next random piece be different than actual
        while(JSON.stringify(piece.shape) == JSON.stringify(next_piece.shape))
            next_piece = new PieceFactory();

        // Create the gravity to the Piece until colide (return true) or reset game (return false)
        // Pass in parameter a call back funtion to draw the frame for each step
        if (!await GameManager.GetInstance().GravityAsync(DrawFrame))
            return;
        
        // Try to pass the tiles to the board, if they colide return the error and end the game
        try { GameManager.GetInstance().GetPawn().ReleaseTiles(); }
        catch(e) { GameOver(); return; }

        // Test if the play scored and pass the call back function to add points
        GameManager.GetInstance().GetBoard().ValidateFillOneLine(AddScore);
        
        DrawFrame();
    }
}

function pauseResume() {
    // If is paused, resume the game
    if (GameManager.GetInstance().GetState() == GameState.PAUSED) {
        GameManager.GetInstance().SetState(GameState.GAMING);
        AudioMixer.GetInstance().GetAudios()["main"].Play();
    }

    // Otherwise if is in game then pause the game
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
    // Disable the modal
    SetGameOverModalState(false);

    SetScore(0);
    Clear();

    AudioMixer.GetInstance().GetAudios()["main"].Stop();

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