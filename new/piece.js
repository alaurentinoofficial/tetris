class Piece {
    constructor(ctx) {
        this.ctx = ctx;
        this.color = "blue";
        this.shape = [
            [1, 0, 0], 
            [1, 1, 1], 
            [0, 0, 0]
        ];

        this.startPositionX = 3;
        this.startPositionY = 0;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if(value > 0) {
                    this.ctx.fillRect(this.startPositionX + x, this.startPositionY + y, 1, 1);
                }
            });
        });
    }

    clear() {
        // Clear old position before drawing.
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
    }

    move(p) {
        if (this.valid(p)) {
            this.startPositionX = p.startPositionX;
            this.startPositionY = p.startPositionY;
        }

        this.clear();
        this.draw();
    }

    valid(p) {
        return p.shape.every((row, dy) => {
            return row.every((value, dx) => {
              let x = p.startPositionX + dx;
              let y = p.startPositionY + dy;

              return (isValueEmpty(value) || (pieceInInsideWalls(x) && pieceAboveFloor(y)))
            });
          });
    }
}