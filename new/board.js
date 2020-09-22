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

	rotate(piece) {
		// Clone with JSON for immutability.
		let p = JSON.parse(JSON.stringify(piece));

		// Transpose matrix
		p.shape = transpose(p.shape)

		// Reverse the order of the columns.
		p.shape.forEach(row => row.reverse());
		return p;
	}
}

function transpose(matrix) {
	return matrix[0].map((col, i) => matrix.map(row => row[i]));
}