class Board {
	restart(ctx) {
		this.ctx = ctx;
		this.grid = this.getEmptyBoard()
	}

	getEmptyBoard() {
		return Array.from({ length: ROWS }, () => Array(COLS).fill(0))
	}

	valid(p) {
		return this.piece.shape == p.shape;
	}
}