import { BoxInterface, DirectionEnum, GameInterface, MoveStrategy, PuzzleGeneratorInterface } from '../interfaces';

export class ClassicGame implements GameInterface {
    private box: BoxInterface;
    private puzzleGenerator: PuzzleGeneratorInterface;

    constructor(box: BoxInterface, puzzleGenerator: PuzzleGeneratorInterface) {
        this.box = box;
        this.puzzleGenerator = puzzleGenerator;
    }

    isSolved(): boolean {
        return this.puzzleGenerator.isSolved(this.box.cells());
    }

    start(): void {
        this.box.populate(this.puzzleGenerator.generate(this.box.size()));
    }

    moveEmptyCell(direction: DirectionEnum): boolean {
        let moveStrategy: MoveStrategy;
        switch (direction) {
            case DirectionEnum.Up:
                moveStrategy = { rowIncrement: -1, columnIncrement: 0 };
                break;
            case DirectionEnum.Down:
                moveStrategy = { rowIncrement: 1, columnIncrement: 0 };
                break;
            case DirectionEnum.Left:
                moveStrategy = { rowIncrement: 0, columnIncrement: -1 };
                break;
            case DirectionEnum.Right:
                moveStrategy = { rowIncrement: 0, columnIncrement: 1 };
                break;
        }
        return this.box.moveEmptyCellOn(moveStrategy);
    }
}
