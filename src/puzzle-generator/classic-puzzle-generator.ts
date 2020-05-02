import { range, shuffle } from '../utils/array';
import { PuzzleGeneratorInterface } from '../interfaces';

export class ClassicPuzzleGenerator implements PuzzleGeneratorInterface {
    isSolved(array: number[]): boolean {
        const filteredCells = array.filter((number: number, index: number) => number === index + 1);
        return filteredCells.length === array.length - 1;
    }

    isSolvable(array: number[]): boolean {
        const sideWidth = Math.sqrt(array.length);
        const rowWithEmptyCell = Math.trunc(array.indexOf(0) / sideWidth) + 1;

        const inversionCount = array.reduce((acc, number: number, index: number, array: number[]) => {
            let inversionCount = 0;

            for (let i = index; i < array.length; i++) {
                if (array[i] < number && array[i] !== 0) {
                    inversionCount += 1;
                }
            }

            return acc + inversionCount;
        }, 0);

        if (sideWidth % 2 === 0) {
            if (rowWithEmptyCell % 2 === 0) {
                return inversionCount % 2 === 0;
            } else {
                return inversionCount % 2 !== 0;
            }
        } else {
            return inversionCount % 2 == 0;
        }
    }

    generate(length: number): number[] {
        let generatedRange: number[];
        do {
            generatedRange = shuffle(range(1, length));
            generatedRange.push(0);
        } while (!this.isSolvable(generatedRange));
        return generatedRange;
    }
}
