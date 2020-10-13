export const ROWS = 20;
export const COLS = 10;
export const BLOCK_SIZE = 30;

export const KEY = {
	UP: 38,
	LEFT: 37,
	RIGHT: 39,
	DOWN: 40,
	P: 80,
	R: 82
}

Object.freeze(KEY);

export const GameState = {
	STOPED: "stoped",
	GAMING: "gaming",
	PAUSED: "paused"
}

Object.freeze(GameState);