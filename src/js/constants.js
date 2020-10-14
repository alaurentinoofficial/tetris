const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30;

const KEY = {
	UP: 38,
	LEFT: 37,
	RIGHT: 39,
	DOWN: 40,
	P: 80,
	R: 82
}

Object.freeze(KEY);

const GameState = {
	STOPED: "stoped",
	GAMING: "gaming",
	PAUSED: "paused"
}

Object.freeze(GameState);