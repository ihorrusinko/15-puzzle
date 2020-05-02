import { ClassicPuzzleGenerator } from '../../src/puzzle-generator/classic-puzzle-generator';

jest.mock('../../src/utils/array', () => ({
    range: (from: number, to: number): number[] => [...Array(to - 1)].map((_, index) => from + index),
    shuffle<T>(array: T[]): T[] {
        return [...array];
    },
}));

describe('ClassicPuzzleGenerator', () => {
    let puzzleGenerator: ClassicPuzzleGenerator;
    beforeEach(() => {
        puzzleGenerator = new ClassicPuzzleGenerator();
    });

    describe('.isSolved', () => {
        test('returns true for solved sequence', () => {
            const sequence = [1, 2, 3, 0];
            expect(puzzleGenerator.isSolved(sequence)).toBe(true);
        });

        test('returns false for unsolved sequence', () => {
            const sequence = [1, 3, 2, 0];
            expect(puzzleGenerator.isSolved(sequence)).toBe(false);
        });
    });

    describe('.isSolvable', () => {
        // based on "Formula for determining ability to solve" => https://www.cs.bham.ac.uk/~mdr/teaching/modules04/java2/TilesSolvability.html
        describe('even side length', () => {
            test('returns true for solvable sequence if empty cell on odd row', () => {
                const sequence = [12, 1, 10, 2, 7, 11, 4, 14, 5, 0, 9, 15, 8, 13, 6, 3];
                expect(puzzleGenerator.isSolvable(sequence)).toBe(true);
            });

            test('returns true for solvable sequence if empty cell on even row', () => {
                const sequence = [12, 1, 10, 2, 7, 11, 4, 14, 5, 13, 9, 15, 8, 0, 6, 3];
                expect(puzzleGenerator.isSolvable(sequence)).toBe(true);
            });
        });

        describe('odd side length', () => {
            test('returns true for solvable sequence ', () => {
                const sequence = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                expect(puzzleGenerator.isSolvable(sequence)).toBe(true);
            });
        });

        // based on "Classic unsolvable sequence" => https://en.wikipedia.org/wiki/15_puzzle
        test('returns false for unsolvable sequence', () => {
            const sequence = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14, 0];
            expect(puzzleGenerator.isSolvable(sequence)).toBe(false);
        });
    });

    describe('.generate', () => {
        // based on "Formula for determining ability to solve" => https://www.cs.bham.ac.uk/~mdr/teaching/modules04/java2/TilesSolvability.html
        test('returns array', () => {
            const length = 4;
            const numbers = puzzleGenerator.generate(length);
            expect(numbers).toHaveLength(length);
            expect(numbers[length - 1]).toEqual(0);
        });
    });
});
