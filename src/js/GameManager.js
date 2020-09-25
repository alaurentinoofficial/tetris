var GameManager = (function () {
    var instance;

    function SetScore(new_score) {
        instance.score = new_score;
    }

    function AddScore(delta_score) {
        instance.score += delta_score;
    }

    function GetScore() {
        return instance.score;
    }

    function SetState(state) {
        instance.gameState = state;
        instance.OnChangeStateEvent(state);
    }

    function GetState() {
        return instance.gameState;
    }

    function Stop() {
        SetScore(0);
        SetState(GameState.STOPED);
    }

    function Start() {
        SetScore(0);
        SetState(GameState.GAMING);
        instance.board.Start();
    }

    function GetBoard() {
        return instance.board;
    }

    function GetPawn() {
        return instance.pawn;
    }

    function SetLevel(new_level) {
        instance.level = new_level;
    }

    function GetLevel() {
        return instance.level;
    }

    async function GravityAsync(cb) {

        while(instance.pawn.AddForce(0,1) && instance.GetState() != GameState.STOPED) {
            if(cb)
                cb();
            
            // Wait if the game is paused
            while(instance.GetState() == GameState.PAUSED)
                await sleep(300);
            
            await sleep(1000);
        }
    
        // Return false if the game ended
        if(instance.GetState() == GameState.STOPED)
            return false;
    
        return true;
    }

 
    function constructor() {
        let board = new Board();

        var object = {
            gameState: GameState.STOPED
            , score: 0
            , level: 1
            , board: board
            , pawn: new Pawn(board)
            , SetState: SetState
            , GetState: GetState
            , SetScore: SetScore
            , AddScore: AddScore
            , GetScore: GetScore
            , Stop: Stop
            , Start: Start
            , GetBoard: GetBoard
            , GetPawn: GetPawn
            , GetLevel: GetLevel
            , SetLevel: SetLevel
            , GravityAsync: GravityAsync
            , OnChangeStateEvent: function () {}
        };

        return object;
    }
 
    return {
        GetInstance: function () {
            if (!instance) {
                instance = constructor();
            }
            return instance;
        }
    };
})();