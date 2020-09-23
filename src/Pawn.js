class Pawn {
    constructor(board) {
        this.board = board;
        this.__setup = false;
    }

    Setup(shape, tile, positionX = 4, positionY = 0) {
        this.shape = shape;
        this.tile = tile;
        this.positionX = positionX;
        this.positionY = positionY;
        this.__setup = true;
    }

    DetectColision(x, y) {
        if (!this.__setup)
            throw "Please, configure first using the Controller.Setup([...])"

        return !this.shape.every((row, iy) => {
            return row.every((value, ix) => {
                
                return (isValueEmpty(value)
                || (pieceInInsideWalls(ix + x) && pieceAboveFloor(iy + y) && this.board.DetectColision(ix + x, iy + y)));
            });
        });
    }

    Move(x, y) {
        if (!this.__setup)
            throw "Please, configure first using the Controller.Setup([...])"
        
        if(this.DetectColision(x, y))
            return false;

        this.positionX = x;
        this.positionY = y;
        return true;
    }

    AddForce(x, y) {
        return this.Move(x + this.positionX, y + this.positionY);
    }

    Rotate() {
        if (!this.__setup)
            throw "Please, configure first using the Controller.Setup([...])"

        // 90° rotation
		this.shape = transpose(this.shape)
        this.shape.forEach(row => row.reverse());

        // Get all lenghts after rotate
        let lenghts = this.shape.map((row, i) => {
            return row.length
        });

        // Get the max lenght and add with the actual position in X
        let max_lenght = this.positionX < 0 ? this.positionX : Math.max.apply(null, lenghts) + this.positionX

        // Calculate the error
        let bounce_error = bounceError(max_lenght);

        // Bounce back the piece
        this.AddForce(bounce_error,0);
    }

    Draw(context) {
        if (!this.__setup)
            throw "Please, configure first using the Controller.Setup([...])"
        
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.tile.Draw(context, x + this.positionX, y + this.positionY);
                }
            });
        });
    }

    ReleaseTiles() {
        if (!this.__setup)
            throw "Please, configure first using the Controller.Setup([...])"
        
        this.__setup = false;

        this.shape.forEach((row, iy) => {
            row.forEach((value, ix) => {
                if (value > 0)
                    this.board.AddTile(this.positionX + ix, this.positionY + iy, this.tile);
            })
        });
    }
}

class BoardV2 {
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