'use strict';

let board;
let pawn;
let next_piece;
let mainContext;
let nextContext;
let scoreTxt;
let levelTxt;
let scoreModalTxt;
let levelModalTxt;
let gameState;
let mainSoundTrack;
let gameOverSoundTrack;
let gameOverModal;
let slider;

function AddScore(value) {
    GameManager.GetInstance().AddScore(value);
    SetScore(GameManager.GetInstance().GetScore());
    SetLevel(GameManager.GetInstance().GetLevel());
}

async function play() {
    //Start the game
    GameManager.GetInstance().Start();
    
    SetGameOverModalState(false);

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

    else {
        play();
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

function onMoveSlider() {
    var x = slider.value;
    AudioMixer.GetInstance().GetAudios()["main"].component.volume = x / 100;
    AudioMixer.GetInstance().GetAudios()["gameOver"].component.volume = Math.min(x / 100 * 1.5, 1);

    var color = `linear-gradient(90deg, #00ff5e ${x}%, rgb(200, 200, 200) ${x}%)`;
    slider.style.background = color;
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

    GameManager.GetInstance().SetScore(0);
    SetScore(0);
    SetLevel(1);
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
    scoreModalTxt.innerHTML = point;
}

function SetLevel(level) {
    levelTxt.innerHTML = level;
    levelModalTxt.innerHTML = level;
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

function GameControlKeyPressListener(key) {
    switch(key) {
        case KEY.P:
            pauseResume();
            break;
        case KEY.R:
            exit();
            break;
    }
}

function MovementsControlKeyPressListener(key) {
    if(GameManager.GetInstance().GetState() == GameState.GAMING) {
        switch(key) {
            case KEY.UP:
                GameManager.GetInstance().GetPawn().Rotate();
                break;
            case KEY.LEFT:
                GameManager.GetInstance().GetPawn().AddForce(-1,0);
                break;
            case KEY.RIGHT:
                GameManager.GetInstance().GetPawn().AddForce(1,0);
                break;
            case KEY.DOWN:
                GameManager.GetInstance().GetPawn().AddForce(0,1);
                break;
        }

        DrawFrame();
    }
}

function KeyPressEventObserver(event) {
    GameControlKeyPressListener(event.keyCode);
    MovementsControlKeyPressListener(event.keyCode);
}

window.onload = () => {
    scoreTxt = document.getElementById("score");
    levelTxt = document.getElementById("level");

    scoreModalTxt = document.getElementById("modal-score");
    levelModalTxt = document.getElementById("modal-level");

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

    GameManager.GetInstance().OnChangeStateEvent = SetState;

    Reset();

    slider = document.getElementById("audio-slider");
    onMoveSlider();
};

document.addEventListener('keydown', KeyPressEventObserver);
