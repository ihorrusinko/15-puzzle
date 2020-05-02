import readline from 'readline';
import TerminalUI from './terminal-ui';

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const terminalUi = new TerminalUI();

process.stdin.on('keypress', terminalUi.onKeyPress.bind(terminalUi));
