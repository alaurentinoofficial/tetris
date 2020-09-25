function PieceFactory(ctx, board) {
    let I = new Piece([
        [1, 1, 1, 1],
        [0, 0, 0, 0]
    ], new Tile("#00c3ff", "#0a9ac7", "rgba(0, 195, 255, 0.4)"));
    
    let J = new Piece([
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ], new Tile("#ff6f00", "#d16008", "rgba(255, 111, 0, 0.4)"));
    
    let L = new Piece([
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ], new Tile("#ff00b3", "#cc0892", "rgba(255, 0, 179, 0.4)"));
    
    let O = new Piece([
        [1, 1],
        [1, 1]
    ], new Tile("#fffb00", "#d1ce08", "rgba(255, 251, 0, 0.4)"));
    
    let S = new Piece([
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ], new Tile("#e3412b", "#ba2f1c", "rgba(227, 65, 43, 0.5)"));
    
    let Z = new Piece([
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ], new Tile("#00ff5e", "#08d152", "rgba(0, 255, 94, 0.4)"));
    
    let T = new Piece([
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ], new Tile("#c300ff", "#9e08cc", "rgba(195, 0, 255, 0.4)"));
    
    let pieces = [I, J, L, O, S, Z, T]
    return pieces[Math.floor(Math.random() * (pieces.length))];
}