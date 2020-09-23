class Board {
	constructor() {
        this.Start();
    }
    
    Start() {
        this.score = 0;
        this.grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    }

	ValidateFillOneLine() {
		let gridCopy = [...this.grid]

        gridCopy = gridCopy.filter(row => row.filter(x => x != null).length != row.length);

		while(gridCopy.length < this.grid.length)
		{
            this.score += 100;				
			gridCopy.unshift(Array(COLS).fill(null));
		}

		this.grid = gridCopy;
    }
    
    AddTile(x, y, tile) {
        if (this.grid[y][x] != null)
            throw "Position already taken!";
        
        this.grid[y][x] = tile;
    }

	Draw(context) {
		this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value != 0 && value != null)
                    value.Draw(context, x, y);
            })
        })
	}

	DetectColision(xFinal, yFinal, id) {
		return typeof this.grid[yFinal] === 'undefined' || this.grid[yFinal][xFinal] == id || isValueEmpty(this.grid[yFinal][xFinal])
	}
}