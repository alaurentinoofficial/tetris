function PieceFactory(ctx) {
    let I = new Piece(ctx, [
        [1, 1, 1, 1]
    ], "#00c3ff", "#0a9ac7");
    
    let J = new Piece(ctx, [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ], "#ff6f00", "#d16008");
    
    let L = new Piece(ctx, [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ], "#ff00b3", "#cc0892");
    
    let O = new Piece(ctx, [
        [1, 1],
        [1, 1]
    ], "#fffb00", "#d1ce08");
    
    let S = new Piece(ctx, [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ], "#e3412b", "#ba2f1c");
    
    let Z = new Piece(ctx, [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ], "#00ff5e", "#08d152");
    
    let T = new Piece(ctx, [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ], "#c300ff", "#9e08cc");
    
    let pieces = [I, J, L, O, S, Z, T]

    return pieces[Math.floor(Math.random() * (pieces.length))];
}