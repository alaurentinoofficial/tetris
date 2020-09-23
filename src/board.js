class Board {
	constructor() {
		this.score = 0;
	}

	restart() {
		this.grid = this.getEmptyBoard();
	}

	getEmptyBoard() {
		return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
	}

	clear() {
		this.grid = this.getEmptyBoard();
	}

	validateFillOneLine() {
		let isThereRowFilled = false;
		let gridCopy = [...this.grid]

		gridCopy = gridCopy.filter(row => row.filter(x => !isValueEmpty(x)).length != row.length);

		while(gridCopy.length <= this.grid,length)
		{
			isThereRowFilled = true;				
			gridCopy.unshift(Array(row.length).fill(0));
		}

		if(isThereRowFilled) {
			this.score += 100;
			OnScore(this.score);
			this.grid = gridCopy;
		}
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