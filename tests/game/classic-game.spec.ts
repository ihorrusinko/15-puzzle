import { ClassicGame } from '../../src/game/classic-game';
import { ClassicBox } from '../../src/box/classic-box';
import { ClassicPuzzleGenerator } from '../../src/puzzle-generator/classic-puzzle-generator';
import { DirectionEnum } from '../../src/interfaces';

describe('ClassicGame', () => {
    let box: ClassicBox;
    let puzzleGenerator: ClassicPuzzleGenerator;
    let game: ClassicGame;

    beforeEach(() => {
        box = new ClassicBox(2);
        puzzleGenerator = new ClassicPuzzleGenerator();
        game = new ClassicGame(box, puzzleGenerator);
    });

    describe('.isSolved', () => {
        let isSolvedSpy: jest.SpyInstance;
        let cellsSpy: jest.SpyInstance;

        beforeEach(() => {
            isSolvedSpy = jest.spyOn(puzzleGenerator, 'isSolved');
            cellsSpy = jest.spyOn(box, 'cells');
            cellsSpy.mockImplementation(() => [1, 2, 3, 0]);
            isSolvedSpy.mockImplementation(() => true);
        });

        test('calls box.cells', () => {
            game.isSolved();
            expect(isSolvedSpy).toHaveBeenCalledTimes(1);
        });

        test('passes array to puzzleGenerator.isSolved', () => {
            expect(game.isSolved()).toBeTruthy();
            expect(isSolvedSpy).toHaveBeenCalledTimes(1);
            expect(isSolvedSpy).toHaveBeenCalledWith([1, 2, 3, 0]);
        });
    });

    describe('.start', () => {
        let populateSpy: jest.SpyInstance;
        let generateSpy: jest.SpyInstance;

        beforeEach(() => {
            populateSpy = jest.spyOn(box, 'populate');
            generateSpy = jest.spyOn(puzzleGenerator, 'generate');
        });

        test('passes array to box.populate', () => {
            generateSpy.mockImplementation(() => [1, 2, 3, 0]);

            game.start();

            expect(populateSpy).toHaveBeenCalledTimes(1);
            expect(populateSpy).toHaveBeenCalledWith([1, 2, 3, 0]);
        });

        test('passes number to puzzleGenerator.generate', () => {
            game.start();

            expect(generateSpy).toHaveBeenCalledTimes(1);
            expect(generateSpy).toHaveBeenCalledWith(4);
        });
    });

    describe('.moveEmptyCell', () => {
        let moveEmptyCellOnSpy: jest.SpyInstance;

        beforeEach(() => {
            moveEmptyCellOnSpy = jest.spyOn(box, 'moveEmptyCellOn');
        });

        test('passes correct move strategy for up direction', () => {
            game.moveEmptyCell(DirectionEnum.Up);
            expect(moveEmptyCellOnSpy).toHaveBeenCalledTimes(1);
            expect(moveEmptyCellOnSpy).toHaveBeenCalledWith({ rowIncrement: -1, colIncrement: 0 });
        });

        test('passes correct move strategy for down direction', () => {
            game.moveEmptyCell(DirectionEnum.Down);
            expect(moveEmptyCellOnSpy).toHaveBeenCalledTimes(1);
            expect(moveEmptyCellOnSpy).toHaveBeenCalledWith({ rowIncrement: 1, colIncrement: 0 });
        });

        test('passes correct move strategy for left direction', () => {
            game.moveEmptyCell(DirectionEnum.Left);
            expect(moveEmptyCellOnSpy).toHaveBeenCalledTimes(1);
            expect(moveEmptyCellOnSpy).toHaveBeenCalledWith({ rowIncrement: 0, colIncrement: -1 });
        });

        test('passes correct move strategy for right direction', () => {
            game.moveEmptyCell(DirectionEnum.Right);
            expect(moveEmptyCellOnSpy).toHaveBeenCalledTimes(1);
            expect(moveEmptyCellOnSpy).toHaveBeenCalledWith({ rowIncrement: 0, colIncrement: 1 });
        });
    });
});
