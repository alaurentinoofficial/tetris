import { bounceError, transpose, pieceInInsideWalls } from "../../src/js/utils.js";

describe('Bounce Error', () => {
    it('To Left', () => {
        let x = bounceError(15);

        expect(-5).to.equal(x);
    });

    it('To right', () => {
        let x = bounceError(-5);

        expect(5).to.equal(x);
    });

    it('Valid pos', () => {
        let x = bounceError(5);

        expect(0).to.equal(x);
    });
});

describe('Transpose matrix', () => {
    it('3x3', () => {
        let x = transpose([
            [3, 2, 1],
            [3, 2, 1],
            [3, 2, 1]
        ]);

        expect([
            [3, 3, 3],
            [2, 2, 2],
            [1, 1, 1]
        ]).to.eql(x);
    });

    it('4x2', () => {
        let x = transpose([
            [3, 2],
            [3, 2],
            [3, 2],
            [4, 1]
        ]);

        expect([
            [3, 3, 3, 4],
            [2, 2, 2, 1]
        ]).to.eql(x);
    });
});

describe('Piece inside the walls', () => {
    it('It is 5', () => {
        let x = pieceInInsideWalls(5);

        expect(true).to.eql(x);
    });

    it('It is 0', () => {
        let x = pieceInInsideWalls(5);

        expect(true).to.eql(x);
    });

    it("It isn't -15", () => {
        let x = pieceInInsideWalls(-15);

        console.log(x)

        expect(false).to.eql(x);
    });

    it("It isn't 10", () => {
        let x = pieceInInsideWalls(10);

        console.log(x)

        expect(false).to.eql(x);
    });
});