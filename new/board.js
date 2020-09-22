class Board {
    restart(ctx) {
        this.ctx = ctx;
        this.grid = this.getEmptyBoard()
    }

    getEmptyBoard() {
        return Array.from({length: ROWS}, () => Array(COLS).fill(0))
    }

    valid(p) {
        return this.piece.shape == p.shape;
    }

    rotate(piece) {
        // Clone with JSON for immutability.
        let p = JSON.parse(JSON.stringify(piece));
    
        // Transpose matrix
        for (let y = 0; y < p.shape.length; ++y) {
          for (let x = 0; x < y; ++x) {
            [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
          }
        }
    
        // Reverse the order of the columns.
        p.shape.forEach(row => row.reverse());
        return p;
      }
}