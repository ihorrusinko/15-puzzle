export interface BoxInterface {
    populate(numbers: number[]): void;

    size(): number;

    sideLength(): number;

    getCell(row: number, column: number): number;

    cells(): number[];

    moveEmptyCellOn(moveStrategy: MoveStrategy): boolean;
}

export interface PuzzleGeneratorInterface {
    generate(length: number): number[];

    isSolvable(array: number[]): boolean;

    isSolved(array: number[]): boolean;
}

export type MoveStrategy = {
    columnIncrement: number;
    rowIncrement: number;
};

export interface GameInterface {
    start(): void;
    isSolved(): boolean;
    moveEmptyCell(direction: DirectionEnum): void;
}

export enum DirectionEnum {
    Up = 1,
    Down,
    Left,
    Right,
}
