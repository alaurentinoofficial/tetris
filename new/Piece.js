class Piece {
    constructor(ctx, shape, color = "blue") {
        this.ctx = ctx;
        this.color = color;
        this.shape = shape;

        this.startPositionX = 3;
        this.startPositionY = 0;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                
                if (value > 0) {
                    this.ctx.fillRect(this.startPositionX + x, this.startPositionY + y, 1, 1);
                }
            });
        });
    }

    clear() {
        // Clear old position before drawing.
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    move(x, y) {
        if (this.valid(x, y)) {
            this.startPositionX = x;
            this.startPositionY = y;
        }

        this.clear();
        this.draw();
    }

    valid(x, y) {
        return this.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let xFinal = x + dx;
                let yFinal = y + dy;

                return (isValueEmpty(value) || (pieceInInsideWalls(xFinal) && pieceAboveFloor(yFinal)))
            });
        });
    }

    rotate() {
        // Transpose matrix
		this.shape = transpose(this.shape)

		// Reverse the order of the columns.
        this.shape.forEach(row => row.reverse());


        // Get all lenghts after rotate
        let lenghts = this.shape.map((row, i) => {
            return row.filter(v => v > 0).length
        })

        // Get the max lenght and add with the actual position in X
        let max_lenght = this.startPositionX < 0 ? this.startPositionX : Math.max.apply(null, lenghts) + this.startPositionX
        

        // Calculate the error
        let bounce_error = bounceError(max_lenght);

        // Bounce back the piece
        this.move(this.startPositionX + bounce_error, this.startPositionY)
        
        this.clear();
        this.draw();
	}
}

function transpose(matrix) {
	return matrix[0].map((col, i) => matrix.map(row => row[i]));
}