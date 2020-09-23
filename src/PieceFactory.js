function PieceFactory(ctx, board) {
    let I = new Piece(ctx, [
        [1, 1, 1, 1]
    ], board, "#00c3ff", "#0a9ac7", "rgba(0, 195, 255, 0.4)");
    
    let J = new Piece(ctx, [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ], board, "#ff6f00", "#d16008", "rgba(255, 111, 0, 0.4)");
    
    let L = new Piece(ctx, [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ], board, "#ff00b3", "#cc0892", "rgba(255, 0, 179, 0.4)");
    
    let O = new Piece(ctx, [
        [1, 1],
        [1, 1]
<<<<<<< HEAD
    ], "#fffb00", "#d1ce08", "rgba(255, 251, 0, 0.4)");
=======
    ], board, "#fffb00", "#d1ce08", "rgba(255, 251, 0, 0.3)");
>>>>>>> 7ddfd32efb3d65fc7655dd6faf4ed746f0cf2ddc
    
    let S = new Piece(ctx, [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ], board, "#e3412b", "#ba2f1c", "rgba(227, 65, 43, 0.5)");
    
    let Z = new Piece(ctx, [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ], board, "#00ff5e", "#08d152", "rgba(0, 255, 94, 0.4)");
    
    let T = new Piece(ctx, [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ], board, "#c300ff", "#9e08cc", "rgba(195, 0, 255, 0.4)");
    
    let pieces = [I, J, L, O, S, Z, T]

    return pieces[Math.floor(Math.random() * (pieces.length))];
}