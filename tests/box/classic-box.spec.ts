import { ClassicBox } from '../../src/box/classic-box';

describe('ClassicBox', () => {
    let box: ClassicBox;
    const boxLength = 2;
    const numbers = [1, 2, 3, 0];
    beforeEach(() => {
        box = new ClassicBox(boxLength);
    });

    describe('.sideLength', () => {
        test('returns side length', () => {
            box.populate(numbers);
            expect(box.sideLength()).toEqual(boxLength);
        });
    });

    describe('.size', () => {
        test('return size', () => {
            box.populate(numbers);
            expect(box.size()).toEqual(boxLength * boxLength);
        });
    });

    describe('.cells', () => {
        test('returns array', () => {
            box.populate(numbers);
            expect(box.cells()).toEqual(numbers);
        });
    });

    describe('.populate', () => {
        test('populates without mutation', () => {
            box.populate(numbers);
            expect(box.cells()).toEqual(numbers);
        });
    });

    describe('.moveEmptyCellOn', () => {
        describe('empty cell at bottom right corner', () => {
            /*
             1 | 2
             3 | 0
             */
            beforeEach(() => {
                box.populate(numbers);
            });

            test(`does not move empty cell out of range for row: 0, col: 0`, () => {
                const moveStatus = box.moveEmptyCellOn({ rowIncrement: 0, colIncrement: 0 });
                expect(moveStatus).toBeFalsy();
                expect(box.cells()).toEqual([1, 2, 3, 0]);
            });

            test(`does not move empty cell out of range for row: 0, col: 1`, () => {
                const moveStatus = box.moveEmptyCellOn({ rowIncrement: 0, colIncrement: 1 });
                expect(moveStatus).toBeFalsy();
                expect(box.cells()).toEqual([1, 2, 3, 0]);
            });

            test(`does not move empty cell out of range for row: 1, col: 0`, () => {
                const moveStatus = box.moveEmptyCellOn({ rowIncrement: 1, colIncrement: 0 });
                expect(moveStatus).toBeFalsy();
                expect(box.cells()).toEqual([1, 2, 3, 0]);
            });

            test(`does not move empty cell out of range for row: 1, col: 1`, () => {
                const moveStatus = box.moveEmptyCellOn({ rowIncrement: 1, colIncrement: 1 });
                expect(moveStatus).toBeFalsy();
                expect(box.cells()).toEqual([1, 2, 3, 0]);
            });

            test(`moves empty cell in range for row: 0, col: -1`, () => {
                const moveStatus = box.moveEmptyCellOn({ rowIncrement: 0, colIncrement: -1 });
                expect(moveStatus).toBeTruthy();
                expect(box.cells()).toEqual([1, 2, 0, 3]);
            });

            test(`moves empty cell in range for row: -1, col: 0`, () => {
                const moveStatus = box.moveEmptyCellOn({ rowIncrement: -1, colIncrement: 0 });
                expect(moveStatus).toBeTruthy();
                expect(box.cells()).toEqual([1, 0, 3, 2]);
            });

            test(`moves empty cell out in range for row: -1, col: -1`, () => {
                const moveStatus = box.moveEmptyCellOn({ rowIncrement: -1, colIncrement: -1 });
                expect(moveStatus).toBeTruthy();
                expect(box.cells()).toEqual([0, 2, 3, 1]);
            });

            test(`does not move empty cell out of range for row: -2, col: -2`, () => {
                const moveStatus = box.moveEmptyCellOn({ rowIncrement: -2, colIncrement: -2 });
                expect(moveStatus).toBeFalsy();
                expect(box.cells()).toEqual([1, 2, 3, 0]);
            });
        });
    });

    describe('.getCell', () => {
        beforeEach(() => {
            box.populate(numbers);
        });

        test('returns cell value if row and column in range', () => {
            expect(box.getCell(1, 1)).toEqual(0);
        });

        test('throws an error if row out of range', () => {
            expect(() => box.getCell(2, 1)).toThrow(RangeError);
        });

        test('throws an error if column out of range', () => {
            expect(() => box.getCell(1, 2)).toThrow(RangeError);
        });
    });
});
