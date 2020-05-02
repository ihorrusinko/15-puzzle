import { BoxInterface, MoveStrategy } from '../interfaces';

export class ClassicBox implements BoxInterface {
    protected _numbers: number[];
    protected _sideLength: number;

    constructor(sideLength: number) {
        this._sideLength = sideLength;

        this._numbers = new Array<number>(this.size());
    }

    sideLength(): number {
        return this._sideLength;
    }

    size(): number {
        return this._sideLength * this._sideLength;
    }

    cells(): number[] {
        return [...this._numbers];
    }

    populate(numbers: number[]): void {
        for (let i = 0; i < this.size(); i++) {
            this._numbers[i] = numbers[i];
        }
    }

    moveEmptyCellOn(moveStrategy: MoveStrategy): boolean {
        if (moveStrategy.rowIncrement == 0 && moveStrategy.columnIncrement == 0) {
            return false;
        }

        const originEmptyCellIndex = this.emptyCellIndex;
        const column = originEmptyCellIndex % this._sideLength;
        const row = (originEmptyCellIndex - column) / this._sideLength;
        const newRow = row + moveStrategy.rowIncrement;
        const newColumn = column + moveStrategy.columnIncrement;

        if (newRow >= this._sideLength || newRow < 0 || newColumn >= this._sideLength || newColumn < 0) {
            return false;
        }

        const newEmptyCellIndex = this.rowColToIndex(newRow, newColumn);
        const temp = this._numbers[newEmptyCellIndex];
        this._numbers[newEmptyCellIndex] = this._numbers[originEmptyCellIndex];
        this._numbers[originEmptyCellIndex] = temp;

        return true;
    }

    getCell(row: number, column: number): number {
        const cell = this._numbers[this.rowColToIndex(row, column)];
        if (cell != null) {
            return cell;
        }
        throw new RangeError(`Row and Column must be in range 0 - < ${this._sideLength}`);
    }

    private get emptyCellIndex(): number {
        return this._numbers.indexOf(0);
    }

    private rowColToIndex(row: number, col: number): number {
        return row * this._sideLength + col;
    }
}
