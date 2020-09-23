class Board {

	restart() {
		this.grid = this.getEmptyBoard();
	}

	getEmptyBoard() {
		return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
	}

	clear() {
		this.grid = this.getEmptyBoard();
	}

	draw(piece) {
		piece.shape.forEach((row, y) => {
			row.forEach((value, x) => {
				if(!isValueEmpty(value)) {
					var positionXToFill = piece.startPositionX + x;
					var positionYToFill = piece.startPositionY + y;

					this.grid[positionYToFill][positionXToFill] = piece.id;
				}
			})
		});
	}

	valid(xFinal, yFinal, id) {
		return typeof this.grid[yFinal] === 'undefined' || this.grid[yFinal][xFinal] == id || isValueEmpty(this.grid[yFinal][xFinal])
	}
}