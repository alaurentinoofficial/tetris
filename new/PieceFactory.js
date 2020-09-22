function PieceFactory(ctx) {
    let I = new Piece(ctx, [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
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
    
    let pieces = [I, J, L, O, S, Z, T]

    return pieces[Math.floor(Math.random() * (pieces.length))];
}