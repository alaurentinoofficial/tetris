function isValueEmpty(value) {
    return value === 0;
}

function pieceInInsideWalls(positionX) {
    return positionX < COLS && positionX >= 0;
}

function bounceError(x) {
    if (x >= COLS)
        return COLS - x;
    else if (x < 0)
        return x * -1;
    else
        return 0;
}

function pieceAboveFloor(positionY) {
    //console.log("Colisão")
    return positionY < ROWS;
}

function transpose(matrix) {
	return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}