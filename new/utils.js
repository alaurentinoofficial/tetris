function isValueEmpty(value) {
    return value === 0;
}

function pieceInInsideWalls(positionX) {
    return positionX < COLS && positionX >= 0;
}

function pieceAboveFloor(positionY) {
    return positionY < ROWS;
}