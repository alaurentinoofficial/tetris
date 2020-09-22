class Piece {
    constructor(ctx, shape, color = "blue", border_color = undefined, shadow_color = undefined) {
        this.ctx = ctx;
        this.color = color;
        this.shape = shape;

        this.border_color = !border_color ? color : border_color;
        this.shadow_color = !shadow_color ? color : shadow_color;

        this.startPositionX = 3;
        this.startPositionY = 0;
    }

    draw() {
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                
                if (value > 0) {
                    this.ctx.shadowBlur = 20;
                    this.ctx.shadowOffsetX = 0;
                    this.ctx.shadowOffsetY = 0;
                    this.ctx.shadowColor = this.shadow_color;

                    this.ctx.fillStyle = this.border_color;
                    this.ctx.strokeStyle = this.color;

                    let cornerRadius = 0.17;
                    let rectWidth = 0.9;
                    let rectHeight = 0.9;
                    let rectX = this.startPositionX + x + 0.05;
                    let rectY = this.startPositionY + y + 0.05;

                    this.ctx.lineJoin = "round";
                    this.ctx.lineWidth = cornerRadius;

                    this.ctx.fillRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
                    this.ctx.strokeRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
                }
            });
        });
    }

    clear() {
        // Clear old position before drawing.
        this.ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    move(x, y) {
        if (!this.valid(x, y))
            return false;

        this.startPositionX = x;
        this.startPositionY = y;

        return true;
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
            return row.length
        });

        // Get the max lenght and add with the actual position in X
        let max_lenght = this.startPositionX < 0 ? this.startPositionX : Math.max.apply(null, lenghts) + this.startPositionX

        // Calculate the error
        let bounce_error = bounceError(max_lenght);

        // Bounce back the piece
        this.move(this.startPositionX + bounce_error, this.startPositionY)
    }
    
    aboveFloor() {
        return this.shape.every((row, dy) => {
            return pieceAboveFloor(this.startPositionY + dy + 1)
        });
    }
}

function transpose(matrix) {
	return matrix[0].map((col, i) => matrix.map(row => row[i]));
}