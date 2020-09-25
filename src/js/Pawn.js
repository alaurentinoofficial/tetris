class Pawn {
    constructor(board) {
        this.board = board;
        this.__setup = false;
        this.isBreak = false;
    }

    SetPiece(piece, positionX = 4, positionY = 0) {
        
        this.shape = piece.shape;
        this.tile = piece.tile;
        this.positionX = positionX;
        this.positionY = positionY;
        this.__setup = true;
    }

    DetectColision(x, y, shape = null, enableInsideWall = true) {
        if (!this.__setup)
            throw "Please, configure first using the Controller.SetPiece([...])"

        if (shape == null)
            shape = this.shape


        return !shape.every((row, iy) => {
            return row.every((value, ix) => {
                //console.log(y)
                return (isValueEmpty(value)
                || ((enableInsideWall ? pieceInInsideWalls(ix + x) : true) && pieceAboveFloor(iy + y) && this.board.DetectColision(ix + x, iy + y)));
            });
        });
    }

    Move(x, y) {
        if (!this.__setup)
            throw "Please, configure first using the Controller.SetPiece([...])"
        
        if(this.DetectColision(x, y)){
            if(y == 1){
                this.isBreak = true
            }
            return false;
        }

        this.positionX = x;
        this.positionY = y;

        return true;
    }

    AddForce(x, y) {
        return this.Move(x + this.positionX, y + this.positionY);
    }

    Rotate() {
        if (!this.__setup)
            throw "Please, configure first using the Controller.SetPiece([...])"

        // 90° rotation
		let rotShape = transpose([...this.shape])
        rotShape.forEach(row => row.reverse());

        if (this.DetectColision(this.positionX, this.positionY, rotShape, false))
            return false;

        this.shape = rotShape;

        // Get all lenghts after rotate
        let lenghts = rotShape.map((row, i) => {
            return row.length
        });

        // Get the max lenght and add with the actual position in X
        let max_lenght = this.positionX < 0 ? this.positionX : Math.max.apply(null, lenghts) + this.positionX

        // Calculate the error
        let bounce_error = bounceError(max_lenght);

        // Bounce back the piece
        this.AddForce(bounce_error,0);
        return true;
    }

    Draw(context) {
        if (!this.__setup)
            throw "Please, configure first using the Controller.SetPiece([...])"
        
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
            throw "Please, configure first using the Controller.SetPiece([...])"
        
        this.__setup = false;

        this.shape.forEach((row, iy) => {
            row.forEach((value, ix) => {
                if (value > 0)
                    this.board.AddTile(this.positionX + ix, this.positionY + iy, this.tile);
            })
        });
    }
}