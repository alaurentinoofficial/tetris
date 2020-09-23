function Piece(shape, tile) {
    let result = {
        shape: shape
        , tile: tile
    };

    result.Draw = (context, positionX, positionY) => {
        result.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    result.tile.Draw(context, x + positionX, y + positionY);
                }
            });
        });
    };

    return result;
}