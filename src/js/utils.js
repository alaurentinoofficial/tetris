import { COLS, ROWS } from "../../src/js/constants.js";

export function isValueEmpty(value) {
    return value === 0;
}

export function pieceInInsideWalls(positionX) {
    return positionX < COLS && positionX >= 0;
}

export function bounceError(x) {
    if (x >= COLS)
        return COLS - x;
    else if (x < 0)
        return x * -1;
    else
        return 0;
}

export function pieceAboveFloor(positionY) {
    return positionY < ROWS;
}

export function transpose(matrix) {
	return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

export function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}