import { BoxInterface, DirectionEnum, GameInterface } from './interfaces';
import { ClassicBox } from './box/classic-box';
import { ClassicGame } from './game/classic-game';
import { ClassicPuzzleGenerator } from './puzzle-generator/classic-puzzle-generator';

export default class TerminalUI {
    private box: BoxInterface;
    private game: GameInterface;

    constructor() {
        const boardSize = 4;
        this.box = new ClassicBox(boardSize);
        this.game = new ClassicGame(this.box, new ClassicPuzzleGenerator());
        this.game.start();
        this.render();
    }

    onKeyPress(str: string, key: { sequence: string; name: string }): void {
        if (key.sequence === '\u0003' || this.game.isSolved()) {
            process.exit();
        }

        if (key.name === 'up') {
            this.game.moveEmptyCell(DirectionEnum.Down);
        } else if (key.name === 'down') {
            this.game.moveEmptyCell(DirectionEnum.Up);
        } else if (key.name === 'left') {
            this.game.moveEmptyCell(DirectionEnum.Right);
        } else if (key.name === 'right') {
            this.game.moveEmptyCell(DirectionEnum.Left);
        }
        this.render();
    }

    render(): void {
        console.clear();

        console.log('=========================');
        console.log('Welcome to puzzle 15 game');
        console.log([
            'How to play:',
            'A tile can be moved to a neighbour empty place using keyboard arrows.',
            'To succeed in the game you need to order tiles from 1 to 15, where tile number 1 is at the top left corner and empty one is at the bottom right corner.',
            'More details: https://en.wikipedia.org/wiki/15_puzzle\'.',
            'Good luck!'
        ].join('\n'));

        for (let i = 0; i < this.box.sideLength(); i++) {
            const array = [];
            for (let j = 0; j < this.box.sideLength(); j++) {
                const cellValue = this.box.getCell(i, j);
                let formattedValue = (cellValue === 0 ? '  ' : cellValue).toString();
                formattedValue = formattedValue.length === 1 ? formattedValue + ' ' : formattedValue;
                array.push(formattedValue);
            }
            console.log(' ', array.map(() => '---- ').join(''));
            console.log(' |', array.join(' | '), '|');
            if (i == this.box.sideLength() - 1) {
                console.log(' ', array.map(() => '---- ').join(''));
            }
        }

        if (this.game.isSolved()) {
            console.log('YAY!!! You solved the puzzle!');
            console.log('press any button to exit...');
        }
    }
}
