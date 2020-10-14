describe('Bounce Error', () => {
    it('To Left', () => {
        let x = bounceError(COLS + 5);

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
    it('Middle of grid', () => {
        let x = pieceInInsideWalls(Math.round(COLS / 2));

        console.log(Math.round(COLS / 2))

        expect(true).to.eql(x);
    });

    it('Begin of the grid', () => {
        let x = pieceInInsideWalls(0);

        expect(true).to.eql(x);
    });

    it("Out -15 tiles", () => {
        let x = pieceInInsideWalls(-15);

        expect(false).to.eql(x);
    });

    it("Out Max + 10", () => {
        let x = pieceInInsideWalls(COLS + 10);

        expect(false).to.eql(x);
    });
});